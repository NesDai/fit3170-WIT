// import uploadTermsOfUse_en() function from termsOfUse_en_Uploader.js
import { uploadTermsOfUse_en } from "./termsOfUse_en_Uploader.js";

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
    // if it is checked, update user's realtime database data that they accept the terms of use
    if (checkbox.checked){
        // initialise username and phone
        let username
        let phone = current_us.phone

        // check if user's phone number exist in database
        firebase.database().ref(`users/${phone}`).once("value", snapshot => {
            if (snapshot.exists()){
                // get user's username from database and asign it to username
                username = snapshot.val().username;

                //update user's data in database with termsOfUseAccepted as true
                let updates = {};
                updates['/termsOfUseAccepted'] = true;

                firebase.database().ref(`users/${phone}`).update(updates);
            }
        })

        //check if termsOfUseAccepted is there before sending them to chatbot page
        firebase.database().ref(`users/${phone}`).once("value", snapshot => {
            if (snapshot.exists()){
                if (snapshot.val().termsOfUseAccepted) {
                    window.location.href = "./main_page.html"
                }
            } else {
                console.log("Terms of Use Accepted field not updated on user's info in database")
            }
        })

    } else {
        // if the tickbox is not ticked, display error message
        tick_warning.hidden = false
        tick_line.hidden = false
    }
}

// initialise firestore reference to terms of use and content
let TermsOfUseRef = firebase.firestore().collection("TermsOfUse").doc("TermsOfUse_en");
let content;

// checks if the collection exists then displays T&C else upload the T&C and then display it.
TermsOfUseRef.get().then((doc) => {
    if (doc.exists) {
        content =  doc.data();
        content_box.innerHTML = content.contents;
    } else {
        // doc.data() will be undefined in this case
        uploadTermsOfUse_en();
        TermsOfUseRef.get().then((doc) => {
            content =  doc.data();
            content_box.innerHTML = content.contents;
        });
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});