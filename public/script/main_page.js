
// indicate that chatbot is without avatar in local storage
localStorage.setItem("avatar", "N/A");

window.onload = function(){
  currLang = localStorage.getItem(LANGUAGE_KEY)
  disableTranslateButton();
  changeLang(currLang);
    let us = firebase.auth().currentUser == null;
    console.log(us);

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
          console.log("logged in");

        }
        else {
          // User is signed out.
          console.log("not logged in");

        }
      })
}

document.getElementById("lang_butt_id_c").addEventListener("click", disableTranslateButton);  //listens to button change
document.getElementById("lang_butt_id_m").addEventListener("click", disableTranslateButton);  //listens to button change
document.getElementById("lang_butt_id_t").addEventListener("click", disableTranslateButton);  //listens to button change
document.getElementById("lang_butt_id_e").addEventListener("click", disableTranslateButton);  //listens to button change

let current_us = JSON.parse(localStorage.getItem("USER"));

 function disableTranslateButton(){

  let lang = localStorage.getItem(LANGUAGE_KEY);

  if (lang == "Malay"){
      document.getElementById("lang_butt_id_m").disabled = true;
      document.getElementById("lang_butt_id_c").disabled = false;
      document.getElementById("lang_butt_id_t").disabled = false;
      document.getElementById("lang_butt_id_e").disabled = false;
  }
  else if (lang == "Chinese (Simplified)"){
      document.getElementById("lang_butt_id_c").disabled = true;
      document.getElementById("lang_butt_id_m").disabled = false;
      document.getElementById("lang_butt_id_t").disabled = false;
      document.getElementById("lang_butt_id_e").disabled = false;
  }
  else if (lang == "Thai"){
      document.getElementById("lang_butt_id_t").disabled = true;
      document.getElementById("lang_butt_id_c").disabled = false;
      document.getElementById("lang_butt_id_m").disabled = false;
      document.getElementById("lang_butt_id_e").disabled = false;
  }
  else{
      document.getElementById("lang_butt_id_e").disabled = true;
      document.getElementById("lang_butt_id_c").disabled = false;
      document.getElementById("lang_butt_id_m").disabled = false;
      document.getElementById("lang_butt_id_t").disabled = false;
  }
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
     document.getElementById("translate_btn").innerHTML = '<img src="./css/images/translate_icon.png" class="nav_icon" id="translate_icon"></img>'+"Translate";
     document.getElementById("chatbox_btn").innerHTML = '<img src="./css/images/chatbot_icon.png"  class="nav_icon" id="chatbot_icon"></img>'+"Chat Bot";

     document.getElementById("avatar_btn").innerHTML = '<img src="./css/images/avatar_3d_icon.png"  class="nav_icon" id="3dAvatar_chatbot_icon"></img>'+"Human avatar";
     document.getElementById("avatar_drawing_btn").innerHTML = '<img src="./css/images/avatar_2d_icon.png"  class="nav_icon" id="2dAvatar_chatbot_icon"></img>'+"Drawing avatar";
     document.getElementById("avatar_robot_btn").innerHTML = '<img src="./css/images/avatar_robot_icon.png"  class="nav_icon" id="robotAvatar_chatbot_icon"></img>'+"Robot avatar";


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
     document.getElementById("translate_btn").innerHTML = '<img src="./css/images/translate_icon.png" class="nav_icon" id="translate_icon"></img>'+"terjemah";
     document.getElementById("chatbox_btn").innerHTML = '<img src="./css/images/chatbot_icon.png"  class="nav_icon" id="chatbot_icon"></img>'+"Bot Sembang";

     document.getElementById("avatar_btn").innerHTML = '<img src="./css/images/avatar_3d_icon.png"  class="nav_icon" id="3dAvatar_chatbot_icon"></img>'+"Avatar manusia";
     document.getElementById("avatar_drawing_btn").innerHTML = '<img src="./css/images/avatar_2d_icon.png"  class="nav_icon" id="2dAvatar_chatbot_icon"></img>'+"Melukis avatar";
     document.getElementById("avatar_robot_btn").innerHTML = '<img src="./css/images/avatar_robot_icon.png"  class="nav_icon" id="robotAvatar_chatbot_icon"></img>'+"Avatar robot";


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
     document.getElementById("translate_btn").innerHTML ='<img src="./css/images/translate_icon.png" class="nav_icon" id="translate_icon"></img>'+ "翻译";
     document.getElementById("chatbox_btn").innerHTML = '<img src="./css/images/chatbot_icon.png"  class="nav_icon" id="chatbot_icon"></img>'+"聊天机器人";

     document.getElementById("avatar_btn").innerHTML = '<img src="./css/images/avatar_3d_icon.png"  class="nav_icon" id="3dAvatar_chatbot_icon"></img>'+"人类化身";
     document.getElementById("avatar_drawing_btn").innerHTML = '<img src="./css/images/avatar_2d_icon.png"  class="nav_icon" id="2dAvatar_chatbot_icon"></img>'+"绘图头像";
     document.getElementById("avatar_robot_btn").innerHTML = '<img src="./css/images/avatar_robot_icon.png"  class="nav_icon" id="robotAvatar_chatbot_icon"></img>'+"机器人头像";


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
     document.getElementById("translate_btn").innerHTML ='<img src="./css/images/translate_icon.png" class="nav_icon" id="translate_icon"></img>'+ "แปลภาษา";
     document.getElementById("chatbox_btn").innerHTML ='<img src="./css/images/chatbot_icon.png"  class="nav_icon" id="chatbot_icon"></img>'+ "แชทบอท";

     document.getElementById("avatar_btn").innerHTML = '<img src="./css/images/avatar_3d_icon.png"  class="nav_icon" id="3dAvatar_chatbot_icon"></img>'+"อวตารมนุษย์";
     document.getElementById("avatar_drawing_btn").innerHTML = '<img src="./css/images/avatar_2d_icon.png"  class="nav_icon" id="2dAvatar_chatbot_icon"></img>'+"วาดอวตาร";
     document.getElementById("avatar_robot_btn").innerHTML = '<img src="./css/images/avatar_robot_icon.png"  class="nav_icon" id="robotAvatar_chatbot_icon"></img>'+"อวตารหุ่นยนต์";


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
