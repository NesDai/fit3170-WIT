

const LANGUAGE_KEY = "LANGUAGE";

window.onload = execute();

document.getElementById("lang_butt_id_c").addEventListener("click", disableTranslateButton);  //listens to button change
document.getElementById("lang_butt_id_m").addEventListener("click", disableTranslateButton);  //listens to button change
document.getElementById("lang_butt_id_t").addEventListener("click", disableTranslateButton);  //listens to button change
document.getElementById("lang_butt_id_e").addEventListener("click", disableTranslateButton);  //listens to button change

function execute(){
    disableTranslateButton();
    eraseCookiesGoogle();
}


function eraseCookiesGoogle() {

    let list = ["__Secure-3PSIDCC","__Secure-3PSID","SID","SIDCC","__Secure-3PAPISID","__Secure-1PAPISID","HSID","SAPISID","APISID","SSID","1P_JAR","OGPC","CONSENT","OTZ","ANID","NID"]
    for(let cookie of list){
        document.cookie = `${cookie}=; domain=.google.com; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

    }



}

function showTranslationModal(){
    document.getElementById("myModal").style.display = "block";
}

function hideTranslationModal(){
    document.getElementById("myModal").style.display = "none";
}


function disableTranslateButton(){

    let lang = localStorage.getItem(LANGUAGE_KEY);

    if (lang == "Malay"){
        document.getElementById("lang_butt_id_m").disabled = true;
        document.getElementById("lang_butt_id_c").disabled = false;
        document.getElementById("lang_butt_id_t").disabled = false;
        document.getElementById("lang_butt_id_e").disabled = false;
        // change the title
        document.getElementById("select_language").innerHTML = "Pilih Bahasa";
        // change the button text
        document.getElementById("continue_btn").innerHTML = "teruskan";
    }
    else if (lang == "Chinese (Simplified)"){
        document.getElementById("lang_butt_id_c").disabled = true;
        document.getElementById("lang_butt_id_m").disabled = false;
        document.getElementById("lang_butt_id_t").disabled = false;
        document.getElementById("lang_butt_id_e").disabled = false;
        // change the title
        document.getElementById("select_language").innerHTML = "选择语言";
        // change the button text
        document.getElementById("continue_btn").innerHTML = "继续";
    }
    else if (lang == "Thai"){
        document.getElementById("lang_butt_id_t").disabled = true;
        document.getElementById("lang_butt_id_c").disabled = false;
        document.getElementById("lang_butt_id_m").disabled = false;
        document.getElementById("lang_butt_id_e").disabled = false;
        // change the title
        document.getElementById("select_language").innerHTML = "เลือกภาษา";
        // change the button text
        document.getElementById("continue_btn").innerHTML = "ดำเนินต่อ";
    }
    else{
        document.getElementById("lang_butt_id_e").disabled = true;
        document.getElementById("lang_butt_id_c").disabled = false;
        document.getElementById("lang_butt_id_m").disabled = false;
        document.getElementById("lang_butt_id_t").disabled = false;
        // change the title
        document.getElementById("select_language").innerHTML = "Select Language";
        // change the button text
        document.getElementById("continue_btn").innerHTML = "Continue";
    }


}



function getUserLanguage(){
    return  localStorage.getItem(LANGUAGE_KEY)
}

function changeLang(lang){
     console.log(window.location);
    // eraseCookiesGoogle();
    // translateLanguage(lang);

    // if (window.location.pathname =="/"){  //reset the captcha
    //     setTimeout(function(){
    //         window.location.reload(false);
    //     }, 1000);
    //     }
    localStorage.setItem(LANGUAGE_KEY, lang);
    if(lang == "English"){
        document.getElementById("username").innerHTML = "Welcome @" + current_us["username"];
        document.getElementById("translate_btn").innerHTML = "Translate";
        document.getElementById("chatbox_btn").innerHTML = "Chat Bot";

        document.getElementById("homeBanner").innerHTML = "Home Page";
        document.getElementById("chooseLang").innerHTML = "Choose Language:";
        document.getElementById("button-close-modal").innerHTML = "Back";
        document.getElementById("selectOne").innerHTML = "Choose one of the following:";
        document.getElementById("chatBoxHeader").innerHTML = "Chat Bot";
        document.getElementById("chatBoxText").innerHTML = "Answer simple questions and get the recommendations according to your interests";
        document.getElementById("chatBoxLink").innerHTML = "Open Chat bot";
        document.getElementById("recommendHeader").innerHTML = "Recommender";
        document.getElementById("recommendText").innerHTML = "Get recommendations of the videos and articles that suit your interests";
        document.getElementById("forumHeader").innerHTML = "Forum";
        document.getElementById("forumText").innerHTML = "Interact with other users by liking and commenting their posts and post your own thoughts and questions";
    }
    else if(lang == "Malay"){
        document.getElementById("username").innerHTML = "selamat datang @" + current_us["username"];
        document.getElementById("translate_btn").innerHTML = "terjemah";
        document.getElementById("chatbox_btn").innerHTML = "Bot Sembang";

        document.getElementById("homeBanner").innerHTML = "Halaman Utama";
        document.getElementById("chooseLang").innerHTML = "Pilih Bahasa:";
        document.getElementById("button-close-modal").innerHTML = "Belakang";
        document.getElementById("selectOne").innerHTML = "Pilih salah satu daripada yang berikut:";
        document.getElementById("chatBoxHeader").innerHTML = "Bot Sembang";
        document.getElementById("chatBoxText").innerHTML = "Jawab soalan mudah dan dapatkan cadangan mengikut minat anda";
        document.getElementById("chatBoxLink").innerHTML = "BUKA BOT SEMBANG";
        document.getElementById("recommendHeader").innerHTML = "Pengesyor";
        document.getElementById("recommendText").innerHTML = "Dapatkan cadangan video dan artikel yang sesuai dengan minat anda";
        document.getElementById("forumHeader").innerHTML = "Forum";
        document.getElementById("forumText").innerHTML = "Berinteraksi dengan pengguna lain dengan menyukai dan mengulas siaran mereka dan menyiarkan pemikiran dan soalan anda sendiri";
    }
    else if(lang == "Chinese (Simplified)"){
        document.getElementById("username").innerHTML = "欢迎 @" + current_us["username"];
        document.getElementById("translate_btn").innerHTML = "翻译";
        document.getElementById("chatbox_btn").innerHTML = "聊天机器人";

        document.getElementById("homeBanner").innerHTML = "主页";
        document.getElementById("chooseLang").innerHTML = "选择语言：";
        document.getElementById("button-close-modal").innerHTML = "后面";
        document.getElementById("selectOne").innerHTML = "选择以下选项之一：";
        document.getElementById("chatBoxHeader").innerHTML = "聊天机器人";
        document.getElementById("chatBoxText").innerHTML = "回答简单的问题并根据您的兴趣获得建议";
        document.getElementById("chatBoxLink").innerHTML = "打开聊天机器人";
        document.getElementById("recommendHeader").innerHTML = "推荐人";
        document.getElementById("recommendText").innerHTML = "获取适合您兴趣的视频和文章的推荐";
        document.getElementById("forumHeader").innerHTML = "论坛";
        document.getElementById("forumText").innerHTML = "通过喜欢和评论他们的帖子并发布您自己的想法和问题与其他用户互动";
    }
    else{
        document.getElementById("username").innerHTML = "ยินดีต้อนรับ @" + current_us["username"];
        document.getElementById("translate_btn").innerHTML = "แปลภาษา";
        document.getElementById("chatbox_btn").innerHTML = "แชทบอท";

        document.getElementById("homeBanner").innerHTML = "หน้าแรก";
        document.getElementById("chooseLang").innerHTML = "เลือกภาษา:";
        document.getElementById("button-close-modal").innerHTML = "กลับ";
        document.getElementById("selectOne").innerHTML = "เลือกอย่างใดอย่างหนึ่งต่อไปนี้:";
        document.getElementById("chatBoxHeader").innerHTML = "แชทบอท";
        document.getElementById("chatBoxText").innerHTML = "ตอบคำถามง่าย ๆ และรับคำแนะนำตามความสนใจของคุณ";
        document.getElementById("chatBoxLink").innerHTML = "เปิดแชทบอท";
        document.getElementById("recommendHeader").innerHTML = "ผู้แนะนำ";
        document.getElementById("recommendText").innerHTML = "รับคำแนะนำของวิดีโอและบทความที่เหมาะกับความสนใจของคุณ";
        document.getElementById("forumHeader").innerHTML = "ฟอรั่ม";
        document.getElementById("forumText").innerHTML = "โต้ตอบกับผู้ใช้รายอื่นด้วยการกดไลค์และแสดงความคิดเห็นโพสต์ของพวกเขาและโพสต์ความคิดและคำถามของคุณเอง";
    }

}



function reset(){

    eraseCookiesGoogle();
    localStorage.setItem(LANGUAGE_KEY, "English");
    jQuery('#\\:2\\.container').contents().find('#\\:2\\.restore').click();

    if (window.location.pathname =="/"){  //reset the captcha
        setTimeout(function(){
            window.location.reload(false);
        }, 1000);
    }
}


function googleTranslateElementInit() {
    eraseCookiesGoogle();
    new google.translate.TranslateElement(
        { pageLanguage: 'en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false },
        'google_translate_element');
}

function translateLanguage(lang) {


    localStorage.setItem(LANGUAGE_KEY, lang);

    googleTranslateElementInit();
    var $frame = $('.goog-te-menu-frame:first');
    if (!$frame.size()) {
        alert("Error: Could not find Google translate frame.");
        return new Promise(function(resolve, reject){resolve(false)});
    }
    $frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0).click();
    return new Promise(function(resolve, reject){resolve(false)});
}
