// Caches the title question of the current sub-question
let titleQuestionString = null;

// Initializing variables
let messages = document.getElementById("messages");
let textBoxInput = document.getElementById("message");
let submit = document.getElementById("submit");
let input = document.getElementById("input-box");
let errorText = document.getElementById("error-text");
let messageHistoryColour = 'white';

// get user's selected language and set the questions branches id to the corresponding index for that language
let select_language = localStorage.getItem("LANGUAGE");

let branch_id;
if (select_language == "English") {
    branch_id = EN_INDEX;
} else if (select_language == "Chinese (Simplified)") {
    branch_id = ZH_CN_INDEX;
} else if (select_language == "Malay") {
    branch_id = MS_INDEX;
} else if (select_language == "Thai") {
    branch_id = TH_INDEX;
}

/*
The user object of the currently logged in user
<br>
Can be used to retrieve details such as phone number
and user ID.
 */
let currentUser = null;
let currentQuestionId = null;
let currentQuestionObject = null;

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
"very nice" - Yong Peng
 */
let agreeLikertQues = [13, 27]; //[1] Strongly Disagree [2] Disagree [3] Neutral [4] Agree [5] Strongly Agree
let satisfyLikertQues = [16]; //[0] Not Applicable [1] Very Dissatisfied [2] Dissatisfied [3] Neutral [4] Satisfied [5] Very Satisfied
let confidentLikertQues = [19,20,22]; //[0] Not Applicable [1] Not Confident At All [2] Somewhat Not Confident [3] Moderately Confident [4] Somewhat Confident [5] Extremely Confident
let interestedLikertQues = [25] //[1] Extremely Not Interested [2] Not Interested [3] Neutral [4] Interested [5] Extremely Interested

//translation
changeLang(select_language);

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
        let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
        setTimeout(() => nextQuestion(), delay);
    } else if (skipTarget === SKIP_END_SURVEY) {
        // check if one of the skipChoices were selected. If so, end survey
        if (skipChoices.includes(choice)) {
            endSurvey();
        } else { // else move onto the next question
            let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
            setTimeout(() => nextQuestion(), delay);
        }
    } else {
        // Skip to a question ID if the selected answer is in skipChoices
        if (skipChoices.includes(choice)) {
            // set currentQuestionObject to skipTarget
            currentQuestionObject = skipTarget;

            // Set the current question index to the question before the
            // skip target since nextQuestion increments
            // the question index by 1
            questionIndex = QUESTION_IDS[branch_id].indexOf(skipTarget) - 1;

            // In case the user was answering a long question,
            // reset params related to long questions
            currentSubQuestionIds = null;
        }
        // display the next question after a small delay
        let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
        setTimeout(() => nextQuestion(), delay);
    }

    // scroll to bottom of chat log
    scrollToBottom();
}

/**
 * Function to add the user textbox input as a chat bot message
 */
function addMessage() {
    let message = input.value;
    let type = currentQuestionObject.type;
    if (type ===TYPE_MULTIPLE_CHOICE ||
        type === TYPE_MULTIPLE_CHOICE_OTHERS ||
        type === TYPE_MULTIPLE_CHOICE_SUB_QUESTION){
            let selection = currentQuestionObject.restrictions.choices[message-1];
            saveResponse(selection);
            message = selection;
        }
        else{
          // Saving the response before clearing the input box
          saveResponse(input.value);
        }

    // check if the input is valid
    if (message.length > 0) {
        // display input and clear textbox
        showMessageReceiver(message);
        input.value = "";

            // Prevent users from using text box
            disableTextInput();

            // display next question after time delay and scroll to bottom of screen
            let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
            setTimeout(() => nextQuestion(), delay);
            scrollToBottom();
    }
    else{
      errorText.style.visibility = "visible";
      errorText.innerHTML = "Please type your answer in the text box.";
    }
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
    } else if (questionIndex < QUESTION_IDS[branch_id].length - 1) { // check if questionIndex is still not at the end of survey questions
        // The user is answering a normal question
        questionIndex++;
        showQuestion(false);
    } else { //  else end the survey
        showEndingMessage();
    }
}

/**
 * Shows the ending message when the survey has been completed.
 */
function showEndingMessage() {
    let endingMessage = "That's all the questions we have for you " +
        "right now. You can either continue answerng questions, or" +
        " browse the rest of the application!"
    showMessageSenderWithoutHints(endingMessage);
    questionIndex = QUESTION_IDS[branch_id].length;
    showHints();
    updateProgress();
    scrollToBottom();
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
        "<div class='message-container sender blue current'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>";
    // showHints();
}

/**
 * display a question from chatbot without any hint
 * @param message
 */
function showMessageSenderWithoutHints(message) {
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>";
    document.getElementById('hint_area').innerHTML = "";
}

/**
 * Appends a message bubble to the chat bot containing
 * the specified question string
 * @param questionString The question string
 */
function showShortQuestionMessage(questionString) {
    document.getElementById("messages").innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>${questionString}</p>` +
        "</div>" +
        "</div>";
    // showHints();
}

/**
 * function to scroll to bottom of screen
 */
function scrollToBottom() {
    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, delay);
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
        currentQuestionId = QUESTION_IDS[branch_id][questionIndex];
        question_id = currentQuestionId;
    }
    console.log("Reading ", question_id);

    firebase.firestore().collection(QUESTIONS_BRANCHES[branch_id])
        .doc(question_id)
        .get()
        .then((docRef) => {
            let questionObject = docRef.data();
            let questionType = questionObject.type;

            currentQuestionObject = questionObject;

            // checking the type of the question to assign the appropriate function to display it
            switch (questionType) {
                case TYPE_NUMERIC:
                case TYPE_NUMERIC_SUB_QUESTION:
                    showNumeric(questionObject);
                    if (agreeLikertQues.includes(questionIndex)) {
                        makeLikertScale(branch_id, "agree");
                    } else if (satisfyLikertQues.includes(questionIndex)){
                        makeLikertScale(branch_id, "satisfy");
                    } else if (confidentLikertQues.includes(questionIndex)){
                        makeLikertScale(branch_id, "confident");
                    } else if (interestedLikertQues.includes(questionIndex)){
                        makeLikertScale(branch_id, "interested");
                    }
                    break;

                case TYPE_MULTIPLE_CHOICE:
                case TYPE_MULTIPLE_CHOICE_SUB_QUESTION:
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
                    console.log(errorLog);
            }
            showHints();
            updateProgress();
            // Scroll the chat box window to the correct position
            scrollToBottom();
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
        type === TYPE_LONG_TEXT||
        type ===TYPE_MULTIPLE_CHOICE ||
        type === TYPE_MULTIPLE_CHOICE_OTHERS ||
        type === TYPE_MULTIPLE_CHOICE_SUB_QUESTION) {
        let wrongInput = input.value;
        showMessageReceiver(wrongInput);
    }

    // print out multiple choice options if question reprompted is a MCQ
    if (type ===TYPE_MULTIPLE_CHOICE ||
        type === TYPE_MULTIPLE_CHOICE_OTHERS ||
        type === TYPE_MULTIPLE_CHOICE_SUB_QUESTION) {
        showMultipleChoice(currentQuestionObject);
    }else{
      // print out the question again onto chat
      showShortQuestionMessage(question);
    }
    showHints();
    updateProgress();
    scrollToBottom();
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


    input.onkeyup = () => {
        let message = parseInt(input.value);
        if (message > 0 && message < (questionObject.restrictions.choices.length + 1)) {
            errorText.innerHTML = "";
            // errorText.style.visibility = "hidden";
            submit.onclick = addMessage;
        } else {
            errorText.innerHTML = "";
            // errorText.style.visibility = "visible";
            // errorText.innerHTML = "Please enter a valid choice index.";
            submit.onclick = null;
        }
    }
    enableTextInput();
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

    // Cache title question for easier outputting (when resuming)
    titleQuestionString = questionObject.question;

    showMessageSender(questionObject.question);

    // Initialize fields for looping over the sub-question IDs array
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
}

/**
 * function to display hints for questions when the hint button is clicked
 * @param hintId
 */
function showHints(hintId) {
    document.getElementById('hint_area').innerHTML = currentQuestionObject.hint;
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
    questionIndex = QUESTION_IDS[branch_id].length-1;

    // Update the questionIndex on the cloud with the local one
    updateQuestionIndex();

    nextQuestion();
}

/**
 * End Survey and display the user's response
 * in the chat bot window.
 * <br>
 * To be used by text-based survey questions ONLY
 */
function endSurveyText() {
    showMessageReceiver(input.value);
    questionIndex = QUESTION_IDS[branch_id].length-1;

    // Update the questionIndex on the cloud with the local one
    updateQuestionIndex();

    errorText.style.visibility = "hidden";
    nextQuestion();
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

/**
 * Updates the progress bar. Also changes previous sender question to
 * white.
 */
function updateProgress() {
    var progress = (questionIndex/QUESTION_IDS[branch_id].length) * 100;
    console.log('updateProgress() is called. Current percentage is ' + progress + '%.');
    document.querySelector('#progress-bar').MaterialProgress.setProgress(progress);

    changeColour();
}

/**
 * Changes all blue colour messages to white unless they have a current tag.
 * Current class tag will be removed.
 */
function changeColour() {
    var prev = $('.blue');
    $.each(prev, function() {
        if (!$(this).hasClass('current')) {
            $(this).animate({
                backgroundColor: "#FFFFF",
                color: "#006DAE",
            }, 500 );
        }
        $(this).removeClass('current')
    })
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
    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    setTimeout(() => nextQuestion(), delay);
    scrollToBottom();
}
