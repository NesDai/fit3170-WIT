var user = firebase.auth().currentUser;

console.log(user)
if (user) {
  // User is signed in.
} else {
  // No user is signed in.
}

let current_user = JSON.parse(localStorage.getItem("USER"));
// User: {"phone":"","username":""}
document.getElementById("username").innerHTML = "Welcome @" + current_user["username"];




