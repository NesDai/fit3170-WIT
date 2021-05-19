const API_KEY = "YOUR_API_KEY";

// Activated when "Rate" is pressed, transitioning the users to the screen where they will rate their last recommendation
function transitionRatePage(){
  // Adjust header to mention to Rate
  var upperSectionHeader = document.getElementById("upperSectionHeader");
  upperSectionHeader.innerHTML = "Did you like our recommendation?";

  //var upperSectionSubHeader = document.getElementById("upperSectionSubHeader");
  //upperSectionSubHeader.innerHTML = "Please let us know";

  // Adjust middle to display rate positive/negative symbols
  document.getElementById("videoOutput").style="display: none";
  document.getElementById("videoDescription").style="display: none";

  document.getElementById("positiveImage").style="height: 5%; width: 5%; display: inline";
  document.getElementById("negativeImage").style="height: 5%; width: 5%; display: inline";

  // Add buttons which transition either back or to the next video
  document.getElementById("rateButton").style="display: none";
  document.getElementById("nextButton").style="display: inline";
  document.getElementById("backButton").style="display: inline";
}

// Executes when the user gives a positive rating
function positiveRating(){
  document.getElementById("positiveImage").src = "./css/images/thumbs_up_activated.png";
  document.getElementById("negativeImage").src = "./css/images/thumbs_down.png";
}

// Executes when the user gives a negative rating
function negativeRating(){
  document.getElementById("positiveImage").src = "./css/images/thumbs_up.png";
  document.getElementById("negativeImage").src = "./css/images/thumbs_down_activated.png";
}

// Executes when the user clicks the favourite button (for adding a video to their favourites list)
var counter = 1
function favoriteRating(){
  counter += 1;

  if(counter % 2 === 0){
    document.getElementById("favoriteIcon").src = "./css/images/heart_icon_activated.png";
    var snackbarContainer = document.querySelector('#messagePopUp');
    var data = {message: 'Added to Favourite Videos'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
    
  }
  else if(counter === 1){
    document.getElementById("favoriteIcon").src = "./css/images/heart_icon.png";
  }
  else{
    document.getElementById("favoriteIcon").src = "./css/images/heart_icon.png";
    var snackbarContainer = document.querySelector('#messagePopUp');
    var data = {message: 'Removed from Favourite Videos'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }

}

// From the selected preferences, randomly select a video ID for the player
// This would be replaced with code for the content library + details from user account, currently just for show
function getTopic(){
  var preferenceList = ["Cooking", "Sports", "Music", "Travel"];
  var i = Math.floor(Math.random() * preferenceList.length);
  var chosen = preferenceList[i];

  var topicDictionary = {};
  topicDictionary['Cooking'] = "7EnWiGYT1g4";
  topicDictionary['Sports'] = "p3c6L81HLAQ";
  topicDictionary['Music'] = "v=oHg5SJYRHA0";
  topicDictionary['Travel'] = "ODuEl4oNae0";

  return topicDictionary[chosen]

}

// videojs player below
// Creates the player
var player = videojs('my-video',{
    controls: true,
    techOrder: ['html5','youtube'],
    sources: [{
        type: 'video/youtube',
        src: 'https://www.youtube.com/watch?v=fcD94e93cCk'
    }],
    youtube: { "customVars": { "rel": 0 } } 
})

// Fires when the player is ready
player.ready(function(){
    player.src({type: "video/youtube", src: "https://www.youtube.com/watch?v=fcD94e93cCk"})
})

// Fires when player starts playing a video
player.on('play',function(){
    player.requestFullscreen()
})

// Fires when players finishes playing a video
player.on('ended', function(){
    player.resetProgressBar_();
    player.pause()
})

// Calls the Youtube Data Api v3 to find videos based on the keyword
function makeRequest(){
    let request = new XMLHttpRequest();
    let url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=kamito&key=" + API_KEY

    request.onreadystatechange = function() {
        if (this.readyState == 4 && request.status == 200) {
            let text = JSON.parse(this.response)
            console.log(text)
        }
    }

    request.open('GET',url);
    request.send()  
}
