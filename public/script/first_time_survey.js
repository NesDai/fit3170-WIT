// Initialising variables
let messages = document.getElementById('messages');
let textboxInput = document.getElementById('message');
let submit = document.getElementById('submit');
let input = document.getElementById('input-box');


// to ask open ended questions
let sampleQuestions = [{
    question: "Sample MCQ 1",
    option: ["Answer 1", "Answer 2", "Answer 3"],
    mcq: true
},
    {
        question: "Sample MCQ 2",
        option: ["Answer 4", "Answer 5", "Answer 6"],
        mcq: true
    },
    {
        question: "Sample Open Question 1",
        option: [],
        mcq: false
    },
    {
        question: "Sample Open Question 2",
        option: [],
        mcq: false
    }]
let currentQuestion = 0;


// Runs as a first-time greeting from the bot
function greeting() {
    let quesTemplate = '<div class="space">\
                              <div class="message-container sender">\
                                  <p>Hi! I am the chatbot for this App.</p>\
                                  <p>To get started, I would like to get to know you better by asking a few questions.</p>\
                              </div>\
                          </div>';

    setTimeout(() => {
        messages.innerHTML += quesTemplate;
    }, 750);

    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);

    setTimeout(function () {
        nextQues();
    }, 1500);
}


// onclick function for option buttons
function choose(button) {
    let content = button.textContent.trim()

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

    setTimeout(function () {
        nextQues();
    }, 1000);
}


// Adds the answer as a message
function addMessage() {
    let message = input.value;

    if (message.length > 0) {
        let messageTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + message + '</p>\
                            </div>\
                        </div>';

        messages.innerHTML += messageTemplate;
        input.value = "";
    }

    // prevent users from using textbox
    submit.disabled = true;
    input.disabled = true;

    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);

    // TODO: Code for writing to database 
    //   ...

    setTimeout(function () {
        nextQues();
    }, 1000);
}


// functions that ask open ended questions iteratively
function nextQues() {
    if (currentQuestion < sampleQuestions.length) {
        // if it is an open ended questions
        if (sampleQuestions[currentQuestion].mcq == false) {
            messages.innerHTML += '<div class="space">\
                                        <div class="message-container sender">\
                                            <p>' + sampleQuestions[currentQuestion].question + '</p>\
                                            <p>Please type your answer in the box below.</p>\
                                        </div>\
                                    </div>';

            // enable users to use textbox
            submit.disabled = false;
            input.disabled = false;
        }
        // if it is a MCQ
        else {
            messages.innerHTML += '<div class="space">\
                                        <div class="message-container sender">\
                                            <p>' + sampleQuestions[currentQuestion].question + '</p>\
                                        </div>\
                                    </div>';

            let mcqOptions = "<div class=\"space\">"
            for (i = 0; i < sampleQuestions[currentQuestion].option.length; i++) {
                mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"choose(this)\">" + sampleQuestions[currentQuestion].option[i] + "</button>"
            }
            mcqOptions += "</div>"

            messages.innerHTML += mcqOptions;

            // prevent users from using textbox
            submit.disabled = true;
            input.disabled = true;
        }
        currentQuestion += 1;
    } else {
        messages.innerHTML += '<div class="space">\
        <div class="message-container sender">\
            <p>That\'s all the questions we have for you right now. You can either continue asking questions, or browse the rest of the application!</p>\
        </div>\
        </div>';
    }

    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);

    // TODO: Code for writing to database 
    //   ...
}


// When the page loads
greeting()

/**
 * Saves a user response to a survey question to the
 * Firestore Database.
 *
 * @param question_id The question's id (AKA its document ID)
 * @param question A question object (AKA the document object itself)
 * @param answer A string indicating the user's selected or typed answer.
 *               Objects are also accepted in more complex scenarios.
 */
function saveResponse(question_id, question, answer) {
    // Formulating the branch
    let phone = currentUser.phoneNumber;
    let today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let userBranch = `chatbot/survey_responses/${phone}`;
    let branch = `${userBranch}/${date}/responses`;

    // Formulating the response object

    // Retrieve the set id
    let reference = firebase.firestore().collection(userBranch).doc(date);

    reference.get().then((document) => {
        if (document.exists) {
            // If the date branch exists, that means this isn't the first
            // survey instance for the day
            let timestamp = firebase.firestore.FieldValue.serverTimestamp();

            // Writing a response object to survey_responses
            let responseObject = {
                question_id: question_id,
                type: question.type,
                question: question.question,
                restrictions: question.restrictions,
                set_id: document.data().set_id,
                answer: answer,
                timestamp: timestamp
            };

            // Add an auto-ID response entry to the date branch
            firebase.firestore().collection(branch).add(responseObject)
                .then((docRef) => {
                    console.log("Response object written with ID: ", docRef.id);

                    // After writing the response to survey_responses, also
                    // write it to survey_questions/question_id
                    let reducedResponseObject = {
                        phone: phone,
                        date: date,
                        answer: answer,
                        timestamp: timestamp
                    };
                    let responsesBranch =
                        `chatbot/survey_questions/questions/${question_id}/responses`

                    firebase.firestore().collection(responsesBranch)
                        .doc(docRef.id) // The response ID we got in the first store
                        .set(reducedResponseObject)
                        .then(() => {
                            console.log("Response written with ID: ", docRef.id,
                                " at survey_questions branch.");
                        })
                        .catch((error) => {
                            console.error("Error writing response copy at" +
                                "survey_questions branch: ", error);
                        });
                })
                .catch((error) => {
                    console.error("Error writing reponse at survey_responses " +
                        "branch: ", error);
                });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");

            // If the document doesn't exist, it means that this
            // is the first survey instance for the day.

            // Initialize set_id to 0 and write it to the database
            db.collection(date).doc(id).set({set_id: 0})
                .then(() => {
                    console.log("Document written with ID: ", id);
                    documentID = id;
                    if (then !== null)
                        then(documentID);
                })
                .catch((error) => {
                    console.error("Error writing content: ", error);
                });
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

/**
 * Listen for changes in the firebase auth system
 * and initialize the  user object.
 */
function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(() => {
        // Initialize current user object
        currentUser = firebase.auth().currentUser;
    });
}

let currentUser = null;

// Initialize only when firebase has been fully loaded
// Things get funky if I don't do this
window.onload = function () {
    initFirebaseAuth();
}