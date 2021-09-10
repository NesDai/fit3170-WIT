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
        usernameDisplay.innerHTML = "Hello, " + getUserObject['username'] + ". Select the skill you are interested to watch";
    }
}

// Function to store a user's current skill to the database
function storeCurrentSkill(id){
    let skill = document.getElementById(id);
    let skillTxt = [skill.value];
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);

    skillTxt = JSON.stringify(skillTxt);
    localStorage.setItem("preference", skillTxt);
    // userRef.update({ preferences: skillTxt });  // add or modify the preferences property to the user

    if (localStorage.getItem("playlist") != null){
        localStorage.removeItem("playlist");
        console.log("here")
    }

    setInterval(function(){
        location.href = "recommender_Ui.html";
    }, 500); // redirect to recommender page after 0.5 seconds
}

function goToRecommender(id){
    document.getElementById(id).checked = true;
    storeCurrentSkill(id);
}

checkCurrentUser();
