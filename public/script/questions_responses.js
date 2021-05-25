// Initialising variables
let selected = null;
let responsesList = document.getElementById("responses-list");
let questionsList = document.getElementById("questions-list");

// Hard-coded sample questions & responses
// TODO integrate with firebase
let responses = ["Response 1", "Response 2", "Response 3"];
let questions = [{question_number: "1.1", question: "What is your name?", type: "none"},
                {question_number: "1.2", question: "Where are you from?", type: "multiple-choice-sub-question"},
                {question_number: "1.3", question: "What is your first name, last name, and middle name?", type: "none"}];
let subquestions = ["Subquestion 1", "Subquestion 2", "Subquestion 3"];

/**
 * Adds list of questions in questions to the UI
 */
function addQuestionsList() {
    let questionsListString = "";
    for (let i = 0; i < questions.length; i++) {
    questionsListString += '<li class="mdl-list__item mdl-list__item--two-line" \
                    onclick="changeQuestion(' + i + ')" id="q' + i + '" style="cursor: pointer;"> \
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

    let header = "<h3>Question " + (index+1) + " Responses</h3>"
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

window.onload = function () {
    addQuestionsList();
};