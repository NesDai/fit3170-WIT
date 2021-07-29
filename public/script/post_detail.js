let current_user = JSON.parse(localStorage.getItem("USER"));

const params = new URLSearchParams(window.location.search)

printPostDetails();
hideTranslationModal();

function showTranslationModal(){
    document.getElementById("myModal").style.display = "block";
}

function hideTranslationModal(){
    document.getElementById("myModal").style.display = "none";
}

function showReplyInput(button_num){
  document.getElementById("add_reply_section"+button_num.toString()).style.display = "block";
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

    let id = params.get('post_id');
    // let id = localStorage.getItem('POST_ID')

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

                    `
                    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                              <!-- POST HEADER -->
                              <br>
                              <div class="f">
                                 <h2 class="mdl-card__title-text mdl-color-text--black notranslate" style="text-align: left; float: left; position: relative; left: 10px" id='poster_id'>@${post.username}</h2>
                              </div>
                          <button class=" mdl-button mdl-js-button" id="delete_post_btn" onclick="removePost()">
                          <i class="material-icons-outlined notranslate" id="delete_post_icon">delete</i>
                          </button>
                              <br>
                              <div class="post_header" style="margin:0 10px; background-color: white">
                                 <h5 class="post_header mdl-color-text--black;"style="padding-left:18px; font-size: 30px; color: #006DAE">${post.title}</h5>
                              </div>
                              <!-- POST FORM -->
                              <form class="post_content" style="margin:0 10px; background-color: white">
                                 <h6 class="post_content mdl-color-text--black" style="margin:0 10px; background-color: white; padding-left:10px; font-size: 20px" >${post.description} </h6>
                                 <br>
                                 <div style='display: inline-block'>
                                    <button class="mdl-button mdl-js-button  mdl-color-text--white" id="interest1_id">${post.interest[0]} </button>
                                    <button class="mdl-button mdl-js-button mdl-color-text--white" id="interest2_id">${post.interest[1]}</button>
                                 </div>
                                 <br><br>
                              </form>
                              <div class="f">
                              <h2 class="mdl-card__title-text mdl-color-text--black" id='date_posted'>${post.created}</h2>
                              <div>
                              <br>
                              <div>
                                 <!--  LIKE DISLIKE FOR POST -->
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
                              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="send_comment_btn" type="submit" onclick="addComment()">
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
              //check if the user is the poster of the post
              if(current_user.username != document.getElementById("poster_id").textContent)  // remove the delete button if not the poster of the post
                document.getElementById("delete_post_btn").remove()
              printComments();
            })
}

// Creating comment
function addComment(){
  let post_id = params.get('post_id');

  if (checkUserExistence()) {
    const options = {  // options for Date
        timeZone:"Africa/Accra",
        hour12 : true,
        hour:  "2-digit",
        minute: "2-digit",
       second: "2-digit"
     };

     console.log(post_id);
    // error handling if it is empty??
    let comment = document.getElementById("comment_input").value
    let stay_anonymous = document.getElementById("anonymous").checked



    // new data to upload in api
    if (comment){ // only adding comment if it's not empty
      //generating a key for the comment
      let myRef = firebase.database().ref(`comments`);
      let key = myRef.push().key;
      let newData = {
          anonymous: stay_anonymous,
          commenterID: current_user["phone"],
          content: comment,
          dislike:0,
          id:key,
          like:0,
          postID: post_id,
          username: current_user["username"],
          created: new Date().toString()
      }

      firebase.database().ref(`comments/${key}`).set(newData).then(()=>{
          alert("Comment made successfully!");
          console.log("inside");
          window.location = "post.html" + "?post_id=" + post_id;
      });
    };

  } else {
    window.location = "forum.html";
  }
}

function removePost() {
  let post_id = params.get('post_id');
  firebase.database().ref(`posts/${post_id}`).once("value").then(snapshot => {
      let post = snapshot.val();
      if (post["userID"] == current_user["phone"]) {
          firebase.database().ref(`posts/${post_id}`).remove();
          window.location = "forum.html";
      } else {
          alert("Only this post's owner can delete this post");
      }
  });
}


function printComments(){
  let id = params.get('post_id');

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
                 <!--  LIKE FOR COMMENT -->
                 <span id='like_button_comment' href="#">
                 <button class="like_button_comment_not_liked like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="like_comment_btn">
                 <i class="material-icons notranslate" id="like_comment_icon">thumb_up</i>
                 </button>
                 </span>

                 <!--  DISLIKE FOR COMMENT -->
                 <span id='dislike_button_comment' href="#">
                 <button class="dislike_button_comment_not_clicked dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="dislike_comment_btn">
                 <i class="material-icons notranslate" id="dislike_comment_icon">thumb_down</i>
                 </button>
                 </span>

                 <!-- ADD REPLY BUTTON FOR COMMENT -->
                 <span>
                 <button class="reply mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="add_reply_btn${i}" style="background-color: #006DAE; color: white;"onclick="showReplyInput(${i})">
                 <i class="material-icons notranslate" id="reply_comment_icon">reply</i>ADD REPLY</button>
                 </span>
                 <br>

                 <!-- REPLY SECTION -->
                 <div id = "add_reply_section${i}" style="display:none">
                    <br>
                     <div class="post_reply">

                        <!-- REPLY INPUT -->
                        <input class="reply_input" type="text" id="reply_input${i}" placeholder="Write a reply...">
                        <br>

                        <!-- ANONYMOUS CHECKBOX BUTTON -->
                        <div>
                          <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" >
                            <input type="checkbox" id="anonymous${i}" class="mdl-checkbox__input" >
                            <span class="mdl-checkbox__label mdl-color-text--black">Stay Anonymous</span>
                          </label>

                        <!-- SEND BUTTON -->
                          <button class="send_reply_btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" " id="send_reply_btn" onclick="addReply(${i}, '${comment.id}')">
                          <i class="material-icons notranslate" id="send_reply_icon">send</i>
                          SEND
                          </button>
                        </div>

                     </div>
                    </div>
                    <br>
                    <div id= "reply_section${i}" style="margin-bottom:10px">
                    </div>
              </div>

              <hr style="margin: 0;">`;
            }
      }).then(() => {
        for(let i=data_list.length-1; i>=0 ; i--){
          printReplies(data_list[i].id,i)
        }
      });
}

/**
 * A function which prints out the replies of a comment
 * @param {string} comment_id the id associated with comment
 * @param {integer} index an integer to indicate the section
 */
function printReplies(comment_id,index) {

  let reply_section = document.getElementById("reply_section"+index.toString());
  let reply_list = [];

  // print replies of a comment
  firebase.database().ref('replies')
    .orderByChild('reply_comment_parent')
      .equalTo(comment_id)
        .once('value', x => {
          x.forEach(data => {
            reply_list.push(data.val())
          })
        }).then(() => {
          if (reply_list.length != 0){
            for (let i = reply_list.length - 1; i >= 0; i--){
              let reply = reply_list[i];
              let reply_username;
              if (reply.anonymous){
                reply_username = "Anonymous";
              } else {
                reply_username = reply.username;
              }

              if (reply.reply_comment_parent == comment_id){
              reply_section.innerHTML += `
              <div class = 'verticalLine'>
                <div id = "reply_box">
                  <span class="mdi mdi-cow"></span>
                  <h6 name="username" id="username" class="notranslate">@${reply_username}</h6>
                  <h8 name="comment_date_posted" id="comment_date_posted">${reply.created}</h8>
                  <p>
                    <span id="user_comment">${reply.content}</span>
                  </p>
                </div>

                <!--  LIKE FOR COMMENT -->
                <span id='like_button_comment' href="#">
                  <button class="like_button_comment_not_liked like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="like_comment_btn">
                    <i class="material-icons notranslate" id="like_comment_icon">thumb_up</i>
                  </button>
                </span>

                <!--  DISLIKE FOR COMMENT -->
                <span id='dislike_button_comment' href="#">
                  <button class="dislike_button_comment_not_clicked dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="dislike_comment_btn">
                    <i class="material-icons notranslate" id="dislike_comment_icon">thumb_down</i>
                  </button>
                </span>
              </div>
              `
            }
          }}
        })
      }


function redirect(url, msg) {
  window.location = url;
  return msg;
}

/**
 * A function which add the new reply from user and writes into the database
 * @param {integer} btn_num the index of reply button
 * @param {string} comment_id the id associated with the comment
 */
function addReply(btn_num,comment_id) {
  if (checkUserExistence()){

    const options = {  // options for Date
      timeZone:"Africa/Accra",
      hour12 : true,
      hour:  "2-digit",
      minute: "2-digit",
     second: "2-digit"
    }

    let post_id = params.get('post_id');
    // get reply value
    let reply_input = document.getElementById("reply_input"+btn_num.toString()).value;
    let stay_anonymous = document.getElementById("anonymous"+btn_num.toString()).checked;
    // new data to upload in api
    if (reply_input){ // only adding reply if it's not empty
      // unique key for reply
      let myRef = firebase.database().ref(`replies`);
      let key = myRef.push().key;

      // new data to upload in api
      let newData = {
        anonymous: stay_anonymous,
        content: reply_input,
        created: new Date().toString(),
        dislike:0,
        id:key,
        like:0,
        replierId: current_user["phone"],
        reply_comment_parent: comment_id,
        username: current_user["username"]
      };

      url = "post.html" + "?post_id=" + post_id;

      firebase.database().ref(`replies/${key}`).set(newData).then(()=>{
        redirect(url, null)
      });
      msg = "Reply Made successfully";
      alert(redirect(url, msg));
    };
  } else {
    window.location = "forum.html";
  }
}
