



// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage();





    render();



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


function phoneAuth(){
    //get the number
    let number = document.getElementById("number").value;
    //Phone number authenticator, params: number , recapcha
    firebase.auth.SignInWithPhoneNumber(number, window.recaptchaVerifier).then(function(confirmation){
        window.confirmationResult = confirmationResult;
        codeResult = confirmationResult;
        console.log(codeResult);
        alert("Message sent");
    }).catch(function(error){
        alert(error.message);
    });
}

function codeVerify(){
    let code = document.getElementById("verification-code").value;
    codeResult.confirm(code).then(function(result){
        alert("successfully registered");
        console.log(result.user);
    }).catch(function(error){
        alert(error.message);
    });
    
}
