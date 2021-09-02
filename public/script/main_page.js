

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

 
 function showTranslationModal(){
  document.getElementById("myModal").style.display = "block";  
}

function hideTranslationModal(){
  document.getElementById("myModal").style.display = "none";  
}



