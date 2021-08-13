// Initializing variables
let messages = document.getElementById("messages");
let textBoxInput = document.getElementById("message");
let submit = document.getElementById("submit");
let input = document.getElementById("input-box");
let errorText = document.getElementById("error-text");
let hintIndex = 0;

let messageColour = 'white';
let messageHistoryColour = 'white';

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

/*
Used for likert scale idexes of questions stored in firebase
 */
let agreeLikertQues = [15]; //[1] Strongly Disagree [2] Disagree [3] Neutral [4] Agree [5] Strongly Agree
let satisfyLikertQues = [18]; //[1] Very Dissatisfied [2] Dissatisfied [3] Neutral [4] Satisfied [5] Very Satisfied
let confidentLikertQues = [21,22,24]; //[1] Not Confident At All [2] Somewhat Not Confident [3] Moderately Confident [4] Somewhat Confident [5] Extremely Confident [6] Not Applicable
let interestedLikertQues = [27] //[1] Extremely Not Interested [2] Not Interested [3] Neutral [4] Interested [5] Extremely Interested

// Runs as a first-time greeting from the bot
window.onload = function () {
    initialiseCurrentUser();
    greeting();

    // Initialises progress bar
    document.querySelector('#progress-bar').addEventListener('mdl-componentupgraded', function() {
        this.MaterialProgress.setProgress(0);
    });
};

/**
 * function to initialise current user from firebase storage. this is mainly to help chat history work.
 */
function initialiseCurrentUser() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(() => {
        // Initialize current user object
        currentUser = firebase.auth().currentUser;
    });
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
 * function that starts the survey.
 */
function startSurvey(button) {
    // display that the start survey button has been clicked
    let choice = button.textContent.trim();

    let ansTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + choice + '</p>\
                            </div>\
                        </div>';

    // disable start survey button
    let space = button.parentElement;
    for (let i = 0; i < space.childNodes.length; i++) {
        space.childNodes[i].disabled = true;
    }
    messages.innerHTML += ansTemplate;

    // initialise currentUser and open a new collection for this survey instance
    initFirebaseAuth();
    // scroll to bottom of chat and start displaying the questions from firebase
    scrollToBottom();
    setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);
}

/**
 * onclick function for option buttons.
 * This functions displays and records the response of the MCQ answer option clicked from user.
 * @param button The option button
 */
function select(button) {
    // get selected button's text
    let choice = button.textContent.trim();

    // format choice html text bubble
    let ansTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + choice + '</p>\
                            </div>\
                        </div>';

    // disable clicked button and other button options from MCQ question
    let space = button.parentElement;
    for (let i = 0; i < space.childNodes.length; i++) {
        space.childNodes[i].disabled = true;
    }

    // display user's choice on chat
    messages.innerHTML += ansTemplate;

    // save choice onto firebase
    saveResponse(choice);

    // extract skip target and skip choices from currentQuestionObject
    let skipTarget = currentQuestionObject.restrictions.skipTarget;
    let skipChoices = currentQuestionObject.restrictions.skipChoices;

    // check the type of skip target
    if (skipTarget === SKIP_NOT_ALLOWED) {
        // Don't skip next question
        setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);
    } else if (skipTarget === SKIP_END_SURVEY) {
        // check if one of the skipChoices were selected. If so, end survey
        if (skipChoices.includes(choice)) {
            endSurvey();
        } else { // else move onto the next question
            setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);
        }
    } else {
        // Skip to a question ID if the selected answer is in skipChoices
        if (skipChoices.includes(choice)) {
            // set currentQuestionObject to skipTarget
            currentQuestionObject = skipTarget;

            // Set the current question index to the question before the
            // skip target since nextQuestion increments
            // the question index by 1
            questionIndex = QUESTION_IDS.indexOf(skipTarget) - 1;

            // In case the user was answering a long question,
            // reset params related to long questions
            currentSubQuestionIds = null;
        }
        // display the next question after a small delay
        setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);
    }

    // scroll to bottom of chat log
    scrollToBottom();
}

/**
 * Function to add the user textbox input as a chat bot message
 */
function addMessage() {
    let message = input.value;

    // Saving the response before clearing the input box
    saveResponse(input.value);

    // check if the input is valid
    if (message.length > 0) {
        // display input and clear textbox
        showMessageReceiver(message);
        input.value = "";
    }

    // Prevent users from using text box
    disableTextInput();

    // display next question after time delay and scroll to bottom of screen
    setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);
    scrollToBottom();
}


/**
 * Function to increment through survey questions one by one and display them.
 */
function nextQuestion() {
    console.log("nextQuestion() is called.")

    // check if currentQuestionObject is null
    if (currentQuestionObject === null) {
        // The user is answering its first survey question
        showQuestion(false);
    } else if (currentSubQuestionIds !== null) { // checking if currentSubQuestionIds is not null
        // The user is answering sub-questions
        console.log("subquestionIndex is ", subQuestionIndex);

        // check if the subQuestionIndex is at the end of  currentSubQuestionIds
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
    } else if (questionIndex < QUESTION_IDS.length - 1) { // check if questionIndex is still not at the end of survey questions
        // The user is answering a normal question
        questionIndex++;
        showQuestion(false);
    } else { //  else end the survey
        let endingMessage = "That's all the questions we have for you " +
            "right now. You can either continue answerng questions, or" +
            " browse the rest of the application!"
        showMessageSenderWithoutHints(endingMessage);
        scrollToBottom();

    }
    // updateProgress();
}

/**
 * Appends a message bubble to the chat bot containing the specified message string.
 * This function is only used by the chatbot.
 * @param message A message string
 */
function showMessageSender(message) {
    // display a message in html format below
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender " + messageColour + "'>" +
        `<p>${message}</p>` +
        `<button
         id = ${hintIndex}
         type="button"
         style="margin-bottom: 1em; font-size:0.8rem;display: inline-block;" onclick='showHints(id);'>Hints
         </button>`+
        "<div style='display: inline-block;'>" +
        `<p id='hintTxt${hintIndex}'style='margin-left: 1em;'></p>` +
        "</div>" +
        "</div>" +
        "</div>";
    hintIndex++;
    changeMessageColour();
}

/**
 * function to display messages onto the chat log by th user
 * @param message - user response
 */
function showMessageReceiver(message) {
    //display user message in given html format
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container receiver'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>"
}

/**
 * display a question from chatbot without any hint
 * @param message
 */
function showMessageSenderWithoutHints(message) {
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender " + messageColour + "'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>";
    changeMessageColour();
}

/**
 * function to add a message in history log under chatbot.
 * @param message
 */
function showQuestionLog(message) {
    logs.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender " + messageHistoryColour + "'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>"
    changeMessageHistoryColour();
}

/**
 * function to add a message in history log under user.
 * @param message
 */
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
        "<div class='message-container sender " + messageColour + "'>" +
        `<p>${questionString}</p>` +
        "<p>Please type your answer in the box below.</p>" +
        `<button 
         id =${hintIndex}
         type="button"
         style="margin-bottom: 1em; font-size:0.8rem;display: inline-block;" onclick='showHints(id);'>Hints
         </button>`+
        "<div style='display: inline-block;'>" +
        `<p id='hintTxt${hintIndex}'style='margin-left: 1em;'></p>` +
        "</div>" +
        "</div>" +
        "</div>";
    hintIndex++;
    changeMessageColour();
}

/**
 * Generates agree likert scale buttons to the div likert_scale in chatbot.html
 */
function makeAgreeLikertScale() {
    document.getElementById('likert_scale').innerHTML =
        `<button 
         id = 1
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px; margin-left: 0; font-size: 8.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(1)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>1<br> <br> Strongly <br> Disagree </span>
         </button>`+

        `<button 
         id = 2
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(2)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>2<br> <br><br> Disagree </span>
         </button>`+

        `<button 
         id = 3
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(3)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>3<br><br><br> Neutral </span>
         </button>` +

        `<button 
         id = 4
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(4)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>4<br><br><br>Agree </span>
         </button>` +

        `<button 
         id = 5
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(5)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>5<br><br> Strongly<br> Agree </span>
         </button>`;

    componentHandler.upgradeDom();
}

/**
 * Generates satisfy likert scale buttons to the div likert_scale in chatbot.html
 */
function makeSatisfyLikertScale() {
    document.getElementById('likert_scale').innerHTML =
        `<button 
         id = 1
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px; margin-left: 0; font-size: 8px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(1)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>1<br> <br> Very <br> Dissatisfied </span>
         </button>`+

        `<button 
         id = 2
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(2)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>2<br> <br><br> Dissatisfied </span>
         </button>`+

        `<button 
         id = 3
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(3)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>3<br><br><br> Neutral </span>
         </button>` +

        `<button 
         id = 4
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(4)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>4<br><br><br>Satisfied </span>
         </button>` +

        `<button 
         id = 5
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 8px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(5)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>5<br><br> Very<br> Satisfied </span>
         </button>`;

    componentHandler.upgradeDom();
}

/**
 * Generates confident likert scale buttons to the div likert_scale in chatbot.html
 */
function makeConfidentLikertScale() {
    document.getElementById('likert_scale').innerHTML =
        `<button 
         id = 1
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 13%; border-radius: 12px; margin-left: 0; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(1)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>1<br> <br> Not Confident <br> At All </span>
         </button>`+

        `<button 
         id = 2
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 13%; border-radius: 12px;margin-left: 8px; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(2)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>2<br> <br> Somewhat <br> Not Confident </span>
         </button>`+

        `<button 
         id = 3
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 13%; border-radius: 12px;margin-left: 8px; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(3)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>3<br> <br> Moderately <br>Confident </span>
         </button>` +

        `<button 
         id = 4
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 13%; border-radius: 12px;margin-left: 8px; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(4)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>4<br> <br> Somewhat <br>Confident </span>
         </button>` +

        `<button 
         id = 5
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 13%; border-radius: 12px;margin-left: 8px; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(5)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>5<br> <br> Extremely <br>Confident </span>
         </button>` +

        `<button 
         id = 5
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 13%; border-radius: 12px;margin-left: 8px; font-size: 7.25px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(5)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>6<br> <br> Not <br>Applicable </span>
         </button>`;

    componentHandler.upgradeDom();
}

/**
 * Generates interested likert scale buttons to the div likert_scale in chatbot.html
 */
function makeInterestedLikertScale() {
    document.getElementById('likert_scale').innerHTML =
        `<button 
         id = 1
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px; margin-left: 0; font-size: 7.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(1)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>1<br> <br> Extremely <br>Not<br> Interested </span>
         </button>`+

        `<button 
         id = 2
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 7.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(2)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>2<br> <br>Not<br>Interested </span>
         </button>`+

        `<button 
         id = 3
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 7.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(3)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>3<br><br><br> Neutral </span>
         </button>` +

        `<button 
         id = 4
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em;display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 7.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(4)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>4<br><br><br>Interested </span>
         </button>` +

        `<button 
         id = 5
         class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
         style="margin-bottom: 1em; display: inline-block;width: 16%; border-radius: 12px;margin-left: 8px; font-size: 7.5px; height: 90px; padding:0px; line-height: 1.2em; min-width: 0px; font-weight: 500;" onclick='likertSelect(5)'><span class = 'likertText' style="display: block;position: absolute; top: 0px; text-align:center; width:100%"> <br>5<br><br> Extremely<br> Interested </span>
         </button>`;

    componentHandler.upgradeDom();
}

/**
 * function to scroll to bottom of screen
 */
function scrollToBottom() {
    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);
}

/**
 * function to show the question at questionIndex or subQuestionIndex
 * @param isSubQuestion
 */
function showQuestion(isSubQuestion) {

    //Resets linkert scale
    document.getElementById('likert_scale').innerHTML='';

    // Get the ID of the current question
    let question_id = "";

    // check if the current question is a sub-question
    if (isSubQuestion) {
        // get the firebase ID of the sub-question
        currentSubQuestionId = currentSubQuestionIds[subQuestionIndex];
        question_id = currentSubQuestionId;
    } else {
        // get the firebase ID of the question
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

            // checking the type of the question to assign the appropriate function to display it
            if (questionType == TYPE_NUMERIC || questionType == TYPE_NUMERIC_SUB_QUESTION) {
                showNumeric(questionObject);
                if (agreeLikertQues.includes(questionIndex)){makeAgreeLikertScale();}
                else if (satisfyLikertQues.includes(questionIndex)){makeSatisfyLikertScale();}
                else if (confidentLikertQues.includes(questionIndex)){makeConfidentLikertScale();}
                else if (interestedLikertQues.includes(questionIndex)){makeInterestedLikertScale();}
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
            scrollToBottom();
            updateProgress();
        });
}

/**
 * function to set up and display questions that require numeric inputs
 * @param questionObject
 */
function showNumeric(questionObject) {
    // anonymous function to check user input in textbox is valid or not
    input.onkeyup = () => {
        // get range of the expected answer
        let lowerRange = questionObject.restrictions.lowerRange;
        let upperRange = questionObject.restrictions.upperRange;
        // get user's input
        let message = parseInt(input.value);

        // If it's a number
        if (!isNaN(message)) {
            // If there is no upper/lower range specified set either to infinity and negative infinity respectively
            if (lowerRange != null && upperRange == null){
                upperRange = Number.POSITIVE_INFINITY;
            } else if (lowerRange == null && upperRange != null){
                lowerRange = Number.NEGATIVE_INFINITY;
            }

            // if number is in normal range
            if ((message >= lowerRange) && (message <= upperRange)) {
                // If it's within range
                errorText.style.visibility = "hidden";
                submit.onclick = addMessage;
            } else {
                // If it's out of range, display error messages
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

                // check if question requires use to end the survey if an invalid response is given
                if (questionObject.restrictions.skipIfInvalid) {
                    submit.onclick = endSurveyText;
                } else {
                    // re prompt the question
                    submit.onclick = repromptQuestion;
                }
            }
        } else {
                // If it's not a number
                errorText.style.visibility = "visible";
                errorText.innerHTML = "the answer needs to be a number.";
                submit.onclick = repromptQuestion;
        }
    }

    // display the question and enable the textbox
    showShortQuestionMessage(questionObject.question);
    enableTextInput();
}

/**
 * function to display the last answered item from user and re-display the current question again on the chat log
 */
function repromptQuestion() {
    // print error message onto chat
    errorText.style.visibility = "hidden";

    //getting type of question and the question itself
    let type = currentQuestionObject.type;
    let question = currentQuestionObject.question;

    if (type === TYPE_LONG_QUESTION ||
        type === TYPE_SHORT_TEXT ||
        type === TYPE_NUMERIC ||
        type === TYPE_NUMERIC_SUB_QUESTION ||
        type === TYPE_LONG_TEXT) {
        let wrongInput = input.value;
        showMessageReceiver(wrongInput);
    }

    // print out the question again onto chat
    showShortQuestionMessage(question);

    // print out multiple choice options if question reprompted is a MCQ
    if (type ===TYPE_MULTIPLE_CHOICE ||
        type === TYPE_MULTIPLE_CHOICE_OTHERS ||
        type === TYPE_MULTIPLE_CHOICE_SUB_QUESTION) {
        showOptions(currentQuestionObject.choices);
    }
}

/**
 * function to display buttons for each MCQ question's answer options
 * only used for MCQ questions
 */
function loadOptions(){
    let phone = currentUser.phoneNumber;
    let userID = phone === undefined ? currentUser.email : phone;

    var x = document.getElementById("Dropdown");
    x.options.length = 0;
    const collectionRef = firebase.firestore().collection(userID);
    collectionRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var option = document.createElement("option");
                // Splitting the year month and day from date
                var ymd = doc.id.split("-");
                var dateString = ymd[0] + "-" + ("0" + ymd[1]).slice(-2) + "-" + ("0" + ymd[2]).slice(-2);
                option.text = dateString;
                x.add(option);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

/**
 * function to display history log's dropdown date
 */
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

/**
 *
 */
function selectdate(){
    let phone = currentUser.phoneNumber;
    let userID = phone === undefined ? currentUser.email : phone;

    var mylist = document.getElementById('Dropdown');
    const collectionRef = firebase.firestore().collection(userID).doc(mylist.options[mylist.selectedIndex].text);
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

/**
 * function to select which attempt is going to be displayed in history chatlog
 */
function selectattempt(){
    var mylist = document.getElementById('attempt');
    logAttempt = mylist.options[mylist.selectedIndex].text;

    let log = document.getElementById('logs');
    log.innerHTML = "";

    showlog();
}

/**
 * function to display which old survey is going to be displayed in history page
 */
function showlog(){
    let phone = currentUser.phoneNumber;
    let userID = phone === undefined ? currentUser.email : phone;

  const collectionRef = firebase.firestore().collection(userID).doc(logDate).collection('responses').orderBy('timestamp').where('set_id','==',parseInt(logAttempt-1));
      collectionRef.get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if(doc.data().longQuestionId!=null && doc.data().longQuestionId!=longQueId){
                longQueId = doc.data().longQuestionId;
                firebase.firestore().collection('chatbot').doc('survey_questions').collection('questions').doc(longQueId).get().then((doc) => {
                  console.log("long question:", doc.data().question);
                  showQuestionLog(doc.data().question);
                }).catch((error) => {
                console.log("Error getting document:", error);
                });
              }
              console.log(doc.id, " => ", doc.data().question);
              showQuestionLog(doc.data().question);
              showAnswerLog(doc.data().answer);
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
}

/**
 * function to display an MCQ survey question onto chat log to ask user
 * @param questionObject - an Object from firebase which contain the question, it's multiple choice answers and skip logic
 */
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

/**
 * function to display multiple choice questions that can be answered by typing something in the textbox or by selecting one of the options available
 * @param questionObject- an Object from firebase which contain the question, it's multiple choice answers and skip logic.
 */
function showMultipleChoiceOthers(questionObject) {
    let message = input.value;
    input.onkeyup = () => {
        if (message.length <= SHORT_TEXT_LENGTH) {
            // If it's not too long
            errorText.innerHTML = "";
            // TODO Spellcheck here

            errorText.style.visibility = "hidden";
            submit.onclick = addMessage;
        } else {
            // If it's super long
            errorText.style.visibility = "visible";
            errorText.innerHTML = "character limit exceeded";
            submit.onclick = repromptQuestion;
        }

    }

    // allow users to use textbox
    enableTextInput();

    let question = questionObject.question;
    let choices = questionObject.restrictions.choices;

    showMessageSender(question);
    showOptions(choices);
}

/**
 * function to display questions that consist of sub questions
 * @param questionObject
 */
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

/**
 * function to display questions that require textbox inputs and have restricted answer character number length.
 * @param questionObject
 */
function showShortText(questionObject) {
    let message = input.value;
    input.onkeyup = () => {
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

/**
 * function to display questions which require textbox inputs and are expected to have a large character limit for it's answer
 * @param questionObject
 */
function showLongText(questionObject) {
    //TODO Do spellchecks here
    showShortText(questionObject);
}

/**
 * function to create MCQ answer buttons on screen for users to select to answer the MCQs
 * @param choices
 */
function showOptions(choices) {
    let mcqOptions = "<div class=\"space\">"
    for (let choice of choices) {
        mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"select(this)\">" + choice + "</button>";
    }
    mcqOptions += "</div>";
    messages.innerHTML += mcqOptions;

    disableTextInput();
}

/**
 * function to display hints for questions when the hint button is clicked
 * @param hintId
 */
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
    let phone = currentUser.phoneNumber;
    let userID = phone === undefined ? currentUser.email : phone;
    let today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let branch = `${userID}/${date}/responses`;

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
                phone: userID,
                data: date,
                answer: answer,
                timestamp: timestamp
            };
            let responseBranch = `chatbot/survey_responses/${currentQuestionId}`;

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
            console.error("Error writing response at " + userID +
                " branch: ", error);
        });
}

/**
 * function to access the user's firebase storage and check if there is a collection for storing survey responses for
 * the current date. if there is not collection under the current date, the function will make a new collection instead
 * for the current date.
 */
function initSetId() {
    // Formulating the branch
    let phone = currentUser.phoneNumber;
    let userID = phone === undefined ? currentUser.email : phone;
    let today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // Formulating the response object

    // Retrieve the set id
    let reference = firebase.firestore().collection(userID).doc(date);

    reference.get().then((document) => {
        if (document.exists) {
            // If the data branch exists, that means this isn't the first
            // survey instance for the day.
            currentSetId = document.data().set_id + 1;

            // Increment the set_id at the Firestore Database by 1
            // Initialize set_id to 0 and write it to the database
            firebase.firestore().collection(userID).doc(date)
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
            // is the first survey instance for the day.

            // Initialize set_id to 0 and write it to the database
            firebase.firestore().collection(userID).doc(date)
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

/**
 * Changes the colour of the next message based on
 * the colour of the current message.
 *
 * Used in SENDER messages only (bot side)
 */
function changeMessageColour() {
    if (messageColour == 'white') {
        messageColour = 'blue';
    }
    else {
        messageColour = 'white';
    }
}

/**
 * Changes the colour of the next message based on
 * the colour of the current message in the history tab.
 *
 * Used in HISTORY SENDER messages only (bot side)
 */
 function changeMessageHistoryColour() {
    if (messageHistoryColour == 'white') {
        messageHistoryColour = 'blue';
    }
    else {
        messageHistoryColour = 'white';
    }
}

function updateProgress() {
    var progress = (questionIndex/QUESTION_IDS.length) * 100;
    console.log('updateProgress() is called. Current percentage is ' + progress + '%.');
    document.querySelector('#progress-bar').MaterialProgress.setProgress(progress);
}

/** Function of selecting likert options **/
function likertSelect(number)
{
    // format choice html text bubble
    let ansTemp = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + number + '</p>\
                            </div>\
                        </div>';

    // display user's choice on chat
    messages.innerHTML += ansTemp;

    // save choice onto firebase
    saveResponse(number);

    // Prevent users from using text box
    disableTextInput();

    // display next question after time delay and scroll to bottom of screen
    setTimeout(() => nextQuestion(), MESSAGE_OUTPUT_DELAY);
    scrollToBottom();
}