//References
let checkbox = document.getElementById("checkbox");
let tick_warningRef = document.getElementById("tick_warning");
let tick_line = document.getElementById("tick_warning_line");
let content_box = document.getElementById("content-box");
let confirmButtonRef = document.getElementById("confirmButton");
let titleRef = document.getElementById("title");
let checkbox_textRef = document.getElementById("checkbox_text");
let backButtonRef = document.getElementById("back_btn_tc");

// add event listener for when confirm button is clicked
confirmButtonRef.addEventListener("click", checkAccepted);

// set title, checkbox text, buttons and tick_warning of page according to selected language
// initialising array of translations of the above mentioned page parts // TODO get confirmation form clients for these translations from google translate
let titles = ["使用条款", "Terma Penggunaan", "เงื่อนไขการใช้บริการ"];
let checkbox_texts = ["我已阅读并接受使用条款", "Saya telah membaca dan menerima Syarat Penggunaan", "ฉันได้อ่านและยอมรับข้อกำหนดการใช้งาน"];
let tick_warnings = ["请在上方打勾以确认使用条款", "Sila Tandakan di atas untuk Mengakui Syarat Penggunaan", "โปรดทำเครื่องหมายด้านบนเพื่อรับทราบข้อกำหนดการใช้งาน"];
let backButtonTexts = ["回页", "Kembali", "กลับมา"];
let confirmButtonTexts = ["确认", "mengesahkan", "ยืนยัน"];

// get selected language
let select_language = localStorage.getItem("LANGUAGE");

// change page elements according to selected language
if (select_language == "Chinese (Simplified)") {
    //titleRef.innerHTML = titles[0];
    checkbox_textRef.innerHTML = checkbox_texts[0];
    tick_warningRef.innerHTML = tick_warnings[0];
    backButtonRef.innerHTML = backButtonTexts[0];
    confirmButtonRef.innerHTML = confirmButtonTexts[0];
} else if (select_language == "Malay") {
    //titleRef.innerHTML = titles[1];
    checkbox_textRef.innerHTML = checkbox_texts[1];
    tick_warningRef.innerHTML = tick_warnings[1];
    backButtonRef.innerHTML = backButtonTexts[1];
    confirmButtonRef.innerHTML = confirmButtonTexts[1];
} else if (select_language == "Thai") {
    //titleRef.innerHTML = titles[2];
    checkbox_textRef.innerHTML = checkbox_texts[2];
    tick_warningRef.innerHTML = tick_warnings[2];
    backButtonRef.innerHTML = backButtonTexts[2];
    confirmButtonRef.innerHTML = confirmButtonTexts[2];
}

// function to check if user has clicked the checkbox before letting them continue to chatbot page
function checkAccepted() {
    // if it is checked, update user's realtime database data that they accept the terms of use
    if (checkbox.checked){

        window.location.href = "./signup.html";


    } else {
        // if the tickbox is not ticked, display error message
        tick_warningRef.hidden = false
        tick_line.hidden = false
    }
}

// display terms of use contents as selected language
if (select_language == "English") {
    content_box.innerHTML = uploadTermsOfUse_en();
}
else if (select_language == "Chinese (Simplified)") {
    content_box.innerHTML = uploadTermsOfUse_zn_CN();
}
else if (select_language == "Malay") {
    content_box.innerHTML = uploadTermsOfUse_ms();
}
else if (select_language == "Thai") {
    content_box.innerHTML = uploadTermsOfUse_th();
}
else {
    content_box.innerHTML = uploadTermsOfUse_en();
}
