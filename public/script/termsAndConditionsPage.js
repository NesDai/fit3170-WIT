let checkbox = document.getElementById("checkbox")
let tick_warning = document.getElementById("tick-warning")
let tick_line = document.getElementById("tick-warning-line")

function checkAccepted(){
    if (checkbox.checked){
        window.location.href = "./chatbot.html"
    } else {
        tick_warning.hidden = false
        tick_line.hidden = false
    }
}