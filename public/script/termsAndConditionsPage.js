import { uploadTermsAndConditions_en } from "./termsAndConditions_en_Uploader.js";

let checkbox = document.getElementById("checkbox")
let tick_warning = document.getElementById("tick-warning")
let tick_line = document.getElementById("tick-warning-line")
let content_box = document.getElementById("content-box")

function checkAccepted(){
    if (checkbox.checked){
        window.location.href = "./chatbot.html"
    } else {
        tick_warning.hidden = false
        tick_line.hidden = false
    }
}

let TermsAndConditionRef = firebase.firestore().collection("Terms&Conditions").doc("T&C_en");
let content;

TermsAndConditionRef.get().then((doc) => {
    if (doc.exists) {
        content =  doc.data();
        content_box.innerHTML = content.contents;
    } else {
        // doc.data() will be undefined in this case
        uploadTermsAndConditions_en();
        TermsAndConditionRef.get().then((doc) => {
            content =  doc.data();
            content_box.innerHTML = content.contents;
        });
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

content_box.innerHTML = content.contents;
console.log("content is " + typeof content.contents);