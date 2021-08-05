

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
document.getElementById("username").innerHTML = "Welcome @" + current_us["displayName"];

// Checks if user has accepted the terms and conditions already
function checkUserTAndC(){
    if (current_us.hasOwnProperty("TermsAndConditionsAccepted")){
        if (current_us.TermsAndConditionsAccepted == true){
            window.location.href = "chatbot.html";
        } else {
            window.location.href = "termsAndConditionsPage.html";
        }
    } else {
        window.location.href = "termsAndConditionsPage.html";
    }
}