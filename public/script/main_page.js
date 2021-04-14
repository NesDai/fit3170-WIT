let user = JSON.parse(localStorage.getItem("USER"));
// User: {"phone":"","username":""}
//I will concatenate with the string for now because I dont know css stuff much 
document.getElementById("username").innerHTML = "Hey @" + user["username"];




