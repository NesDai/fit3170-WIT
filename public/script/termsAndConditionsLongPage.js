//References
let content_box = document.getElementById("content-box")

// initialise firestore reference to terms and conditions and content
let TermsAndConditionRef = firebase.firestore().collection("Terms&Conditions").doc("T&C_en_long");
let content;

// checks if the collection exists then displays T&C else upload the T&C and then display it.
TermsAndConditionRef.get().then((doc) => {
    if (doc.exists) {
        content =  doc.data();
        content_box.innerHTML = content.contents;
    } else {
        // doc.data() will be undefined in this case
        uploadTermsAndConditions_en_long();
        TermsAndConditionRef.get().then((doc) => {
            content =  doc.data();
            content_box.innerHTML = content.contents;
        });
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});