let current_user = JSON.parse(localStorage.getItem("USER"));

window.onload = printAllPosts();  

//check id the user is signed in
function checkUserExistence() {
    // if a user is signed in then 
    if (current_user["username"] && current_user["phone"]) {
        return true;
    } else {
        return false;
    }
}


function addReply(){

    // show text input
    document.getElementById("comment_reply_input").className="showTextInput"

    // show send button
    document.getElementById("send_reply_btn").className="showButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" 

    // hide add reply button
    document.getElementById("add_reply_btn").className="hideReply mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
}


//Making a new post 
function makeNewPost() {

    const options = {  // options for Date
        timeZone:"Africa/Accra",
        hour12 : true,
        hour:  "2-digit",
        minute: "2-digit",
       second: "2-digit"
     };


    if (checkUserExistence()) {
        interest_arr = [];
        $("input:checkbox[name=interests]:checked").each(function(){
            interest_arr.push($(this).val());
        });

        interest_json = JSON.stringify(interest_arr);

        // error handling if it is empty??
        let title = document.getElementById("post_title").value
        let description = document.getElementById("post_description").value
        // let interest = document.getElementById("top-interests") // hmm? 

        let myRef = firebase.database().ref(`posts`);
        let key = myRef.key; // generate a key for post id 

        let newData = { 
            description: description,
            interest: interest_arr,
            title: title,
            userID: current_user["phone"],
            username: current_user["username"],
            created: new Date().toString()
        }


        myRef.push(newData).then(() => {
            alert("Posted successfully. Redirecting back to forum")
            window.location = "forum.html";
        });
    } else {
        window.location = "forum.html";
    }
}


function removePost(post_id) {
    firebase.database().ref(`posts/${post_id}`).once("value").then(snapshot => {
        let post = snapshot.val();
        if (post["userID"] == current_user["phone"]) {
            firebase.database().ref(`posts/${post_id}`).remove();
        } else {
            console.log("invalid");
        }
    });
}

// fix
function updatePost(post_id) {
    let title = document.getElementById("post_title").textContent
    let description = document.getElementById("post_description").textContent

    let update_data = {
        title: title, 
        description: description
    };
    if (validatePostOwner(post_id)) {
        firebase.database().ref(`posts/${post_id}`).update(update_data);
    } else {
        console.log("Invalid");
    }
}

// fix
function validatePostOwner(post_id) {
    firebase.database().ref(`posts/${post_id}`).once("value").then(snapshot => {
        let post = snapshot.val();
        if (post["userID"] == current_user["phone"]) {
            return true;
        } else {
            return false;
        }
    });
}

function findAllPosts() {
    firebase.database().ref("posts").once("value").then(snapshot => {
        let postsObj = snapshot.val();
        for (let post_id in postsObj) {
            firebase.database().ref(`posts/${post_id}`).once("value").then(snapshot => {
                let post = snapshot.val();
                console.log(post["title"]);
                console.log(post["description"]);
                console.log(post["interest"]);
                console.log(post["like"]);
                console.log(post["dislike"]);
            });
        }
    });
}





function printAllPosts(){
    let data_list = [];
    let field = document.getElementById("postField");
    // field.innerHTML = ""; // emtpy the field of any previous posts

    firebase.database().ref('posts')
        .once('value', x => {
            x.forEach(data => {
                data_list.push(data.val())
                // let post = data.val()
            });
        }).then(()=>{
            for(let i=data_list.length-1; i>=0 ; i--){
                let post = data_list[i]
                field.innerHTML +=
                `   <div style="padding-top: 20px;"><span class="post_card">
                    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                       <!-- POST HEADER -->
                       <br>
                       <div class="f">
                          <h2 class="mdl-card__title-text mdl-color-text--black" style="text-align: left; float: left; position: relative; left: 10px" id='poster_id'><b>@${post.username}</b></h2>
                          <br class="mobile-br">
                          <h2 class="mdl-card__title-text mdl-color-text--black" id='date_posted'>${post.created}</h2>
                       </div>
                       <br>
                       <div class="post_header" style="margin:0 10px; background-color: white">
                          <h5 class="post_header mdl-color-text--black;"style="padding-left:18px">${post.title}</h5>
                       </div>
                       <!-- POST FORM -->
                       <form class="post_content" style="margin:0 10px; background-color: white">
                          <h6 class="post_content mdl-color-text--black" style="margin:0 10px; background-color: white; padding-left:10px" >${post.description}</h6>
                          <br>
                          <div style='inline-block'>
                             <button class="mdl-button mdl-js-button  mdl-color-text--black" id="interest1_id">${post.interest[0]}</button>
                             <button class="mdl-button mdl-js-button mdl-color-text--black" id="interest2_id">${post.interest[1]}</button>
                          </div>
                          <br>
                       </form>
                       <div>
                          <!--  LIKE DISLIKE FOR POST -->
                          <br>
                            <button class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  id="like_post_btn">
                            <i class="material-icons" id="like_post_icon">thumb_up</i><span id="number_of_likes"> 400</span>
                            </button>
                            <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="dislike_post_btn">
                            <i class="material-icons" id="dislike_post_icon">thumb_down</i><span id="number_of_dislikes"> 20</span>
                            </button>
                            <button class="more mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-shadow--5dp"  id="more_btn">
                            <i class="material-icons" id="more_icon">read_more</i><span id="number_of_dislikes"> More</span>
                            </button>
                       </div>
                       <br>
                 </span></div>`;
            }
        });

}

function printUserPosts(){

    let field = document.getElementById("postField");
    field.innerHTML = ""; // emtpy the field of any previous posts
    let data_list = []

    firebase.database().ref('posts')
        .orderByChild('username')
            .equalTo(current_user['username'])
                .once('value', x => {
                    x.forEach(data => {
                        data_list.push(data.val())

                    });
                }).then(()=> {
                    for(let i=data_list.length-1; i>=0 ; i--){
                        let post = data_list[i]
                        field.innerHTML +=
                        `   <div style="padding-top: 20px;"><span class="post_card">
                            <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                               <!-- POST HEADER -->
                               <br>
                               <div class="f">
                                  <h2 class="mdl-card__title-text mdl-color-text--black" style="text-align: left; float: left; position: relative; left: 10px" id='poster_id'><b>@${post.username}</b></h2>
                                  <br class="mobile-br">
                                  <h2 class="mdl-card__title-text mdl-color-text--black" id='date_posted'>${post.created}</h2>
                               </div>
                               <br>
                               <div class="post_header" style="margin:0 10px; background-color: white">
                                  <h5 class="post_header mdl-color-text--black;"style="padding-left:18px">${post.title}</h5>
                               </div>
                               <!-- POST FORM -->
                               <form class="post_content" style="margin:0 10px; background-color: white">
                                  <h6 class="post_content mdl-color-text--black" style="margin:0 10px; background-color: white; padding-left:10px" >${post.description}</h6>
                                  <br>
                                  <div style='inline-block'>
                                     <button class="mdl-button mdl-js-button  mdl-color-text--black" id="interest1_id"> #interest 1 </button>
                                     <button class="mdl-button mdl-js-button mdl-color-text--black" id="interest2_id">#interest 2</button>
                                  </div>
                                  <br>
                               </form>
                               <div>
                                  <!--  LIKE DISLIKE FOR POST -->
                                  <br>
                                  <button class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="like_post_btn">
                                  <i class="material-icons" id="like_post_icon">thumb_up</i><span id="number_of_likes"> 400</span>
                                  </button>
                                  <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"  id="dislike_post_btn">
                                  <i class="material-icons" id="dislike_post_icon">thumb_down</i><span id="number_of_dislikes"> 20</span>
                                  </button>
                                  <button class="more mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-shadow--5dp"  id="more_btn">
                                    <i class="material-icons" id="more_icon">read_more</i><span id="number_of_dislikes"> More</span>
                                  </button>
                               </div>
                               <br>
                         </span></div>`;
                    }
                });
}
