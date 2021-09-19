const EMAILS = ["goroy007@gmail.com"]; // the preset emails of valid admins

function adminLogin(email){

    if(EMAILS.includes(email))
        console.log("valid!");
    else
        //display an error
        $('#input-error').html('The email entered is not a valid administrator email');
}