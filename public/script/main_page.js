var user = firebase.auth().currentUser;

console.log(user)
if (user) {
  // User is signed in.
} else {
  // No user is signed in.
}

let current_user = JSON.parse(localStorage.getItem("USER"));
// User: {"phone":"","username":""}
//I will concatenate with the string for now because I dont know css stuff much 
document.getElementById("username").innerHTML = "Hey @" + current_user["username"];




