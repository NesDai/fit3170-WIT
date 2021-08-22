/**
 * This file contains functions related to storing/retrieving responses
 * from the Firestore Database.
 */

/**
 * Stores the local question index to the cloud
 */
function updateQuestionIndex() {
    // Store the current questionIndex value to the database
    firebase.firestore().collection(USERS_BRANCH).doc(getUserID())
        .set({questionIndex: questionIndex + 1})
        .then(() => {
            console.log(
                `questionIndex set to ${questionIndex} ` +
                `at 'users/${getUserID()}'`
            );
        })
        .catch((error) => {
            console.error("Error while storing question index: " +
                `'users/${getUserID()}'`);
        });
}

/**
 * Saves a user response to a survey question into the
 * Firestore Database.
 *
 * @param answer A string indicating the user's selected or typed answer.
 *               Objects are also accepted in more complex scenarios.
 */
function saveResponse(answer) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()

    // Formulating the response object for the user responses branch
    let responseObject = {
        question_id: currentQuestionId,
        type: currentQuestionObject.type,
        question: currentQuestionObject.question,
        restrictions: currentQuestionObject.restrictions,
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

    // Update the questionIndex on the cloud with the local one
    updateQuestionIndex();

    // Add an auto-ID response entry to the user branch
    firebase.firestore().collection(getUserResponsesBranch())
        .add(responseObject)
        .then((docRef) => {
            console.log("Response object written with ID: ", docRef.id);

            // After writing the response to the user branch, also
            // write it to the responses branch
            // (chatbot/survey_responses/question_id)

            let reducedResponseObject = {
                phone: getUserID(),
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
            console.error("Error writing response at " + getUserID() +
                " branch: ", error);
        });
}

function getUserID() {
    let phone = currentUser.phoneNumber;
    return phone === undefined ? currentUser.email : phone;
}

function getUserResponsesBranch() {
    // User responses are stored in
    // users/ [phone number/email] /responses
    return `users/${getUserID()}/responses`;
}

/**
 * Deletes all survey responses of the current user
 */
function purgeUserResponses() {
    let db = firebase.firestore();

    db.collection(getUserResponsesBranch()).get().then(responses => {
        responses.forEach(response => {
            // Get the ID of each response and delete it manually
            db.collection(getUserResponsesBranch()).doc(response.id)
                .delete()
                .catch((error) => {
                    console.error("Error removing response: ", error);
                });
        });

    });
}