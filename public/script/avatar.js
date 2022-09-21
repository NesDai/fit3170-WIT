// text to speech
let messageList_en = ["Hi! I am the chatbot for this App.",
                      "To get started, can you please fill up this survey. You only have one attempt in completing the survey. You are allowed to restart the survey any number of times if it is still incomplete. Are you ready?",
                      "What is your age in years?",
                      "What is your gender?",
                      "What is your ethnic group?",
                      "Where do you currently live?",
                      "What is your average net household income per month?",
                      "What is your completed highest education level?",
                      "What is your marital status?",
                      "How many children have you raised?",
                      "How many children do you talk or correspond with weekly?",
                      "How many other relatives do you feel close to?",
                      "How many close friends do you have?",
                      "What is your independent living status?",
                      "In the past 6 months, have you experienced the following situations?",
                      "How satisfied are you with your current life now? (Rate from 1 to 5)"];

let messageList_cn = ["你好！我是这个应用程序的聊天机器人。",
                      "要开始，请您填写这份调查表。 您只有一次尝试完成调查。 如果调查仍未完成，您可以多次重新开始调查。你准备好了吗？",
                      "您的年龄是几岁？", // Qs 1.1
                      "您的性别是?", // Qs 1.2
                      "您的种族是？", // Qs 1.3
                      "您现在住在哪里？", // Qs 1.4
                      "您每月的平均家庭净收入是多少？", // Qs 1.5
                      "您完成的最高教育程度是？", // Qs 1.6
                      "您的婚姻状况为？", // Qs 1.7
                      "您养育了几名孩子？", // Qs 1.8
                      "您每周与几个孩子交谈或通信</b>？", // Qs 1.9
                      "您与几个亲戚比较亲近？", // Qs 1.10
                      "您有多少个关系好的朋友？", // Qs 1.11
                      "您的生活状态是？", // Qs 1.12
                      "在过去的 6 个月中，您是否经历过以下情况？", // Qs 13
                      "您对现在的生活满意吗？（等级从 1 到 5）"];// Qs 1.14];


let messageList_ms = ["Hai! Saya adalah bot sembang untuk Apl ini.",
                      "Untuk bermula, bolehkah anda mengisi tinjauan ini. Anda hanya mempunyai satu percubaan untuk melengkapkan tinjauan. Anda dibenarkan untuk memulakan semula tinjauan beberapa kali jika ia masih tidak lengkap. Adakah anda bersedia?",
                      "Berapakah umur anda dalam tahun?", // Qs 1.1
                      "Apakah jantina anda?", // Qs 1.2
                      "Apakah kumpulan etnik anda?", // Qs 1.3
                      "Di mana anda tinggal sekarang?", // Qs 1.4
                      "Berapakah purata pendapatan isi rumah anda sebulan?", // Qs 1.5
                      "Apakah tahap pendidikan tertinggi anda yang telah habis diselesaikan?", // Qs 1.6
                      "Apakah status perkahwinan anda?", // Qs 1.7
                      "Berapa banyak anak yang dalam tanggungan anda?", // Qs 1.8
                      "Berapa orang anak yang anda <b>berkomunikasi atau hubungi setiap minggu? ", // Qs 1.9
                      "Berapa banyak saudara mara yang rapat dengan anda?", // Qs 1.10 TODO get confirmation on translation "saudara" -> "saudara mara"
                      "Berapa ramai rakan karib anda? ", // Qs 1.11
                      "Apakah status kehidupan berdikari anda?", // Qs 1.12
                      "Dalam 6 bulan terakhir, adakah anda mengalami situasi berikut?", // Qs 13
                      "Sejauh mana anda berpuas hati dengan kehidupan anda sekarang? (Nilai dari 1 hingga 5)"]; // Qs 1.14


let messageList_th = ["สวัสดี! ฉันเป็นแชทบ็อตสำหรับแอพนี้",
                      "ในการเริ่มต้น โปรดกรอกแบบสำรวจนี้ คุณมีความพยายามเพียงครั้งเดียวในการกรอกแบบสำรวจ คุณได้รับอนุญาตให้เริ่มการสำรวจใหม่กี่ครั้งก็ได้หากยังไม่สมบูรณ์ คุณพร้อมไหม?",
                      "คุณมีอายุกี่ปี?", // Qs 1.1
                      "โปรดระบุเพศของคุณ?", // Qs 1.2
                      "โปรดระบุเชื้อชาติของคุณ?", // Qs 1.3
                      "ณ ปัจจุบันคุณอาศัยอยู่ในเขตใด?", // Qs 1.4
                      "รายได้เฉลี่ยต่อครัวเรือนของครอบครัวคุณ ต่อเดือน เป็นเท่าไหร่?", // Qs 1.5
                      "โปรดระบุระดับการศึกษาสูงสุดของคุณ?", // Qs 1.6
                      "โปรดระบุสถานภาพสมรสของคุณ?", // Qs 1.7
                      "คุณมีลูกกี่คน?", // Qs 1.8
                      "คุณคุยหรือติดต่อกับลูกกี่คนในสัปดาห์หนึ่งๆ?", // Qs 1.9
                      "คุณมีญาติสนิทกี่คน?", // Qs 1.10
                      "คุณมีเพื่อนสนิทกี่คน?", // Qs 1.11
                      "โปรดระบุลักษณะการอยู่อาศัยของคุณ?", // Qs 1.12
                      "ใน 6 เดือนที่ผ่านมา คุณเคยมีประสบการณ์ดังต่อไปนี้หรือไม่?", // Qs 13
                      "คุณมีความพึงพอใจมากน้อยแค่ไหนกับความเป็นอยู่ในปัจจุบัน?"] // Qs 1.14;


// set the environment
SDK.applicationId = "1751892567056976963";
var sdk = new SDKConnection();
var web = new WebAvatar();
web.version = 8.5;
web.connection = sdk;

web.avatar = "22225225";
web.voice = "cmu-slt";
web.voiceMod = "Default";
web.boxLocation = "top-left";
web.width = "700";
web.height = "700";

web.nativeVoice = true;

let select_language = localStorage.getItem("LANGUAGE");
let messageList = ["Error"];

// select the voice according to the language selected by user
if (select_language == "English") {
    web.nativeVoiceName = "US English Female"
    messageList = messageList_en;
}
else if (select_language == "Chinese (Simplified)") {
    web.nativeVoiceName = "Chinese Female"
    messageList = messageList_cn;
}
else if (select_language == "Malay") {
    web.nativeVoiceName = "Indonesian Female"
    messageList = messageList_ms;
}
else if (select_language == "Thai") {
    web.nativeVoiceName = "Thai Female"
    messageList = messageList_th;
}

// use the third party ResponsiveVoice API
SDK.initResponsiveVoice();

// create the space to display avatar
web.createBox();

// button click counter
let num_click = 0;

function loadFunction() {
    setTimeout(function() { web.processMessages(); }, 1000);
    web.addMessage("");
}

function generateSpeech() {
    if (num_click < messageList.length) {
      setTimeout(function() { web.processMessages(); }, 1000);
      web.addMessage(messageList[num_click]);
      num_click++;
    }
    else {
      setTimeout(function() { web.processMessages(); }, 1000);
      web.addMessage("End of the chat");
    }
}
