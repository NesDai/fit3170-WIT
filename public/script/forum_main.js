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


function makeNewPost(title, description, tags){
    if (checkUserExistence()) {
            //TODO: validation of title, description, tags required 

        firebase.database().ref(`posts/${phone}`).set({
            // Posts table
            // posts
            // |
            // __ +81802323453 phone acts as like a user id? hmmmhmmm
            //         |_ title:
            //         |_ description:
            //         |_ tags <- array for this??

            title: title,
            description: description, 
            tags:tags
        });

    } else {
        window.location("index.html")
    }
}