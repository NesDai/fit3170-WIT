/**
 * function to display messages onto the chat log by th user
 * @param message - user response
 */
function showMessageReceiver(message) {
    //display user message in given html format
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container receiver'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>"
}