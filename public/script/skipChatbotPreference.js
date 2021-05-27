let preferenceList = [];
let phoneNum = "";

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
        usernameDisplay.innerHTML = "<h4>"+ "Hello, " + getUserObject['username']+"</h4>";
    }
}

// Function to add or remove preferences when the user selects a checkbox on the page
function addOrDeletePreferences(id){
    let element = document.getElementById(id);
    let elementTxt = element.value;
    //console.log(elementTxt);
    
    if(!preferenceList.includes(elementTxt)){  // prevent duplicate
        preferenceList.push(elementTxt);
    }
    else if(preferenceList.includes(elementTxt) && !element.checked){  // see if in the list and if the box is unchecked
        let index = preferenceList.indexOf(elementTxt);
        preferenceList.splice(index, 1);
    }

}

// Function to check and confirm users' choices
function confirmPreference(){
    if(preferenceList.length === 0){
        alert("No topics were selected");
    }
    else{
        if(confirm("Confirm selected topics?")){
            storePreferences();

            setInterval(function(){ 
                goToRecommender();
            }, 2000); // redirect to recommender page after 2 seconds

            
            alert("Preferences noted");
        }
        else{
            alert("Action cancelled");
        }
    }

}

// Function to store a user's preferences to the database
function storePreferences(){
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);

    userRef.update({ preferences: preferenceList });  // add or modify the preferences property to the user
}

function goToSkipChatbotPref(){
    location.href = "skipChatbotPrefUi.html";   // redirect to preferences page
}

function goToRecommender(){
    if (localStorage.getItem("playlist") != null){
        localStorage.removeItem("playlist");
    }

    location.href = "recommenderUi.html"; // redirect to recommender page
}

checkCurrentUser();
