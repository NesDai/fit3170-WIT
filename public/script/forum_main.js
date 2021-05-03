// let user = firebase.auth().currentUser; 
let current_user = JSON.parse(localStorage.getItem("USER"));
// User: {"phone":"","username":""}

function checkUserExistence() {
    // if a user is signed in then 
    if (current_user["username"] && current_user["phone"]) {
        return true;
    } else {
        return false;
    }
}

//making a new post 
//TODO: create post id 
//TODO: validation of title, description, tags required 

function makeNewPost(title, description){
    if (checkUserExistence()) {
        firebase.database().ref(`posts/${current_user["phone"]}`).set({
            title: title,
            description: description, 
            // tags:tags
        });

    } else {
        window.location("index.html")
    }
}

function getPostsByCurrentUser() {
    firebase.database().ref(`posts/${current_user["phone"]}`).once('value', data => {
        data = data.val();
        //just one for now can do for each loop
        pos_title = user["title"];
        pos_description = user["description"];
        console.log(pos_title);
        console.log(pos_description);
    });
}

function updatePost(title, description) {
    user_phone = current_user["phone"];
    let update_data = {
        title: title, 
        description: description
    };
    firebase.database().ref(`posts/${user_phone}`).update(update_data);
}

function removePost() {
    user_phone = current_user["phone"];
    firebase.database().ref(`posts/${user_phone}`).remove();
}