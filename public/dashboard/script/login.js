const EMAILS = ["goroy007@gmail.com"]; // the preset emails of valid admins


/**
 * the function is used to check if the user's entered email is valid or not, and perform the according actions.
 * Redirect to admin dashboard if correct email, and display an error otherwise
 * @param {1} email the input input from the user 
 */
function adminLogin(email){

    if(EMAILS.includes(email))
        console.log("valid!");
    else
        //display an error
        $('#input-error').html('The email entered is not a valid administrator email');
}