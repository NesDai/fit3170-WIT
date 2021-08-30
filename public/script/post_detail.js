let current_user = JSON.parse(localStorage.getItem("USER"));

const params = new URLSearchParams(window.location.search)

getPostDetails();
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

function getPostDetails(){
  let posts = [];
  let id = params.get('post_id');
  let action=0;

  firebase.database().ref(`likesDislikes/${id}/${current_user["username"]}`)
  .once('value', x => {
      x.forEach(data => {
        action=data.val()
          })
  }).then(()=>{
    firebase.database().ref('posts')
    .orderByChild('id')
        .equalTo(id)
            .once('value', x => {
                x.forEach(data => {
                let post = data.val();
                posts.push(post)
                });
            }).then(()=>{
                printPostDetails(posts[0], action)
            })
          })
}


function printPostDetails(post, button_num)
{
  let post_details = document.getElementById("post_details");
  let button = `
    <button class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"  onclick="likePostDetailed('${post.id}');" value="${post.likes}" >
    <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
    </button>
    <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  onclick="dislikePostDetailed('${post.id}');"  value="${post.dislikes}" >
    <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
    </button>
    `
    if (button_num==0)     // nothing
    {
        button = `
                <button class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"  onclick="likePostDetailed('${post.id}');"  value="${post.likes}">
                <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
                </button>
                <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  onclick="dislikePostDetailed('${post.id}');" value="${post.dislikes}" >
                <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
                </button>
                `
    }
    else if (button_num==1)
    {
         // liked
         button = `<button 
         class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"  style="color: white !important; background-color:#2bbd7e !important;" onclick="likePostDetailed('${post.id}');"  value="${post.likes}">
         <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
         </button>
         <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  onclick="dislikePostDetailed('${post.id}');"  value="${post.dislikes}" >
         <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
         </button>
         `
    }
    else if(button_num==-1)
    {
         // disliked
         button = `<button class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="likePostDetailed('${post.id}');"  value="${post.likes}">
         <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
         </button>
         <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  style="background-color:#e53935; color: white;" onclick="dislikePostDetailed('${post.id}');"  value="${post.dislikes}">
         <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
         </button>`
    }

    post_details.innerHTML = "";
    let interest = "";
    for(let i =0; i<post.interest.length; i++){
      interest +=`<button class="mdl-button mdl-js-button  mdl-color-text--black" id="interest${i+1}_id"> #${post.interest[i]} </button>`
    }


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
                                 ${button}
                                 <button class="favourite mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="favourite_post_btn" onclick="checkButtonStatus()">
                                 <i class="material-icons notranslate" id="favourite_post_icon">favorite</i><span id="favourite_btn"> Add Favourite</span>
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
                    checkUserFavouritedPost();
                    printComments();
                    if(current_user.username != document.getElementById("poster_id").textContent)  // remove the delete button if not the poster of the post
                document.getElementById("delete_post_btn").remove()
}

/**
 * Function which checks the button's nature before
 * performing the wanted functionality
 */
function checkButtonStatus() {

  let post_id = params.get('post_id'); 

  let myRef = firebase.database().ref(`posts/${post_id}`);
    myRef.once("value")
      .then(function(snapshot) {

        let hasFavouriteData = snapshot.hasChild("users_favourite"); 
        let user_found = false;
        // checking the favourite data has been written ebfore
        if (hasFavouriteData == false){
          addPostToFavourite();
        } else {
          let users_arr = snapshot.val()["users_favourite"];
          
          for (let i = 0; i < users_arr.length; i++){
            if (current_user["phone"] == users_arr[i]){
              user_found = true;
            } 
          }

          if (user_found){
            removePostFromFavourite();
          } else {
            addPostToFavourite();
          }
        }
    })
  }
/**
 * Function which removes the current post from user's favourite
 */
function removePostFromFavourite(){
  let post_id = params.get('post_id'); 

  if(checkUserExistence()){
    let myRef = firebase.database().ref(`posts/${post_id}`);
    myRef.once("value")
      .then(function(snapshot) {
        let newData = "";
        let new_users_arr = [];
        let users_arr = snapshot.val()["users_favourite"];
        for(let i = 0; i < users_arr.length; i++) {
            if (current_user["phone"] != users_arr[i]){
              new_users_arr.push(users_arr[i]);
            }
        }
        newData = {
          users_favourite:new_users_arr
        }

        firebase.database().ref(`posts/${post_id}`).update(newData).then(() => {
          alert("Successfully remove the post from your favourite");
        })
        let fav_button = document.getElementsByClassName("favourite")[0];
        fav_button.innerHTML = "\n  <img src=\"./css/images/heart_icon.png\" id=\"favourite_post_icon\"><span id=\"favourite_btn\"> Add Favourite</span>\n  ";
      })
  }
}

/**
 * Function which adds the current post into user's favourite
 */
function addPostToFavourite(){
  let post_id = params.get('post_id'); 

  if (checkUserExistence()){

    let myRef = firebase.database().ref(`posts/${post_id}`);
    myRef.once("value")
      .then(function(snapshot) {

        let hasFavouriteData = snapshot.hasChild("users_favourite"); 
        let newData = "";

        // checking the favourite data has been written ebfore
        if (hasFavouriteData == false){
          //if the data has not been written before
          users_favourite_arr = [];
          users_favourite_arr.push(current_user["phone"]); //push current user id to post dets to indicate they have favourite this post
          
          newData = {
            users_favourite: users_favourite_arr
          }
        } else {
          let users_arr = snapshot.val()["users_favourite"];
          
          users_arr.push(current_user["phone"]);
          newData = {
            users_favourite: users_arr
          }
        }

        firebase.database().ref(`posts/${post_id}`).update(newData).then(() => {
          alert("Successfully added the post to your favourite");
        })

        let fav_button = document.getElementsByClassName("favourite")[0];
        fav_button.innerHTML = "\n  <img src=\"./css/images/heart_icon.png\" id=\"favourite_post_icon\"><span id=\"favourite_btn\"> Remove Favourite</span>\n  ";
      })
  }
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
                 <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img>
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

/* 
A function that checks if the user has favourited the selected post and 
will output the correct text on button
*/
function checkUserFavouritedPost(){
  let post_id = params.get('post_id'); 
  let user_exist = false;
  let button = document.getElementById("favourite_post_btn");

  firebase.database().ref(`posts/${post_id}`).once("value", (snapshot) => {
    let hasFavouriteData = snapshot.hasChild("users_favourite");
    if (hasFavouriteData){
      let users_arr = snapshot.val()["users_favourite"];
      
      // looping through users list in database
      for(let i = 0; i < users_arr.length; i++) {
        if (current_user["phone"] == users_arr[i]){
          user_exist = true;
        }
      }

      if (user_exist){
        button.innerHTML = `                                 
        <i class=\"material-icons notranslate\" id=\"favourite_post_icon\">favorite</i>
        <span id=\"favourite_btn\"> Remove Favourite</span>
        `
      } else {
        button.innerHTML = `                                 
        <i class=\"material-icons notranslate\" id=\"favourite_post_icon\">favorite</i>
        <span id=\"favourite_btn\"> Add Favourite</span>
        `
      }
    }
  })
}