
const USER_KEY = "USER";

function register(username,phone){
    //retrieve phone from local storage
    firebase.database().ref(`users/${phone}`).set({
        username: username,
        phone: phone
      });

    //set logged in user into local storage
    let user = {
        phone: phone,
        username: username
    }

    localStorage.setItem(USER_KEY,JSON.stringify(user));

    //let the user know everything went fine
    document.getElementById("registeredMessage").innerHTML="<h3>You are all set. You will be redirectered shortly<h3>";
    //todo Redirect to the main page
    setInterval(function(){ 
        window.location = "index.html" //redirect to login for now 
        }, 2000); //2 seconds

}

 /**
  *  Function checks the validity of the chosen username based on the existing users in the database
  * @param {*} username the chosen username of the user to be registered 
  * @returns true if the username is available and false if there is another username who possesses the chosen username
  */
function checkUsernameValidity(){
    let username = document.getElementById("username").value;
    let valid = true;

    //check invalid characters (space)
    if (username.includes(" ")){
        valid = false
        document.getElementById("error").innerHTML = "<p>Username contains invalid characters. Please avoid using spaces and try again</p>";
    }
    //search the username in db. similar to phone number search
    firebase.database().ref('users').orderByChild('username')
    .equalTo(username).once('value', data => {
        data.forEach(() => {
            // If username exists, output an error
            document.getElementById("error").innerHTML = "<p>Username exists. Please choose another username</p>";
            valid = false;

        });
    }).then(() => {
        if (valid) {
            document.getElementById("error").innerHTML = "";
            //if valid, register the user

            register(username, JSON.parse(localStorage.getItem(USER_KEY)))
        }
    });


}
