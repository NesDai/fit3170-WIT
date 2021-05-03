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

// YouTube player below
// Depending on the data fetched from content library, may have to account for different players (vimeo, dailymotion, etc)

// This code loads the IFrame Player API code asynchronously.
function loadYT() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}  
				
// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  var id = getTopic();
  console.log(id)
	player = new YT.Player('player', {
	height: '390',
	width: '640',
	videoId: id, // not all IDs will be valid due to restriction to third-parties
	  events: {
		  'onReady': onPlayerReady,
		  'onStateChange': onPlayerStateChange
	  }
	});
}
				
// The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}
				
// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		//setTimeout(stopVideo, 6000);
		done = true;
	}
}

function stopVideo() {
	player.stopVideo();
}

loadYT();
