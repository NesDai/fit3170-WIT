let current_user = JSON.parse(localStorage.getItem("USER"));

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
    if (checkUserExistence()) {

        // error handling if it is empty??
        let title = document.getElementById("post_title").textContent
        let description = document.getElementById("post_description").textContent
        let interest = document.getElementById("top-interests") // hmm? 

        let myRef = firebase.database().ref(`posts`);
        let key = myRef.key; // generate a key for post id 

        let newData = { 
            description: description,
            interest: interest,
            title: title,
            userID: current_user["phone"],
        }

        myRef.push(newData);
    } else {
        window.location("index.html")
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

//need to fix 
function findCurrentUserPosts() {
    firebase.database().ref("posts").once("value").then(snapshot => {
        let posts = [];
        let postsObj = snapshot.val();
        for (let post_id in postsObj) {
            firebase.database().ref(`posts/${post_id}`).once("value").then(snapshot => {
                let post = snapshot.val();
                if (post["userID"] == current_user["phone"]) {
                    posts.push(post);
                }
            });
        }
        console.log(posts.length);
    });
}

