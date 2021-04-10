let messages = document.getElementById('messages');
let textboxInput = document.getElementById('message');
let textboxArea = document.getElementById('message-form');

let questions = ["Question 2", "Question 3", "Question 4"];
let curr_question = 1;

function greeting(){
  let ques_template = '<div class="space">\
                              <div class="message-container sender">\
                                  <p>Hi! I am the chatbot for this App.</p>\
                                  <p>To get started, I would like to get to know you better by asking a few questions.</p>\
                              </div>\
                          </div>';

      setTimeout(() => {  messages.innerHTML += ques_template; }, 750);

      $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);

      setTimeout(function(){
        nextQues();
      }, 1500);
}

function choose(button){
    let content = button.textContent.trim()

    let ans_template = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + content + '</p>\
                            </div>\
                        </div>';

    let reenabledTextInput = '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\
                                <input class="mdl-textfield__input" type="text" id="message" autocomplete="off">\
                                    <label class="mdl-textfield__label" for="message">Message...</label>\
                             </div>\
                             <button id="submit" type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="makeMessage()">\
                               Send\
                             </button>';

    var space = button.parentElement;
    for (let i=0; i < space.childNodes.length; i++){
        space.childNodes[i].disabled = true;
    }

    messages.innerHTML += ans_template;

    // reenables textbox area to be used after question has been answered
    textboxArea.innerHTML = reenabledTextInput;
    setTimeout(function(){
        nextQues();
    }, 1000);
}

function nextQues() {
    let ques_template = '<div class="space">\
                            <div class="message-container sender">\
                                <p>Question ' + curr_question + '</p>\
                            </div>\
                        </div>';
    let opt_template =  '<div class="space">\
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

    let disabledTextInput = '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\
                                <input class="mdl-textfield__input" type="text" disabled id="message" autocomplete="off">\
                                    <label class="mdl-textfield__label" for="message">Message...</label>\
                            </div>\
                            <button id="submit" type="submit" disabled class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="makeMessage()">\
                              Send\
                            </button>';

    curr_question += 1;
    messages.innerHTML += ques_template;
    messages.innerHTML += opt_template;

    // disable text input area for MCQs
    textboxArea.innerHTML = disabledTextInput;

    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);
}

function makeMessage() {
  let message = textboxInput.value;

  if (message.length > 0) {
    let messageTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + message + '</p>\
                            </div>\
                        </div>';

    messages.innerHTML += messageTemplate;
    message.value = "";
  }

  $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);
}

// main
greeting();
