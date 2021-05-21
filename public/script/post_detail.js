let current_user = JSON.parse(localStorage.getItem("USER"));

const params = new URLSearchParams(window.location.search)

firebase.database().ref(`posts/${params.get('post_id')}`).once("value").then(snapshot => {
    let post = snapshot.val();
    field = document.getElementsByClassName("forum-posts");
    //add the html card here
});



  printPostDetails();
  hideTranslationModal();




function showTranslationModal(){
    document.getElementById("myModal").style.display = "block";  
}

function hideTranslationModal(){
    document.getElementById("myModal").style.display = "none";  
}

//check id the user is signed in
function checkUserExistence() {
    // if a user is signed in then
    if (current_user["username"] && current_user["phone"]) {
        return true;
    } else {
        return false;
    }
}

function printPostDetails(){

    let id = localStorage.getItem("POST_ID");

    let post_details = document.getElementById("post_details");
    // let poster_field = document.getElementById('poster_id');
    // let time_field = document.getElementById('date_posted');
    // let title_field = document.getElementById('title');
    // let description_field = document.getElementById('description');
    // let interest_field = document.getElementById('post_interests');


    firebase.database().ref('posts')
    .orderByChild('id')
        .equalTo(id)
            .once('value', x => {
                x.forEach(data => {
                  post_details.innerHTML = "";
                  let interest = "";
                  let post = data.val();
                  for(let i =0; i<post.interest.length; i++){
                    interest +=`<button class="mdl-button mdl-js-button  mdl-color-text--black" id="interest${i+1}_id"> #${post.interest[i]} </button>`
              }
                    // print the post details in here
                  post_details.innerHTML +=
                  
                    `<div class="demo-card-wide mdl-card mdl-shadow--2dp">
                      <br>
                      <div class="f">
                          <h2 class="mdl-card__title-text mdl-color-text--black notranslate" style="text-align: left; float: left; position: relative; left: 10px" id='poster_id'><b>${post.username}</b></h2>
                          <br>
                          <br>
                          <h2 class="mdl-card__title-text mdl-color-text--black" id='date_posted'>${post.created}</h2>
                          <button class=" mdl-button mdl-js-button" id="delete_post_btn">
                          <i class="material-icons-outlined notranslate" id="delete_post_icon">delete</i>
                          </button>
                      </div>
                      <br>
                      <div class="post_header" style="margin:0 10px; background-color: white">
                        <h5 class="post_header mdl-color-text--black;"style="padding-left:18px" id="title">${post.title}</h5>
                      </div>
                      <!-- POST FORM -->
                      <form class="post_content" style="margin:0 10px; background-color: white">
                        <h6 class="post_content mdl-color-text--black" style="margin:0 10px; background-color: white; padding-left:10px" id="description">
                        ${post.description}</h6>
                        <br>
                        <div id="post_interests" style='inline-block'>
                          ${interest}
                        </div>
                        <br>
                      </form>

                      <!--  LIKE DISLIKE FOR POST -->
                      <div>
                        <br>
                        <button class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  id="like_post_btn">
                        <i class="material-icons notranslate" id="like_post_icon">thumb_up</i><span id="number_of_likes"> 400</span>
                        </button>
                        <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="dislike_post_btn">
                        <i class="material-icons notranslate" id="dislike_post_icon">thumb_down</i><span id="number_of_dislikes"> 20</span>
                        </button>
                      </div>
                      <br>
                        <hr style="margin: 0">
                        <div class="post_comments_header" style="margin:0 10px; ">
                           <h5 class="comment_header mdl-color-text--black">WRITE A COMMENT</h5>
                        </div>
                        <!-- COMMENT FORM -->
                        <form class="post_comment">
                           <!-- COMMENT INPUT -->
                           <input class="comment_input" type="text" id="comment_input" name="comment_input" placeholder="Write a comment...">
                           <br>
                           <!-- ANONYMOUS CHECKBOX BUTTON -->
                           <form>
                              <div>
                                 <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" >
                                 <input type="checkbox" id="anonymous" class="mdl-checkbox__input" >
                                 <span class="mdl-checkbox__label mdl-color-text--black">Stay Anonymous</span>
                                 </label>
                              </div>
                           </form>
                           <!-- SEND BUTTON -->
                           <div>
                              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                 style="background-color: #00b686;" id="send_comment_btn" type="submit" onclick="addComment()">
                              <i class="material-icons notranslate" id="send_reply_icon">send</i>
                              SEND
                              </button>
                           </div>
                        </form>
                        <br>
                        <hr style="margin: 0;">
                        <div id="comment_section">
                           <h5 class="comment_section_header mdl-color-text--black" style="margin-top: 5px; margin-left: 15px; font-size: 18px">COMMENTS</h5>
                        </div>
                    </div>`
                });
            }).then(()=>{
              printComments();
            })
}

// Creating comment
function addComment(){
  if (checkUserExistence()) {
    const options = {  // options for Date
        timeZone:"Africa/Accra",
        hour12 : true,
        hour:  "2-digit",
        minute: "2-digit",
       second: "2-digit"
     };

    let post_id = localStorage.getItem("POST_ID");
    // error handling if it is empty??
    let comment = document.getElementById("comment_input").value
    let stay_anonymous = document.getElementById("anonymous").checked

    //generating a key for the comment
    let myRef = firebase.database().ref(`comments`);
    let key = myRef.push().key;

    // new data to upload in api
    let newData = {
        anonymous: stay_anonymous,
        commenterID: current_user["phone"],
        content: comment,
        dislike:0,
        like:0,
        postID: post_id,
        username: current_user["username"],
        created: new Date().toString()
    }

    firebase.database().ref(`comments/${key}`).set(newData).then(()=>{
        alert("Comment made successfully!")
        window.location = "post.html";
    });

  } else {
    window.location = "post.html";
  }
}

function printComments(){
  let id = localStorage.getItem("POST_ID");

  let comment_section = document.getElementById("comment_section");

  let data_list = [];
  firebase.database().ref('comments')
    .orderByChild('postID')
        .equalTo(id)
          .once('value', x => {
            x.forEach(data => {
              data_list.push(data.val())
            });
      }).then(()=>{
          for(let i=data_list.length-1; i>=0 ; i--){
              let comment = data_list[i];

              let comment_username;
              if (comment.anonymous) {
                console.log("hey");
                comment_username = "Anonymous";
              }else{
                comment_username = comment.username;
              };

              comment_section.innerHTML +=
              `<div>
                 <div style="margin:0 10px; background-color: white">
                    <span class="mdi mdi-cow"></span>
                    <h6 name="username" id="username" class="notranslate">@${comment_username}</h6>
                    <h8 name="comment_date_posted" id="comment_date_posted">${comment.created}</h8>
                    <p>
                       <span id = "user_comment">${comment.content}</span>
                    </p>
                 </div>
                 <!--  LIKE DISLIKE FOR COMMENT -->
                 <span id='like_button_comment' href="#">
                 <button class="like_button_comment_not_liked like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="like_comment_btn">
                 <i class="material-icons notranslate" id="like_comment_icon">thumb_up</i>
                 </button>
                 </span>
                 <span id='dislike_button_comment' href="#">
                 <button class="dislike_button_comment_not_clicked dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="dislike_comment_btn">
                 <i class="material-icons notranslate" id="dislike_comment_icon">thumb_down</i>
                 </button>
                 </span>
                 <!-- COMMENT REPLY TEXT BOX -->
                 <div class="comment_replies">
                    <input class="hideTextInput" type="text" id="comment_reply_input" name="comment_reply_input" placeholder="Write a reply...">
                 </div>
                 <!-- SEND REPLY FOR COMMENT -->
                 <button class="hideButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="send_reply_btn">
                 <i class="material-icons notranslate" id="send_reply_icon">send</i>
                 SEND
                 </button>
                 <!-- ADD REPLY BUTTON FOR COMMENT -->
                 <button class="reply mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                    style="background-color:#00b686;" id="add_reply_btn" type="submit" onclick="addReply()">
                 <i class="material-icons notranslate" id="reply_comment_icon">reply</i>
                 reply
                 </button>
                 <!-- <h5 class="replies_section_header mdl-color-text--black" style="margin-top: 5px; position: relative; left: 35px">REPLIES</h5> -->
                 <!--Reply example -->
                 <div class="verticalLine">
                    <div id="reply_box">
                       <span class="mdi mdi-cow"></span>
                       <h6 name="username" id="username-1" class="notranslate">@Tanya2611</h6>
                       <h8 name="comment_date_posted" id="comment_date_posted">4:33 PM Apr 25, 2021</h8>
                       <p>
                          <span id = "user_comment"> I like it too! </span>
                       </p>
                    </div>
                    <!--  LIKE DISLIKE FOR COMMENT -->
                    <span id='like_button_comment' href="#">
                    <button class="like_button_comment_not_liked like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="like_comment_btn">
                    <i class="material-icons notranslate" id="like_comment_icon">thumb_up</i>
                    </button>
                    </span>
                    <span id='dislike_button_comment' href="#">
                    <button class="dislike_button_comment_not_clicked dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="dislike_comment_btn">
                    <i class="material-icons notranslate" id="dislike_comment_icon">thumb_down</i>
                    </button>
                    </span>
                    <!-- COMMENT REPLY TEXT BOX -->
                    <div class="comment_replies">
                       <input class="hideTextInput" type="text" id="comment_reply_input" name="comment_reply_input" placeholder="Write a reply...">
                    </div>
                    <!-- SEND REPLY FOR COMMENT -->
                    <button class="hideButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="send_reply_btn">
                    <i class="material-icons notranslate" id="send_reply_icon">send</i>
                    SEND
                    </button>
                    <!-- ADD REPLY BUTTON FOR COMMENT -->
                    <button class="reply mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                       style="background-color:#00b686;" id="add_reply_btn" type="submit" onclick="addReply()">
                    <i class="material-icons notranslate" id="reply_comment_icon">reply</i>
                    reply
                    </button>
                 </div>
              </div>
              <hr style="margin: 0 ">`;
          }
      });

}