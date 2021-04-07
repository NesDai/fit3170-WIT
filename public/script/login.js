




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
 * function checks the verification pin the user entered
 */
function codeverify() {
    var code=document.getElementById('verificationCode').value;
    coderesult.confirm(code).then(function (result) {
        alert("Successfully registered");

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
            //!Need to ask to make up a username
            makeNewUser(document.getElementById("number").value,"bobby");
        }
        else{
            //!!LOG IN !!!
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
