// Initialising variables
let messages = document.getElementById('messages');
let textboxInput = document.getElementById('message');
let textboxArea = document.getElementById('message-form');
let submit = document.getElementById('submit');
let input = document.getElementById('input-box');

// to ask open ended questions
let sampleQuestions = [{question: "Sample MCQ 1", option: ["answer 1", "answer 2", "answer 3"], answer: null}, {question: "Sample MCQ 2", option: ["answer 4", "answer 5", "answer 6"]}, {question: "Sample Open Question 1", option: [], answer: null}, {question: "Sample Open Question 2", option: [], answer: null}]
let currentQuestion = 0;

/*
let currQuestion = 1;
// Runs as a first-time greeting from the bot
function greeting(){
  let quesTemplate = '<div class="space">\
                              <div class="message-container sender">\
                                  <p>Hi! I am the chatbot for this App.</p>\
                                  <p>To get started, I would like to get to know you better by asking a few questions.</p>\
                              </div>\
                          </div>';

    setTimeout(() => {  messages.innerHTML += quesTemplate; }, 750);

    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);

    setTimeout(function(){
    nextQues();
    }, 1500);
}



// onclick function for option buttons
function choose(button){
    let content = button.textContent.trim()

    let ansTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + content + '</p>\
                            </div>\
                        </div>';

    let space = button.parentElement;
    for (let i=0; i < space.childNodes.length; i++){
        space.childNodes[i].disabled = true;
    }

    messages.innerHTML += ansTemplate;

    setTimeout(function(){
        nextQues();
    }, 1000);
}



// Adds the following question
function nextQues() {
    // Initialising question templates
    let mcqTemplate = '<div class="space">\
                            <div class="message-container sender">\
                                <p>Multiple-choice Question</p>\
                                <p>Question ' + currQuestion + '...</p>\
                            </div>\
                        </div>';
    let optTemplate = '<div class="space">\
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="choose(this)">\
                                Option 1\
                            </button>\
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="choose(this)">\
                                Option 2\
                            </button>\
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="choose(this)">\
                                Option 3\
                            </button>\
                        </div>';
    let openTemplate = '<div class="space">\
                            <div class="message-container sender">\
                                <p>Open-ended Question</p>\
                                <p>Question ' + currQuestion + '...</p>\
                                <p>Please type your answer in the box below.</p>\
                            </div>\
                        </div>';
    // Creating expected behaviour from bot
    // First 3 questions are MCQ
    if (currQuestion <= 3) {
        console.log('mcq' + currQuestion)
        submit.disabled = true;
        input.disabled = true;

        messages.innerHTML += mcqTemplate;
        messages.innerHTML += optTemplate;
    }
    // Next 3 questions are open-ended
    else if (currQuestion > 3 && currQuestion <= 6) {
        console.log('open' + currQuestion)
        submit.disabled = false;
        input.disabled = false;

        messages.innerHTML += openTemplate;
    }
    // After that, 50/50 chance for either
    else {
        if (Math.random() > 0.5){
            submit.disabled = true;
            input.disabled = true;

            messages.innerHTML += mcqTemplate;
            messages.innerHTML += optTemplate;
        }
        else {
            submit.disabled = false;
            input.disabled = false;

            messages.innerHTML += openTemplate;
        }
    }

    currQuestion += 1;

    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);
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

    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);

    setTimeout(function(){
        nextQues();
    }, 1000);
}*/

function greeting(){
  let quesTemplate = '<div class="space">\
                              <div class="message-container sender">\
                                  <p>Hi! I am the chatbot for this App.</p>\
                                  <p>To get started, I would like to get to know you better by asking a few questions.</p>\
                              </div>\
                          </div>';

    setTimeout(() => {  messages.innerHTML += quesTemplate; }, 750);

    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);

    setTimeout(function(){
    askQues();
    }, 1500);
}

// functions that ask open ended questions iteratively
function askQues() {
  if (currentQuestion < sampleQuestions.length) {
    // check if current question is an open ended question
    if (sampleQuestions[currentQuestion].option.length == 0) {
      let openTemplate = '<div class="space">\
                              <div class="message-container sender">\
                                  <p>' + sampleQuestions[currentQuestion].question + '</p>\
                                  <p>Please type your answer in the box below.</p>\
                              </div>\
                          </div>';

      messages.innerHTML += openTemplate;

      // allow user to use textbox
      submit.disabled = false;
      input.disabled = false;
    } else { //else current question is a multiple choice question
      let mcqTemplate = '<div class="space">\
                              <div class="message-container sender">\
                                  <p>' + sampleQuestions[currentQuestion].question + '</p>\
                              </div>\
                        </div>';

      // making html section for options
      let mcqOptions = "<div class=\"space\">"

      for (i = 0; i < sampleQuestions[currentQuestion].option.length; i++) {
        mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"choose2(this), respondToClosed(" + i + ")\">" + sampleQuestions[currentQuestion].option[i] + "</button>"
      }

      mcqOptions += "</div>"

      messages.innerHTML += mcqTemplate;
      messages.innerHTML += mcqOptions;

      // prevent users from using textbox
      submit.disabled = true;
      input.disabled = true;
    }
  }
}

function respondToClosed(optionNumber) {
  sampleQuestions[currentQuestion].answer = optionNumber;
  currentQuestion += 1;

  setTimeout(function(){
      askQues();
  }, 1000);
}

// onclick function for option buttons
function choose2(button){
    let content = button.textContent.trim()

    let ansTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + content + '</p>\
                            </div>\
                        </div>';

    let space = button.parentElement;
    for (let i=0; i < space.childNodes.length; i++){
        space.childNodes[i].disabled = true;
    }

    messages.innerHTML += ansTemplate;
}

// function to get response for open ended questions
function respondToOpen() {
  let message = input.value;

  if (message.length > 0) {
    let messageTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + message + '</p>\
                            </div>\
                        </div>';

        messages.innerHTML += messageTemplate;
        input.value = "";

        console.log(message);
        sampleQuestions[currentQuestion].answer = message
        currentQuestion += 1;

        submit.disabled = true;
        input.disabled = true;

        setTimeout(function(){
            askQues();
        }, 1000);
    }

    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);
}

// When the page loads
greeting()
