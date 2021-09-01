

window.onload = function(){
    let us = firebase.auth().currentUser == null;
    console.log(us);

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
          console.log("logged in");
        }
        else {
          // User is signed out.
          console.log("not logged in");
        }
      })
}

let current_us = JSON.parse(localStorage.getItem("USER"));
// User: {"phone":"","username":""}
document.getElementById("username").innerHTML = "Welcome @" + current_us["username"];
// temporary part of code to ensure language in localstorage is english
localStorage.setItem("LANGUAGE", "English");

// This function will not be in use but keep it here just in case. (For more detail: ask Kelvin from Team 404)
// Checks if user has accepted the terms and conditions already
function checkUserTAndC() {
    // initialise phone
    let phone = current_us.phone

    // check if user's phone number is in database
    firebase.database().ref(`users/${phone}`).once("value", snapshot => {
        if (snapshot.exists()){
            firebase.database().ref(`users/${phone}/termsAndConditionsAccepted`).once("value", snapshot2 => {
                // check if termsAndConditionsAccepted field exists
                if (snapshot2.exists()) {
                    // check if termsAndConditionsAccepted is true
                    if (snapshot2.val()) {
                        window.location.href = "chatbot.html";
                    } else {
                        // if it is not true, move to terms and conditions page
                        window.location.href = "termsAndConditionsPage.html"
                    }
                } else {
                    // else move user to terms and condition page
                    window.location.href = "termsAndConditionsPage.html"
                }
            })
        }
    })
}