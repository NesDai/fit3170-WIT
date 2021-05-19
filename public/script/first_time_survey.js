// A list of IDs of question objects that are stored in
// the Firestore Database
const QUESTION_IDS = [
    "ItW6JWwpxBv2nU0dizml",
    "4K8V3ELQMQJyFFL1YAT3",
    "0AC6MojrBMGJz2n4pegY",
    "SRFwGKiJLW0Nqm7Knkj7",
    "jr15BRqvEJ0gBZmayyDC",
    "l9sQvBZRfjHXM3hMoJNu",
    "fyOIsVCYtJw61VrcZaYb",
    "EdqLD0ch162DQZZE8bHq",
    "pDVLNgZKwrdSf7Zf0h9c",
    "VpnnDjAL8LwCpTPjc4dg",
    "byZuJ7VGpdmhb8j9lbE2",
    "fFsp2re5lPTgQjSc8pzp",
    "uH7lDlp6pBCuCOmZ33vK",
    "akXmWdJuMNopCkd95jrg",
    "akXmWdJuMNopCkd95jrg",
    "i5iWZuChcZJ5cpAzNayV",
    "i5iWZuChcZJ5cpAzNayV",
    "3vL9sJMUCStR2tuYJyDa",
    "kBGScaMKAPgOtDuuXoC7",
    "ShOpmIgv54TR99jkyXVb",
    "p0rWCI1nMhYg21mB5Tjv",
    // Part 1 question IDs above

    "doO7xI7GfsXS9MCZAo7b",
    "X6B9hFbEzXkaky8EHBzp",
    "aH14TiKG2q8vGZUoa364",
    "rHLDeE2GBFCPFygqBXhO",
    "Zb6bJ0WTv7e4CtHymqoN",
    "Zb6bJ0WTv7e4CtHymqoN",
    "xEVnGFgNb90LgZzIb0Si",
    // Part 2 question IDs above

    "H2iCX8sUBALvHJzKsayN",
    "hNnINgXFdxErhQLJAhiX",
    // Part 3 question IDs above

    "hNnINgXFdxErhQLJAhiX",
    "fmYe2svpReERojxtMQkV",
    "MJlG9Pn0AnEzuK3N2VPi",
    "J17gx31o0Js7xozLTk5K",
    // Part 4 question IDs above

    "BVaWEgEj4LQ6Wg7wk9uw",
    "Xb08AxZHJztK0QABLdLy",
    "DUk4sMpPImVSaA7fvzwl",
    "DUk4sMpPImVSaA7fvzwl"
    // Part 5 question IDs above
];

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

/*
Used to validate input
*/
let validResponse = true;
let end = false;

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

function checkMultipleChoice(content) {
    let skipChoices = currentQuestionObject.restrictions.skipChoices;

    for (let i = 0; i < skipChoices.length; i++) {
        console.log(content);
        if (content == skipChoices[i]) {
            return false;
        }
    }
    return true;
}

function checkMultipleChoiceOthers(content) {
    return true;
}

/**
 * onclick function for option buttons.
 * @param button The option button
 */
function select(button) {
    let content = button.textContent.trim();

    /***********************************************/
    // Validating user input
    let questionType = currentQuestionObject.type;
    
    switch (questionType) {
        case TYPE_MULTIPLE_CHOICE:
            validResponse = checkMultipleChoice(content);
            break;
        case TYPE_MULTIPLE_CHOICE_OTHERS:
            validResponse = checkMultipleChoiceOthers(content);
            break;
    }
    /***********************************************/

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

    if (validResponse) {
        incrementIndex();
    }
    else {
        if (currentQuestionObject.restrictions.skipTarget == "end_survey") {
            end = true;
        }
        else {
            setTimeout(() => {
                showMessage("That seems to be an invalid response! Please try again.")
            }, 1000);
            scrollToBottom();
        }
    }

    setTimeout(() => {
        nextQuestion();
    }, 1000)

    saveResponse(content);
}

/**
 * Checks a numeric response from the user.
 * @param message String containing the input from the user
 */
function checkNumeric(message) {
    if (!isNaN(message)) {
        let lowerRange = currentQuestionObject.restrictions.lowerRange;
        let upperRange = currentQuestionObject.restrictions.upperRange;
        
        if ((message >= lowerRange) & (message <= upperRange)) {
            return true;
        }
    }
    return false;
}

/**
 * Checks a short text response from the user.
 * @param message String containing the input from the user
 */
 function checkShortText(message) {
     return true;
}

/**
 * Checks a short text response from the user.
 * @param message String containing the input from the user
 */
 function checkShortText(message) {
    return true;
}

/**
 * Checks a short text response from the user.
 * @param message String containing the input from the user
 */
 function checkLongText(message) {
    return true;
}

/**
 * Checks a short text response from the user.
 * @param message String containing the input from the user
 */
 function checkLongQuestion(message) {
    return true;
}

/**
 * Increments the index based on the result of validResponse.
 */
function incrementIndex() {
    // If invalid, don't increment questionIndex. Display error message
    if (validResponse) {
        if (currentSubQuestionIds !== null) {
            subQuestionIndex++;
        } else {
            questionIndex++;
        }
    }
}

/**
 * Adds the user response as a chat bot message
 */
function addMessage() {
    let message = input.value;
    
    /***********************************************/
    // Validating user input
    let questionType = currentQuestionObject.type;
    
    switch (questionType) {
        case TYPE_NUMERIC:
            validResponse = checkNumeric(message);
            break;
        case TYPE_SHORT_TEXT:
            validResponse = checkShortText(message);
            break;
        case TYPE_LONG_TEXT:
            validResponse = checkLongText(message);
            break;
        case TYPE_LONG_QUESTION:
            validResponse = checkLongQuestion(message);
            break;
    }
    /***********************************************/

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

    if (validResponse) {
        incrementIndex();
    }
    else {
        if (currentQuestionObject.restrictions.skipIfInvalid) {
            end = true;
        }
        else {
            setTimeout(() => {
                showMessage("That seems to be an invalid response! Please try again.")
            }, 1000);
            scrollToBottom();
        }
    }

    setTimeout(() => {
        nextQuestion();
    }, 2000);

    let question_id = "";
}

/**
 * Increments the question counter by 1 and moves on to the next
 * question.
 */
function nextQuestion() {
    if (end) {
        let invalidChoice = "Unfortunately, we believe our app isn't for " +
            "you. Maybe recommend it to someone else!"
        showMessage(invalidChoice);
    }
    else {
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
}

function showNumeric(questionObject) {
    //TODO To be implemented
    showShortText(questionObject);
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
        for (var i = 1;i<doc.data().set_id+1;i++){
          var option = document.createElement("option");
          option.value = i;
          option.text = i;
          select.appendChild(option);
        }
        label.innerHTML = "Choose which attempt you'd like to view: "
        label.htmlFor = "pets";

        document.getElementById("attemptsection").appendChild(label).appendChild(select);
      }
    }).catch((error) => {
  console.log("Error getting document:", error);
});

  document.getElementById('fav').value = mylist.options[mylist.selectedIndex].text;
}

function selectattempt(){
  var mylist = document.getElementById('attempt');
  document.getElementById('fav').value = mylist.options[mylist.selectedIndex].text;
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
    incrementIndex();

    showMessage(question);
    showOptions(choices);
}

function showMultipleChoiceOthers(questionObject) {
    // TODO Implement validation checks and skip logic
    incrementIndex();

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
