
console.log(firebase.auth().currentUser != null);


let current_user = JSON.parse(localStorage.getItem("USER"));
// User: {"phone":"","username":""}
 document.getElementById("username").innerHTML = "Welcome @" + current_user["username"];





