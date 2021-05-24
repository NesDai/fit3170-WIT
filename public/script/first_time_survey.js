// A list of IDs of question objects that are stored in
// the Firestore Database
const QUESTION_IDS = [
    "qC30vPwEsHpHnYvD9QXB",
    "DwWJ09e2O6HoJhG79tVC",
    "NQapG2Sza1k83AbogmnJ",
    "manHOQxof67bC8XJmIj7",
    "jbrg3JcjhHYbpvEHKzfL",
    "wy5SfvDs5rdUC27xMvOB",
    "bZdEsihZC2DIrWuAQq5h",
    "FSVOpGPeTgqtzcDyxdTR",
    "bYpaM02WbSUmRcxZRsyq",
    "1jYu9xdifnQ7llB1DHMB",
    "H71i9RHymtTuzhFZXCIy",
    "82RGqhLUvMVVNLWy9FW4",
    "rSlTouzaBKnCyAnIQR6v",
    "NwbXmR1GXjhLg4YxY92w",
    "tMpjXNl6AbI9WLaecgkN",
    "WE7Vi36RErNCOob1UHEl",
    // Part 1 question IDs above

    "TEOwiUE6GB7Iq1ES2V51",
    "voPtzLatVbFW0CPW7Nk1",
    "B8fOWT41S3rSNPW1PMR4",
    "rn2AyiT4vsTfbVZcunk2",
    "mougeniM918D5SuQfRch",
    "ggrHOs3vT3XjOtmgJEiS",
    "0osl0CmmauF3CrEARsfT",
    // Part 2 question IDs above

    "zRqZSkzNO47HcN603gf4",
    "u3IlB0pTPiGSBwUCsqiQ",
    // Part 3 question IDs above

    "CGTRT6raPn6VXTOIg6AW",
    "sZ6yqev0JxB3zF9ATqn4",
    "seaY5cG4KPn8JCFEodgE",
    "Tf4h3sSJUyUksVgjmk8S",
    // Part 4 question IDs above

    "lQ2uRyqYM9Q9SLBySwxR",
    "Za7YzeVKvK6EGAUqKKAb",
    "Y1K4EBPDvlC1zmDO0oEk",
    "KHr0k5h5soAEv9JXy8Pk",
    // Part 5 question IDs above
];

// Initializing variables
let messages = document.getElementById("messages");
let textBoxInput = document.getElementById("message");
let submit = document.getElementById("submit");
let input = document.getElementById("input-box");
let errorText = document.getElementById("error-text");
let hintIndex = 0;

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
let logDate = null;
let logAttempt = null;
let longQueId = null;
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
let currentSubQuestionId = null;
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

    setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);
}

/**
 * onclick function for option buttons.
 * @param button The option button
 */
function select(button) {
    let choice = button.textContent.trim();

    let ansTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + choice + '</p>\
                            </div>\
                        </div>';
    //<div class="message-container receiver">

    let space = button.parentElement;
    for (let i = 0; i < space.childNodes.length; i++) {
        space.childNodes[i].disabled = true;
    }

    messages.innerHTML += ansTemplate;

    saveResponse(choice);

    // Implement skip here
    let skipTarget = currentQuestionObject.restrictions.skipTarget;
    let skipChoices = currentQuestionObject.restrictions.skipChoices;
    if (skipTarget == SKIP_NOT_ALLOWED) {
        // Don't skip
        setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);
    } else if (skipTarget == SKIP_END_SURVEY) {
        if (skipChoices.includes(choice)) {
            endSurvey();
        } else {
            setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);
        }
    } else {
        // Skip to a question ID if the selected answer
        // is in skipChoices
        if (skipChoices.includes(choice)) {
            currentQuestionId = skipTarget;

            // Set the current question index to the question before the
            // skip target since nextQuestion increments
            // the question index by 1
            questionIndex = QUESTION_IDS.indexOf(skipTarget) - 1;

            // In case the user was answering a long question,
            // reset params related to long questions
            currentSubQuestionIds = null;
        }
        setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);
    }

    scrollToBottom();
}

/**
 * Adds the user response as a chat bot message
 */
function addMessage() {
    let message = input.value;

    // Saving the response before clearing the input box
    saveResponse(input.value);

    if (message.length > 0) {
        showMessageReceiver(message);
        input.value = "";
    }

    // Prevent users from using text box
    disableTextInput();

    setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);

    scrollToBottom();
}


/**
 * Increments the question counter by 1 and moves on to the next
 * question.
 */
function nextQuestion() {
    console.log("nextQuestion() is called.")

    if (currentQuestionObject === null) {
        // The user is answering its first survey question
        showQuestion(false);

    } else if (currentSubQuestionIds !== null) {
        // The user is answering sub-questions

        console.log("subquestionIndex is ", subQuestionIndex);

        if (subQuestionIndex === currentSubQuestionIds.length) {
            // If the user has completed answering sub-questions,
            // increment the questionIndex and move on
            currentSubQuestionIds = null;
            questionIndex++;
            showQuestion(false);
        } else {
            // If there are unanswered sub-questions left
            showQuestion(true);
            subQuestionIndex++;
        }

    } else if (questionIndex < QUESTION_IDS.length) {
        // The user is answering a normal question
        questionIndex++;
        showQuestion(false);

    } else {
        let endingMessage = "That's all the questions we have for you " +
            "right now. You can either continue asking questions, or" +
            " browse the rest of the application!"
        showMessageSenderWithoutHints(endingMessage);
        scrollToBottom();
    }
}

/**
 * Appends a message bubble to the chat bot containing
 * the specified message string.
 * @param message A message string
 */
function showMessageSender(message) {
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender'>" +
        `<p>${message}</p>` +
        `<button
         id = ${hintIndex}
         type="button" class="btn btn-light"
         style="margin-bottom: 1em; font-size:0.8rem;display: inline-block;" onclick='showHints(id);'>Hints
         </button>`+
        "<div style='display: inline-block;'>" +
        `<p id='hintTxt${hintIndex}'style='margin-left: 1em;'></p>` +
        "</div>" +
        "</div>" +
        "</div>";
    hintIndex++;
}

function showMessageReceiver(message) {
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container receiver'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>"
}

function showMessageSenderWithoutHints(message) {
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>";
}

function showAnswerLog(message) {
    logs.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container receiver'>" +
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
        `<button 
         id =${hintIndex}
         type="button" class="btn btn-light"
         style="margin-bottom: 1em; font-size:0.8rem;display: inline-block;" onclick='showHints(id);'>Hints
         </button>`+
        "<div style='display: inline-block;'>" +
        `<p id='hintTxt${hintIndex}'style='margin-left: 1em;'></p>` +
        "</div>" +
        "</div>" +
        "</div>";
    hintIndex++;
}

function scrollToBottom() {
    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);
}

function showQuestion(isSubQuestion) {
    // Get the ID of the current question
    let question_id = "";
    if (isSubQuestion) {
        currentSubQuestionId = currentSubQuestionIds[subQuestionIndex];
        question_id = currentSubQuestionId;
    } else {
        currentQuestionId = QUESTION_IDS[questionIndex];
        question_id = currentQuestionId;
    }
    console.log("Reading ", question_id);

    firebase.firestore().collection(QUESTIONS_BRANCH)
        .doc(question_id)
        .get()
        .then((docRef) => {
            let questionObject = docRef.data();
            let questionType = questionObject.type;

            console.log(questionObject);
            currentQuestionObject = questionObject;

            if (questionType == TYPE_NUMERIC || questionType == TYPE_NUMERIC_SUB_QUESTION) {
                showNumeric(questionObject);
            } else if (questionType == TYPE_MULTIPLE_CHOICE || questionType == TYPE_MULTIPLE_CHOICE_SUB_QUESTION) {
                showMultipleChoice(questionObject);
            } else if (questionType == TYPE_MULTIPLE_CHOICE_OTHERS) {
                showMultipleChoiceOthers(questionObject);
            } else if (questionType == TYPE_SHORT_TEXT) {
                showShortText(questionObject);
            } else if (questionType == TYPE_LONG_TEXT) {
                showLongText(questionObject);
            } else if (questionType == TYPE_LONG_QUESTION) {
                showLongQuestion(questionObject);
            } else {
                let errorLog = "[ERROR]Invalid question type supplied: " +
                    questionType +
                    "\nQuestion object: " +
                    questionObject;
                console.log(errorLog)
            }

            // Scroll the chat box window to the correct position
            scrollToBottom()
        });
}

function showNumeric(questionObject) {
    input.onkeyup = () => {
        let lowerRange = questionObject.restrictions.lowerRange;
        let upperRange = questionObject.restrictions.upperRange;
        let message = parseInt(input.value);

        // If it's a number
        if (!isNaN(message)) {
            // If there is no upper/lower range specified
            if (lowerRange != null && upperRange == null){
                upperRange = Number.POSITIVE_INFINITY;
            }

            else if (lowerRange == null && upperRange != null){
                lowerRange = Number.NEGATIVE_INFINITY;
            }

                // if number is in normal range
                if ((message >= lowerRange) && (message <= upperRange)) {
                    // If it's within range
                    errorText.style.visibility = "hidden";
                    submit.onclick = addMessage;
                } else {
                    // If it's out of range
                    errorText.style.visibility = "visible";
                    if (lowerRange !== Number.NEGATIVE_INFINITY && upperRange !== Number.POSITIVE_INFINITY) {
                        errorText.innerHTML = "number is not within the range of " + lowerRange + " - " + upperRange;
                    }

                    else if (lowerRange !==  Number.NEGATIVE_INFINITY && upperRange === Number.POSITIVE_INFINITY) {
                        errorText.innerHTML = "number is not greater than " + lowerRange;
                    }

                    else if (lowerRange === Number.NEGATIVE_INFINITY && lowerRange !== Number.POSITIVE_INFINITY) {
                        errorText.innerHTML = "number is not lesser than " + upperRange;
                    }

                    if (questionObject.restrictions.skipIfInvalid) {
                        submit.onclick = endSurveyText;
                    } else {
                        submit.onclick = repromptQuestion;
                    }
                }
            }
        else
            {
                // If it's not a number
                errorText.style.visibility = "visible";
                errorText.innerHTML = "the answer needs to be a number.";
                submit.onclick = repromptQuestion;
            }
        }

    showShortQuestionMessage(questionObject.question);
    enableTextInput();
}

function repromptQuestion() {
    // print error message onto chat
    let errorMessage = errorText.value;
    errorText.style.visibility = "hidden";
    showMessageSender(errorMessage);

    //getting type of question and the question itself
    let type = currentQuestionObject.type;
    let question = currentQuestionObject.question;

    // print out the question again onto chat
    showShortQuestionMessage(question);

    // print out multiple choice options if question reprompted is a MCQ
    if (type ===TYPE_MULTIPLE_CHOICE ||
        type === TYPE_MULTIPLE_CHOICE_OTHERS ||
        type === TYPE_MULTIPLE_CHOICE_SUB_QUESTION) {
        showOptions(currentQuestionObject.choices);
    }
}

function loadOptions(){
    var x = document.getElementById("Dropdown");
    x.options.length = 0;
    const collectionRef = firebase.firestore().collection(currentUser.email);
    collectionRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var option = document.createElement("option");
                option.text = doc.id;
                x.add(option);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}
function dates(){
    document.getElementById("Dropdown").classList.toggle("show");
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function selectdate(){
    var mylist = document.getElementById('Dropdown');
    const collectionRef = firebase.firestore().collection(currentUser.email).doc(mylist.options[mylist.selectedIndex].text);
    collectionRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data().set_id);
            if (document.contains(document.getElementById("attempt"))) {
                document.getElementById("attempt").remove();
                document.getElementById("label_id").remove();
            }
            var select = document.createElement("select");
            select.id = "attempt";
            select.class = "dropbtn";
            var label = document.createElement("label");
            label.id = "label_id";
            for (var i = 0;i<=doc.data().set_id;i++){
                var option = document.createElement("option");
                option.value = i+1;
                option.text = i+1;
                select.appendChild(option);
            }
            label.innerHTML = "Choose which attempt you'd like to view: "
            label.htmlFor = "attemptsection";

            document.getElementById("attemptsection").appendChild(label).appendChild(select);
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    logDate = mylist.options[mylist.selectedIndex].text;
}

function selectattempt(){
    var mylist = document.getElementById('attempt');
    logAttempt = mylist.options[mylist.selectedIndex].text;
    showlog();
}

function showlog(){
  const collectionRef = firebase.firestore().collection(currentUser.email).doc(logDate).collection('responses').orderBy('timestamp').where('set_id','==',parseInt(logAttempt-1));
      collectionRef.get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if(doc.data().longQuestionId!=null && doc.data().longQuestionId!=longQueId){
                longQueId = doc.data().longQuestionId;
                firebase.firestore().collection('chatbot').doc('survey_questions').collection('questions').doc(longQueId).get().then((doc) => {
                  console.log("long question:", doc.data().question);
                  showMessageReceiver(doc.data().question);
                }).catch((error) => {
                console.log("Error getting document:", error);
                });
              }
              console.log(doc.id, " => ", doc.data().question);
              showMessageReceiver(doc.data().question);
              showAnswerLog(doc.data().answer);
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
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
        hint: "select an option"
    };

    let question = questionObject.question;
    let choices = questionObject.restrictions.choices;

    showMessageSender(question);
    showOptions(choices);
}

function showMultipleChoiceOthers(questionObject) {
    let message = input.value;
    input.onkeydown = () => {
        if (message.length <= SHORT_TEXT_LENGTH) {
            // If it's not too long

            // TODO Spellcheck here

            errorText.style.visibility = "hidden";
            submit.onclick = addMessage;
        } else {
            // If it's super long
            errorText.style.visibility = "visible";

            submit.onclick = repromptQuestion;
        }

    }

    enableTextInput();

    let question = questionObject.question;
    let choices = questionObject.restrictions.choices;

    showMessageSender(question);
    showOptions(choices);
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

    showMessageSender(questionObject.question);

    // Initialize fields for looping over the sub-question IDs
    // array
    subQuestionIndex = 0;
    currentSubQuestionIds = questionObject.arrangement;
    nextQuestion();
}

function showShortText(questionObject) {
    let message = input.value;
    input.onkeydown = () => {
        if (message.length <= SHORT_TEXT_LENGTH) {
            // If it's not too long

            // TODO Spellcheck here

            errorText.style.visibility = "hidden";
            submit.onclick = addMessage;
        } else {
            // If it's super long
            errorText.style.visibility = "visible";

            submit.onclick = repromptQuestion;
        }

    }

    showShortQuestionMessage(questionObject.question);
    enableTextInput();
}

function showLongText(questionObject) {
    //TODO Do spellchecks here
    showShortText(questionObject);
}

function showOptions(choices) {
    let mcqOptions = "<div class=\"space\">"
    for (let choice of choices) {
        mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"select(this)\">" + choice + "</button>";
    }
    mcqOptions += "</div>";
    messages.innerHTML += mcqOptions;

    disableTextInput();
}

function showHints(hintId) {
    document.getElementById('hintTxt' + hintId).innerHTML = currentQuestionObject.hint;
    console.log('hintTxt' + hintId);
}

/**
 * Prevents users from using the input text box
 */
function disableTextInput() {
    submit.disabled = true;
    input.disabled = true;
}

/**
 * Enables users to use the input text box
 */
function enableTextInput() {
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
    let branch = `${phone}/${date}/responses`;

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

    if (isAnsweringSubQuestions()) {
        // For sub-questions
        // 1. Append the longQuestionId attribute
        // to the response object
        responseObject.longQuestionId = currentQuestionId;

        // 2. Change the question_id to the sub question's ID
        // (instead of the "title" question's
        responseObject.question_id = currentSubQuestionId;
    }

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
            let responseBranch = `chatbot/survey_responses/
                    ${currentQuestionId}`;

            firebase.firestore().collection(responseBranch)
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
            console.error("Error writing response at " + phone +
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

    // Formulating the response object

    // Retrieve the set id
    let reference = firebase.firestore().collection(phone).doc(date);

    reference.get().then((document) => {
        if (document.exists) {
            // If the data branch exists, that means this isn't the first
            // survey instance for the day.
            currentSetId = document.data().set_id + 1;

            // Increment the set_id at the Firestore Database by 1
            // Initialize set_id to 0 and write it to the database
            firebase.firestore().collection(phone).doc(date)
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
            firebase.firestore().collection(phone).doc(date)
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

/**
 * @return {boolean} true the user is currently answering
 * a sub-question, false otherwise
 */
function isAnsweringSubQuestions() {
    if (currentQuestionObject === null) {
        // The current question object is not set yet,
        // hence it is impossible for the user to be
        // answering a question
        return false;
    } else {
        // If the current question object is set,
        // the user is answering sub-questions if
        // the list of sub-question IDs is not null.
        return currentSubQuestionIds !== null;
    }
}

/**
 * Ends the survey
 */
function endSurvey() {
    questionIndex = QUESTION_IDS.length;
    nextQuestion();
}

/**
 * End Survey and display the user's response
 * in the chat bot window.
 * <br>
 * To be used by text-based survey questions ONLY
 */
function endSurveyText() {
    showMessageSender(input.value);
    questionIndex = QUESTION_IDS.length;
    errorText.style.visibility = "hidden";
    nextQuestion();
}

// Initialize only when firebase has b fully loaded
// Things get funky if I don't do this
window.onload = function () {
    initFirebaseAuth();
};
