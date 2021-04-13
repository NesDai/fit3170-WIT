let user = JSON.parse(localStorage.getItem("USER"));
// User: {"phone":"","username":""}
document.getElementById("username").innerHTML = user["username"];



