




// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage();



window.onload = function(){
    render();

}


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

function phoneAuth() {
    //get the number
    var number=document.getElementById('number').value;
    //phone number authentication function of firebase
    //it takes two parameter first one is number,,,second one is recaptcha
    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        console.log(coderesult);
        alert("Message sent");
    }).catch(function (error) {
        alert(error.message);
    });
}



function codeverify() {
    var code=document.getElementById('verificationCode').value;
    coderesult.confirm(code).then(function (result) {
        alert("Successfully registered");
        let exists = checkUserExistence(document.getElementById("number").value);
        console.log(`exists ${exists}`)

        if(!exists){
            makeNewUser(document.getElementById("number").value,"bobby");
        }

        var user=result.user;
        console.log(user);

    }).catch(function (error) {
        alert(error.message);
    });
}

function checkUserExistence(phone){
    let exists = false;
    // var starCountRef = firebase.database().ref('users/');
    // starCountRef.on('value', (snapshot) => {
    // const data = snapshot.val();
    // updateStarCount(postElement, data);
    firebase.database().ref('users')
    .equalTo(phone).once('value', data => {
            data.forEach(() => {
                // If it does, output an error
                exists = true;
            });

});
    return exists
}

/**
 * Function that creates a new user in the firebase database
 * @param {1} phone : the new users mobile number 
 * @param {2} username: the new users username 
 */
function makeNewUser(phone,username){

    firebase.database().ref(`users/${phone}`).set({
        username: username
      });
}



// let loginButton = document.getElementById("loginButton");
// let sendButton = document.getElementById("send-button");

// loginButton.onclick = codeverify();
// sendButton.onclick = phoneAuth();