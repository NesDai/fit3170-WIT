let skillList = [];
let phoneNum = "";

// Function to open the content (skills list) under each interest 
function openInterest(event, interest) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(interest).style.display = "block";
    event.currentTarget.className += " active";
    
}
  
document.getElementById("defaultOpen").click();  // get the element with id="defaultOpen" and click on it

// Function to check for the user's details in local storage
function checkCurrentUser(){
    let getUser = localStorage.getItem("USER");
    let getUserObject = JSON.parse(getUser);

    if(getUserObject === null){
        console.log("Nothing in local storage");
    }
    else{
        phoneNum = getUserObject['phone'];
        console.log(phoneNum);

        // Display the username on the page
        let usernameDisplay = document.getElementById('username');
        usernameDisplay.innerHTML = "Hello, " + getUserObject['username'] + ". Select the skills you are interested in";
    }
}

// Function to store a user's current skill to the database
function storeCurrentSkill(id){
    let skill = document.getElementById(id);
    let skillTxt = skill.value;
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);

    userRef.update({ preferences: skillTxt });  // add or modify the preferences property to the user
}

function goToRecommender(id){
    storeCurrentSkill(id)
    if (localStorage.getItem("playlist") != null){
        localStorage.removeItem("playlist");
    }

    setInterval(function(){ 
        location.href = "recommenderUi.html";
    }, 1000); // redirect to recommender page after 2 seconds
    
}

checkCurrentUser();
