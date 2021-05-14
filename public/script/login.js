// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.4.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/8.4.1/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>



const USER_KEY = "USER";

// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();
const LANGUAGE_KEY = "LANGUAGE"


let language = localStorage.getItem(LANGUAGE_KEY)

if (language == null){
    firebase.auth().languageCode = "en";
    localStorage.setItem(LANGUAGE_KEY,"en")
}
else{
    firebase.auth().languageCode = language;    
}


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
    localStorage.setItem(LANGUAGE_KEY, language)
    recaptchaVerifier.reset()
    // window.location = window.location  // refresh the page to reinitialize captcha
}




window.onload = function(){

    render();

}


/**
 * Function renders a recaptcha
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

/**
 * function used to authenticate the user's phone number by sending them an OTP
 */
function phoneAuth() {
    //get the number
    var number=document.getElementById('number').value;
    //phone number authentication function of firebase

    //check invalid characters (space)
    if (number.includes(" ")){
        valid = false
        document.getElementById("error").innerHTML = "<p>Phone number obtain contains invalid characters. Please avoid using spaces and try again</p>";
    }
    //it takes two parameter first one is number,,,second one is recaptcha
    console.log(window.recaptchaVerifier);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>
    //the Persistence of the authentication is 'SESSION'. If window closed, then no longer signed in.
    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        document.getElementById("input-pin").innerHTML = "A SMS with the PIN has been sent to your phone. Please insert the pin below."
        document.getElementById("input-pin").style.color = "green";

        // alert("Message sent");
    }).catch(function (error) {
        alert(error.message);
        document.getElementById("input-pin").innerHTML = ""

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

    var phone_regex = /^\+[0-9]{11,15}$/;
    var telephone = document.getElementById("number").value

    // test the input number based on the RegEx pattern stated
    if (phone_regex.test(telephone))
    {
        document.getElementById("input-error").innerHTML = "";
        document.getElementById("number").style.visibility="visible";
        document.getElementById("number").style.color="green";
    }
    else {
        document.getElementById("input-error").innerHTML = "Invalid phone number. Do avoid any letters, special characters and spaces. Please try again.";
        document.getElementById("number").style.visibility="visible";
        document.getElementById("number").style.color="red";
    }
}


/**
 * function checks the verification pin the user entered
 */
function codeverify() {
    var code=document.getElementById('verificationCode').value;

    // var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
    // firebase.auth().signInWithCredential(credential);

    coderesult.confirm(code).then((result)=> {
        const user = result.user

        //check if this user is already registered
        checkUserExistence(document.getElementById("number").value);



    }).catch(function (error) {
        alert(error.message);
        recaptchaVerifier.reset();
        document.getElementById("input-pin").innerHTML = "Invalid PIN entered. Please resend a new pin and retry.";
        document.getElementById("input-pin").style.color = "red";
    });
}

/**
 * Function used to check if the user with the given phone number of already present in the database
 * @param {1} phone: the user's phone number 
 * @returns boolean true if exists and false is does not
 */
function checkUserExistence(phone){
    let exists = false;
    
    firebase.database().ref(`users/${phone}`).once("value", snapshot => {
        if (snapshot.exists()){
           exists = true;
        }
     }).then(()=>{

        if(!exists){ //Create a new account
            //!Need to ask to make up a username MAKE LOCAL STORAGE AND REDIRECT
            localStorage.setItem(USER_KEY, JSON.stringify(phone)); //temporarily use the USER_KEY to store the users phone number
            window.location = "username.html"; //TODO make this a proper redirect

            
        }
        else{
            // !!LOG IN !!!
            //Figure this out later 
            firebase.database().ref(`users/${phone}`).once('value', data => {
                let user = {
                    phone: phone,
                    username: data.val().username
                };
                localStorage.setItem(USER_KEY, JSON.stringify(user));
            });
            setInterval(function(){ 
                window.location = "main_page.html"
            }, 2000); // after 2 seconds
            alert("successfully logged in")

        
        }

     });
        
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


firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user)

    }
    else {
      // User is signed out.
    }
  })