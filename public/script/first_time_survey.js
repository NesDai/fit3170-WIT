// A list of IDs of question objects that are stored in
// the Firestore Database
const QUESTION_IDS = [
    "C9f4th8nrae1aEIuaMhm",
    "Ghqr6MDsWorZMWQXSxRC",
    "BEwvOa9ZJXIqRqoSw7o1",
    "IWOPNfyLjs88h5q3lug0",
    "3O2q4ttzWM2HFCtDT5W7",
    "r4ilV1VTFPc5CL7Ap6le",
    "w5hLv0EEepFvNMNFjgKv",
    "c6ytyVW7e8MQR5L8ozRA",
    "VKGObBUHAnmrphBLfzQ3",
    "HY02rtW9DJnK9qyaru0Z",
    "XoIdBzoYFFn4IP6xroZS",
    "e0luWBGAtjQYKE7gUo4C",
    "lOWvaTLShwpXMwN2nhOT",
    "NqYbjT5TNSqhQxuHzjJA",
    "NqYbjT5TNSqhQxuHzjJA",
    "bvwRYIEBvfS7GIRwrEpv",
    "bvwRYIEBvfS7GIRwrEpv",
    "yohRsGLmPtimXXWhi5F6",
    "e531ZREMMzKIJz3EFVIH",
    "ZqlrgA3T9rIlFKuHOskR",
    "2pLQA2fFpm1Wuj3iG6bK",
    // Part 1 question IDs above

    "kBQ2IeSF7osrMUnj8asD",
    "eMSvRnYMsQqahtrWrHeq",
    "i5UznKa4BBsuKcYjIUqa",
    "lGsZWCP0D9W8bT7k01hv",
    "06WOSoGwzcUzcNgOQuWx",
    "06WOSoGwzcUzcNgOQuWx",
    "b7J9dGwQt6QNMerO5TNS",
    // Part 2 question IDs above

    "aTA4BIGAGdlJ0CEHgKyx",
    "zZzBFJzChehqJi0kElnm",
    // Part 3 question IDs above

    "zZzBFJzChehqJi0kElnm",
    "mxHQ05XCOmRDhwtbWayL",
    "kFv1ra53xFmUR3CF7UgT",
    "tAcX1c9fNkzioDWiXoW1",
    // Part 4 question IDs above

    "OuQZ0TzivLgfJAZ0pBWy",
    "evBF2Bi2i6dbhBRKe0ZL",
    "lIDdWqTPgZ3SbFGbrpNG",
    "lIDdWqTPgZ3SbFGbrpNG"
    // Part 5 question IDs above
]

// Initializing variables
let messages = document.getElementById("messages");
let textBoxInput = document.getElementById("message");
let submit = document.getElementById("submit");
let input = document.getElementById("input-box");

/*
The user object of the currently logged in user
<br>
Can be used to retrieve details such as phone number
and user ID.
 */
let currentUser = null;

let currentQuestionId = null;
let currentQuestionObject = null;
let currentSetId = 0;

/*
Stores the index of the current question object
<br>
Used to retrieve the current question object's ID from
QUESTION_IDS
 */
let questionIndex = 0;

/*
Used when displaying sub-questions
 */
let subQuestionIndex = 0;
let currentSubQuestionIds = null;

// Runs as a first-time greeting from the bot
greeting();

function greeting() {
    let quesTemplate =
        "<div class='space'>" +
        "<div class='message-container sender'>" +
        "<p>Hi! I am the chatbot for this App.</p>" +
        "<p>To get started, I would like to get to know " +
        "you better by asking a few questions.</p>" +
        "</div>" +
        "</div>";

    setTimeout(() => {
        messages.innerHTML += quesTemplate;
    }, 750);

    scrollToBottom();

    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

/**
 * onclick function for option buttons.
 * @param button The option button
 */
function select(button) {
    let content = button.textContent.trim();

    let ansTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + content + '</p>\
                            </div>\
                        </div>';

    let space = button.parentElement;
    for (let i = 0; i < space.childNodes.length; i++) {
        space.childNodes[i].disabled = true;
    }

    messages.innerHTML += ansTemplate;

    setTimeout(() => {
        nextQuestion();
    }, 1000)

    saveResponse(content);
}

/**
 * Adds the user response as a chat bot message
 */
function addMessage() {
    let message = input.value;

    // Saving the response before clearing the input box
    saveResponse(input.value);

    if (message.length > 0) {
        let messageTemplate =
            "<div class='space'>" +
            "<div class='message-container receiver'>" +
            `<p>${message}</p>` +
            "</div>" +
            "</div>";

        messages.innerHTML += messageTemplate;
        input.value = "";
    }

    // Prevent users from using text box
    submit.disabled = true;
    input.disabled = true;

    scrollToBottom();

    setTimeout(() => {
        nextQuestion();
    }, 1000);

    let question_id = "";
}

/**
 * Increments the question counter by 1 and moves on to the next
 * question.
 */
function nextQuestion() {
    if (currentSubQuestionIds !== null) {
        // If the user is answering sub-questions
        if (subQuestionIndex === currentSubQuestionIds.length - 1) {
            // If the user has completed answering sub-questions,
            // increment the questionIndex and move on
            questionIndex++;
            currentSubQuestionIds = null;
            showQuestion(false);
        } else {
            showQuestion(true);
        }
    } else if (questionIndex < QUESTION_IDS.length - 1) {
        // If the user is answering normal questions
        showQuestion(false);
    } else {
        let endingMessage = "That's all the questions we have for you " +
            "right now. You can either continue asking questions, or" +
            " browse the rest of the application!"
        showMessage(endingMessage);
    }
}

/**
 * Appends a message bubble to the chat bot containing
 * the specified message string.
 * @param message A message string
 */
function showMessage(message) {
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>"
}

/**
 * Appends a message bubble to the chat bot containing
 * the specified question string with the prompt
 * "Please type your answer in the box below."
 * @param questionString The question string
 */
function showShortQuestionMessage(questionString) {
    document.getElementById("messages").innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender'>" +
        `<p>${questionString}</p>` +
        "<p>Please type your answer in the box below.</p>" +
        "</div>" +
        "</div>";
}

function scrollToBottom() {
    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);
}

function showQuestion(isSubQuestion) {
    // Get the ID of the current question
    if (isSubQuestion) {
        currentQuestionId = currentSubQuestionIds[subQuestionIndex];
    } else {
        currentQuestionId = QUESTION_IDS[questionIndex];
    }
    console.log("Reading ", currentQuestionId);

    firebase.firestore().collection(QUESTIONS_BRANCH)
        .doc(currentQuestionId)
        .get()
        .then((docRef) => {
            let questionObject = docRef.data();
            let questionType = questionObject.type;

            console.log(questionObject);
            currentQuestionObject = questionObject;

            switch (questionType) {
                case TYPE_NUMERIC:
                    showNumeric(questionObject);
                    break;
                case TYPE_MULTIPLE_CHOICE:
                    showMultipleChoice(questionObject);
                    break;
                case TYPE_MULTIPLE_CHOICE_OTHERS:
                    showMultipleChoiceOthers(questionObject);
                    break;
                case TYPE_SHORT_TEXT:
                    showShortText(questionObject);
                    break;
                case TYPE_LONG_TEXT:
                    showLongText(questionObject);
                    break;
                case TYPE_LONG_QUESTION:
                    showLongQuestion(questionObject);
                    break;
                default:
                    let errorLog = "[ERROR]Invalid question type supplied: " +
                        questionType +
                        "\nQuestion object: " +
                        questionObject;
                    console.log(errorLog)
            }

            // Scroll the chat box window to the correct position
            scrollToBottom()
        });

    if (isSubQuestion) {
        subQuestionIndex++;
    } else {
        questionIndex++;
    }
}

function showNumeric(questionObject) {
    //TODO To be implemented
    showShortText(questionObject);
}

function showMultipleChoice(questionObject) {
    // Leaving these here as references to multiple choice
    // question objects.
    let reference = {
        question_number: "1.2",
        category: "Part I: About yourself",
        type: "multiple-choice",
        question: "What is your gender?",
        restrictions: {
            choices: ["Male", "Female"],
            skipChoice: ["Male"],
            skipTarget: "end_survey"
        },
        hint: "placeholder"
    };

    let question = questionObject.question;
    let choices = questionObject.restrictions.choices;

    // TODO Implement validation checks and skip logic

    showMessage(question);
    showOptions(choices);
}

function showMultipleChoiceOthers(questionObject) {
    //TODO To be implemented
    showMultipleChoice(questionObject);
}

function showLongQuestion(questionObject) {
    // Leaving this here as a reference to long questions
    // (questions with sub-questions)
    let reference = {
        question_number: "4.3",
        category: "Part IV: About your learning interest",
        type: "long-question",
        question: "How interested are you to learn the following skills" +
            "using a mobile phone ? (Rate from 1 to 7)" +
            "[1] extremely not interested, [2] very not interested, " +
            "[3] not interested," +
            "[4] moderately interested, [5] highly interested, " +
            "[6] very interested," +
            "[7] extremely interested",
        restrictions: {},
        hint: "placeholder",
        arrangement: []
    };

    showMessage(questionObject.question);

    // Initialize fields for looping over the sub-question IDs
    // array
    subQuestionIndex = 0;
    currentSubQuestionIds = questionObject.arrangement;
    showQuestion(true);
}

function showShortText(questionObject) {
    let question = questionObject.question;

    // TODO Implement validation

    showShortQuestionMessage(questionObject.question);
    enableTextBox();
}

function showLongText(questionObject) {
    //TODO To be implemented
    showShortText(questionObject);
}

function showOptions(choices) {
    let mcqOptions = "<div class=\"space\">"
    for (let choice of choices) {
        mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"select(this)\">" + choice + "</button>";
    }
    mcqOptions += "</div>";
    messages.innerHTML += mcqOptions;

    disableTextBox();
}

/**
 * Prevents users from using the input text box
 */
function disableTextBox() {
    submit.disabled = true;
    input.disabled = true;
}

/**
 * Enables users to use the input text box
 */
function enableTextBox() {
    submit.disabled = false;
    input.disabled = false;
}

/**
 * Listen for changes in the firebase auth system
 * and initializes the user object.
 */
function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(() => {
        // Initialize current user object
        currentUser = firebase.auth().currentUser;
        initSetId();
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
    // Formulating the branch
    // TODO Change this back to
    //  let phone = currentUser.phoneNumber;
    //  when it's time to ship
    let phone = currentUser.email;
    let today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let userBranch = `chatbot/survey_responses/${phone}`;
    let branch = `${userBranch}/${date}/responses`;

    // Formulating the response object

    let timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // Writing a response object to survey_responses
    let responseObject = {
        question_id: currentQuestionId,
        type: currentQuestionObject.type,
        question: currentQuestionObject.question,
        restrictions: currentQuestionObject.restrictions,
        set_id: currentSetId,
        answer: answer,
        timestamp: timestamp
    };

    // Add an auto-ID response entry to the data branch
    firebase.firestore().collection(branch).add(responseObject)
        .then((docRef) => {
            console.log("Response object written with ID: ", docRef.id);

            // After writing the response to survey_responses, also
            // write it to survey_questions/question_id
            let reducedResponseObject = {
                phone: phone,
                data: date,
                answer: answer,
                timestamp: timestamp
            };
            let responseBranch = `chatbot/survey_questions/questions/
                    ${currentQuestionId}/responses`

            firebase.firestore().collection(responseBranch)
                .doc(docRef.id)
                // The response ID we got in the first store
                .set(reducedResponseObject)
                .then(() => {
                    console.log("Response written with ID: ", docRef.id,
                        " at survey_questions branch");
                })
                .catch((error) => {
                    console.error("Error writing response copy at" +
                        " survey_questions branch: ", error);
                });
        })
        .catch((error) => {
            console.error("Error writing response at survey_responses" +
                " branch: ", error);
        });
}

function initSetId() {
    // Formulating the branch
    // TODO Change this back to
    //  let phone = currentUser.phoneNumber;
    //  when it's time to ship
    let phone = currentUser.email;
    let today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let userBranch = `chatbot/survey_responses/${phone}`;

    // Formulating the response object

    // Retrieve the set id
    let reference = firebase.firestore().collection(userBranch).doc(date);

    reference.get().then((document) => {
        if (document.exists) {
            // If the data branch exists, that means this isn't the first
            // survey instance for the day.
            currentSetId = document.data().set_id + 1;

            // Increment the set_id at the Firestore Database by 1
            // Initialize set_id to 0 and write it to the database
            firebase.firestore().collection(userBranch).doc(date)
                .set({set_id: currentSetId})
                .then(() => {
                    console.log("Document written with ID: ", date);
                })
                .catch((error) => {
                    console.error("Error writing content: ", error);
                });
        } else {
            // The user is taking the survey for the first time
            // at this moment.

            // doc.data() will be undefined in this case
            console.log("No such document!");

            // If the document doesn't exist, it means that this
            // is the first surevy instance for the day.

            // Initialize set_id to 0 and write it to the database
            firebase.firestore().collection(userBranch).doc(date)
                .set({set_id: 0})
                .then(() => {
                    console.log("Document written with ID: ", date);
                })
                .catch((error) => {
                    console.error("Error writing content: ", error);
                });
        }
    });
}

// Initialize only when firebase has been fully loaded
// Things get funky if I don't do this
window.onload = function () {
    initFirebaseAuth();
}