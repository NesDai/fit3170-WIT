let branch = "";
let languageIndex = -1;

// Initialising variables
let selected = null;
let viewingSubQuestions = false;
let responsesList = document.getElementById("responses-list-div");
let questionsList = document.getElementById("questions-list");

// A list of sub-question IDs of the currently in view
// long question
// <br>
// Basically the arrangement array of long question objects
let subQuestionIds = [];

// Hard-coded sample questions & responses
let responses = ["Response 1", "Response 2", "Response 3", "Response 1", "Response 2", "Response 3", "Response 1", "Response 2", "Response 3"];
let questions = [{question_number: "1.1", question: "What is your name?", type: "none"},
    {question_number: "1.2", question: "Where are you from?", type: "multiple-choice-sub-question"},
    {question_number: "1.3", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.4", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.5", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.6", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.7", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.8", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.9", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.10", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.11", question: "What is your first name, last name, and middle name?", type: "none"}];
let subquestions = [{question_number: "1.2.1", question: "What is your name?", type: "none"},
    {question_number: "1.2.2", question: "Where are you from?", type: "none"},
    {question_number: "1.2.3", question: "What is your first name, last name, and middle name?", type: "none"}];

/**
 * Adds list of questions in questions to the UI
 */
function addQuestionsList() {
    viewingSubQuestions = false;
    let questionsListString = "";
    for (let i = 0; i < questions.length; i++) {
        let innerFunction = "changeQuestion(" + i + ")";
        if (questions[i].type === TYPE_LONG_QUESTION) {
            innerFunction = "changeSubQuestion(" + i + ")";
        }

        questionsListString += '<li class="mdl-list__item mdl-list__item" \
                                onclick="' + innerFunction + '" id="q' + i + '" \
                                style="cursor: pointer;"> \
                                <span class="mdl-list__item-primary-content"> \
                                <span>Question ' + questions[i].question_number + ': \
                                ' + questions[i].question + '</span> \
                                </span> \
                                </span> \
                                </li>';
    }
    questionsList.innerHTML = questionsListString;
    appendBackButton();
}

/**
 * Changes the responses to the question selected's responses.
 *
 * @param index Number representing the index of the question in the list.
 */
function changeQuestion(index) {
    if (selected != null) {
        selected.style.backgroundColor = "";
    }

    let q = "q" + index;

    selected = document.getElementById(q)
    selected.style.backgroundColor = "#d8d8d8";

    let header = "";
    if (!viewingSubQuestions) {
        header = "Question " + questions[index].question_number + " Responses";
    } else {
        header = "Question " + subquestions[index].question_number + " Responses";
    }

    let list = null;
    let buttonString = "";

    // If on phone, set responsesList = questionsList
    if ($(window).width() <= 479) {
        list = questionsList;
        buttonString = '<div style="text-align: center;"> \
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"\
                            onclick="addQuestionsList()" style="width: 45%; margin: auto;"> \
                            Back \
                            </button></div>'
    }
    // Else, use responsesList
    else {
        list = responsesList;
    }

    document.getElementById("right-pane-label").innerText = header;

    let responses_branch = "";
    if (!viewingSubQuestions) {
        responses_branch = `chatbot/survey_responses/${QUESTION_IDS[languageIndex][index]}`
    } else {
        responses_branch = `chatbot/survey_responses/${subQuestionIds[index]}`
    }
    responses = [];
    // Populate the responses list with the list of responses for that question
    firebase.firestore().collection(responses_branch).get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                responses.push(doc.data());
            });
        })
        .then(() => {
            // Populate HTML elements to display responses
            let listString = "";
            listString += '<div> \
                    <ul class="mdl-list id="responses-list">';
            for (let i = 0; i < responses.length; i++) {
                listString += '<li class="mdl-list__item mdl-list__item"> \
                                <span class="mdl-list__item-primary-content"> \
                                <span>' + responses[i].answer + '</span> \
                                </span> \
                                </li>';
            }
            list.innerHTML += listString + '<br>';
            list.innerHTML += buttonString;
        });
}

/**
 * Changes the question list to list out the subquestions of a question.
 */
function changeSubQuestion(index) {
    // Some long question is selected, populate the sub-questions list
    subquestions = [];
    subQuestionIds = questions[index].arrangement;
    for (let i = 0; i < subQuestionIds.length; i++) {
        firebase.firestore().collection(QUESTIONS_BRANCH)
            .doc(subQuestionIds[i])
            .get()
            .then((document) => {
                subquestions.push(document.data());
            })
            .then(() => {
                // After the last sub-question is fetched, populate the HTML
                // question elements
                if (i === subQuestionIds.length - 1) {
                    viewingSubQuestions = true;
                    let subQuestionsListString = "";
                    for (let i = 0; i < subquestions.length; i++) {
                        let innerFunction = "changeQuestion(" + i + ")";
                        subQuestionsListString += '<li class="mdl-list__item mdl-list__item" \
                                onclick="' + innerFunction + '" id="q' + i + '" \
                                style="cursor: pointer;"> \
                                <span class="mdl-list__item-primary-content"> \
                                <span>Question ' + subquestions[i].question_number + ': \
                                ' + subquestions[i].question + '</span> \
                                </span> \
                                </li>';
                    }
                    questionsList.innerHTML = subQuestionsListString + '<br>';

                    let buttonString = '<div style="text-align: center;"> \
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"\
                        onclick="addQuestionsList()" style="width: 45%; margin: auto;"> \
                        Back \
                        </button></div>'
                    questionsList.innerHTML += buttonString;
                }
            })
    }
}

/**
 * Clear and populate the left pane with survey language options
 */
function displayLanguageMenu() {
    document.getElementById("left-pane-label").innerText =
        "Select Languages";
    document.getElementById("left-pane-label").hidden = false;

    document.getElementById("right-pane-label").innerText =
        "Please select a language to get started.";


    questionsList.innerHTML = `
        <li class="mdl-list__item mdl-list__item"
        onclick="loadQuestions(this)" id="select-english"
        style="cursor: pointer;" value=0>
            <span class="mdl-list__item-primary-content">
            English
            </span>
        </li>
        
        <li class="mdl-list__item mdl-list__item"
        onclick="loadQuestions(this)" id="select-chinese"
        style="cursor: pointer;" value=1>
            <span class="mdl-list__item-primary-content">
            Chinese
            </span>
        </li>
        
        <li class="mdl-list__item mdl-list__item"
        onclick="loadQuestions(this)" id="select-malay"
        style="cursor: pointer;" value=2>
            <span class="mdl-list__item-primary-content">
            Malay
            </span>
        </li>
        
        <li class="mdl-list__item mdl-list__item"
        onclick="loadQuestions(this)" id="select-thai"
        style="cursor: pointer;" value=3>
            <span class="mdl-list__item-primary-content">
            Thai
            </span>
        </li>
    `;

}
displayLanguageMenu();

/**
 * Adds a back button to the left pane.
 * <br>
 * Note: Implementation only covers navigating back to the
 * language selection.
 */
function appendBackButton() {
    const menuItem = `
        <li class="mdl-list__item mdl-list__item"
        onclick="displayLanguageMenu()" id="select-thai"
        style="cursor: pointer;" value=3>
            <span class="mdl-list__item-primary-content">
                Back to Language Selection
            </span>
        </li>
    `;

    questionsList.innerHTML += menuItem;
}

function loadQuestions(languageSelection) {
    // After language selection, get the list of questions, then populate
    // questions list

    languageIndex = languageSelection.value;
    branch = QUESTIONS_BRANCHES[languageIndex];

    questions = [];

    questionsList.innerHTML = "";
    document.getElementById("left-pane-label").innerText =
        "Loading...";

    for (let i = 0; i < QUESTION_IDS[languageIndex].length; i++) {
        firebase.firestore().collection(branch)
            .doc(QUESTION_IDS[languageIndex][i])
            .get()
            .then((document) => {
                questions.push(document.data());
            })
            .then(() => {
                // After the last question is fetched, populate the HTML
                // question elements
                if (i === QUESTION_IDS[languageIndex].length - 1) {
                    addQuestionsList();
                }

                // and clear the left/right pane labels
                document.getElementById("left-pane-label").innerHTML = "";
                document.getElementById("right-pane-label").innerHTML = "";
            })
    }
}

// Checks everytime the window is resized to prevent two response tabs
$(window).resize(function () {
    if ($(this).width() > 479) {
        addQuestionsList();
    }
});