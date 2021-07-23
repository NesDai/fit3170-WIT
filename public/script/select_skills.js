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

// Function to show/hide the images in the skills list 
function toggleImageVisibility(){
    var elements = document.getElementsByClassName('interests');
    for(var i = 0; i < elements.length; ++i){
        var s = elements[i].style;
        s.display = s.display === 'none' ? 'inline-block' : 'none';
        //s.visibility = s.visibility === 'hidden' ? 'visible' : 'hidden';
        //s.opacity = s.opacity === '0' ? '1' : '0';
        
    };


}

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

// Function to add or remove skills when the user selects a checkbox on the page
function addOrDeleteSkills(id){
    let element = document.getElementById(id);
    let elementTxt = element.value;
    //console.log(elementTxt);
    
    if(!skillList.includes(elementTxt)){  // prevent duplicate
        skillList.push(elementTxt);
    }
    else if(skillList.includes(elementTxt) && !element.checked){  // see if in the list and if the box is unchecked
        let index = skillList.indexOf(elementTxt);
        skillList.splice(index, 1);
    }

    console.log(skillList);

}

// Function to check and confirm users' choices
function confirmSkills(){
    if(skillList.length === 0){
        alert("No skills were selected");
    }
    else{
        if(confirm("Confirm selected skills?")){
            storeSkills();

            setInterval(function(){ 
                goToRecommender();
            }, 2000); // redirect to recommender page after 2 seconds

            
            alert("Selection noted");
        }
        else{
            alert("Action cancelled");
        }
    }

}

// Function to store a user's preferences (skills) to the database
function storeSkills(){
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);

    userRef.update({ preferences: skillList });  // add or modify the preferences property to the user
}

// Function to check if the user already selected skills 
function checkForSkills(){
    let stringPath = "users/" + phoneNum;
    firebase.database().ref(stringPath + "/preferences").once('value').then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            document.getElementById("returnBtn").style.display = "block";
            /*let header = document.getElementById("defaultHeader");
            let outputHeader = "";

            outputHeader += "<div class=\"mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid\">"
            outputHeader += "<button onclick=\"location.href = 'recommenderUi.html';\" class=\"mdl-layout-icon mdl-button mdl-js-button mdl-button--icon\"><i class=\"material-icons\">arrow_back</i></button>";
            outputHeader += "<div class=\"mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop\"><h3>Recommender</h3></div>"
            outputHeader += "</div>";

            header.innerHTML = outputHeader;*/


        } 
        else {
            console.log("No data available");
            
        }
    }).catch((error) => {
        console.error(error);
    });
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
checkForSkills();
