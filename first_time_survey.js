var messages = document.getElementById('messages');

var questions = ["Question 2", "Question 3", "Question 4"];
var curr_question = 1;

function greeting(){
  let ques_template = '<div class="space">\
                              <div class="message-container sender">\
                                  <p>Hi! I am the chatbot for this App.</p>\
                                  <p>To get started, I would like to get to know you better by asking a few questions.</p>\
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
                          </div>'
      curr_question += 1;
      messages.innerHTML += ques_template;
      messages.innerHTML += opt_template;
      $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);
}

function choose(button){
    let content = button.textContent.trim()
    let ans_template = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + content + '</p>\
                            </div>\
                        </div>';
    var space = button.parentElement;
    for (let i=0; i < space.childNodes.length; i++){
        space.childNodes[i].disabled = true;
    }
    messages.innerHTML += ans_template;
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
                        </div>'
    curr_question += 1;
    messages.innerHTML += ques_template;
    messages.innerHTML += opt_template;
    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 1000);
}
