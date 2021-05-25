// Initialising variables
let selected = null;
let sub = false;
let responsesList = document.getElementById("responses-list");
let questionsList = document.getElementById("questions-list");

// Hard-coded sample questions & responses
// TODO integrate with firebase
let responses = ["Response 1", "Response 2", "Response 3"];
let questions = [{question_number: "1.1", question: "What is your name?", type: "none"},
                {question_number: "1.2", question: "Where are you from?", type: "multiple-choice-sub-question"},
                {question_number: "1.3", question: "What is your first name, last name, and middle name?", type: "none"}];
let subquestions = [{question_number: "1.2.1", question: "Subquestion: What is your name?", type: "none"},
                    {question_number: "1.2.2", question: "Subquestion: Where are you from?", type: "none"}, 
                    {question_number: "1.2.3", question: "Subquestion: What is your first name, last name, and middle name?", type: "none"}];

/**
 * Adds list of questions in questions to the UI
 */
function addQuestionsList() {
    sub = false;
    let questionsListString = "";
    for (let i = 0; i < questions.length; i++) {
        let innerFunction = "changeQuestion(" + i + ")";
        if (questions[i].type == "multiple-choice-sub-question") {
            innerFunction = "changeSubQuestion(" + i + ")";
        }
        questionsListString += '<li class="mdl-list__item mdl-list__item--two-line" \
                    onclick="' + innerFunction + '" id="q' + i + '" style="cursor: pointer;"> \
                                <span class="mdl-list__item-primary-content"> \
                                <span>Question ' + questions[i].question_number + '</span> \
                                <span class="mdl-list__item-sub-title"> \
                                    ' + questions[i].question + ' \
                                </span> \
                                </span> \
                            </li>';
    }
    questionsList.innerHTML = questionsListString;
}

/**
 * Changes the responses to the question selected's responses.
 * 
 * @param index Number representing the index of the question in the list.
 */
function changeQuestion(index) {
    if (selected != null) {
        selected.style.opacity = 1;
    }

    let q = "q" + index;

    selected = document.getElementById(q)
    selected.style.opacity = 0.5;

    let header = "";
    if (!sub) {
        header = "<h3>Question " + questions[index].question_number + " Responses</h3>"
    }
    else {
        header = "<h3>Question " + subquestions[index].question_number + " Responses</h3>"
    }
    responsesList.innerHTML = header;

    let responsesListString = "";
    responsesListString += '<div id="responses-list-div"> \
                                <ul class="mdl-list">';
    for (let i = 0; i < responses.length; i++) {
        responsesListString += '<li class="mdl-list__item mdl-list__item"> \
                                <span class="mdl-list__item-primary-content"> \
                                    <span>' + responses[i] + '</span> \
                                </span> \
                                </li>';
    }
    responsesList.innerHTML += responsesListString;
}

function changeSubQuestion() {
    sub = true;
    let subQuestionsListString = "";
    for (let i = 0; i < subquestions.length; i++) {
        let innerFunction = "changeQuestion(" + i + ")";
        subQuestionsListString += '<li class="mdl-list__item mdl-list__item--two-line" \
                    onclick="' + innerFunction + '" id="q' + i + '" style="cursor: pointer;"> \
                                <span class="mdl-list__item-primary-content"> \
                                <span>Question ' + subquestions[i].question_number + '</span> \
                                <span class="mdl-list__item-sub-title"> \
                                    ' + subquestions[i].question + ' \
                                </span> \
                                </span> \
                            </li>';
    }
    questionsList.innerHTML = subQuestionsListString;

    let buttonString = '<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"\
                        onclick="addQuestionsList()"> \
                        Back \
                        </button>'
    questionsList.innerHTML += buttonString;
}

window.onload = function () {
    addQuestionsList();
};