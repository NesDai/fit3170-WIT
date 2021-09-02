
// Changes the url, title, media and description to fit the video that is to be shared
function changeShareDetails(){
    let playlist = JSON.parse(localStorage.getItem("playlist"));

    let url = playlist[0][0][0];
    let description = playlist[0][0][2];
    let media = playlist[0][0][1];

    addthis_share = {
        url: url,
        title: "Recommended video",
        description: description,
        media: media
    }
}

// Adds the share buttons to the page on load
function addShareButtons(){
    
    // Loads the script for the share buttons
    let script = document.createElement('script');
    
    script.setAttribute("type","text/javascript");
    script.setAttribute("src","//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-61101a2423e8f106");

    document.body.appendChild(script);

    script.addEventListener('load', ()=>{
        // Listen for the ready event
        addthis.addEventListener('addthis.ready', changeShareDetails);
    })
}

// Variable to initialize the details when user shares a video
var addthis_share = {
    url: "",
    title: "",
    description: "",
    media: ""
}

// Runs on page load
addShareButtons();
