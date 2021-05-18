let current_user = JSON.parse(localStorage.getItem("USER"));

const params = new URLSearchParams(window.location.search)

firebase.database().ref(`posts/${params.get('post_id')}`).once("value").then(snapshot => {
    let post = snapshot.val();
    field = document.getElementsByClassName("forum-posts");
    //add the html card here
});


window.onload = function(){
    printPostDetails();
    hideTranslationModal();
}


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


    let poster_field = document.getElementById('poster_id');
    let time_field = document.getElementById('date_posted');
    let title_field = document.getElementById('title');
    let description_field = document.getElementById('description');
    let interest_field = document.getElementById('post_interests');


    firebase.database().ref('posts')
    .orderByChild('id')
        .equalTo(id)
            .once('value', x => {
                x.forEach(data => {
                    let post = data.val();
                    // print the post details in here

                    poster_field.innerHTML = post.username;
                    time_field.innerHTML = post.created;
                    title_field.innerHTML = post.title;
                    description_field.innerHTML = post.description;
                    interest_field.innerHTML = "";
                    for(let i =0; i<post.interest.length;i++){

                        interest_field.innerHTML += `<button class="mdl-button mdl-js-button  mdl-color-text--black"> #${post.interest[i]}</button>`;
                    }
                });
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
                    <h6 name="username" id="username">@${comment_username}</h6>
                    <h8 name="comment_date_posted" id="comment_date_posted">${comment.created}</h8>
                    <p>
                       <span id = "user_comment">${comment.content}</span>
                    </p>
                 </div>
                 <!--  LIKE DISLIKE FOR COMMENT -->
                 <span id='like_button_comment' href="#">
                 <button class="like_button_comment_not_liked like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="like_comment_btn">
                 <i class="material-icons" id="like_comment_icon">thumb_up</i>
                 </button>
                 </span>
                 <span id='dislike_button_comment' href="#">
                 <button class="dislike_button_comment_not_clicked dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="dislike_comment_btn">
                 <i class="material-icons" id="dislike_comment_icon">thumb_down</i>
                 </button>
                 </span>
                 <!-- COMMENT REPLY TEXT BOX -->
                 <div class="comment_replies">
                    <input class="hideTextInput" type="text" id="comment_reply_input" name="comment_reply_input" placeholder="Write a reply...">
                 </div>
                 <!-- SEND REPLY FOR COMMENT -->
                 <button class="hideButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="send_reply_btn">
                 <i class="material-icons" id="send_reply_icon">send</i>
                 SEND
                 </button>
                 <!-- ADD REPLY BUTTON FOR COMMENT -->
                 <button class="reply mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                    style="background-color:#00b686;" id="add_reply_btn" type="submit" onclick="addReply()">
                 <i class="material-icons" id="reply_comment_icon">reply</i>
                 reply
                 </button>
                 <!-- <h5 class="replies_section_header mdl-color-text--black" style="margin-top: 5px; position: relative; left: 35px">REPLIES</h5> -->
                 <!--Reply example -->
                 <div class="verticalLine">
                    <div id="reply_box">
                       <span class="mdi mdi-cow"></span>
                       <h6 name="username" id="username-1">@Tanya2611</h6>
                       <h8 name="comment_date_posted" id="comment_date_posted">4:33 PM Apr 25, 2021</h8>
                       <p>
                          <span id = "user_comment"> I like it too! </span>
                       </p>
                    </div>
                    <!--  LIKE DISLIKE FOR COMMENT -->
                    <span id='like_button_comment' href="#">
                    <button class="like_button_comment_not_liked like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="like_comment_btn">
                    <i class="material-icons" id="like_comment_icon">thumb_up</i>
                    </button>
                    </span>
                    <span id='dislike_button_comment' href="#">
                    <button class="dislike_button_comment_not_clicked dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="dislike_comment_btn">
                    <i class="material-icons" id="dislike_comment_icon">thumb_down</i>
                    </button>
                    </span>
                    <!-- COMMENT REPLY TEXT BOX -->
                    <div class="comment_replies">
                       <input class="hideTextInput" type="text" id="comment_reply_input" name="comment_reply_input" placeholder="Write a reply...">
                    </div>
                    <!-- SEND REPLY FOR COMMENT -->
                    <button class="hideButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="send_reply_btn">
                    <i class="material-icons" id="send_reply_icon">send</i>
                    SEND
                    </button>
                    <!-- ADD REPLY BUTTON FOR COMMENT -->
                    <button class="reply mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                       style="background-color:#00b686;" id="add_reply_btn" type="submit" onclick="addReply()">
                    <i class="material-icons" id="reply_comment_icon">reply</i>
                    reply
                    </button>
                 </div>
              </div>
              <hr style="margin: 0;">`;
          }
      });

}