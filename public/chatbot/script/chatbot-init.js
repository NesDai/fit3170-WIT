/**
 * This file contains functions that initialize the chatbot
 * when the page is loaded.
 *
 * Current order of execution
 * 1. initFirebaseAuth & the progress bar thing
 * 2. initQuestionIndex
 * 3. initChatbot
 */
let noDelayMode = false;

// whether the chatbot is with avatar or not
let isAvatar = localStorage.getItem("avatar");

initFirebaseAuth();

// for text-to-speech
// greeting message
let greet_msg = ["Hi! I am the chatbot for this App. To get started, can you please fill up this survey. You only have one attempt in completing the survey. You are allowed to restart the survey any number of times if it is still incomplete. Are you ready?",
                 "你好！我是这个应用程序的聊天机器人。要开始，请您填写这份调查表。您只有一次尝试完成调查。如果调查仍未完成，您可以多次重新开始调查。你准备好了吗？",
                 "Hai! Saya adalah bot sembang untuk Apl ini. Untuk bermula, bolehkah anda mengisi tinjauan ini. Anda hanya mempunyai satu percubaan untuk melengkapkan tinjauan. Anda dibenarkan untuk memulakan semula tinjauan beberapa kali jika ia masih tidak lengkap. Adakah anda bersedia?",
                 "สวัสดี! ฉันเป็นแชทบ็อตสำหรับแอพนี้ ในการเริ่มต้น โปรดกรอกแบบสำรวจนี้ คุณมีความพยายามเพียงครั้งเดียวในการกรอกแบบสำรวจ คุณได้รับอนุญาตให้เริ่มการสำรวจใหม่กี่ครั้งก็ได้หากยังไม่สมบูรณ์ คุณพร้อมไหม?"];

let resume_greet_msg = ["Hi! I am the chatbot for this App. Please select Resume to resume your previous survey or Restart to start again if you want change your previous answers.",
                        "你好！我是这个应用程序的聊天机器人。请选择 恢复 恢复你的 以前的调查或 续借 如果您想更改以前的答案，请重新开始。",
                        "Hai! Saya adalah bot sembang untuk Apl ini. Sila pilih Sambung semula untuk menyambung semula anda tinjauan sebelumnya atau Mula semula untuk memulakan semula jika anda ingin menukar jawapan anda yang terdahulu.",
                        "สวัสดี! ฉันเป็นแชทบ็อตสำหรับแอปนี้ โปรดเลือก ดำเนินการต่อ เพื่อดำเนินการสำรวจก่อนหน้าของคุณต่อ หรือ เริ่มต้นใหม่ เพื่อเริ่มใหม่อีกครั้ง หากคุณต้องการเปลี่ยนคำตอบก่อนหน้าของคุณ"];

let voice_en = [4, 1, 3]
let voice_ch = [2, 10, 2]
let voice_ma = [1, 28, 4]
let voice_th = [1, 26, 4]


window.onload = function () {
    // Initialises progress bar
    document.querySelector('#progress-bar')
        .addEventListener('mdl-componentupgraded', function() {
            this.MaterialProgress.setProgress(0);
        });
};

/**
 * Listen for changes in the firebase auth system
 * and initializes the user object.
 */
function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(() => {
        // Initialize current user object
        currentUser = firebase.auth().currentUser;

        if (isAvatar == "3dAvatar") {
            AC_VHost_Embed(8525827,600,800,"",1,1,2750834,0,1,0,"tJp4bnkiRwLYL8T57WV1tMnGizgzu2Tu",0,0);
        }
        else if (isAvatar == "drawingAvatar") {
            AC_VHost_Embed(8525827,600,800,"",1,1,2750835,0,1,0,"otHQnmjfsPHN7TZl0GNGVWaAsHaPbE8i",0,0);
        }

        initProgressData().then(() => {
            initChatbot();
        })
    });
}

/**
 * Synchronizes the local question data with the one
 * on the firestore database. Alternatively, initialize
 * the user branch on the firestore database.
 * @returns {PromiseLike<any> | Promise<any>}
 */
function initProgressData() {
    // The question data should be stored in
    // users/ [phone number/email] /
    let userID = getUserID();
    //let userID = phone === null ? currentUser.email : phone;

    // Formulating the response object

    // Retrieve the question index
    let reference = firebase.firestore().collection(USERS_BRANCH)
        .doc(userID);
    return reference.get().then((document) => {
        if (document.exists) {
            // If the branch exists, that means the user has visited
            // the chat bot page at least once

            // Synchronize question data and leave the other functions
            // to do the rest
            let questionData = document.data();
            questionIndex = questionData.questionIndex;

            if (questionData.currentSubQuestionIds === undefined) {
                currentSubQuestionIds = null;
            } else {
                currentSubQuestionIds = questionData.currentSubQuestionIds;
            }

            if (questionData.subQuestionIndex === undefined) {
                subQuestionIndex = null;
            } else {
                subQuestionIndex = questionData.subQuestionIndex;
            }

            console.log(questionIndex, currentSubQuestionIds, subQuestionIndex);
        } else {
            // The user is visiting the chat bot page for the
            // first time

            // document.data() will be undefined in this case
            console.log("User branch not found, initializing...");

            // Initialize questionIndex to 0 and sub question data to their
            // initial values
            firebase.firestore().collection(USERS_BRANCH)
                .doc(userID)
                .set({
                    questionIndex: NO_QUESTIONS_DONE,
                    currentSubQuestionIds: currentSubQuestionIds,
                    subQuestionIndex: subQuestionIndex
                })
                .then(() => {
                    console.log(`Branch 'users/${userID}' created`);
                    console.log(`questionIndex set to ${NO_QUESTIONS_DONE}`)
                })
                .catch(() => {
                    console.error("Error while initializing user branch " +
                        `'users/${userID}'`);
                });
        }
    })

}

/**
 * Initializes the chat bot based on the user's previous
 * survey instance.
 */
function initChatbot() {
    if (questionIndex === NO_QUESTIONS_DONE) {
        // Survey has not been started yet
        greeting();
    } else if (questionIndex === LAST_QUESTION_DONE) {
        // Survey has been completed
        showEndingMessage();
    } else {
        // Survey has been left off halfway
        resumeGreeting();
    }
}

/**
 * Greet the user and offer options to resume or restart
 * the survey.
 */
function resumeGreeting() {
    let contents = "";
    let select_language = localStorage.getItem(LANGUAGE_KEY);
    // Welcome message
    if(select_language=="Malay") {
        contents +=
        "<div class='space'>" +
        "<div class='message-container sender blue'>" +
        "<p>Hai! Saya adalah bot sembang untuk Apl ini.</p>" +
        "<p>Sila pilih \"Sambung semula\" untuk menyambung semula anda " +
        "tinjauan sebelumnya atau \"Mula semula\" untuk memulakan semula jika anda ingin menukar jawapan anda yang terdahulu.</p>" +
        "</div>" +
        "</div>"+
        "<div class=\"space\">" +
        "<button id='resume-survey-button' " +
        "class=\"mdl-button mdl-js-button " +
        "mdl-button--raised mdl-js-ripple-effect\" " +
        "onclick=\"resumeSurvey(this)\" " +
        "value=\"Resume\">" +
        "Sambung semula" +
        "</button>" +
        "<button id='restart-survey-button' " +
        "class=\"mdl-button mdl-js-button " +
        "mdl-button--raised mdl-js-ripple-effect\" " +
        "onclick=\"startSurvey(this)\" " +
        "value=\"Restart\">" +
        "Mula semula" +
        "</button>" +
        "</div>"

        // speak if avatar chatBox
        if (isAvatar != "N/A") {
            sayText(resume_greet_msg[2], voice_ma[0], voice_ma[1], voice_ma[2]);
        }
    }
    else if(select_language=="Chinese (Simplified)") {
        contents +=
        "<div class='space'>" +
        "<div class='message-container sender blue'>" +
        "<p>你好！我是这个应用程序的聊天机器人。</p>" +
        "<p>请选择 \"恢复\" 恢复你的 " +
        "以前的调查或 \"续借\" 如果您想更改以前的答案，请重新开始。</p>" +
        "</div>" +
        "</div>"+
        "<div class=\"space\">" +
        "<button id='resume-survey-button' " +
        "class=\"mdl-button mdl-js-button " +
        "mdl-button--raised mdl-js-ripple-effect\" " +
        "onclick=\"resumeSurvey(this)\" " +
        "value=\"Resume\">" +
        "恢复" +
        "</button>" +
        "<button id='restart-survey-button' " +
        "class=\"mdl-button mdl-js-button " +
        "mdl-button--raised mdl-js-ripple-effect\" " +
        "onclick=\"startSurvey(this)\" " +
        "value=\"Restart\">" +
        "续借" +
        "</button>" +
        "</div>"

        // speak if avatar chatBox
        if (isAvatar != "N/A") {
            sayText(resume_greet_msg[1], voice_ch[0], voice_ch[1], voice_ch[2]);
        }
    }
    else if(select_language=="Thai") {
        contents +=
        "<div class='space'>" +
        "<div class='message-container sender blue'>" +
        "<p>สวัสดี! ฉันเป็นแชทบ็อตสำหรับแอปนี</p>" +
        "<p>โปรดเลือก \"ดำเนินการต่อ\" เพื่อดำเนินการสำรวจก่อนหน้าของคุณต่อ " +
        "หรือ \"เริ่มต้นใหม่\" เพื่อเริ่มใหม่อีกครั้ง หากคุณต้องการเปลี่ยนคำตอบก่อนหน้าของคุณ</p>" +
        "</div>" +
        "</div>"+
        "<div class=\"space\">" +
        "<button id='resume-survey-button' " +
        "class=\"mdl-button mdl-js-button " +
        "mdl-button--raised mdl-js-ripple-effect\" " +
        "onclick=\"resumeSurvey(this)\" " +
        "value=\"Resume\">" +
        "ประวัติย่อ" +
        "</button>" +
        "<button id='restart-survey-button' " +
        "class=\"mdl-button mdl-js-button " +
        "mdl-button--raised mdl-js-ripple-effect\" " +
        "onclick=\"startSurvey(this)\" " +
        "value=\"Restart\">" +
        "ประวัติย่อ" +
        "</button>" +
        "</div>"

        // speak if avatar chatbot
        if (isAvatar != "N/A") {
            sayText(resume_greet_msg[3], voice_th[0], voice_th[1], voice_th[2]);
        }
    }
    else {
        contents +=
        "<div class='space'>" +
        "<div class='message-container sender blue'>" +
        "<p>Hi! I am the chatbot for this App.</p>" +
        "<p>Please select \"Resume\" to resume your " +
        "previous survey or \"Restart\" to start again if you want change your previous answers.</p>" +
        "</div>" +
        "</div>" +

        "<div class=\"space\">" +
        "<button id='resume-survey-button' " +
        "class=\"mdl-button mdl-js-button " +
        "mdl-button--raised mdl-js-ripple-effect\" " +
        "onclick=\"resumeSurvey(this)\" " +
        "value=\"Resume\">" +
        "Resume" +
        "</button>" +

        "<button id='restart-survey-button' " +
        "class=\"mdl-button mdl-js-button " +
        "mdl-button--raised mdl-js-ripple-effect\" " +
        "onclick=\"startSurvey(this)\" " +
        "value=\"Restart\">" +
        "Restart" +
        "</button>" +
        "</div>";

        // speak if avatar chatbot
        if (isAvatar != "N/A") {
            sayText(resume_greet_msg[0], voice_en[0], voice_en[1], voice_en[2]);
        }
    }
    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    setTimeout(() => messages.innerHTML += contents, delay);
    disableTextInput();
}

/**
 * function to initialise starting messages in chat and create "start survey" button.
 */
function greeting() {
    // format starting message html
    console.log(select_language);
    let quesTemplate =
        "<div class='space'>" +
        "<div class='message-container sender blue'>";
    if (select_language == "English") {
        quesTemplate += '<p ">Hi! I am the chatbot for this App.</p>' +
        "<p>To get started, can you please fill up this survey." +
        " You only have one attempt in completing the survey." +
        " You are allowed to restart the survey any number of times if it is still incomplete. " +
        "Are you ready?</p>" +
        "</div>" +
        "</div>";

        // speak if avatar chatBox
        if (isAvatar != "N/A") {
            sayText(greet_msg[0], voice_en[0], voice_en[1], voice_en[2]);
        }
    }
    else if(select_language == "Malay") {
        quesTemplate += '<p ">Hai! Saya adalah bot sembang untuk Apl ini.</p>' +
        "<p>Untuk bermula, bolehkah anda mengisi tinjauan ini." +
        "Anda hanya mempunyai satu percubaan untuk melengkapkan tinjauan." +
        "Anda dibenarkan untuk memulakan semula tinjauan beberapa kali jika ia masih tidak lengkap. " +
        "Adakah anda bersedia?</p>" +
        "</div>" +
        "</div>";

        // speak if avatar chatBox
        if (isAvatar != "N/A") {
            sayText(greet_msg[2], voice_ma[0], voice_ma[1], voice_ma[2]);
        }
    }
    else if(select_language =="Chinese (Simplified)"){
        quesTemplate += '<p >你好！我是这个应用程序的聊天机器人。</p>' +
        "<p>要开始，请您填写这份调查表。" +
        " 您只有一次尝试完成调查。" +
        " 如果调查仍未完成，您可以多次重新开始调查。" +
        "你准备好了吗？</p>" +
        "</div>" +
        "</div>";

        // speak if avatar chatBox
        if (isAvatar != "N/A") {
            sayText(greet_msg[1], voice_ch[0], voice_ch[1], voice_ch[2]);
        }
    }
    else if(select_language == "Thai"){
        quesTemplate += '<p >สวัสดี! ฉันเป็นแชทบ็อตสำหรับแอพนี้</p>' +
        "<p>ในการเริ่มต้น โปรดกรอกแบบสำรวจนี้" +
        " คุณมีความพยายามเพียงครั้งเดียวในการกรอกแบบสำรวจ" +
        " คุณได้รับอนุญาตให้เริ่มการสำรวจใหม่กี่ครั้งก็ได้หากยังไม่สมบูรณ์ " +
        "คุณพร้อมไหม?</p>" +
        "</div>" +
        "</div>";

        // speak if avatar chatBox
        if (isAvatar != "N/A") {
            sayText(greet_msg[3], voice_th[0], voice_th[1], voice_th[2]);
        }
    }

    // format start survey button html
    let mcqOptions = "<div class=\"space\">"
    if (select_language == "English" ){
        mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"startSurvey(this)\">Start Survey</button>";
        mcqOptions += "</div>";
    }else if(select_language == "Malay"){
        mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"startSurvey(this)\">Mulakan Tinjauan</button>";
        mcqOptions += "</div>";
    }else if (select_language == "Chinese (Simplified)"){
        mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"startSurvey(this)\">开始调查</button>";
        mcqOptions += "</div>";
    }else if (select_language=="Thai"){
        mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"startSurvey(this)\">เริ่มการสำรวจ</button>";
        mcqOptions += "</div>";
    }

    // set time out to display the message and start survey button
    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    setTimeout(() => {
        messages.innerHTML += quesTemplate;
        messages.innerHTML += mcqOptions;
    }, delay);

    // disable textbox
    disableTextInput();
}

/**
 * Starts the survey fresh
 */
function startSurvey(button) {
    button.disabled = true;
    // Display the choice as a message bubble
    let choice = button.textContent.trim();
    showMessageReceiver(choice);

    if (button.value === "Restart") {
        // Reset local progress data and sync with the cloud
        questionIndex = 0;
        subQuestionIndex = 0;
        currentSubQuestionIds = null;

        syncProgress();

        // Clear responses stored in the cloud
        purgeUserResponses();

        // Disable options
        document.getElementById("restart-survey-button")
            .disabled = true;
        document.getElementById("resume-survey-button")
            .disabled = true;
    }

    // Disable options
    let space = button.parentElement;
    for (let i = 0; i < space.childNodes.length; i++) {
        space.childNodes[i].disabled = true;
    }
    scrollToBottom();

    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    setTimeout(() => nextQuestion(), delay);
}

/**
 * Shows all previous conversations and resumes the survey
 */
function resumeSurvey(button) {
    // Display the choice as a message bubble
    let choice = button.textContent.trim();
    showMessageReceiver(choice);
    enableResume();

    // Populate the chatbot window with previous conversations
    noDelayMode = true;
    let lastTitleQuestion = "";
    firebase.firestore().collection(getUserResponsesBranch())
        .orderBy('timestamp')
        .get()
        .then(responses => {
            responses.forEach(response => {
                // For each response, output the question and the response
                let responseObject = response.data();
                let titleQuestion = responseObject.titleQuestion;
                let question = responseObject.question;
                let answer = responseObject.answer;
                let questionChoices = responseObject.restrictions.choices;
                if (titleQuestion !== null && titleQuestion !== undefined) {
                    // If this is the first sub-question of a long question type
                    if (lastTitleQuestion !== titleQuestion) {
                        lastTitleQuestion = titleQuestion;
                        showShortQuestionMessage(titleQuestion);
                    }
                }

                showShortQuestionMessage(question);

                if (questionChoices == null){
                    showMessageReceiver(answer);
                } else {
                    if (typeof answer == "string") {
                        showMessageReceiver(answer.substr(3))
                    } else {
                        showMessageReceiver(questionChoices[answer]);
                    }
                }
            });

        })
        .then(() => {
            // Disable options
            document.getElementById("restart-survey-button")
                .disabled = true;
            document.getElementById("resume-survey-button")
                .disabled = true;

            scrollToBottom();

            let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
            setTimeout(() => nextQuestion(), delay);
            updateProgress();

            // After previous conversations are loaded, re-enable
            // message delay
            noDelayMode = false;
        });
}
