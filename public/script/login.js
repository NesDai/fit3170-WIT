// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.4.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/8.4.1/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>

// References of elements in login.html
let title_login = document.getElementById("title_login");
let login_button = document.getElementById("login-button");

// References of elements in signup.html
let title_signup = document.getElementById("title_signup");
let step1_des = document.getElementById("step1_des");
let step1_placeholder = document.getElementById("username");
let step2_des = document.getElementById("step2_des");
let phoneNum_placeholder = document.getElementById("number");
let instruct_send_pin = document.getElementById("instruct_send_pin");
let send_pin_btn = document.getElementById("send-button");
let enter_pin_placeholder = document.getElementById("verificationCode");
// let signup_button = document.getElementById("signup-button");
let back_button = document.getElementById("back_btn");

// References of elements that show error or message in login.html or signup.html
let phone_space_error = document.getElementById("error");
let pin_message = document.getElementById("input-pin");
let phone_char_error = document.getElementById("input-error");
let register_message = document.getElementById("registeredMessage");
let username_error = document.getElementById("error_username");


// Translated words that will display in login page in each languages

// login
let login_txt = ["登录", "log masuk", "เข้าสู่ระบบ"];


// Translated words that will display in sign up page in each language

// Signup
let sign_up_txt = ["注册", "Daftar", "ลงชื่อ"];

// Step 1: Please choose the username
let choose_username_txt = ["第一步： 请选择用户名",
                           "Langkah 1: Sila pilih nama pengguna",
                           "ขั้นตอนที่ 1: โปรดเลือกชื่อผู้ใช้"];

// Enter a username...
let choose_username_placeholder_txt = ["输入用户名...", "Masukkan nama pengguna...", "ใส่ชื่อผู้ใช้..."];

// Step 2: Please enter your phone number
let enter_phone_txt = ["第二步： 请输入您的电话号码",
                       "Langkah 2: Sila masukkan nombor telefon anda",
                       "ขั้นตอนที่ 2: โปรดป้อนหมายเลขโทรศัพท์ของคุณ"];

// Enter e.g., +60129356770 or +668190677822
let enter_phone_placeholder_txt = ["输入例如 +60129356770 或 +668190677822",
                                   "Masukkan cth, +60129356770 atau +668190677822",
                                   "ป้อน เช่น +60129356770 หรือ +668190677822"];

// Please click the SEND PIN button after you complete step 1 and 2
let ask_send_pin_txt = ["完成第 1 步和第 2 步后，请单击发送 PIN 按钮",
                        "Sila klik butang HANTAR PIN selepas anda melengkapkan langkah 1 dan 2",
                        "โปรดคลิกปุ่มส่ง PIN หลังจากเสร็จสิ้นขั้นตอนที่ 1 และ 2"];

// Send Pin
let send_pin_txt = ["发送密码", "Hantar Pin", "ส่งพิน"];

// Enter 6-digit pin E.g. 123456
let pin_placeholder_txt = ["输入 6 位密码 例如 123456",
                           "Masukkan pin 6 digit Cth 123456",
                           "ใส่พิน 6 หลัก เช่น 123456"];

// Go Back
let back_txt = ["回去", "Pargi balik", "กลับไป"];

// Username should be 5 to 15 characters long and not have any special characters like !@#$%^&*. Please try again.
let username_error_txt = ["<p>用户名的长度应为 5 到 15 个字符，并且不能包含任何特殊字符，例如 !@#$%^&*。请再试一次<p>",
                          "<p>Nama pengguna hendaklah 5 hingga 15 aksara panjang dan tidak mempunyai sebarang aksara khas seperti !@#$%^&*. Sila cuba lagi.<p>",
                          "<p>ชื่อผู้ใช้ควรมีความยาว 5 ถึง 15 อักขระ และไม่มีอักขระพิเศษใดๆ เช่น !@#$%^&* กรุณาลองอีกครั้ง.<p>"];

// Invalid phone number. Do avoid any letters, special characters and spaces. Please try again.
let phone_char_error_txt = ["无效的电话号码。请避免使用任何字母、特殊字符和空格。请再试一次。",
                            "Nombor telefon tidak sah. Elakkan sebarang huruf, aksara khas dan ruang. Sila cuba lagi.",
                            "หมายเลขโทรศัพท์ไม่ถูกต้อง หลีกเลี่ยงตัวอักษร อักขระพิเศษ และช่องว่าง กรุณาลองอีกครั้ง."];

// Phone number obtain contains invalid characters. Please avoid using spaces and try again
let phone_space_error_txt = ["<p>获取的电话号码包含无效字符。请避免使用空格，然后重试</p>",
                             "<p>Nombor telefon yang diperolehi mengandungi aksara tidak sah. Sila elakkan menggunakan ruang dan cuba lagi</p>",
                             "<p>หมายเลขโทรศัพท์ที่ได้รับมีอักขระที่ไม่ถูกต้อง โปรดหลีกเลี่ยงการใช้ช่องว่างและลองอีกครั้ง</p>"];

// It might take a minute to send the SMS to your phone.\n Once the SMS with the PIN has been sent to your phone. Please insert the pin below.
let pin_instruct_txt = ["将 SMS 发送到您的手机可能需要一分钟。\n 带有 PIN 码的 SMS 发送到您的手机后。请插入下面的引脚。",
                        "Mungkin mengambil masa seminit untuk menghantar SMS ke telefon anda.\n Sebaik sahaja SMS dengan PIN dihantar ke telefon anda. Sila masukkan pin di bawah.",
                        "อาจใช้เวลาสักครู่ในการส่ง SMS ไปยังโทรศัพท์ของคุณ\n เมื่อส่ง SMS พร้อม PIN ไปยังโทรศัพท์ของคุณแล้ว กรุณาใส่พินด้านล่าง"];

// You are all set. You will be redirected shortly
let redirect_txt = ["<h3>你都准备好了。您将很快被重定向<h3>",
                    "<h3>Anda sudah bersedia. Anda akan diubah hala sebentar lagi<h3>",
                    "<h3>คุณพร้อมแล้ว คุณจะถูกเปลี่ยนเส้นทางในไม่ช้า<h3>"];

// Invalid PIN entered. Please resend a new pin and retry.
let invalid_pin_txt = ["输入的 PIN 无效。请重新发送新密码并重试。",
                       "PIN tidak sah dimasukkan. Sila hantar semula pin baharu dan cuba semula.",
                       "ป้อน PIN ไม่ถูกต้อง โปรดส่งพินใหม่และลองอีกครั้ง"];

// Username exists. Please choose another username
let username_exist_txt = ["<p>用户名存在。请选择其他用户名</p>",
                          "<p>Nama pengguna wujud. Sila pilih nama pengguna lain</p>",
                          "<p>มีชื่อผู้ใช้แล้ว โปรดเลือกชื่อผู้ใช้อื่น</p>"];

// alert message when user enter wrong pin number after clicking sign up
let pin_alert = ["用于创建手机身份验证凭据的短信验证码无效。请重新发送验证码短信，并确保使用用户提供的验证码。",
                 "Kod pengesahan SMS yang digunakan untuk membuat bukti kelayakan pengesahan telefon adalah tidak sah. Sila hantar semula sms kod pengesahan dan pastikan menggunakan kod pengesahan yang diberikan oleh pengguna.",
                 "รหัสยืนยันทาง SMS ที่ใช้สร้างข้อมูลรับรองการตรวจสอบสิทธิ์โทรศัพท์ไม่ถูกต้อง โปรดส่ง SMS รหัสยืนยันอีกครั้ง และต้องแน่ใจว่าใช้รหัสยืนยันที่ผู้ใช้ให้มา"];

const USER_KEY = "USER";


// get selected language
let select_language = localStorage.getItem("LANGUAGE");

// get current page name
let page_path = window.location.pathname;
let current_page = page_path.split("/").pop();


// change signup.html elements according to selected language
if (select_language == "Chinese (Simplified)") {
    if (current_page == "login.html") {
        // elements for login.html
        title_login.innerHTML = login_txt[0];
        phoneNum_placeholder.placeholder = enter_phone_placeholder_txt[0];
        login_button.innerHTML = login_txt[0];
        back_button.innerHTML = back_txt[0];
    }
    else if (current_page == "signup.html") {
        // elements for signup.html
        title_signup.innerHTML = sign_up_txt[0];
        step1_des.innerHTML = choose_username_txt[0];
        step1_placeholder.placeholder = choose_username_placeholder_txt[0];
        step2_des.innerHTML = enter_phone_txt[0];
        phoneNum_placeholder.placeholder = enter_phone_placeholder_txt[0];
        instruct_send_pin.innerHTML = ask_send_pin_txt[0];
        send_pin_btn.innerHTML = send_pin_txt[0];
        enter_pin_placeholder.placeholder = pin_placeholder_txt[0];
        login_button.innerHTML = sign_up_txt[0];
        back_button.innerHTML = back_txt[0];
    }
} else if (select_language == "Malay") {
    if (current_page == "login.html") {
        // elements for login.html
        title_login.innerHTML = login_txt[1];
        phoneNum_placeholder.placeholder = enter_phone_placeholder_txt[1];
        login_button.innerHTML = login_txt[1];
        back_button.innerHTML = back_txt[1];
    }
    else if (current_page == "signup.html") {
        // elements for signup.html
        title_signup.innerHTML = sign_up_txt[1];
        step1_des.innerHTML = choose_username_txt[1];
        step1_placeholder.placeholder = choose_username_placeholder_txt[1];
        step2_des.innerHTML = enter_phone_txt[1];
        phoneNum_placeholder.placeholder = enter_phone_placeholder_txt[1];
        instruct_send_pin.innerHTML = ask_send_pin_txt[1];
        send_pin_btn.innerHTML = send_pin_txt[1];
        enter_pin_placeholder.placeholder = pin_placeholder_txt[1];
        login_button.innerHTML = sign_up_txt[1];
        back_button.innerHTML = back_txt[1];
    }
} else if (select_language == "Thai") {
    if (current_page == "login.html") {
        // elements for login.html
        title_login.innerHTML = login_txt[2];
        phoneNum_placeholder.placeholder = enter_phone_placeholder_txt[2];
        login_button.innerHTML = login_txt[2];
        back_button.innerHTML = back_txt[2];
    }
    else if (current_page == "signup.html") {
        // elements for signup.html
        title_signup.innerHTML = sign_up_txt[2];
        step1_des.innerHTML = choose_username_txt[2];
        step1_placeholder.placeholder = choose_username_placeholder_txt[2];
        step2_des.innerHTML = enter_phone_txt[2];
        phoneNum_placeholder.placeholder = enter_phone_placeholder_txt[2];
        instruct_send_pin.innerHTML = ask_send_pin_txt[2];
        send_pin_btn.innerHTML = send_pin_txt[2];
        enter_pin_placeholder.placeholder = pin_placeholder_txt[2];
        login_button.innerHTML = sign_up_txt[2];
        back_button.innerHTML = back_txt[2];
    }
}

// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

/**
 * Function used to set the auth language
 * @returns none
 */
function setAuthLanguage(){

    let language = localStorage.getItem(LANGUAGE_KEY);

    if (language == null){
        firebase.auth().languageCode = "en";
        localStorage.setItem(LANGUAGE_KEY,"English")
        return
    }
    else if (language == "Malay")
        language = "ms";
    else if (language == "Chinese (Simplified)")
        language = "zh-CN";
    else if (language == "Thai")
        language = "th"
    else if (language == "English")
        language = "en"

    firebase.auth().languageCode = language;

}


/**  Function used to change language of the captcha
 * @param newLanguage the language of choice chosen by user
 * @returns none
*/

function changeLanguage(newLanguage){
    if (newLanguage == "Malay")
        language = "ms";
    else if (newLanguage == "Chinese (Simplified)")
        language = "zh-CN";
    else if (newLanguage == "Thai")
        language = "th"
    else
        language = "en"

    // save language for the user upon login
    localStorage.setItem(LANGUAGE_KEY, language);

    setAuthLanguage();

    recaptchaVerifier.reset()
    // window.location = window.location  // refresh the page to reinitialize captcha
}




window.onload = function(){

    setAuthLanguage();
    render();

}


/**
 * Function renders a recaptcha
 * @returns none
 */
function render(){

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        }
      });

    recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

}

let credentials;
let persisted = false; //true if the logged in user does not need to sign in again. And instead if has persisted from other session

/**
 * Function used to authenticate the user's phone number by sending them an OTP
 * @returns none
 */
 function phoneAuth() {
    //get the number
    var number=document.getElementById('number').value;
    //phone number authentication function of firebase

    //check invalid characters (space)
    if (number.includes(" ")){
        valid = false
        if (select_language == "Chinese (Simplified)") {
            phone_space_error.innerHTML = phone_space_error_txt[0];
        }
        else if (select_language == "Malay") {
            phone_space_error.innerHTML = phone_space_error_txt[1];
        }
        else if (select_language == "Thai") {
            phone_space_error.innerHTML = phone_space_error_txt[2];
        }
        else {
            phone_space_error.innerHTML = "<p>Phone number obtain contains invalid characters. Please avoid using spaces and try again</p>";
        }
    }
    //it takes two parameter first one is number,,,second one is recaptcha

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>
    //the Persistence of the authentication is 'SESSION'. If window closed, then no longer signed in.
    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        if (select_language == "Chinese (Simplified)") {
            pin_message.innerHTML = pin_instruct_txt[0];
        }
        else if (select_language == "Malay") {
            pin_message.innerHTML = pin_instruct_txt[1];
        }
        else if (select_language == "Thai") {
            pin_message.innerHTML = pin_instruct_txt[2];
        }
        else {
            pin_message.innerHTML = "It might take a minute to send the SMS to your phone.\n Once the SMS with the PIN has been sent to your phone. Please insert the pin below.";
        }
        pin_message.style.color = "green";

        // alert("Message sent");
    }).catch(function (error) {
        alert(error.message);
        pin_message.innerHTML = "";

    })
    )
}

/**
 * Function that checks the validity of input phone number given by user based on the
 * RegEx pattern given in the function.
 * @returns a bool where true will be shown green, false will be shown red where
 *          it indicates if the input phone number follows the criteria of using
 *          a valid international phone number
 */
function phoneValidation() {

    let result = false;
    var phone_regex = /^\+[0-9]{8,19}$/; //11-15
    var telephone = document.getElementById("number").value

    // test the input number based on the RegEx pattern stated
    if (phone_regex.test(telephone) && telephone!="")
    {
        phone_char_error.innerHTML = "";
        document.getElementById("number").style.visibility="visible";
        document.getElementById("number").style.color="green";
        result = true;
    }
    else {
        if (select_language == "Chinese (Simplified)") {
            phone_char_error.innerHTML = phone_char_error_txt[0];
        }
        else if (select_language == "Malay") {
            phone_char_error.innerHTML = phone_char_error_txt[1];
        }
        else if (select_language == "Thai") {
            phone_char_error.innerHTML = phone_char_error_txt[2];
        }
        else {
            phone_char_error.innerHTML = "Invalid phone number. Do avoid any letters, special characters and spaces. Please try again.";
        }
        document.getElementById("number").style.visibility="visible";
        document.getElementById("number").style.color="red";
        result = false;
    }
    return result;
}


/**
 * Function which checks the verification pin the user entered
 * @returns none
 */
function codeverify() {
    var code=document.getElementById('verificationCode').value;

    // var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
    // firebase.auth().signInWithCredential(credential);

    coderesult.confirm(code).then((result)=> {
        const user = result.user
        if (select_language == "Chinese (Simplified)") {
            register_message.innerHTML = redirect_txt[0];
        }
        else if (select_language == "Malay") {
            register_message.innerHTML = redirect_txt[1];
        }
        else if (select_language == "Thai") {
            register_message.innerHTML = redirect_txt[2];
        }
        else {
            register_message.innerHTML="<h3>You are all set. You will be redirected shortly<h3>";
        }

        //check if this user is already registered
        // checkUserExistence(document.getElementById("number").value);

    }).catch(function (error) {
        if (select_language == "Chinese (Simplified)") {
            alert(pin_alert[0]);
        }
        else if (select_language == "Malay") {
            alert(pin_alert[1]);
        }
        else if (select_language == "Thai") {
            alert(pin_alert[2]);
        }
        else {
            alert(error.message);
        }
        recaptchaVerifier.reset();
        if (select_language == "Chinese (Simplified)") {
            pin_message.innerHTML = invalid_pin_txt[0];
        }
        else if (select_language == "Malay") {
            pin_message.innerHTML = invalid_pin_txt[1];
        }
        else if (select_language == "Thai") {
            pin_message.innerHTML = invalid_pin_txt[2];
        }
        else {
            pin_message.innerHTML = "Invalid PIN entered. Please resend a new pin and retry.";
        }
        pin_message.style.color = "red";
        //delete created user

        firebase.database().ref(`users/${document.getElementById("number").value}`).remove();
    });
}



/**
 * Function used to check if the user with the given phone number of already present in the database
 * @param {1} phone: the user's phone number
 * @returns boolean true if exists and false is does not
 */
function checkUserExistence(phone){

    let proceed = phoneValidation();

    firebase.database().ref(`users/${phone}`).once("value", snapshot => {

        if (snapshot.exists() && proceed){

            let user = snapshot.val(); // get the user


            localStorage.setItem(USER_KEY,JSON.stringify(user));
            window.location = "main_page.html"
        }
        else if(!proceed){
            return; // do not proceed
        }
        else{  // keep as else if so as to not redirect if not proceed
            //!Need to ask to make up a username MAKE LOCAL STORAGE AND REDIRECT
            // localStorage.setItem(USER_KEY, JSON.stringify(phone)); //temporarily use the USER_KEY to store the users phone number
            let user = {
                username: "notset",
                phone: phone

            }
            localStorage.setItem(USER_KEY,JSON.stringify(user));
            window.location = "termsOfUsePage.html"; //TODO make this a proper redirect

        }

     })

}



/**
 * Function that creates a new user in the firebase database
 * @param {1} phone : the new users mobile number
 * @param {2} username: the new users username
 */
function makeNewUser(phone,username){

    firebase.database().ref(`users/${phone}`).set({
        username: username,
        phone: phone
      });
}


firebase.auth().onAuthStateChanged(function(user){
    if (user) {
        user.phone = user.phoneNumber;

        localStorage.setItem(USER_KEY,JSON.stringify(user));
        let userjson = JSON.parse(localStorage.getItem(USER_KEY));
        userjson["phone"] = userjson["phoneNumber"]
        localStorage.setItem(USER_KEY, JSON.stringify(userjson))
        checkUserExistence(user.phoneNumber);




    }
    else {
      // User is signed out.
    }
})




// CODE RELATED TO REGISTRATION

/**
 * Function used to register a new user into the database
 * @param {*} username the username input by user
 * @param {*} phone the user's phone number
 */
function register(username,phone){
    //retrieve phone from local storage
    makeNewUser(phone, username);

    //set logged in user into local storage
    let user = {
        username: username,
        phone: phone
    };

    firebase.database().ref('users').orderByChild('phone')
    .equalTo(phone).once('value', data => {

        // If username exists, output an error
        user = data.val();
        localStorage.setItem(USER_KEY,JSON.stringify(user));
    })

    codeverify();
}

/**
 * Function that checks the validity of the input username written by user based on the
 * RegEx pattern given in the function.
 * @returns a boolean indicating whether the input username follows the criteria of
 *          only having alphanumeric usernames; no special characters are allowed with
 *          length between 5 to 15 characters
 */
function usernameValidation() {

    var username_regex =/^(?=.*[a-zA-Z\d ].*)[a-zA-Z\d ]{5,15}$/
    var username = document.getElementById("username").value

    // test the input number based on the RegEx pattern stated
    if (username_regex.test(username))
    {
        username_error.innerHTML = "";
        document.getElementById("username").style.visibility="visible";
        document.getElementById("username").style.color="green";
    }
    else {
        if (select_language == "Chinese (Simplified)") {
            username_error.innerHTML = username_error_txt[0];
        }
        else if (select_language == "Malay") {
            username_error.innerHTML = username_error_txt[1];
        }
        else if (select_language == "Thai") {
            username_error.innerHTML = username_error_txt[2];
        }
        else {
            username_error.innerHTML = "<p>Username should be 5 to 15 characters long and not have any special characters like !@#$%^&*. Please try again.<p>";
        }
        document.getElementById("username").style.visibility="visible";
        document.getElementById("username").style.color="red";
    }

    return username_regex.test(username)
}


 /**
  *  Function checks the validity of the chosen username based on the existing users in the database
  * @param {*} username the chosen username of the user to be registered
  * @returns true if the username is available and false if there is another username who possesses the chosen username
  */
function checkUsernameValidity(){
    let username = document.getElementById("username").value;
    let valid = usernameValidation();

    //search the username in db. similar to phone number search
    firebase.database().ref('users').orderByChild('username')
    .equalTo(username).once('value', data => {
        data.forEach(() => {
            // If username exists, output an error
            if (select_language == "Chinese (Simplified)") {
                username_error.innerHTML = username_exist_txt[0];
            }
            else if (select_language == "Malay") {
                username_error.innerHTML = username_exist_txt[1];
            }
            else if (select_language == "Thai") {
                username_error.innerHTML = username_exist_txt[2];
            }
            else {
                username_error.innerHTML = "<p>Username exists. Please choose another username</p>";
            }
            valid = false;
        });
    }).then(() => {
        if (valid) {
            username_error.innerHTML = "";
            //if valid, register the user
            register(document.getElementById("username").value, JSON.parse(localStorage.getItem(USER_KEY))["phone"]);
        }
    });
}
