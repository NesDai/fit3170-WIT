// Initialising variables
var messages = document.getElementById('messages');
var textboxInput = document.getElementById('message');
var textboxArea = document.getElementById('message-form');
var submit = document.getElementById('submit');
var input = document.getElementById('input-box');

var currQuestion = 1;



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

    var space = button.parentElement;
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
    var mcqTemplate = '<div class="space">\
                            <div class="message-container sender">\
                                <p>Multiple-choice Question</p>\
                                <p>Question ' + currQuestion + '...</p>\
                            </div>\
                        </div>';
    var optTemplate = '<div class="space">\
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
    var openTemplate = '<div class="space">\
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
}

// When the page loads
greeting()