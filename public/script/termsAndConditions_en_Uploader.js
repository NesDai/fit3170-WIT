/*
* This file is dedicated to uploading the english version of the terms and conditions onto the firestore
* */

export function uploadTermsAndConditions_en(){
    let contents = ""

    firebase.firestore().collection("Terms&Conditions").doc("T&C_en").set({
        contents: contents
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}