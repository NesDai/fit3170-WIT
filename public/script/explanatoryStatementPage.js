//References
let checkbox_textRef = document.getElementById("acceptStatement")
let tick_warningRef = document.getElementById("tick-warning")
let content_box = document.getElementById("content-box")
let confirmButtonRef = document.getElementById("confirmButton")
let backButtonRef = document.getElementById("backButton");
let titleRef = document.getElementById("title");

// add event listener for when confirm button is clicked
confirmButtonRef.addEventListener("click", checkAccepted);

// set title, checkbox text, buttons and tick_warning of page according to selected language
// initialising array of translations of the above mentioned page parts // TODO get confirmation form clients for these translations from google translate
let titles = ["解释性声明", "Pernyataan Penjelasan", "คำชี้แจง"];
let checkbox_texts = ["我已阅读并接受解释性声明", "Saya telah membaca dan setuju Pernyataan Penjelasan", "ฉันได้อ่านและยอมรับข้อคำชี้แจง"];
let tick_warnings = ["请在上方打勾以确认解释性声明", "Sila Tandakan di atas untuk Mengakui Pernyataan Penjelasan", "โปรดทำเครื่องหมายด้านบนเพื่อยอมรับใคำชี้แจง"];
let backButtonTexts = ["回页", "Kembali", "กลับมา"];
let confirmButtonTexts = ["确认", "mengesahkan", "ยืนยัน"];

// get selected language
let select_language = localStorage.getItem(LANGUAGE_KEY);


// change page elements according to selected language
// display explanatory statement in selected language
if (select_language == "English") {
    content_box.innerHTML = uploadExplanatoryStatement_en_short();
}
else if (select_language == "Chinese (Simplified)") {
    content_box.innerHTML = uploadExplanatoryStatement_zh_CN_short();
    titleRef.innerHTML = titles[0];
    checkbox_textRef.innerHTML = checkbox_texts[0];
    tick_warningRef.innerHTML = tick_warnings[0];
    backButtonRef.innerHTML = backButtonTexts[0];
    confirmButtonRef.innerHTML = confirmButtonTexts[0];
}
else if (select_language == "Malay") {
    content_box.innerHTML = uploadExplanatoryStatement_ms_short();
    titleRef.innerHTML = titles[1];
    checkbox_textRef.innerHTML = checkbox_texts[1];
    tick_warningRef.innerHTML = tick_warnings[1];
    backButtonRef.innerHTML = backButtonTexts[1];
    confirmButtonRef.innerHTML = confirmButtonTexts[1];
}
else if (select_language == "Thai") {
    content_box.innerHTML = uploadExplanatoryStatement_th_short();
    titleRef.innerHTML = titles[2];
    checkbox_textRef.innerHTML = checkbox_texts[2];
    tick_warningRef.innerHTML = tick_warnings[2];
    backButtonRef.innerHTML = backButtonTexts[2];
    confirmButtonRef.innerHTML = confirmButtonTexts[2];
}
else {
    content_box.innerHTML = uploadExplanatoryStatement_en_short();
}


// function to check if user has clicked the checkbox before letting them continue to chatbot page
function checkAccepted () {
    let isAvatar = localStorage.getItem("avatar");

    // if it is checked, update user's realtime database data that they accept the Explanatory Statement
    if (checkbox.checked) {
        // if user is using phone
        if ( navigator.userAgent.match(/Android/i)
           || navigator.userAgent.match(/webOS/i)
           || navigator.userAgent.match(/iPhone/i)
           || navigator.userAgent.match(/iPad/i)
           || navigator.userAgent.match(/iPod/i)
           || navigator.userAgent.match(/BlackBerry/i)) {

             if (isAvatar == "3dAvatar") {
                 window.location.href = "./avatar_phone.html"
             }
             else if (isAvatar == "drawingAvatar") {
                 window.location.href = "./avatar_drawing_phone.html"
             }
             else if (isAvatar == "robotAvatar") {
                 window.location.href = "./avatar_robot_phone.html"
             }
             else {
                 window.location.href = "./chatbot.html"
             }

        }
        else {
            if (isAvatar == "3dAvatar") {
                window.location.href = "./avatar.html"
            }
            else if (isAvatar == "drawingAvatar") {
                window.location.href = "./avatar_drawing.html"
            }
            else if (isAvatar == "robotAvatar") {
                window.location.href = "./avatar_robot.html"
            }
            else {
                window.location.href = "./chatbot.html"
            }
        }
    }
    else {
        // if the tickbox is not ticked, display error message
        tick_warningRef.hidden = false
    }
}

// if chatbot is with 3d avatar
function set3dAvatar() {
    localStorage.setItem("avatar", "3dAvatar")
}

// if chatbot is with drawing avatar
function setDrawingAvatar() {
    localStorage.setItem("avatar", "drawingAvatar")
}

// if chatbot is with robot avatar
function setRobotAvatar() {
    localStorage.setItem("avatar", "robotAvatar")
}
