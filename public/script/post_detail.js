let current_user = JSON.parse(localStorage.getItem("USER"));

const params = new URLSearchParams(window.location.search)

getPostDetails();


function showReplyInput(button_num) {
    document.getElementById("add_reply_section" + button_num.toString()).style.display = "block";
}

function showReplyToReplyInput(button_num, comment_index) {
    document.getElementById("add_reply_reply_section" + button_num.toString() + "," + comment_index.toString()).style.display = "block";
}

function showReplyToReplyToReplyInput(comment_index, reply_index, reply_to_reply_index) {
    document.getElementById("add_reply_2_reply_section" + comment_index.toString() + "," + reply_index.toString() + "," + reply_to_reply_index.toString()).style.display = "block";
}

/**
 * Function used to check the user existence in the database
 * @returns a boolean indicating if the user is found in the database or not
 */
function checkUserExistence() {
    // if a user is signed in then
    if (current_user["username"] && current_user["phone"]) {
        return true;
    } else {
        return false;
    }
}

function getPostDetails() {
    let posts = [];
    let id = params.get('post_id');
    let action = 0;

    firebase.database().ref(`likesDislikes/${id}/${current_user["username"]}`)
        .once('value', x => {
            x.forEach(data => {
                action = data.val()
            })
        }).then(() => {
            firebase.database().ref('posts')
                .orderByChild('id')
                .equalTo(id)
                .once('value', x => {
                    x.forEach(data => {
                        let post = data.val();
                        posts.push(post)
                    });
                }).then(() => {
                    printPostDetails(posts[0], action)
                })
        })
}


function printPostDetails(post, button_num) {

    if(post.username == undefined)
        post.username = "";


    if(post.created == undefined)
        post.created = "";

    let button = `
    <button class="like mdl-button mdl-js-button" id="btn_like" value="${post.likes}">
    <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
    </button>
    <button class="dislike mdl-button mdl-js-button"  value="${post.dislikes}" id="btn_dislike">
    <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
    </button>
    `
    if (button_num == 1) {
        // liked
        button = `<button
         class="like mdl-button mdl-js-button"  style="color: white !important; background-color:#2bbd7e !important;"  value="${post.likes}"  id="btn_like">
         <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
         </button>
         <button class="dislike mdl-button mdl-js-button " value="${post.dislikes}" id="btn_dislike">
         <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
         </button>
         `
    } else if (button_num == -1) {
        // disliked
        button = `<button class="like mdl-button mdl-js-button" value="${post.likes}"  id="btn_like">
         <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
         </button>
         <button class="dislike mdl-button mdl-js-button"  style="background-color:#e53935; color: white;"  value="${post.dislikes}" id="btn_dislike">
         <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
         </button>`
    }

    let interest = "";
    for (let i = 0; i < post.interest.length; i++) {
        interest += `<button class="mdl-button mdl-js-button  mdl-color-text--black" id="interest${i+1}_id"> #${post.interest[i]} </button>`
    }
    let users_post = false;
    if (current_user.username != post.username)
        users_post = true;

    post_display = "";
    post_display +=
        `
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
            <!-- POST HEADER -->
            <br>
            <div class="f">`;
    if (post.username == "")
        post_display += `<h2 class="mdl-card__title-text mdl-color-text--black notranslate" style="text-align: left; float: left; position: relative; left: 10px" id='poster_id'></h2>`;
    else
        post_display += `<h2 class="mdl-card__title-text mdl-color-text--black notranslate" style="text-align: left; float: left; position: relative; left: 10px" id='poster_id'>@${post.username}</h2>`;     
    post_display += 
            `</div>
            <div>
                <button class="mdl-button mdl-js-button" id="delete_post_btn" onclick="removePost()">
                    <img src="./css/images/delete_icon.png"  id="delete_post_icon"></img>
                </button>
            </div>`;
    if (current_user.username != post.username)
        post_display += `<br>`

    post_display +=
        `
            <div class="post_header" style="margin:0 10px; background-color: white">
                <h5 class="post_header mdl-color-text--black;"style="padding-left:18px; font-size: 30px; color: #006DAE">${post.title}</h5>
            </div>
            <!-- POST FORM -->
            <form class="post_content" style="margin:0 10px; background-color: white">
                <h6 class="post_content mdl-color-text--black" style="margin:0 10px; background-color: white; padding-left:10px; font-size: 20px" >${post.description}</h6>
                <br>
        ` + `
        ${post.videoURL !== 0 && post.videoURL !== undefined ? `<iframe width="420" height="315" src="${post.videoURL}"></iframe>` : ``}
        ` + `
                <br>
                <div style='display: inline-block'>
                    <button class="mdl-button mdl-js-button  mdl-color-text--white" id="interest1_id">${post.interest[0]}</button>
                    <button class="mdl-button mdl-js-button mdl-color-text--white" id="interest2_id">${post.interest[1]}</button>
                </div>
                <br><br>
            </form>
            <div class="f">
                <h2 class="mdl-card__title-text mdl-color-text--black" id='date_posted'>${post.created}</h2>
                <br>
                <div>
                    <!--  LIKE DISLIKE FOR POST -->
                    <br>
                    ${button}
                    <button class="favourite mdl-button mdl-js-button mdl-button--raised" id="favourite_post_btn" onclick="checkButtonStatus()">
                        <img src="./css/images/heart_icon.png"  id="favourite_post_icon"></img><span id="favourite_btn"> Add Favourite</span>
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
                            <label class="mdl-checkbox mdl-js-checkbox" >
                                <input type="checkbox" id="anonymous" class="mdl-checkbox__input" >
                                <span class="mdl-checkbox__label mdl-color-text--black">Stay Anonymous</span>
                            </label>
                          </div>
                    </form>
                    <!-- SEND BUTTON -->
                    <div>
                        <button class="mdl-button mdl-js-button mdl-button--raised" id="send_comment_btn" type="submit" onclick="addComment()">
                            <i class="material-icons notranslate" id="send_reply_icon">send</i> SEND
                        </button>
                    </div>
                </form>
                <br>
                <hr style="margin: 0;">
                <div id="comment_section">
                    <h5 class="comment_section_header mdl-color-text--black" style="margin-top: 5px; margin-left: 15px; font-size: 18px">COMMENTS</h5>
                </div>

                <!-- Alert UI -->
                    <dialog class="mdl-dialog">
                        <h4 class="mdl-dialog__title" id="alert_title" style="color: #006DAE; text-align: center;">Alert</h4>
                        <hr style="margin: 0;">
                        <div class="mdl-dialog__content">
                            <h8>
                                Please do not click like or dislike button too fast. It may cause erroneous behaviour.
                            </h8>
                            <br>
                            <br>
                            <div class="mdl-dialog__actions">
                                <button class="mdl-button mdl-js-button mdl-color-text--white mdl-shadow--2dp close_btn" style="width: 100%; background-color:#006DAE; border-radius: 7px; margin: auto;">OK</button>
                            </div>
                        </div>
                    </dialog>

                <script>
                    //checks for double click on like button
                    $('#btn_like').on('click',function(){
                        var $button=$(this);
                        if ($button.data('alreadyclicked')){
                            $button.data('alreadyclicked', false); // reset
                            
                            if ($button.data('alreadyclickedTimeout')){
                                clearTimeout($button.data('alreadyclickedTimeout')); // prevent this from happening
                            }
                            
                            // do what needs to happen on double click. 
                            dialog.showModal();
                        }else{
                            $button.data('alreadyclicked', true);
                            
                            var alreadyclickedTimeout=setTimeout(function(){
                                $button.data('alreadyclicked', false); // reset when it happens
                                likePostDetailed('${post.id}')
                            },300); // <-- dblclick tolerance here
                            $button.data('alreadyclickedTimeout', alreadyclickedTimeout); // store this id to clear if necessary
                        }
                        return false;
                    });

                    //checks for double click on dislike button
                    $("#btn_dislike").on('click',function(){
                        var $button=$(this);
                        if ($button.data('alreadyclicked')){
                            $button.data('alreadyclicked', false); // reset
                            
                            
                            if ($button.data('alreadyclickedTimeout')){
                                clearTimeout($button.data('alreadyclickedTimeout')); // prevent this from happening
                            }
                            
                            // do what needs to happen on double click. 
                            dialog.showModal();
                        }else{
                            $button.data('alreadyclicked', true);
                            
                            var alreadyclickedTimeout=setTimeout(function(){
                                $button.data('alreadyclicked', false); // reset when it happens
                                dislikePostDetailed('${post.id}')
                            },300); // <-- dblclick tolerance here
                            $button.data('alreadyclickedTimeout', alreadyclickedTimeout); // store this id to clear if necessary
                        }
                        return false;
                    });
                </script>

                <!-- Alert control-->
                    <script>
                        var dialog = document.querySelector('dialog');
                        if (! dialog.showModal) {
                            dialogPolyfill.registerDialog(dialog);
                        }
                        dialog.querySelector('.close_btn').addEventListener('click', function() {
                            dialog.close();
                        });
                    </script>

            </div>`
    $('#post_details').append(post_display);
    checkUserFavouritedPost();
    printComments();
    if (current_user.username != post.username) // remove the delete button if not the poster of the post
        document.getElementById("delete_post_btn").remove();
}

/**
 * Function which checks the button's nature before performing the wanted functionality. 
 * The functionality can be adding the post into favourites or removing them.
 * @returns none
 */
function checkButtonStatus() {

    let post_id = params.get('post_id');

    let myRef = firebase.database().ref(`posts/${post_id}`);
    myRef.once("value")
        .then(function(snapshot) {

            let hasFavouriteData = snapshot.hasChild("users_favourite");
            let user_found = false;
            // checking the favourite data has been written ebfore
            if (hasFavouriteData == false) {
                addPostToFavourite();
            } else {
                let users_arr = snapshot.val()["users_favourite"];

                for (let i = 0; i < users_arr.length; i++) {
                    if (current_user["phone"] == users_arr[i]) {
                        user_found = true;
                    }
                }

                if (user_found) {
                    removePostFromFavourite();
                } else {
                    addPostToFavourite();
                }
            }
        })
}

/**
 * Function which removes the current post from user's favourite.
 * @returns none
 */
function removePostFromFavourite() {
    let post_id = params.get('post_id');

    if (checkUserExistence()) {
        let myRef = firebase.database().ref(`posts/${post_id}`);
        myRef.once("value")
            .then(function(snapshot) {
                let newData = "";
                let new_users_arr = [];
                let users_arr = snapshot.val()["users_favourite"];
                for (let i = 0; i < users_arr.length; i++) {
                    if (current_user["phone"] != users_arr[i]) {
                        new_users_arr.push(users_arr[i]);
                    }
                }
                newData = {
                    users_favourite: new_users_arr
                }

                firebase.database().ref(`posts/${post_id}`).update(newData).then(() => {
                })
                let fav_button = document.getElementsByClassName("favourite")[0];
                fav_button.innerHTML = "\n  <img src=\"./css/images/heart_icon.png\" id=\"favourite_post_icon\"><span id=\"favourite_btn\"> Add Favourite</span>\n  ";
                fav_button.style.background='#dadada';
                fav_button.style.color='black';
            })
    }
}

/**
 * Function which adds the current post into user's favourite.
 * It will first check ifthe favourite attribute has been written or not in the database 
 * before proceeding to add the following post into favourites.
 * @returns none
 */
function addPostToFavourite() {
    let post_id = params.get('post_id');

    if (checkUserExistence()) {

        let myRef = firebase.database().ref(`posts/${post_id}`);
        myRef.once("value")
            .then(function(snapshot) {

                let hasFavouriteData = snapshot.hasChild("users_favourite");
                let newData = "";

                // checking the favourite data has been written ebfore
                if (hasFavouriteData == false) {
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
                })

                let fav_button = document.getElementsByClassName("favourite")[0];
                fav_button.innerHTML = "\n  <img src=\"./css/images/fav_icon.png\" id=\"favourite_post_icon\"><span id=\"favourite_btn\"> Remove Favourite</span>\n  ";
                fav_button.style.background='#006dae';
                fav_button.style.color='white';
            })
    }
}

/**
 * Function that allows a new comment to be added into the database
 * The comment will be added into database if input was not left empty
 * @returns none
 */
function addComment() {
    let post_id = params.get('post_id');

    if (checkUserExistence()) {
        const options = { // options for Date
            timeZone: "Africa/Accra",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };

        // error handling if it is empty??
        let comment = document.getElementById("comment_input").value
        let stay_anonymous = document.getElementById("anonymous").checked

        // new data to upload in api
        if (comment) { // only adding comment if it's not empty
            //generating a key for the comment
            let myRef = firebase.database().ref(`comments`);
            let key = myRef.push().key;

            let now = new Date();
            let utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
            utc = utc.toString();
            utc = utc.substring(0,25);
            utc+="(UTC TIME)";

            let newData = {
                anonymous: stay_anonymous,
                commenterID: current_user["phone"],
                content: comment,
                id: key,
                likes: 0,
                postID: post_id,
                username: current_user["username"],
                created: utc
            }

            firebase.database().ref(`comments/${key}`).set(newData).then(() => {
                printComments();
                // window.location = "post.html" + "?post_id=" + post_id;
            });
        };

    } else {
        window.location = "forum.html";
    }
}

/**
 * Function used which allows user to delete their post on the forum.
 * It will first check if the user id who created the post is the same as the logged in user,
 * before proceeding with deleting the post
 * @returns none
 */
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

function printComments() {
    let id = params.get('post_id');

    let comment_section = document.getElementById("comment_section");
    comment_section.innerHTML = "";
    let data_list = [];
    firebase.database().ref('comments')
        .orderByChild('postID')
            .equalTo(id)
                .once('value', x => {
                    x.forEach(data => {
                        data_list.push(data.val())
                    });
            }).then(() => {
                checkCommentForLikes(data_list)
            })
}

async function checkCommentForLikes(comments_list){
    //looping throough all the comments for the post to check for likes
    for (let i =comments_list.length - 1; i >= 0; i--){
        let comment = comments_list[i];
        //checks whether the post was liked by the user
        let res = await checkForLikesComment(comments_list[i].id);
        if (res){
            //prints the comment with liked button
            printComment(1, comment, i);
        }
        else{
            //prints the comment with not liked button
            printComment(0, comment, i);
        }
    }
    for (let comment_index = comments_list.length - 1; comment_index >= 0; comment_index--) {
        printReplies(comments_list[comment_index].id, comment_index)
    }
}


function printComment(button_num, comment, i ){

    let comment_username;
    if (comment.anonymous) {
        comment_username = "Anonymous";
    } else {
        comment_username = comment.username;
    };

    //choosing the proper color for the button
    if (button_num==1){
        button=`<button class="like mdl-button mdl-js-button" style="color: white !important; background-color:#2bbd7e !important;"   value="${comment.likes}" id="btn_cmnt_like${i}">
        <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes">  ${comment.likes}</span>
        </button>`
    }
    else{
        button=`<button class="like mdl-button mdl-js-button"  value="${comment.likes}" id="btn_cmnt_like${i}">
        <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes">  ${comment.likes}</span>
        </button>`
    }
    
    $('#comment_section').append(
        `<div>
            <div style="margin:0 10px; background-color: white; width: 97%">
                <span class="mdi mdi-cow"></span>
                <h6 name="username" id="username" class="notranslate">@${comment_username}</h6>
                <h8 name="comment_date_posted" id="comment_date_posted">${comment.created}</h8>
                <p><span id = "user_comment">${comment.content}</span></p>
            </div>

            <div id="button_div${i}">
                <!--  LIKE FOR COMMENT -->
                ${button}

                <!-- ADD REPLY BUTTON FOR COMMENT -->
                <span>
                    <button class="reply mdl-button mdl-js-button mdl-button--raised" id="add_reply_btn${i}" style="background-color: #006DAE; color: white;"onclick="showReplyInput(${i})">
                    <i class="material-icons notranslate" id="reply_comment_icon">reply</i>ADD REPLY</button>
                </span>
                <br>
            </div>

            <!-- REPLY SECTION -->
            <div id = "add_reply_section${i}" style="display:none">
                <br>
                <div class="post_reply">
                    <!-- REPLY INPUT -->
                    <input class="reply_input" type="text" id="reply_input${i}" placeholder="Write a reply...">
                    <br>

                    <!-- ANONYMOUS CHECKBOX BUTTON -->
                    <div>
                        <label class="mdl-checkbox mdl-js-checkbox" >
                            <input type="checkbox" id="anonymous${i}" class="mdl-checkbox__input" >
                            <span class="mdl-checkbox__label mdl-color-text--black">Stay Anonymous</span>
                        </label>

                        <!-- SEND BUTTON -->
                        <button class="send_reply_btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent" " id="send_reply_btn" onclick="addReply(${i}, '${comment.id}')">
                            <i class="material-icons notranslate" id="send_reply_icon">send</i>SEND
                        </button>
                    </div>
                 </div>
            </div>

            <!-- Alert UI -->
                    <dialog class="mdl-dialog">
                        <h4 class="mdl-dialog__title" id="alert_title" style="color: #006DAE; text-align: center;">Alert</h4>
                        <hr style="margin: 0;">
                        <div class="mdl-dialog__content">
                            <h8>
                                Please do not click like or dislike button too fast. It may cause erroneous behaviour.
                            </h8>
                            <br>
                            <br>
                            <div class="mdl-dialog__actions">
                                <button class="mdl-button mdl-js-button mdl-color-text--white mdl-shadow--2dp close_btn" style="width: 100%; background-color:#006DAE; border-radius: 7px; margin: auto;">OK</button>
                            </div>
                        </div>
                    </dialog>

            <script>
                //checks for double click on like button
                $('#btn_cmnt_like${i}').on('click',function(){
                    var $button=$(this);
                    if ($button.data('alreadyclicked')){
                        $button.data('alreadyclicked', false); // reset
                        
                        if ($button.data('alreadyclickedTimeout')){
                            clearTimeout($button.data('alreadyclickedTimeout')); // prevent this from happening
                        }
                        
                        // do what needs to happen on double click. 
                        dialog.showModal();
                    }else{
                        $button.data('alreadyclicked', true);
                        
                        var alreadyclickedTimeout=setTimeout(function(){
                            $button.data('alreadyclicked', false); // reset when it happens
                            likeComment('${comment.id}', ${i})
                        },300); // <-- dblclick tolerance here
                        $button.data('alreadyclickedTimeout', alreadyclickedTimeout); // store this id to clear if necessary
                    }
                    return false;
                });
            </script>

            <!-- Alert control-->
                    <script>
                        var dialog = document.querySelector('dialog');
                        if (! dialog.showModal) {
                            dialogPolyfill.registerDialog(dialog);
                        }
                        dialog.querySelector('.close_btn').addEventListener('click', function() {
                            dialog.close();
                        });
                    </script>

            <br>
            <div id= "reply_section${i}" style="margin-bottom:10px">
            </div>
        </div>
        <hr style="margin: 0;">
    `
    );
    document.getElementById(`reply_input${i}`).setAttribute("style", "width:95%");
}


/**
 * A function which prints out the replies of a comment
 * @param {string} comment_id the id associated with comment
 * @param {integer} index an integer to indicate the section
 */
function printReplies(comment_id, comment_index) {
    let reply_section = document.getElementById("reply_section" + comment_index.toString());
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
            if (reply_list.length != 0) {
                for (let i = reply_list.length - 1; i >= 0; i--) {
                    let reply = reply_list[i];
                    let reply_username;
                    if (reply.anonymous) {
                        reply_username = "Anonymous";
                    } else {
                        reply_username = reply.username;
                    }

                    if (reply.reply_comment_parent == comment_id) {
                        reply_section.innerHTML += `
                          <div class = 'verticalLine' style="position: relative; right:5px">
                            <div id = "reply_box"  style="width:95%">
                              <span class="mdi mdi-cow"></span>
                              <h6 name="username" id="username" class="notranslate">@${reply_username}</h6>
                              <h8 name="comment_date_posted" id="comment_date_posted">${reply.created}</h8>
                              <p>
                                <span id="user_comment">${reply.content}</span>
                              </p>
                            </div>

                            <!-- ADD REPLY BUTTON FOR COMMENT -->
                            <span>
                            <button class="reply mdl-button mdl-js-button mdl-button--raised" style="background-color: #006DAE; color: white;"onclick="showReplyToReplyInput(${comment_index},${i})">
                            <i class="material-icons notranslate" id="reply_comment_icon">reply</i>ADD REPLY</button>
                            </span>

                            <!-- REPLY SECTION -->
                            <div id = "add_reply_reply_section${comment_index},${i}"" style="display:none">
                                <br>
                                <div class="post_reply">

                                    <!-- REPLY INPUT -->
                                    <input class="reply_input" type="text" id="reply_input${comment_index},${i}"" placeholder="Write a reply..." value="@${reply_username}  ">
                                    <br>

                                    <!-- ANONYMOUS CHECKBOX BUTTON -->
                                    <div>
                                      <label class="mdl-checkbox mdl-js-checkbox" >
                                        <input type="checkbox" id="anonymous${comment_index},${i}"" class="mdl-checkbox__input" >
                                        <span class="mdl-checkbox__label mdl-color-text--black">Stay Anonymous</span>
                                      </label>

                                      <!-- SEND BUTTON -->
                                        <button class="send_reply_btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent" " id="send_reply_btn" onclick="addReplyToReply('${comment_index}', '${i}', '${reply.id}')">
                                        <i class="material-icons notranslate" id="send_reply_icon">send</i>
                                        SEND
                                        </button>
                                    </div>
                                </div>
                                </div>
                                <br>
                                <br>
                                <div id= "reply_reply_section${comment_index},${i}" style="margin-bottom:10px">
                                </div>
                          </div>`
                        //for the UI
                        if (window.screen.width>1024){
                          document.getElementById(`reply_input${comment_index},${i}`).setAttribute("style", "width:93%");
                        }
                        else{
                          document.getElementById(`reply_input${comment_index},${i}`).setAttribute("style", "width:92%");
                        }
                        
                    }
                }
            }
        }).then(() => {
            for (let reply_index = reply_list.length - 1; reply_index >= 0; reply_index--) {
                printRepliesToReplies(reply_list[reply_index].id, comment_index, reply_index, 0)
            }
        });
}

function printRepliesToReplies(reply_id, comment_index, reply_index, start) {
    let reply_section = document.getElementById("reply_reply_section" + comment_index.toString() + "," + reply_index.toString());
    let reply_list = [];

    firebase.database().ref('replies')
        .orderByChild('reply_comment_parent')
        .equalTo(reply_id)
        .once('value', x => {
            x.forEach(data => {
                reply_list.push(data.val())
            })
        }).then(() => {
            if (reply_list.length != 0) {
                for (let i = reply_list.length - 1; i >= 0; i--) {
                    let reply = reply_list[i];
                    let reply_username;
                    if (reply.anonymous) {
                        reply_username = "Anonymous";
                    } else {
                        reply_username = reply.username;
                    }

                    if (reply.reply_comment_parent == reply_id) {
                        reply_section.innerHTML += `
                          <div class = 'verticalLine' style="position: relative; right:5px">
                            <div id = "reply_box"  style="width:93%">
                              <span class="mdi mdi-cow"></span>
                              <h6 name="username" id="username" class="notranslate">@${reply_username}</h6>
                              <h8 name="comment_date_posted" id="comment_date_posted">${reply.created}</h8>
                              <p>
                                <span id="user_comment">${reply.content}</span>
                              </p>
                            </div>

                            <!-- ADD REPLY BUTTON FOR COMMENT -->
                            <span>
                            <button class="reply mdl-button mdl-js-button mdl-button--raised" style="background-color: #006DAE; color: white;"onclick="showReplyToReplyToReplyInput(${comment_index},${reply_index},${start})">
                            <i class="material-icons notranslate" id="reply_comment_icon">reply</i>ADD REPLY</button>
                            </span>

                            <!-- REPLY SECTION -->
                            <div id = "add_reply_2_reply_section${comment_index},${reply_index},${start}" style="display:none">
                                <br>
                                <div class="post_reply">

                                    <!-- REPLY INPUT -->
                                    <input class="reply_input" type="text" id="reply_input${comment_index},${reply_index},${start}" placeholder="Write a reply..." value="@${reply_username}"  >
                                    <br>

                                    <!-- ANONYMOUS CHECKBOX BUTTON -->
                                    <div>
                                      <label class="mdl-checkbox mdl-js-checkbox" >
                                        <input type="checkbox" id="anonymous${comment_index},${reply_index},${start}" class="mdl-checkbox__input" >
                                        <span class="mdl-checkbox__label mdl-color-text--black">Stay Anonymous</span>
                                      </label>

                                      <!-- SEND BUTTON -->
                                        <button class="send_reply_btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent" " id="send_reply_btn"  onclick=" addReplyToReplyToReply('${comment_index}', '${reply_index}','${start}', '${reply.id}')">
                                        <i class="material-icons notranslate" id="send_reply_icon">send</i>
                                        SEND
                                        </button>
                                    </div>

                                </div>
                                </div>
                                <br>
                                <br>
                                <div id= ""reply_2_reply_section"${comment_index},${reply_index},${start}" style="margin-bottom:10px">
                                </div>
                          </div>`
                        //for the ui
                        if (window.screen.width>1024){
                          document.getElementById(`reply_input${comment_index},${reply_index},${start}`).setAttribute("style", "width:92%");
                        }
                        else{
                          document.getElementById(`reply_input${comment_index},${reply_index},${start}`).setAttribute("style", "width:88%");
                        }
                    }
                    start = start + 1;
                }
            }
        }).then(() => {
            for (let i = reply_list.length - 1; i >= 0; i--) {
                printRepliesToReplies(reply_list[i].id, comment_index, reply_index, start)
            }
        });;

}


/**
 * A function which add the new reply from user and writes into the database
 * @param {integer} btn_num the index of reply button
 * @param {string} comment_id the id associated with the comment
 */
function addReply(btn_num, comment_id) {
    if (checkUserExistence()) {
        const options = { // options for Date
            timeZone: "Africa/Accra",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }

        let post_id = params.get('post_id');

        // get reply value
        let reply_input = document.getElementById("reply_input" + btn_num.toString()).value;
        let stay_anonymous = document.getElementById("anonymous" + btn_num.toString()).checked;

        // new data to upload in api
        if (reply_input) { // only adding reply if it's not empty
            // unique key for reply
            let myRef = firebase.database().ref(`replies`);
            let key = myRef.push().key;
            
            let now = new Date();
            let utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
            utc = utc.toString();
            utc = utc.substring(0,25);
            utc+="(UTC TIME)";

            // new data to upload in api
            let newData = {
                anonymous: stay_anonymous,
                content: reply_input,
                created: utc,
                dislike: 0,
                id: key,
                like: 0,
                replierId: current_user["phone"],
                reply_comment_parent: comment_id,
                username: current_user["username"],
            };

            firebase.database().ref(`replies/${key}`).set(newData).then(() => {
                window.location = "post.html" + "?post_id=" + post_id;
            });

        };
    } else {
        window.location = "forum.html";
    }
}

function addReplyToReply(comment_index, reply_index, reply_id) {

    if (checkUserExistence()) {
        const options = { // options for Date
            timeZone: "Africa/Accra",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }


        let post_id = params.get('post_id');

        // get reply value
        let reply_input = document.getElementById("reply_input" + comment_index.toString() + "," + reply_index.toString()).value;
        let stay_anonymous = document.getElementById("anonymous" + comment_index.toString() + "," + reply_index.toString()).checked;
        // new data to upload in api
        if (reply_input) { // only adding reply if it's not empty
            // unique key for reply
            let myRef = firebase.database().ref(`replies`);
            let key = myRef.push().key;

            let now = new Date();
            let utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
            utc = utc.toString();
            utc = utc.substring(0,25);
            utc+="(UTC TIME)";
            // new data to upload in api
            let newData = {
                anonymous: stay_anonymous,
                content: reply_input,
                created: utc,
                dislike: 0,
                id: key,
                like: 0,
                replierId: current_user["phone"],
                reply_comment_parent: reply_id,
                username: current_user["username"],
            };

            firebase.database().ref(`replies/${key}`).set(newData).then(() => {
                window.location = "post.html" + "?post_id=" + post_id;
            });

        };
    } else {
       // window.location = "forum.html";
    }
}


function addReplyToReplyToReply(comment_index, reply_index, reply_to_reply_index, reply_id) {

    if (checkUserExistence()) {
        const options = { // options for Date
            timeZone: "Africa/Accra",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }

        let post_id = params.get('post_id');

        // get reply value
        let reply_input = document.getElementById("reply_input" + comment_index.toString() + "," + reply_index.toString() + "," + reply_to_reply_index.toString()).value;
        let stay_anonymous = document.getElementById("anonymous" + comment_index.toString() + "," + reply_index.toString() + "," + reply_to_reply_index.toString()).checked;
        // new data to upload in api
        if (reply_input) { // only adding reply if it's not empty
            // unique key for reply
            let myRef = firebase.database().ref(`replies`);
            let key = myRef.push().key;

            let now = new Date();
            let utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
            utc = utc.toString();
            utc = utc.substring(0,25);
            utc+="(UTC TIME)";

            // new data to upload in api
            let newData = {
                anonymous: stay_anonymous,
                content: reply_input,
                created: utc,
                dislike: 0,
                id: key,
                like: 0,
                replierId: current_user["phone"],
                reply_comment_parent: reply_id,
                username: current_user["username"],
            };
            firebase.database().ref(`replies/${key}`).set(newData).then(() => {
                window.location = "post.html" + "?post_id=" + post_id;
            });

        };
    } else {
        window.location = "forum.html";
    }
}



function redirect(url, msg) {
    window.location = url;
    return msg;
}

/**
 * A function that checks if the user has favourited the selected post and
 * will output the correct text on button.
 * @returns none
 */
function checkUserFavouritedPost() {
    let post_id = params.get('post_id');
    let user_exist = false;
    let button = document.getElementById("favourite_post_btn");

    firebase.database().ref(`posts/${post_id}`).once("value", (snapshot) => {
        let hasFavouriteData = snapshot.hasChild("users_favourite");
        if (hasFavouriteData) {
            let users_arr = snapshot.val()["users_favourite"];

            // looping through users list in database
            for (let i = 0; i < users_arr.length; i++) {
                if (current_user["phone"] == users_arr[i]) {
                    user_exist = true;
                }
            }

            let fav_button = document.getElementsByClassName("favourite")[0];
            if (user_exist) {
                button.innerHTML = `<img src=\"./css/images/fav_icon.png\" id=\"favourite_post_icon\"><span id=\"favourite_btn\"> Remove Favourite</span>`;
                fav_button.style.background='#006dae';
                fav_button.style.color='white';
            } else {
                button.innerHTML = `<img src=\"./css/images/heart_icon.png\" id=\"favourite_post_icon\"><span id=\"favourite_btn\"> Add Favourite</span>`;
                fav_button.style.background='#dadada';
                fav_button.style.color='black';
            }
        }
    })
}

async function likeComment(comment_id, i){

    let res = await checkForLikesComment(comment_id);
    like_btn_addr=document.getElementById("button_div"+i).getElementsByClassName("like")[0]

    username=current_user["username"]
    
    if (!res) {
        // if there is no action at all, lilke
        firebase.database().ref(`likesComments/${comment_id}/${current_user["username"]}`).set({
            action: 1
        }).then(() => {
            updateCommentLikes(comment_id, 1) // add 1 like 
        });
        // UI
        like_btn_addr.style.background='#2bbd7e';
        like_btn_addr.style.color='white';

        //increase like count
        current_value=like_btn_addr.value
        new_value=parseInt(current_value)+1
        like_btn_addr.value=new_value
        $('#button_div'+i).find('.number_of_likes').html(new_value);

    } else {
        firebase.database().ref(`likesComments/${comment_id}/${current_user["username"]}`).remove();
        updateCommentLikes(comment_id, -1)  // remove 1 like 
        //UI 
        like_btn_addr.style.background='#dadada';
        like_btn_addr.style.color='black';
        // change like number 
        current_value=like_btn_addr.value
        new_value=parseInt(current_value)-1
        like_btn_addr.value=new_value
        $('#button_div'+i).find('.number_of_likes').html(new_value);
    }
}


function checkForLikesComment(comment_id){
    return new Promise(resolve => {
            firebase.database().ref(`likesComments/${comment_id}/${current_user["username"]}`).once("value", snapshot => {
                if (snapshot.exists()){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            });
    });
}

/**
 * Function which used to update the number of likes on comments
 * @param {*} comment_id the unique id of the comment
 * @param {*} number new number of likes added to the comment
 */
function updateCommentLikes(comment_id, number){
    firebase.database().ref(`comments/${comment_id}/likes`).once('value', (snapshot) => {
        let current_likes = snapshot.val();
        var updates = {};
        updates[`comments/${comment_id}/likes`] = current_likes + number
        firebase.database().ref().update(updates);
    })
}