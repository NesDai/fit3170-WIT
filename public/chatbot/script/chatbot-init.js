/**
 * This file contains functions that initialize the chatbot
 * when the page is loaded.
 *
 * Current order of execution
 * 1. initFirebaseAuth
 * 2. initQuestionIndex
 * 3. initChatbot
 */

initFirebaseAuth();

/**
 * Listen for changes in the firebase auth system
 * and initializes the user object.
 */
function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(() => {
        // Initialize current user object
        currentUser = firebase.auth().currentUser;
        initQuestionIndex().then(() => {
            initChatbot();
        })
    });
}

/**
 * Synchronizes the local questionIndex value with the one
 * on the firestore database. Alternatively, initialize
 * the user branch on the firestore database.
 * @returns {PromiseLike<any> | Promise<any>}
 */
function initQuestionIndex() {
    // The question index should be stored in
    // users/ [phone number/email] /questionIndex
    let phone = currentUser.phoneNumber;
    let userID = phone === undefined ? currentUser.email : phone;

    // Formulating the response object

    // Retrieve the question index
    let reference = firebase.firestore().collection(USERS_BRANCH)
        .doc(userID);
    return reference.get().then((document) => {
        if (document.exists) {
            // If the branch exists, that means the user has visited
            // the chat bot page at least once

            // Synchronize the question index and leave the other functions
            // to do the rest
            questionIndex = document.data().questionIndex;
        } else {
            // The user is visiting the chat bot page for the
            // first time

            // document.data() will be undefined in this case
            console.log("User branch not found, initializing...");

            // Initialize questionIndex to 0 and write it to the database
            firebase.firestore().collection(USERS_BRANCH)
                .doc(userID)
                .set({questionIndex: NO_QUESTIONS_DONE})
                .then(() => {
                    console.log(`Branch 'users/${userID}' created`);
                    console.log(`questionIndex set to ${NO_QUESTIONS_DONE}`)
                })
                .catch((error) => {
                    console.error("Error while initializing user branch " +
                        `'users/${userID}'`);
                });
        }
    })

}

/**
 * Initializes the chat bot based on the user's previous
 * survey instance.
 */
function initChatbot() {
    if (questionIndex === NO_QUESTIONS_DONE) {
        // Survey has not been started yet
        greeting();
    } else {
        // Survey has been left off halfway
        resumeGreeting();

        // TODO Load the previous questions/responses

        if (questionIndex === LAST_QUESTION_DONE) {
            // Survey has been completed
            showEndingMessage();
        }
    }

}

/**
 * Greet the user and offer options to resume or restart
 * the survey.
 */
function resumeGreeting() {
    let contents = "";

    // Welcome message
    contents +=
        "<div class='space'>" +
        "<div class='message-container sender blue'>" +
        "<p>Hi! I am the chatbot for this App.</p>" +
        "<p>Please select \"Resume\" to resume your " +
        "previous survey instance or \"Restart\" to start over.</p>" +
        "</div>" +
        "</div>";

    // Buttons (options)
    contents +=
        "<div class=\"space\">" +
            "<button class=\"mdl-button mdl-js-button " +
            "mdl-button--raised mdl-js-ripple-effect\" " +
            "onclick=\"startSurvey(this)\">" +
            "Resume" +
            "</button>" +

            "<button class=\"mdl-button mdl-js-button " +
            "mdl-button--raised mdl-js-ripple-effect\" " +
            "onclick=\"startSurvey(this)\">" +
            "Restart" +
            "</button>" +
        "</div>";


    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    setTimeout(() => messages.innerHTML += contents, delay);
    disableTextInput();
}

/**
 * function to initialise starting messages in chat and create "start survey" button.
 */
function greeting() {
    // format starting message html
    let quesTemplate =
        "<div class='space'>" +
        "<div class='message-container sender blue'>" +
        "<p>Hi! I am the chatbot for this App.</p>" +
        "<p>To get started, I would like to get to know " +
        "you better by asking a few questions. Are you ready?</p>" +
        "</div>" +
        "</div>";

    // format start survey button html
    let mcqOptions = "<div class=\"space\">"
    mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"startSurvey(this)\">Start Survey</button>";
    mcqOptions += "</div>";

    // set time out to display the message and start survey button
    setTimeout(() => {
        messages.innerHTML += quesTemplate;
        messages.innerHTML += mcqOptions;
    }, 750);

    // disable textbox
    disableTextInput();
}

/**
 * 1. Displays the user's choice as a message bubble
 * 2. Disables the option buttons
 * 3. Starts the survey
 */
function startSurvey(button) {
    // Display the choice as a message bubble
    let choice = button.textContent.trim();
    messages.innerHTML += '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + choice + '</p>\
                            </div>\
                        </div>';

    if (choice === "Restart") {
        // Reset the local question index and update the
        // question index stored in the cloud
        questionIndex = 0;
        updateQuestionIndex();
    }

    // Disable all option buttons of the parent div
    let space = button.parentElement;
    for (let i = 0; i < space.childNodes.length; i++) {
        space.childNodes[i].disabled = true;
    }

    scrollToBottom();

    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    setTimeout(() => nextQuestion(), delay);
}