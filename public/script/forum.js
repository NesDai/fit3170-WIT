function addReply(){

    // show text input
    document.getElementById("comment_reply_input").className="showTextInput"

    // show send button
    document.getElementById("send_reply_btn").className="showButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" 

    // hide add reply button
    document.getElementById("add_reply_btn").className="hideReply mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
}