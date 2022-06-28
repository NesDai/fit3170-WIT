// Caches the title question of the current sub-question
let titleQuestionString = null;

// Initializing variables
let messages = document.getElementById("messages");
let textBoxInput = document.getElementById("message");
let messageLabel = document.getElementById("messageLabel");
let textInput = document.getElementById("message-form");
let submit = document.getElementById("submit");
let input = document.getElementById("input-box");
let errorText = document.getElementById("error-text");
let messageHistoryColour = 'white';
let skippedToEnd = null;
let joinFutureResearchExist = null;
let otherChosen = false;
let MCQOptionIDs = [];
let possibleAnswersMCQ = [];
let othersAnswers = [];
let question_bubble_no = 0;
var speechSynth = window.speechSynthesis;
var voices = [];
let currSection = 0;
let resumeCond = false;
// Translated text of "Please type your answer in the text box."
errorMsg_no_input = ["请在文本框中输入您的答案。", "Sila taip jawapan anda dalam kotak teks.", "กรุณาพิมพ์คำตอบของคุณในกล่องข้อความ"];

// Translated text of "character limit exceeded"
errorMsg_char_limit = ["超出字数限制", "melebihi had aksara", "เกินจำนวนอักขระสูงสุด"];

// Translated text of "The answer is too long"
errorMsg_ans_long = ["答案太长", "Jawapannya terlalu panjang", "คำตอบยาวเกินไป"];

// get user's selected language and set the questions branches id to the corresponding index for that language
let select_language = localStorage.getItem(LANGUAGE_KEY);

let branch_id;
if (select_language == "English") {
    document.getElementById("chatBotTitle").innerHTML='<i class="material-icons">chat_bubble_outline</i>'+"Chat bot"
    messageLabel.innerHTML="message..."
    submit.innerHTML="Send"
    branch_id = EN_INDEX;
} else if (select_language == "Chinese (Simplified)") {
    document.getElementById("chatBotTitle").innerHTML='<i class="material-icons">chat_bubble_outline</i>'+"聊天机器人"
    messageLabel.innerHTML="消息。。。"
    submit.innerHTML="发送"
    branch_id = ZH_CN_INDEX;
} else if (select_language == "Malay") {
    document.getElementById("chatBotTitle").innerHTML='<i class="material-icons">chat_bubble_outline</i>'+"Bot Sembang"
    messageLabel.innerHTML="Mesej..."
    submit.innerHTML="Hantar"
    branch_id = MS_INDEX;
} else if (select_language == "Thai") {
    document.getElementById("chatBotTitle").innerHTML='<i class="material-icons">chat_bubble_outline</i>'+"แชทบอท"
    messageLabel.innerHTML="ข้อความ"
    submit.innerHTML="ส่ง"
    branch_id = TH_INDEX;
}

// ready close message
let close_msg = ["Are you ready to finish the survey?",
                 "你准备好完成调查了吗？",
                 "Adakah anda bersedia untuk menyelesaikan tinjauan?",
                 "คุณพร้อมจะทำแบบสำรวจให้เสร็จหรือไม่?"]

// future research question
let research_msg = ["We would like to hear from you again in a few months' time. Would you like to participate in the qualitative study?",
                    "我们希望在几个月后再次收到您的来信。您想参加定性研究吗？",
                    "Kami ingin mendengar daripada anda sekali lagi dalam masa beberapa bulan. Adakah anda ingin mengambil bahagian dalam kajian kualitatif?",
                    "เราอยากได้ยินจากคุณอีกครั้งในอีกไม่กี่เดือนข้างหน้า คุณต้องการที่จะมีส่วนร่วมในการศึกษาเชิงคุณภาพ?"]

// online transaction message
let transaction_msg = ["Thank you for completing the survey! A token of participation will be granted via online transaction. Token of appreciation 10 ringgit will not be processed if you do not fill in your payment details.",
                       "感谢您完成调查！将通过在线交易授予参与令牌。 如果您不填写付款详细信息，感谢现金 10 ringgit 将不予转入您的账户",
                       "Terima kasih kerana melengkapkan tinjauan! Token penyertaan akan diberikan melalui transaksi dalam talian. Token penghargaan 10 ringgit tidak akan diproses jika anda tidak mengisi butiran pembayaran anda.",
                       "ขอบคุณที่ทำแบบสำรวจให้เสร็จ! โทเค็นของการเข้าร่วมจะได้รับผ่านการทำธุรกรรมออนไลน์ โทเค็นแสดงความขอบคุณ 10 ringgit จะไม่ถูกดำเนินการหากคุณไม่กรอกรายละเอียดการชำระเงินของคุณ"]

// ending message
let end_msg = ["Thank you so much for your participation in this survey.",
               "非常感谢您参与本次调查。",
               "Terima kasih banyak atas penyertaan anda dalam tinjauan ini.",
               "ขอบคุณมากสำหรับการเข้าร่วมในแบบสำรวจนี้"]

// thank you message
let thank_msg = ["Thank you for your time.",
                 "感谢您的时间。",
                 "Terima kasih atas masa anda.",
                 "ขอขอบคุณสำหรับเวลาของคุณ."]

disableInput();

/*
The user object of the currently logged in user.

Can be used to retrieve details such as phone number
and user ID.
 */
let currentUser = null;
let currentQuestionId = null;
let currentQuestionObject = null;
let currentLongQuestionObject = null;

/*
Stores the index of the current question object.

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
Used for likert scale indexes of questions stored in firebase
 */
let agreeLikertQues = [13, 27]; //[1] Strongly Disagree [2] Disagree [3] Neutral [4] Agree [5] Strongly Agree
let satisfyLikertQues = [16]; //[0] Not Applicable [1] Very Dissatisfied [2] Dissatisfied [3] Neutral [4] Satisfied [5] Very Satisfied
let confidentLikertQues = [19,20,22]; //[0] Not Applicable [1] Not Confident At All [2] Somewhat Not Confident [3] Moderately Confident [4] Somewhat Confident [5] Extremely Confident
let interestedLikertQues = [25] //[1] Extremely Not Interested [2] Not Interested [3] Neutral [4] Interested [5] Extremely Interested
let oftenLikertQues = [23];

//translation
// changeLang(select_language);

/**
 * onclick function for option buttons.
 * This functions displays and records the response of the MCQ answer option clicked from user.
 * @param button The option button
 */
function select(button, index) {
    // clear any error message
    errorText.innerHTML = "";

    // get selected button's text
    let choice = currentQuestionObject.restrictions.choices[index-1];

    // format choice html text bubble
    let ansTemplate = '<div class="space">\
                            <div class="message-container receiver notranslate">\
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


    if(questionIndex==1 & choice=="Male"){
        if(select_language=="Thai"){
            let ansTemplate = '<div class="space">\
            <div class="message-container sender blue current notranslate">\
            <p>แบบสำรวจนี้สำหรับผู้หญิงเท่านั้น</p>\
            </div>\
            </div>';
        }else if(select_language=="Malay"){
            let ansTemplate = '<div class="space">\
            <div class="message-container sender blue current notranslate">\
            <p>Tinjauan ini untuk wanita sahaja</p>\
            </div>\
            </div>';
        }else if(select_language=="Chinese (Simplified)"){
            let ansTemplate = '<div class="space">\
            <div class="message-container sender blue current notranslate">\
            <p>此调查仅针对女性</p>\
            </div>\
            </div>';
        }else{
            let ansTemplate = '<div class="space">\
                <div class="message-container sender blue current notranslate">\
                <p>This survey is for women only</p>\
                </div>\
                </div>';
        }
        messages.innerHTML+=ansTemplate
    }

    // extract skip target and skip choices from currentQuestionObject
    let skipTarget = currentQuestionObject.restrictions.skipTarget;
    let skipChoices = currentQuestionObject.restrictions.skipChoices;

    // check the type of skip target
    if (skipTarget === SKIP_NOT_ALLOWED) {
        // Don't skip next question
        nextQuestion();
        saveResponse(index-1);
    } else if (skipTarget === SKIP_END_SURVEY) {
        // check if one of the skipChoices were selected. If so, end survey
        if (skipChoices.includes(choice)) {
            endSurvey(index-1);
        } else { // else move onto the next question
            nextQuestion();
            saveResponse(index-1);
        }
    } else {
        // Skip to a question ID if the selected answer is in skipChoices
        if (skipChoices.includes(choice)) {
            // display the next question after a small delay
            let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;

            setTimeout(() => {
                // increment subQuestionIndex to be like nextQuestion call
                subQuestionIndex++;

                // save index of choice onto firebase
                saveResponse(index-1);

                // set currentQuestionId to skipTarget
                currentQuestionId = skipTarget;

                // Set the current question index to the question before the
                // skip target since nextQuestion increments
                // the question index by 1
                questionIndex = QUESTION_IDS[branch_id].indexOf(skipTarget) - 1;

                // In case the user was answering a long question,
                // reset params related to long questions
                currentSubQuestionIds = null;

                nextQuestion();

                // call sync progress to update currentSubQuestionIds and questionID after nextQuestion
                syncProgress();
                }, delay);
        } else {
            // display the next question after a small delay
            nextQuestion();
            saveResponse(index-1);
        }
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
    disableInput();
    // check if the input is valid
    if (message.length > 0) {
        if (type ===TYPE_MULTIPLE_CHOICE ||
            type === TYPE_MULTIPLE_CHOICE_SUB_QUESTION){
            message = message.trim();

            // getting which index does message correspond to in currentQuestionObject.restrictions.choices based on possibleAnswersMCQ
            for (let i = 0; i < possibleAnswersMCQ.length; i++) {
                if (possibleAnswersMCQ[i].includes(message.toLowerCase())) {
                    select(document.getElementById(MCQOptionIDs[i]), i+1);
                    break;
                }
            }
        }
        else if (type === TYPE_MULTIPLE_CHOICE_OTHERS) {
            message = message.trim();

            // check if others option was chosen
            if (otherChosen) {
                // resets otherChosen
                otherChosen = false;

                // display input
                showMessageReceiver(message);

                // display next question after time delay and scroll to bottom of screen
                nextQuestion();
                saveResponse((currentQuestionObject.restrictions.choices.length - 1) + ". " + message);
                scrollToBottom();
            }
            else {
                // getting which index does message correspond to in currentQuestionObject.restrictions.choices based on possibleAnswersMCQ
                for (let i = 0; i < possibleAnswersMCQ.length; i++) {
                    if (possibleAnswersMCQ[i].includes(message.toLowerCase())) {
                        select(document.getElementById(MCQOptionIDs[i]), i+1);
                        break;
                    }
                }
            }
        }
        else if(type === TYPE_NUMERIC || type === TYPE_NUMERIC_SUB_QUESTION){
            // Saving the response before clearing the input box
            let numInput = input.value;

            // display input
            showMessageReceiver(message);

            if (currentQuestionObject.restrictions.skipIfInvalid) {
                if (currentQuestionObject.restrictions.skipTarget !== SKIP_END_SURVEY) {
                    if (currentQuestionObject.restrictions.skipTarget !== SKIP_NOT_ALLOWED && (parseInt(numInput) < currentQuestionObject.restrictions.lowerRange || parseInt(numInput) > currentQuestionObject.restrictions.upperRange)) {
                        // Set the current question index to the question before the skip target since nextQuestion increments
                        // the question index by 1
                        questionIndex = QUESTION_IDS[branch_id].indexOf(currentQuestionObject.restrictions.skipTarget) - 1;


                        // In case the user was answering a long question, reset params related to long questions
                        currentSubQuestionIds = null;



                        // call sync progress to update currentSubQuestionIds and questionID after nextQuestion
                        syncProgress();
                    }
                }
            }

            // display next question after time delay and scroll to bottom of screen
            nextQuestion();
            saveResponse(parseInt(numInput));
            scrollToBottom();
        }
        else {
            // Saving the response before clearing the input box
            let textInput = input.value;

            // display input
            showMessageReceiver(message);

            // display next question after time delay and scroll to bottom of screen
            nextQuestion();
            scrollToBottom();
            saveResponse(textInput);

        }

        // clear textbox
        input.value = "";

        // Prevent users from using text box
        //disableInput();
    } else {
      errorText.style.visibility = "visible";
      if (select_language == "Chinese (Simplified)") {
          errorText.innerHTML = errorMsg_no_input[0];
      }
      else if (select_language == "Malay") {
          errorText.innerHTML = errorMsg_no_input[1];
      }
      else if (select_language == "Thai") {
          errorText.innerHTML = errorMsg_no_input[2];
      }
      else {
          errorText.innerHTML = "Please type your answer in the text box.";
      }
      enableInput();
    }
}


/**
 * Function to increment through survey questions one by one and display them.
 */
function nextQuestion() {
    console.log("nextQuestion() is called.")
    // check if currentQuestionObject is null
    if (currentSubQuestionIds !== null && currentSubQuestionIds !== undefined) {
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
    } else if (currentQuestionObject === null) {
        // The user is answering its first survey question
        showQuestion(false);
    } else if (questionIndex < QUESTION_IDS[branch_id].length - 1) { // check if questionIndex is still not at the end of survey questions
        // The user is answering a normal question
        questionIndex++;
        showQuestion(false);
    } else if (skippedToEnd){
        showEndingMessage();
    } else { //  else end the survey
        showEndingMessage();
    }
}

/**
 * Shows the ending message when the survey has been completed.
 */
function showEndingMessage() {
    // disable the textbox and send button and empty textbox
    input.value = "";
    input.disabled = true;
    submit.disabled = true;
    input.onkeyup = () => {};

    // update progress bar
    questionIndex = QUESTION_IDS[branch_id].length;
    updateProgress();

    // initialise userID and reference to user's branch in firestore database
    let userID = getUserID();
    let reference = firebase.firestore().collection(USERS_BRANCH).doc(userID)

    // if skippedTOEnd was
    if (skippedToEnd == true) {
        let userID = getUserID();
        firebase.firestore().collection(USERS_BRANCH).doc(userID).update({
            skippedToEnd: "Yes"
        });
    }

    // check if user exist in firestore
    reference.get().then((document) => {
        if (document.exists) {
            // check if the first closing message has been answered before by user and that if
            // skippedToEnd exists in user's branch
            let closedSurvey = document.data().closedSurvey;
            joinFutureResearchExist = (document.data().joinFutureResearch != null);
            skippedToEnd = (document.data().skippedToEnd != null);

            if (closedSurvey == null) {
                // asks if the user is ready to end the survey
                showReadyClosingMessage();
            } else if (closedSurvey != null && joinFutureResearchExist == false && skippedToEnd == false) {
                // show future research question if user has not finished answering it
                showFutureResearchQuestion();
            } else {
                // Show option to move to different pages of the app
                showMoveToDifferentPages();
            }
        } else {
            console.log("user does not exist.")
        }
    })

    // scroll to bottom of page
    scrollToBottom();
}

/**
 * Function to ask a question to user whether they are ready to end the survey.
 * (Can be implemented: can add a restart button here in case user wants to restart the survey after completing it)
 *
 * It only has a Yes option. After it is selected, selectClosingQuestionOption() is run with closing Id of 1.
 * The Closing ID 1 represent the option is for this question.
 */
function showReadyClosingMessage(){

    let select_language = localStorage.getItem(LANGUAGE_KEY);

    // display a question asking if the user wants to participate in future research

    if(select_language=="Malay"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>Adakah anda bersedia untuk menyelesaikan tinjauan?</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(close_msg[2], voice_ma[0], voice_ma[1], voice_ma[2])
        }
    }
    else if(select_language=="Chinese (Simplified)"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>你准备好完成调查了吗？</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(close_msg[1], voice_ch[0], voice_ch[1], voice_ch[2])
        }
    }
    else if(select_language=="Thai"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>คุณพร้อมจะทำแบบสำรวจให้เสร็จหรือไม่?</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(close_msg[3], voice_th[0], voice_th[1], voice_th[2])
        }
    }
    else {
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>Are you ready to finish the survey?</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(close_msg[0], voice_en[0], voice_en[1], voice_en[2])
        }
    }
    document.getElementById('hint_area').innerHTML = "";

    // display the option
    let questionOptions = "<div class=\"space\">"
    if(select_language =="Malay"){
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"endSurveyYes\" onclick=\"selectClosingQuestionOption(this, 1, 0)\">1. Ya</button>";
    }else if(select_language=="Chinese (Simplified)"){
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"endSurveyYes\" onclick=\"selectClosingQuestionOption(this, 1, 0)\">1. 是的</button>";
    }
    else if(select_language=="Thai"){
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"endSurveyYes\" onclick=\"selectClosingQuestionOption(this, 1, 0)\">1. ใช่</button>";
    }
    else{
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"endSurveyYes\" onclick=\"selectClosingQuestionOption(this, 1, 0)\">1. Yes</button>";
    }
    questionOptions += "</div>";
    messages.innerHTML += questionOptions;

    // open the text box to take input
    input.disabled = false;
    submit.disabled = false;
    // submit.setAttribute("onclick", "textInputClosingQuestion(0)");
}

/**
 * function to display the first closing message of the survey.
 * To ask if the user would want to participate in future research.
 *
 * It has 3 option; yes, no and maybe.
 * Selecting the options will call selectClosingQuestionOption() function with Closing ID 2.
 * The Closing ID 1 represent the option is for this question.
 */
function showFutureResearchQuestion(){
    // display a question asking if the user wants to participate in future research
    if (select_language =="Malay"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>Kami ingin mendengar daripada anda sekali lagi dalam masa beberapa bulan. Adakah anda ingin mengambil bahagian dalam kajian kualitatif (temu bual)?</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(research_msg[2], voice_ma[0], voice_ma[1], voice_ma[2])
        }
    }
    else if(select_language=="Chinese (Simplified)"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>我们希望在几个月后再次收到您的来信。您想参加定性研究（面试）吗？</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(research_msg[1], voice_ch[0], voice_ch[1], voice_ch[2])
        }
    }
    else if(select_language=="Thai"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>เราอยากได้ยินจากคุณอีกครั้งในอีกไม่กี่เดือนข้างหน้า คุณต้องการที่จะมีส่วนร่วมในการศึกษาเชิงคุณภาพ (สัมภาษณ์)?</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(research_msg[3], voice_th[0], voice_th[1], voice_th[2])
        }
    }
    else{
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>We would like to hear from you again in a few months' time. Would you like to participate in the qualitative study (interview)? </p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(research_msg[0], voice_en[0], voice_en[1], voice_en[2])
        }
    }
    document.getElementById('hint_area').innerHTML = "";

    // display the options
    let questionOptions = "<div class=\"space\">"
    if(select_language=="Malay"){
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchYes\" onclick=\"selectClosingQuestionOption(this, 1, 1)\">1. Ya</button>";
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchNo\" onclick=\"selectClosingQuestionOption(this, 2, 1)\">2. Tidak</button>";
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchMaybe\" onclick=\"selectClosingQuestionOption(this, 3, 1)\">3. Mungkin</button>";
    }else if(select_language=="Chinese (Simplified)"){
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchYes\" onclick=\"selectClosingQuestionOption(this, 1, 1)\">1. 是的</button>";
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchNo\" onclick=\"selectClosingQuestionOption(this, 2, 1)\">2. 不</button>";
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchMaybe\" onclick=\"selectClosingQuestionOption(this, 3, 1)\">3. 说不定</button>";
    }else if(select_language=="Thai"){
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchYes\" onclick=\"selectClosingQuestionOption(this, 1, 1)\">1. ใช่</button>";
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchNo\" onclick=\"selectClosingQuestionOption(this, 2, 1)\">2. ไม่</button>";
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchMaybe\" onclick=\"selectClosingQuestionOption(this, 3, 1)\">3. อาจจะ</button>";
    }
    else{
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchYes\" onclick=\"selectClosingQuestionOption(this, 1, 1)\">1. Yes</button>";
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchNo\" onclick=\"selectClosingQuestionOption(this, 2, 1)\">2. No</button>";
        questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchMaybe\" onclick=\"selectClosingQuestionOption(this, 3, 1)\">3. Maybe</button>";
    }
    questionOptions += "</div>";
    messages.innerHTML += questionOptions;

    // open the text box to take input
    input.disabled = false;
    submit.disabled = false;
    submit.setAttribute("onclick", "textInputClosingQuestion(1)");
}

/**
 * function to store response from user on future research participation and move on to next closing message.
 * @param button - the html element of the button that was clicked
 * @param index - the index of the option chosen
 * @param closingQsID - the ID of the closing question. which can be either:
 *                      1 - question from showReadyClosingMessage() funtion
 *                      2 - question from showFutureResearchQuestion() function
 */
function selectClosingQuestionOption(button, index, closingQsID){
    // disable the textbox and send button and empty the textbox
    input.value = "";
    input.disabled = true;
    submit.disabled = true;

    // initialise choice and get the user's ID (phone number they registered under)
    let choice;
    let userID = getUserID();
    let ansTranslate;

    // assign the choice with the strings used in the option
    if (index == 1) {
        choice = "Yes";
        if (select_language=="Malay"){
            ansTranslate="Ya";
        }else if (select_language=="Chinese (Simplified)"){
            ansTranslate="是的";
        }else if (select_language=="Thai"){
            ansTranslate="ใช่";
        }else{
            ansTranslate=choice;
        }
    } else if (index == 2) {
        choice = "No";
        if (select_language=="Malay"){
            ansTranslate="Tidak";
        }else if (select_language=="Chinese (Simplified)"){
            ansTranslate="不";
        }else if (select_language=="Thai"){
            ansTranslate="ไม่";
        }else{
            ansTranslate=choice;
        }
    } else if (index == 3) {
        choice = "Maybe";
        if (select_language=="Malay"){
            ansTranslate="Mungkin";
        }else if (select_language=="Chinese (Simplified)"){
            ansTranslate="说不定";
        }else if (select_language=="Thai"){
            ansTranslate="อาจจะ";
        }else{
            ansTranslate=choice;
        }
    }

    // update user's branch in firestore with data based on which closingQsID was answered
    if (closingQsID == 0) {
        firebase.firestore().collection(USERS_BRANCH).doc(userID).update({
            closedSurvey: choice
        })
    } else if (closingQsID == 1) {
        firebase.firestore().collection(USERS_BRANCH).doc(userID).update({
            joinFutureResearch: choice
        })
    }

    // print the choice chosen onto console
    console.log(choice);

    // format choice html text bubble
    let ansTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + ansTranslate + '</p>\
                            </div>\
                        </div>';

    // disable clicked button and other button options from MCQ question
    let space = button.parentElement;
    for (let i = 0; i < space.childNodes.length; i++) {
        space.childNodes[i].disabled = true;
    }

    // display user's choice on chat
    messages.innerHTML += ansTemplate;

    // display the next parts of the closing message depending on which the closingQsID
    if (closingQsID == 0) {
        if (skippedToEnd == true) { // scenario where user causes the end survey immediately logic
            // display a message to thank the participant for their time
            if (select_language=="Malay"){
                messages.innerHTML +=
                "<div class='space'>" +
                "<div class='message-container sender blue current'>" +
                `<p>Terima kasih atas masa anda.</p>` +
                "</div>" +
                "</div>";

                // text-to-speech if using avatar
                if (isAvatar != "N/A") {
                  sayText(thank_msg[2], voice_ma[0], voice_ma[1], voice_ma[2])
                }
            }
            else if (select_language=="Chinese (Simplified)"){
                messages.innerHTML +=
                "<div class='space'>" +
                "<div class='message-container sender blue current'>" +`<p>感谢您的时间。</p>` +
                "</div>" +
                "</div>";

                // text-to-speech if using avatar
                if (isAvatar != "N/A") {
                  sayText(thank_msg[1], voice_ch[0], voice_ch[1], voice_ch[2])
                }
            }
            else if (select_language=="Thai"){
                messages.innerHTML +=
                "<div class='space'>" +
                "<div class='message-container sender blue current'>" +`<p>ขอขอบคุณสำหรับเวลาของคุณ.</p>` +
                "</div>" +
                "</div>";

                // text-to-speech if using avatar
                if (isAvatar != "N/A") {
                  sayText(thank_msg[3], voice_th[0], voice_th[1], voice_th[2])
                }
            }
            else{
                messages.innerHTML +=
                "<div class='space'>" +
                "<div class='message-container sender blue current'>" +`<p>Thank you for your time.</p>` +
                "</div>" +
                "</div>";

                // text-to-speech if using avatar
                if (isAvatar != "N/A") {
                  sayText(thank_msg[0], voice_en[0], voice_en[1], voice_en[2])
                }
            }

            // Show option to move to different pages of the app
            showMoveToDifferentPages();
        } else if (skippedToEnd == false) { // when user finishes the survey normally
            // ask user if they want to participate in future research
            showFutureResearchQuestion();
        }
    } else if (closingQsID == 1) { // after user given their answer if they want to participate in future research
        // Show online transaction options
        showOnlineTransactionOptions();

        // Show option to move to different pages of the app
        showMoveToDifferentPages();
    }

    // scroll to bottom of message log
    scrollToBottom();
}

/**
 * function to check user input from textbox for answering the 2 closing questions of the chatbot
 * @param closingQsID - the ID of the closing question. which can be either:
 *                      1 - question from showReadyClosingMessage() funtion
 *                      2 - question from showFutureResearchQuestion() function
 */
function textInputClosingQuestion(closingQsID){
    // initialise yesOptions, noOptions and maybeOptions
    let yesOptions = ["yes", "1", "1. yes", "1.yes"];
    let noOptions = ["no", "2", "2. No", "2.No"];
    let maybeOptions = ["maybe", "3", "3. maybe", "3.maybe"];

    // check if the text input from textbox is one of the options in maybeOptions after converting all
    // alphabetic characters to lowercase
    if (maybeOptions.includes(input.value.toLowerCase())) {
        if (closingQsID == 1) {
            // activate selectClosingQuestionOption with respective chosen option value and closingQsID
            selectClosingQuestionOption(document.getElementById("futureResearchMaybe"), 3, closingQsID);
        }
    }

    // check if the text input from textbox is one of the options in yesOptions after converting all
    // alphabetic characters to lowercase
    else if (yesOptions.includes(input.value.toLowerCase())) {
        if (closingQsID == 0) {
            // activate selectClosingQuestionOption with respective chosen option value and closingQsID
            selectClosingQuestionOption(document.getElementById("endSurveyYes"), 1, closingQsID);
        } else if (closingQsID == 1) {
            // activate selectClosingQuestionOption with respective chosen option value and closingQsID
            selectClosingQuestionOption(document.getElementById("futureResearchYes"), 1, closingQsID);
        }
    }

    // check if the text input from textbox is one of the options in noOptions after converting all
    // alphabetic characters to lowercase
    else if (noOptions.includes(input.value.toLowerCase())){
         if (closingQsID == 1) {
            // activate selectClosingQuestionOption with respective chosen option value and closingQsID
            selectClosingQuestionOption(document.getElementById("futureResearchNo"), 2, closingQsID);
        }
    }
}

/**
 * function to show the online transaction options for users when they complete the survey.
 * the options will create a new tab to transaction links
 */
function showOnlineTransactionOptions(){
    // message
    if(select_language=="Thai"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>ขอบคุณที่ทำแบบสำรวจให้เสร็จ! โทเค็นของการเข้าร่วมจะได้รับผ่านการทำธุรกรรมออนไลน์</p>` +
        "</div>" +
        "</div>";
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>โทเค็นแสดงความขอบคุณ RM10 จะไม่ถูกดำเนินการหากคุณไม่กรอกรายละเอียดการชำระเงินของคุณ</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(transaction_msg[3], voice_th[0], voice_th[1], voice_th[2])
        }
    }
    else if(select_language=="Malay"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>Terima kasih kerana melengkapkan tinjauan! Token penyertaan akan diberikan melalui transaksi dalam talian.</p>` +
        "</div>" +
        "</div>";
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>Token penghargaan RM10 tidak akan diproses jika anda tidak mengisi butiran pembayaran anda.</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(transaction_msg[2], voice_ma[0], voice_ma[1], voice_ma[2])
        }
    }
    else if(select_language=="Chinese (Simplified)"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>感谢您完成调查！将通过在线交易授予参与令牌。</p>` +
        "</div>" +
        "</div>";
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>如果您不填写付款详细信息，感谢现金 RM10 将不予转入您的账户</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(transaction_msg[1], voice_ch[0], voice_ch[1], voice_ch[2])
        }
    }
    else{
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>Thank you for completing the survey! A token of participation will be granted via online transaction.</p>` +
        "</div>" +
        "</div>";
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>Token of appreciation RM10 will not be processed if you do not fill in your payment details.</p>` +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(transaction_msg[0], voice_en[0], voice_en[1], voice_en[2])
        }
    }
    document.getElementById('hint_area').innerHTML = "";

    // display the options
    let options = "<div class=\"space\">"
    if(select_language=="Malay"){
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.open('https://businessmy.au1.qualtrics.com/jfe/form/SV_2otWWj5OEYaGTLo','_blank')\">Internet Banking</button>";
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.open('https://businessmy.au1.qualtrics.com/jfe/form/SV_9FFrjrePW1hWT0G','_blank')\">e-Wallet/Grab/TnG</button>";
    }else if(select_language=="Chinese (Simplified)"){
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.open('https://businessmy.au1.qualtrics.com/jfe/form/SV_6tlMCzO3HSKg8FU','_blank')\">网上银行</button>";
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.open('https://businessmy.au1.qualtrics.com/jfe/form/SV_5iGfB3c9gQXA4qW','_blank')\">电子钱包//Grab/TnG</button>";
    }else if(select_language=="Thai"){
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.open('https://businessmy.au1.qualtrics.com/jfe/form/SV_ewGEyXijAKfNeQe','_blank')\">การธนาคาร</button>";
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.open('https://businessmy.au1.qualtrics.com/jfe/form/SV_baBzV5GgFOGDTYW','_blank')\">กระเป๋าเงินอิเล็กทรอนิกส์//Grab/TnG</button>";
    }else{
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.open('https://businessmy.au1.qualtrics.com/jfe/form/SV_ewGEyXijAKfNeQe','_blank')\">Online Banking</button>";
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.open('https://businessmy.au1.qualtrics.com/jfe/form/SV_baBzV5GgFOGDTYW','_blank')\">e-wallet//Grab/TnG</button>";
    }
    options += "</div>";
    messages.innerHTML += options;
}

/**
 * function to display options for users to click on to move to different pages of the app.
 */
function showMoveToDifferentPages(){
    // message
    if (select_language=="Chinese (Simplified)"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>"+
        "<p>非常感谢您参与本次调查。" +
        // uncomment line below when app is no longer in trial phase
        //" Now, feel free to browse on the <b>Recommender</b>, where you'll find interesting videos to broaden your skillsets. Or the <b>Forum</b>, where you get to know more friends!
        "</p>" +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(end_msg[1], voice_ch[0], voice_ch[1], voice_ch[2])
        }
    }
    else if (select_language=="Malay"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>"+
        "<p>Terima kasih banyak atas penyertaan anda dalam tinjauan ini." +
        // uncomment line below when app is no longer in trial phase
        //" Now, feel free to browse on the <b>Recommender</b>, where you'll find interesting videos to broaden your skillsets. Or the <b>Forum</b>, where you get to know more friends!
        "</p>" +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(end_msg[2], voice_ma[0], voice_ma[1], voice_ma[2])
        }
    }
    else if (select_language=="Thai"){
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>"+
        "<p>ขอบคุณมากสำหรับการเข้าร่วมในแบบสำรวจนี้" +
        // uncomment line below when app is no longer in trial phase
        //" Now, feel free to browse on the <b>Recommender</b>, where you'll find interesting videos to broaden your skillsets. Or the <b>Forum</b>, where you get to know more friends!
        "</p>" +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(end_msg[3], voice_th[0], voice_th[1], voice_th[2])
        }
    }
    else{
        messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>"+
        "<p>Thank you so much for your participation in this survey." +
        // uncomment line below when app is no longer in trial phase
        //" Now, feel free to browse on the <b>Recommender</b>, where you'll find interesting videos to broaden your skillsets. Or the <b>Forum</b>, where you get to know more friends!
        "</p>" +
        "</div>" +
        "</div>";

        // text-to-speech if using avatar
        if (isAvatar != "N/A") {
            sayText(end_msg[0], voice_en[0], voice_en[1], voice_en[2])
        }
    }
    document.getElementById('hint_area').innerHTML = "";

    // display the options to got to recommender, forum and main page respectively
    let options = "<div class=\"space\">"

    // uncomment the below 2 line when app is no longer in trial phase. these are to allow users to use recommender and forum page
    //options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.location.href = \'recommender_Ui.html\'\">Recommender</button>";
    //options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.location.href = \'forum.html\'\">Forum</button>";
    if(select_language=="Malay"){
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.location.href = \'main_page.html\'\">Muka surat utama</button>";
    }else if(select_language=="Chinese (Simplified)"){
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.location.href = \'main_page.html\'\">主页</button>";
    }else if(select_language=="Thai"){
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.location.href = \'main_page.html\'\">หน้าหลัก</button>";
    }else{
        options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.location.href = \'main_page.html\'\">Main Page</button>";
    }
    options += "</div>";
    messages.innerHTML += options;
}

/**
 * Appends a message bubble to the chat bot containing the specified message string.
 * This function is only used by the chatbot.
 * @param message - A message string
 */
function showMessageSender(message) {
    // display a message in html format below
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current notranslate'>" +
        `<p>${message}</p>` +
        //"<button  onclick = \"bindingFunc()\" class=\"text-to-speech\" id=\"text-to-speech-" + question_bubble_no + "\"></button>" +
        "</div>" +
        "</div>";

    question_bubble_no++;
}

/**
 * The function used to convert the question to speech. Used to implement the text-to-speech functionality
 */
function bindingFunc(){
    var toSpeak = new SpeechSynthesisUtterance(currentQuestionObject.question.replace( /(<([^>]+)>)/ig, ''));
    // Adjusts the rate of the speaker
    toSpeak.rate = 0.9;

    voices = speechSynth.getVoices();
    voices.forEach((voice)=>{
        if(voice.name === 'Google UK English Female'){
            toSpeak.voice = voice;
        }
    });
    speechSynth.speak(toSpeak);
}


/**
 * display a question from chatbot without any hint
 * @param message
 */
function showMessageSenderWithoutHints(message) {
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current notranslate'>" +
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
        "<div class='message-container sender blue current notranslate'>" +
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

            // DONT REMOVE THIS - Yong Peng
            console.log(currentQuestionObject);

            // speak the question if chatbot is with avatar
            if (isAvatar != "N/A") {
                // get the question for text-to-speech in avatar
                let question_txt = currentQuestionObject.question;
                question_txt = question_txt.replaceAll("<b>", "");
                question_txt = question_txt.replaceAll("</b>", "");
                // speak the question
                if (select_language == "Chinese (Simplified)") {
                    sayText(question_txt, voice_ch[0], voice_ch[1], voice_ch[2])
                }
                else if (select_language == "Malay") {
                    sayText(question_txt, voice_ma[0], voice_ma[1], voice_ma[2])
                }
                else if (select_language == "Thai") {
                    sayText(question_txt, voice_th[0], voice_th[1], voice_th[2])
                }
                else {
                    sayText(question_txt, voice_en[0], voice_en[1], voice_en[2])
                }
            }

            if(resumeCond){
                setCurrSection(currentQuestionObject.category);
                resumeCond = false;
            }
            if(currentQuestionObject.category!=PART_TITLE[currSection]){
                currSection += 1;
                if(select_language=="Malay"){
                    document.getElementById("messages").innerHTML +=
                    "<div class='space'>" +
                    "<div class='message-container sender blue current notranslate'><p>" +
                    PART_TITLE_Malay[currSection] +
                    "</p></div>" +
                    "</div>";
                }else if(select_language=="Chinese (Simplified)"){
                    document.getElementById("messages").innerHTML +=
                    "<div class='space'>" +
                    "<div class='message-container sender blue current notranslate'><p>" +
                    PART_TITLE_Chinese[currSection] +
                    "</p></div>" +
                    "</div>";
                }else if(select_language=="Thai"){
                    document.getElementById("messages").innerHTML +=
                    "<div class='space'>" +
                    "<div class='message-container sender blue current notranslate'><p>" +
                    PART_TITLE_Thai[currSection] +
                    "</p></div>" +
                    "</div>";
                }else{
                    document.getElementById("messages").innerHTML +=
                    "<div class='space'>" +
                    "<div class='message-container sender blue current notranslate'><p>" +
                    PART_TITLE[currSection] +
                    "</p></div>" +
                    "</div>";
                }
            }

            // checking the type of the question to assign the appropriate function to display it
            switch (questionType) {
                case TYPE_NUMERIC:
                case TYPE_NUMERIC_SUB_QUESTION:
                    showNumeric(questionObject);

                    if (agreeLikertQues.includes(questionIndex)) {
                        disableInput();
                        makeLikertScale(branch_id, "agree");
                    } else if (satisfyLikertQues.includes(questionIndex)){
                        disableInput();
                        makeLikertScale(branch_id, "satisfy");
                    } else if (confidentLikertQues.includes(questionIndex)){
                        disableInput();
                        makeLikertScale(branch_id, "confident");
                    } else if (interestedLikertQues.includes(questionIndex)){
                        disableInput();
                        makeLikertScale(branch_id, "interested");
                    }else if(oftenLikertQues.includes(questionIndex)){
                        disableInput()
                        makeLikertScale(branch_id, "often");
                    }else{
                        enableInput();
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
                    currentLongQuestionObject = questionObject;
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
 * @param questionObject - an object that contains the details of a numeric question
 */
function showNumeric(questionObject) {
    // anonymous function to check user input in textbox is valid or not
    input.onkeyup = () => {
        // get range of the expected answer
        let lowerRange = questionObject.restrictions.lowerRange;
        let upperRange = questionObject.restrictions.upperRange;

        if (input.value != ""){
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
                    errorText.innerHTML = "";
                    errorText.style.visibility = "hidden";
                    submit.onclick = addMessage;
                } else if(message < 0){
                    // If the number is negative
                    errorText.style.visibility = "visible";
                    if (select_language=="Malay"){
                        errorText.innerHTML = "bilangannya tidak boleh kurang daripada 0";
                    }else if (select_language=="Chinese (Simplified)"){
                        errorText.innerHTML="数字不能小于 0";
                    }else if (select_language=="Thai"){
                        errorText.innerHTML="จำนวนต้องไม่น้อยกว่า 0";
                    }else{
                        errorText.innerHTML = "the number can not be less than 0.";
                    }
                    submit.onclick = null;
                } else if(message > upperRange){
                    // If the number is larger than
                    errorText.style.visibility = "visible";
                    if (select_language=="Malay"){
                        errorText.innerHTML = "bilangannya tidak boleh lebih besar daripada "+ upperRange;
                    }else if (select_language=="Chinese (Simplified)"){
                        errorText.innerHTML="数字不能大于 " + upperRange;
                    }else if (select_language=="Thai"){
                        errorText.innerHTML="จำนวนต้องไม่เกิน " + upperRange;
                    }else{
                        errorText.innerHTML = "the number can not be larger than " + upperRange;
                    }
                    submit.onclick = null;
                } else {
                    // check if question requires use to end the survey if an invalid response is given
                    if (questionObject.restrictions.skipIfInvalid) {
                        if (questionObject.restrictions.skipTarget === SKIP_END_SURVEY) {
                            if(questionIndex==1){
                                let ansTemplate;
                                if (select_language=="Malay"){
                                    ansTemplate = '<div class="space">\
                                    <div class="message-container sender blue current notranslate">\
                                    <p>Umur hendaklah antara 60 hingga 100 tahun</p>\
                                    </div>\
                                    </div>';
                                }else if (select_language=="Chinese (Simplified)"){
                                    ansTemplate = '<div class="space">\
                                    <div class="message-container sender blue current notranslate">\
                                    <p>年龄应该在60到100之间</p>\
                                    </div>\
                                    </div>';
                                }else if (select_language=="Thai"){
                                    ansTemplate = '<div class="space">\
                                    <div class="message-container sender blue current notranslate">\
                                    <p>อายุควรอยู่ระหว่าง 60 ถึง 100</p>\
                                    </div>\
                                    </div>';
                                }else{
                                    ansTemplate = '<div class="space">\
                                    <div class="message-container sender blue current notranslate">\
                                    <p>The age should be between 60 to 100</p>\
                                    </div>\
                                    </div>';
                                }
                                messages.innerHTML+=ansTemplate
                            }
                            submit.onclick = endSurveyText;
                        } else {
                            submit.onclick = addMessage;
                        }
                    }
                }
            }
            else {
                // If it's not a number
                errorText.style.visibility = "visible";
                if (select_language=="Malay"){
                    errorText.innerHTML = "jawapannya mestilah nombor.";
                }else if (select_language=="Chinese (Simplified)"){
                    errorText.innerHTML="答案必须是一个数字。";
                }else if (select_language=="Thai"){
                    errorText.innerHTML="คำตอบต้องเป็นตัวเลข";
                }else{
                    errorText.innerHTML = "the answer needs to be a number.";
                }
                submit.onclick = null;
            }
        } else {
            // clear error text area
            errorText.innerHTML = "";
            errorText.style.visibility = "hidden";
        }
    }

    // display the question and enable the textbox
    showMessageSender(questionObject.question);
    //enableInput();
    disableInput();
}

/**
 * function to display the last answered item from user and re-display the current question again on the chat log.
 * NOT IN USE (it is because it make the chat cluttered)
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
      showMessageSender(question);
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

        // reset possibleAnswersMCQ back to an empty array
        possibleAnswersMCQ = [];

        // for loop to add possible answer string for each MCQ option
        for (let i=0; i < questionObject.restrictions.choices.length; i++) {
            possibleAnswersMCQ.push([]); // add empty array to store answer strings for choice i
            possibleAnswersMCQ[i].push((i+1).toString()); // MCQ option number
            possibleAnswersMCQ[i].push(i+1 + "."); // MCQ option number + .
            possibleAnswersMCQ[i].push(questionObject.restrictions.choices[i].toLowerCase()); // MCQ option word
            // MCQ option number + . + MCQ option word (no space before and after .)
            possibleAnswersMCQ[i].push((i+1) + "." + questionObject.restrictions.choices[i].toLowerCase());
            // MCQ option number + . + MCQ option word (with space after . only)
            possibleAnswersMCQ[i].push((i+1) + ". " + questionObject.restrictions.choices[i].toLowerCase());
        }

    input.onkeyup = () => {
      // set submit.onclick appropriately based on found
      submit.disabled = false;
      submit.onclick = checkMCQInput;
    }

    //enableInput();
    disableInput();
    let question = questionObject.question;
    let choices = questionObject.restrictions.choices;

    showMessageSender(question);
    showOptions(choices, false);
}

/**
* Function to check the text input from user to answer an MCQ.
*/
function checkMCQInput(){
    // get answer from textbox and remove spaces before the first non-space character and remove spaces after last non-space cahracters
    let message = (input.value).trim();
    // set found as false
    let found = false;

    // for loop to check if message is in possibleAnswersMCQ
    for (let i=0; i < possibleAnswersMCQ.length; i++){
        // if message is found to be in possibleAnswers
        if (possibleAnswersMCQ[i].includes(message.toLowerCase())) {
            found = true;
            break;
          }
    }

    // set submit.onclick appropriately based on found
    if (found) {
        errorText.innerHTML = "";
        addMessage();

    } else {
        errorText.innerHTML = "";
        errorText.style.visibility = "visible";
        errorText.innerHTML = "Please enter a number from (1 to " + (currentQuestionObject.restrictions.choices.length) + ") or enter the option word(s)";
        submit.onclick = null;
    }
}

/**
 * function to display multiple choice questions that can be answered by typing something in the textbox or by selecting one of the options available
 * @param questionObject- an Object from firebase which contain the question, it's multiple choice answers and skip logic.
 */
function showMultipleChoiceOthers(questionObject) {

        // reset possibleAnswersMCQ back to an empty array
        possibleAnswersMCQ = [];
        // initialise othersAnswers
        othersAnswers = [];

        // for loop to add possible answer string for each MCQ option
        for (let i=0; i < questionObject.restrictions.choices.length-1; i++) {
            possibleAnswersMCQ.push([]); // add empty array to store answer strings for choice i
            possibleAnswersMCQ[i].push((i+1).toString()); // MCQ option number
            possibleAnswersMCQ[i].push(i+1 + "."); // MCQ option number + .
            possibleAnswersMCQ[i].push(questionObject.restrictions.choices[i].toLowerCase()); // MCQ option word
            // MCQ option number + . + MCQ option word (no space before and after .)
            possibleAnswersMCQ[i].push((i+1) + "." + questionObject.restrictions.choices[i].toLowerCase());
            // MCQ option number + . + MCQ option word (with space after . only)
            possibleAnswersMCQ[i].push((i+1) + ". " + questionObject.restrictions.choices[i].toLowerCase());
        }

        // add possible answer string for each others option
        othersAnswers.push((questionObject.restrictions.choices.length).toString());// MCQ option number
        othersAnswers.push(questionObject.restrictions.choices.length + "."); // MCQ option number + .
        othersAnswers.push(questionObject.restrictions.choices[questionObject.restrictions.choices.length-1].toLowerCase()); // MCQ option word
        // MCQ option number + . + MCQ option word (no space before and after .)
        othersAnswers.push(questionObject.restrictions.choices.length + "." + questionObject.restrictions.choices[questionObject.restrictions.choices.length-1].toLowerCase());
        // MCQ option number + . + MCQ option word (with space after . only)
        othersAnswers.push(questionObject.restrictions.choices.length + ". " + questionObject.restrictions.choices[questionObject.restrictions.choices.length-1].toLowerCase());

    input.onkeyup = () => {
      // set submit.onclick appropriately based on found
      submit.disabled = false;
      submit.onclick = checkMCQInputOthers;
    }

    // allow users to use textbox
    //enableInput();
    disableInput();

    let question = questionObject.question;
    let choices = questionObject.restrictions.choices;

    showMessageSender(question);
    showOptions(choices, true);
}

/**
 * function to check textbox input for MCQ with others option
 * */
function checkMCQInputOthers(){
    // get answer from textbox and remove spaces before the first non-space character and remove spaces after last non-space cahracters
    let message = (input.value).trim();

    // check if text input is for "others" option
    if (othersAnswers.includes(message.toLowerCase())){
        // remove last error message and call othersOptionInput()
        errorText.innerHTML = "";
        othersOptionInput();
    } else {
        // initialise found as false
        let found = false;

        // for loop to check if message is in possibleAnswersMCQ
        for (let i=0; i < possibleAnswersMCQ.length; i++){
            // if message is found to be in possibleAnswers
            if (possibleAnswersMCQ[i].includes(message.toLowerCase())) {
                found = true;
                break;
            }
        }

        // set submit.onclick appropriately based on found
        if (found) {
            // remove last error message and call addMessage()
            errorText.innerHTML = "";
            addMessage();
        } else {
            // clear old error message and display a new one. Set the send button to null
            errorText.innerHTML = "";
            errorText.style.visibility = "visible";
            errorText.innerHTML = "Please enter a number from (1 to " + (currentQuestionObject.restrictions.choices.length) + ") or enter the option word(s)";
            submit.onclick = null;
        }
    }
}

/**
 * function that let the users enter their "others" option for MCQs in the textbox
 */
function othersOptionInput(){
    // reset textbox and scroll chat log to bottom
    scrollToBottom();
    input.value = "";
    otherChosen = true;

    showMessageSender(currentQuestionObject.restrictions.choices[currentQuestionObject.restrictions.choices.length-1] + ":");
    document.getElementById('hint_area').innerHTML = OTHERS_OPTION_HINTS[branch_id];

    input.onkeyup = () => {
        let message = input.value;
        if (message.length <= SHORT_TEXT_LENGTH) {
            // If it's not too long
            errorText.innerHTML = "";

            errorText.style.visibility = "hidden";
            submit.onclick = addMessage;
        } else {
            // If it's super long
            if (select_language == "Chinese (Simplified)") {
                errorText.innerHTML = errorMsg_char_limit[0];
            }
            else if (select_language == "Malay") {
                errorText.innerHTML = errorMsg_char_limit[1];
            }
            else if (select_language == "Thai") {
                errorText.innerHTML = errorMsg_char_limit[2];
            }
            else {
                errorText.innerHTML = "character limit exceeded";
            }
            errorText.style.visibility = "visible";
        }
    }

    // allow users to use textbox
    enableInput();
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
            if (select_language == "Chinese (Simplified)") {
                errorText.innerHTML = errorMsg_ans_long[0];
            }
            else if (select_language == "Malay") {
                errorText.innerHTML = errorMsg_ans_long[1];
            }
            else if (select_language == "Thai") {
                errorText.innerHTML = errorMsg_ans_long[2];
            }
            else {
                errorText.innerHTML = "The answer is too long";
            }
            errorText.style.visibility = "visible";
            submit.onclick = null;
            //submit.onclick = repromptQuestion;
        }

    }

    showMessageSender(questionObject.question);
    enableInput();
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
 * @param choices an array of string representing the options of an MCQ
 */
function showOptions(choices, hasOther) {
    let mcqOptions = "<div class=\"space\">"
    let numberOption = 1;
    let index = 1;

    MCQOptionIDs = [];

    if(!hasOther) {
        for (let i = 0; i < choices.length; i++){
            mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised notranslate\" onclick=\"select(this, " + index + ")\" id=\"" + currentQuestionObject.question_number + i + "\">" + numberOption + ". " + choices[i] + "</button>";
            numberOption ++;
            index++;
            MCQOptionIDs.push(currentQuestionObject.question_number + i);
        }
    } else {
        for (let i = 0; i < choices.length -1; i++){
            mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised notranslate\" onclick=\"select(this, " + index + ")\" id=\"" + currentQuestionObject.question_number + i + "\">" + numberOption + ". " + choices[i] + "</button>";
            numberOption ++;
            index++;
            MCQOptionIDs.push(currentQuestionObject.question_number + i);
        }
        mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised notranslate\" onclick=\"othersOptionInput()\" id=\"" + currentQuestionObject.question_number + (choices.length-1) + "\">" + numberOption + ". " + choices[choices.length-1] + "</button>";
        MCQOptionIDs.push(currentQuestionObject.question_number + (choices.length-1));
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
function endSurvey(endingAns) {
    questionIndex = QUESTION_IDS[branch_id].length;
    skippedToEnd = true;
    saveResponse(endingAns);

    nextQuestion();
}

/**
 * End Survey and display the user's response
 * in the chat bot window.
 * <br>
 * To be used by text-based survey questions ONLY
 */
function endSurveyText() {
    // show answer given
    showMessageReceiver(input.value);
    console.log("GUQ "+questionIndex);
    if(questionIndex==0){
        let ansTemplate;
        if(select_language=="Chinese (Simplified)"){
             ansTemplate = '<div class="space">\
                <div class="message-container sender blue current notranslate">\
                <p>此调查仅适用于年龄在 50 至 100 岁之间的人</p>\
                </div>\
                </div>';
        }else if(select_language=="Malay"){
             ansTemplate = '<div class="space">\
                <div class="message-container sender blue current notranslate">\
                <p>Survey ini hanya untuk mereka yang berumur antara 50 hingga 100 tahun</p>\
                </div>\
                </div>';
        }else if(select_language=="Thai"){
             ansTemplate = '<div class="space">\
                <div class="message-container sender blue current notranslate">\
                <p>การสำรวจนี้สำหรับผู้ที่มีอายุระหว่าง 50 ถึง 100 ปีเท่านั้น</p>\
                </div>\
                </div>';
        }else{
             ansTemplate = '<div class="space">\
                <div class="message-container sender blue current notranslate">\
                <p>This survery are only for people who are age between 50 to 100 years old</p>\
                </div>\
                </div>';
        }
        messages.innerHTML+=ansTemplate
    }
    // set question index to end, set skippedToEnd to true and save the answer
    questionIndex = QUESTION_IDS[branch_id].length;
    saveResponse(input.value);
    skippedToEnd = true;

    // hide errorText and call next question
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
    let progress = (questionIndex/QUESTION_IDS[branch_id].length) * 100;
    console.log('updateProgress() is called. Current percentage is ' + progress + '%.');
    document.querySelector('#progress-bar').MaterialProgress.setProgress(progress);

    $('#percentage').html(progress.toFixed(2) + "%");

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

function hashString(scaleIndex,number){
    switch (scaleIndex){
        case 0:
            scaleString = hash[branch_id][scaleIndex][number-1];
            break;
        case 1:
            scaleString = hash[branch_id][scaleIndex][number];
            break;
        case 2:
            scaleString = hash[branch_id][scaleIndex][number];
            break;
        case 3:
            scaleString = hash[branch_id][scaleIndex][number-1];
            break;
        case 4:
            scaleString = hash[branch_id][scaleIndex][number-1];
            break;
    }
    return scaleString;
}

/** Function of selecting likert options **/
function likertSelect(number,scaleIndex)
{
    document.getElementById('likert_scale').innerHTML='';
    // format choice html text bubble
    let ansTemp = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + hashString(scaleIndex,number) + '</p>\
                            </div>\
                        </div>';

    // display user's choice on chat
    messages.innerHTML += ansTemp;


    // Prevent users from using text box
    disableInput();

    // display next question and save user response after time delay and scroll to bottom of screen
    nextQuestion();
    scrollToBottom();
    saveResponse(number);
}

function enableInput(){
    enableTextInput()
    textInput.style.display = "initial";
}

function disableInput(){
    textInput.style.display="none";
    document.getElementById('hint_area').innerHTML = "";
}

function setCurrSection(nameSection){
        for(let i = 0;i<PART_TITLE.length;i++){
        if(nameSection==PART_TITLE[i]){
            currSection = i;
        }
    }
}

function enableResume(){
    resumeCond=true;
}
