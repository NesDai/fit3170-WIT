//References
let content_box = document.getElementById("content-box")
let backButtonRef = document.getElementById("backButton");
let titleRef = document.getElementById("title");

// set title and back button of page according to selected language
// initialising array of translations of the above mentioned page parts // TODO get confirmation form clients for these translations from google translate
let titles = ["解释性声明", "Pernyataan Penjelasan", "คำชี้แจง"];
let backButtonTexts = ["回页", "Kembali", "กลับมา"];

// get selected language
let select_language = localStorage.getItem("LANGUAGE");

// change page elements according to selected language
// display long explanatory statement in selected language
if (select_language == "English") {
    content_box.innerHTML = uploadExplanatoryStatement_en_long();
}
else if (select_language == "Chinese (Simplified)") {
    content_box.innerHTML = uploadExplanatoryStatement_zh_CN_long();
    titleRef.innerHTML = titles[0];
    backButtonRef.innerHTML = backButtonTexts[0];
}
else if (select_language == "Malay") {
    content_box.innerHTML = uploadExplanatoryStatement_ms_long()
    titleRef.innerHTML = titles[1];
    backButtonRef.innerHTML = backButtonTexts[1];
}
else if (select_language == "Thai") {
    content_box.innerHTML = uploadExplanatoryStatement_th_long();
    titleRef.innerHTML = titles[2];
    backButtonRef.innerHTML = backButtonTexts[2];
}
else {
    content_box.innerHTML = uploadExplanatoryStatement_en_long();
}
