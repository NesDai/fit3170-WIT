
const USER_KEY = "USER";

// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage();



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

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();

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
    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;

        alert("Message sent");
    }).catch(function (error) {
        alert(error.message);
    });
}

/**
 * function that checks the validity of input phone number
 * (may need to add further validation)
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
    coderesult.confirm(code).then(function (result) {

        //check if this user is already registered
        checkUserExistence(document.getElementById("number").value);


    }).catch(function (error) {
        alert(error.message);
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
