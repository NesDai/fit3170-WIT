

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
    // document.getElementById("negativeRating")
}

// Executes when the user gives a negative rating
function negativeRating(){
    // document.getElementById("negativeRating")
}

// Executes when the user clicks the favourite button (for adding a video to their favourites list)
function favoriteRating(){
  counter += 1;

  if(counter % 2 === 0){
    document.getElementById("favoriteIcon").src = "./css/images/heart_icon_activated.png";
    var snackbarContainer = document.querySelector('#messagePopUp');
    var data = {message: 'Added to Favourite Videos'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
    addToFavourite(player.currentSrc());
  }
  else if(counter === 1){
    document.getElementById("favoriteIcon").src = "./css/images/heart_icon.png";
  }
  else{
    document.getElementById("favoriteIcon").src = "./css/images/heart_icon.png";
    var snackbarContainer = document.querySelector('#messagePopUp');
    var data = {message: 'Removed from Favourite Videos'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
    removeFromFavourite(player.currentSrc());
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

// Function to update watch history
function updateHistory(currentVideoInfo){
    let current_user = JSON.parse(localStorage.getItem("USER"));
    let currentVideo = {
        videoUrl: currentVideoInfo[0],
        videoThumbnail: currentVideoInfo[1]
    }

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function(snapshot){
        let currentHistory = []
        let videoExist = false

        // If history is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()){
            currentHistory = snapshot.val();
            for (i in currentHistory){
                if (currentHistory[i].videoUrl == currentVideoInfo[0]){
                    videoExist = true;
                }
            }
        }

        // Add video url to history only if video doesn't exist
        if (videoExist != true){
            currentHistory.push(currentVideo)
            updateFirebase(currentHistory, current_user, 'videoHistory');
        }
    })
}

// Function to add video to favourites
function addToFavourite(currentVideoInfo){
    let current_user = JSON.parse(localStorage.getItem("USER"));
    let currentVideo = {
        videoUrl: currentVideoInfo[0],
        videoThumbnail : currentVideoInfo[1]
    }

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).once("value", function(snapshot){
        let currentFavourites = []
        let videoExist = false

        // If favourite is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()){
            currentFavourites = snapshot.val();
            for (i in currentFavourites){
                if (currentFavourites[i].videoUrl == currentVideoInfo[0]){
                    videoExist = true;
                }
            }
        }

        // Add video url to history only if video doesn't exist
        if (videoExist != true){
            currentFavourites.push(currentVideo)
            updateFirebase(currentFavourites, current_user, 'videoFavourite');
        }
    })
}

// Function to remove a video from favourites
function removeFromFavourite(currentVideoUrl){
    let current_user = JSON.parse(localStorage.getItem("USER"));

    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).once('value', function(snapshot){
        if (snapshot.exists()){
            currentFavourites = snapshot.val();
            for (i in currentFavourites){
                if (currentFavourites[i].videoUrl == currentVideoUrl){
                    currentFavourites.splice(i);
                    updateFirebase(currentFavourites, current_user, 'videoFavourite')
                }
            }
        }
    })
}

// Function to update watch history of specific user in database
function updateFirebase(video_list, current_user, child_name){
    firebase.database().ref('users').child(`${current_user.phone}`).child(child_name).set(
        video_list
    , function(error){
        if (error){
            console.log(error)
        }
    })
}

// Function to update description based on current video (to be done)
function updateDescription(description){
    document.getElementById('videoDescription').innerHTML = description;
}

// Function to check whether user completed survey or not
function checkSurveyCompletion(){
    let phoneNum = "";
    let current_user = JSON.parse(localStorage.getItem("USER"));
    phoneNum = current_user['phone'];
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);
    let db = firebase.firestore();


    db.collection(phoneNum).get().then((querySnapshot) =>{
        if (db.collection(phoneNum).exists) {
            userRef.update({ completedSurvey: 'yes' });  // indicates user completed survey
            location.href = "recommenderUi.html"; // redirect to recommender page
        } else {
            userRef.update({ completedSurvey: 'no' });  // indicates user has not completed survey 
        }
    });

    checkForPreference(stringPath);

}

function checkForPreference(stringPath){
    firebase.database().ref(stringPath + "/preferences").once('value').then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            location.href = "beforeRecommenderUi.html"; // redirect to confirmation page
        } 
        else {
            console.log("No data available");
            location.href = "skipChatbotPrefUi.html";   // redirect to preferences page
        }
    }).catch((error) => {
        console.error(error);
    });
}

// Calls the Youtube Data Api v3 to find videos based on the keyword
function makeRequest(keywordList){

    playlist = Array(keywordList.length);
    for (i in keywordList){
        playlist[i] = [];
        let key = i;
        let keyword = keywordList[i]
        let request = new XMLHttpRequest();
        let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keyword}&key=${API_KEY}`

        request.onreadystatechange =  function() {
            if (this.readyState == 4 && request.status == 200) {
                    let videos = JSON.parse(this.response);
                    console.log(videos)
                    for (j in videos.items){
                        let videoUrl = "https://www.youtube.com/watch?v=" + videos.items[j].id.videoId;
                        let thumbnailUrl = videos.items[j].snippet.thumbnails.high.url;
                        let description = videos.items[j].snippet.title;
                        playlist[key].push([videoUrl, thumbnailUrl, description])
                        
                        localStorage.setItem("playlist", JSON.stringify(playlist))

                        if (playlist[0] != []){
                            playVideo();
                        } 
                    }
            }
        }

        request.open('GET',url);
        request.send()
    }
    
    
}

function querySelector(){
    firebase.database().ref('users').child(`${current_user.phone}/preferences`).once('value', function(snapshot){
        if (snapshot.exists()){
            let preferences = snapshot.val();
            queryVideosOnPreferences(preferences);
        } else {
            queryVideoOnChatbot();
        }
    })
}

 function queryVideosOnPreferences(preferences){
    if (localStorage.getItem("playlist") == null){
        makeRequest(preferences);
    }
}

function playVideo(){
    
    playlist = JSON.parse(localStorage.getItem("playlist"));

    player = videojs('my-video',{
        controls: true,
        techOrder: ['html5','youtube'],
        sources: [{
            type: 'video/youtube',
            src: playlist[0][0][0]
        }],
        youtube: { "customVars": { "rel": 0 } }
    })

    updateDescription(playlist[0][0][2]);
    // Fires when the player is ready
    player.ready(function(){
        
    })


    // Fires when player starts playing a video
    player.one('play',function(){
        let playlist = JSON.parse(localStorage.getItem('playlist'));
        let currentVideoUrl = player.currentSrc();
        for (i in playlist[0]){
            if (playlist[0][i][0] == currentVideoUrl){
                console.log("hello")
                let currentVideoInfo = playlist[i];
                updateHistory(currentVideoInfo);
                break;
            }
        }
    })

    // Fires when players finishes playing a video
    player.on('ended', function(){
        player.exitFullscreen();
        player.resetProgressBar_();
        player.pause();
        skipToNextVideo();
    })
}

function queryVideoOnChatbot(){

}

function skipToNextVideo(){
    let playlist = JSON.parse(localStorage.getItem("playlist"));

    if (player != null){
        if (playlist.length != 0){
            playlist[0].shift();
            if (playlist[0].length != 0){
                localStorage.setItem("playlist", JSON.stringify(playlist))
                location.reload();
            } else {
                playlist.shift();
                localStorage.setItem("playlist", JSON.stringify(playlist))
                if (playlist.length == 0){
                    alert("You have gone through all the recommended videos")
                    localStorage.removeItem('playlist');
                } else {
                    location.reload();
                }
            }
        } 
    }
}


// Runs on page load
var counter = 1
const API_KEY = "YOUR_API_KEY";
var current_user = JSON.parse(localStorage.getItem("USER"));

var playlist = null;
var player = null;

if (localStorage.getItem('playlist') != null){
    console.log(localStorage.getItem('playlist'))
    playlist = JSON.parse(localStorage.getItem('playlist'));
    playVideo();
} else {
    querySelector();
}
