/**
 * This file contains functions related to storing/retrieving responses
 * from the Firestore Database.
 */

/**
 * Saves a user response to a survey question into the
 * Firestore Database.
 *
 * @param answer A string indicating the user's selected or typed answer.
 *               Objects are also accepted in more complex scenarios.
 */
function saveResponse(answer) {
    // User responses are stored in
    // users/ [phone number/email] /responses
    let phone = currentUser.phoneNumber;
    let userID = phone === undefined ? currentUser.email : phone;
    let userBranch = `users/${userID}/responses`;

    // Formulating the response object
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // Writing a response object to the user branch
    let responseObject = {
        question_id: currentQuestionId,
        type: currentQuestionObject.type,
        question: currentQuestionObject.question,
        restrictions: currentQuestionObject.restrictions,
        set_id: currentSetId,
        answer: answer,
        timestamp: timestamp
    };

    if (isAnsweringSubQuestions()) {
        // For sub-questions
        // 1. Append the titleQuestion attribute which
        // stores the long question
        responseObject.titleQuestion = titleQuestionString;

        // 2. Change the question_id to the sub question's ID
        // (instead of the "title" question's
        responseObject.question_id = currentSubQuestionId;
    }

    // Add an auto-ID response entry to the user branch
    firebase.firestore().collection(userBranch).add(responseObject)
        .then((docRef) => {
            console.log("Response object written with ID: ", docRef.id);

            // After writing the response to the user branch, also
            // write it to the responses branch
            // (chatbot/survey_responses/question_id)

            let reducedResponseObject = {
                phone: userID,
                answer: answer,
                timestamp: timestamp
            };
            let responsesBranch = `chatbot/survey_responses/${currentQuestionId}`;

            firebase.firestore().collection(responsesBranch)
                .doc(docRef.id)
                // The response ID we got in the first store
                .set(reducedResponseObject)
                .then(() => {
                    console.log("Response written with ID: ", docRef.id,
                        " at survey_responses branch");
                })
                .catch((error) => {
                    console.error("Error writing response copy at" +
                        " survey_responses branch: ", error);
                });
        })
        .catch((error) => {
            console.error("Error writing response at " + userID +
                " branch: ", error);
        });
}