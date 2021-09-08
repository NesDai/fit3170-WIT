//References
let checkbox = document.getElementById("checkbox")
let tick_warning = document.getElementById("tick-warning")
let tick_line = document.getElementById("tick-warning-line")
let content_box = document.getElementById("content-box")
let confirmButtonRef = document.getElementById("confirmButton")

// add event listener for when confirm button is clicked
confirmButtonRef.addEventListener("click", checkAccepted);

// function to check if user has clicked the checkbox before letting them continue to chatbot page
function checkAccepted(){
    // if it is checked, update user's realtime database data that they accept the terms and condition
    if (checkbox.checked){
        /*// initialise username and phone
        let username
        let phone = current_us.phone

        // check if user's phone number exist in database
        firebase.database().ref(`users/${phone}`).once("value", snapshot => {
            if (snapshot.exists()){
                // get user's username from database and asign it to username
                username = snapshot.val().username;

                //update user's data in database with termsAndConditionsAccepted as true
                let updates = {};
                updates['/termsAndConditionsAccepted'] = true

                firebase.database().ref(`users/${phone}`).update(updates)
                window.location.href = "./chatbot.html"
            }
        })*/
        window.location.href = "./chatbot.html"
    } else {
        // if the tickbox is not ticked, display error message
        tick_warning.hidden = false
        tick_line.hidden = false
    }
}

window.onload = function(){
    // initialise firestore reference to terms and conditions and content
    let TermsAndConditionRef = firebase.firestore().collection("ExplanatoryStatement").doc("ExplanatoryStatement_en_short");
    let content;

    // checks if the collection exists then displays T&C else upload the T&C and then display it.
    TermsAndConditionRef.get().then((doc) => {
        if (doc.exists) {
            content =  doc.data();
            content_box.innerHTML = content.contents;
        } else {
            // doc.data() will be undefined in this case
            uploadTermsAndConditions_en_short();
            TermsAndConditionRef.get().then((doc) => {
                content =  doc.data();
                content_box.innerHTML = content.contents;
            });
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}