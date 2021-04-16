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

    setTimeout(function(){
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
    }
    else {
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
