

// Activated when "Rate" is pressed, transitioning the users to the screen where they will rate their last recommendation
function transitionRatePage() {
    // Adjust header to mention to Rate
    var upperSectionHeader = document.getElementById("upperSectionHeader");
    upperSectionHeader.innerHTML = "Did you like our recommendation?";

    //var upperSectionSubHeader = document.getElementById("upperSectionSubHeader");
    //upperSectionSubHeader.innerHTML = "Please let us know";

    // Adjust middle to display rate positive/negative symbols
    document.getElementById("videoOutput").style = "display: none";
    document.getElementById("videoDescription").style = "display: none";

    document.getElementById("positiveImage").style = "height: 5%; width: 5%; display: inline";
    document.getElementById("negativeImage").style = "height: 5%; width: 5%; display: inline";

    // Add buttons which transition either back or to the next video
    document.getElementById("rateButton").style = "display: none";
    document.getElementById("nextButton").style = "display: inline";
    document.getElementById("backButton").style = "display: inline";
}

// Run after new video is displayed, check all icon (fav, like, dislike...)
function checkIcon() {
    // TODO like and dislike btn check

    // For some reason this dont work
    // let current_color = document.getElementById("favoriteIcon").style.color;
    // console.log(current_color)

    // load fav list from db and compare title with current vid
    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).once("value", function (snapshot) {
        // console.log(snapshot.val().length);
        let title = document.getElementById("videoDescription");
        let btn = document.getElementById("favoriteIcon");
        // console.log(title.innerHTML);

        let ss = snapshot.val();

        let found = false;
        for (let i = 0; i < ss.length; i++) {
            // console.log(i)
            // console.log(title.innerHTML);
            // console.log(ss[i]["videoTitle"]);
            if (title.innerHTML == ss[i]["videoTitle"]) {
                btn.innerHTML = `<img src="./css/images/button-designs_28.png" style="height:80%"></img>`
                found = true
                break
            }
        }

        if (found == false) {
            btn.innerHTML = `<img src="./css/images/button-designs_25.png" style="height:80%"></img>`
        }
    })
}

// Executes when the user gives a positive rating
function positiveRating() {
    //TODO add recomender update here

    let likeBtn = document.getElementById("positiveRating")
    let dislikeBtn = document.getElementById("negativeRating")

    // Remove Like
    if (likeBtn.innerHTML == `<img src="./css/images/button-designs_17.png" style="height:80%">`) {
        likeBtn.innerHTML = `<img src="./css/images/button-designs_23.png" style="height:80%">`
    }
    // Like
    else {
        likeBtn.innerHTML = `<img src="./css/images/button-designs_17.png" style="height:80%">`
        dislikeBtn.innerHTML = `<img src="./css/images/button-designs_24.png" style="height:80%">`
    }
}

// Executes when the user gives a negative rating
function negativeRating() {
    //TODO add recomender update here

    let likeBtn = document.getElementById("positiveRating")
    let dislikeBtn = document.getElementById("negativeRating")

    // Remove dislike
    if (dislikeBtn.innerHTML == `<img src="./css/images/button-designs_18.png" style="height:80%">`) {
        dislikeBtn.innerHTML = `<img src="./css/images/button-designs_24.png" style="height:80%">`
    }
    // Dislike
    else {
        dislikeBtn.innerHTML = `<img src="./css/images/button-designs_18.png" style="height:80%">`
        likeBtn.innerHTML = `<img src="./css/images/button-designs_23.png" style="height:80%">`
    }
}

// Executes when the user clicks the favourite button (for adding a video to their favourites list)
function favoriteRating() {
    let current_color = document.getElementById("favoriteIcon").style.color;
    let snackbarContainer = document.querySelector('#messagePopUp');
    let data = null;

    if (current_color == "red") {
        document.getElementById("favoriteIcon").style.color = "black";
        data = { message: 'Removed from Favourite Videos' };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
        removeFromFavourite(player.currentSrc());

        let btn = document.getElementById("favoriteIcon");
        btn.innerHTML = `<img src="./css/images/button-designs_25.png" style="height:80%"></img>`

    } else {
        document.getElementById("favoriteIcon").style.color = "red";
        data = { message: 'Added to Favourite Videos' };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
        addToFavourite(player.currentSrc());

        let btn = document.getElementById("favoriteIcon");
        btn.innerHTML = `<img src="./css/images/button-designs_28.png" style="height:80%"></img>`
    }
}

// From the selected preferences, randomly select a video ID for the player
// This would be replaced with code for the content library + details from user account, currently just for show
function getTopic() {
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
function updateHistory(currentVideoInfo) {
    let current_user = JSON.parse(localStorage.getItem("USER"));
    let currentVideo = {
        videoUrl: currentVideoInfo[0],
        videoThumbnail: currentVideoInfo[1],
        videoTitle: currentVideoInfo[2]
    }

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let currentHistory = []
        let videoExist = false

        // If history is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()) {
            currentHistory = snapshot.val();
            for (i in currentHistory) {
                if (currentHistory[i].videoUrl == currentVideoInfo[0]) {
                    videoExist = true;
                }
            }
        }

        // Add video url to history only if video doesn't exist
        if (videoExist != true) {
            currentHistory.push(currentVideo)
            updateFirebase(currentHistory, current_user, 'videoHistory');
        }
    })
}

// Function to add video to favourites
function addToFavourite(currentVideoUrl) {
    let currentVideoInfo = "";
    for (i in playlist[0]) {
        if (playlist[0][i][0] == currentVideoUrl) {
            currentVideoInfo = playlist[0][i];
            break;
        }
    }

    let current_user = JSON.parse(localStorage.getItem("USER"));
    let currentVideo = {
        videoUrl: currentVideoInfo[0],
        videoThumbnail: currentVideoInfo[1],
        videoTitle: currentVideoInfo[2],
        videoPreference: currentVideoInfo[3]
    }

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite/`).once("value", function (snapshot) {
        let currentFavourites = []
        let videoExist = false
        console.log(snapshot.val())
        // If favourite is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()) {
            currentFavourites = snapshot.val();
            for (i in currentFavourites) {
                if (currentFavourites[i].videoUrl == currentVideoInfo[0]) {
                    videoExist = true;
                }
            }
        }

        // Add video url to history only if video doesn't exist
        if (videoExist != true) {
            currentFavourites.push(currentVideo)
            updateFirebase(currentFavourites, current_user, 'videoFavourite');
        }
    })
}

function checkFavoriteStatus(currentVideoUrl) {
    let current_user = JSON.parse(localStorage.getItem("USER"));

    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite/`).once('value', function (snapshot) {
        if (snapshot.exists()) {
            currentFavourites = snapshot.val();
            for (i in currentFavourites) {
                if (currentFavourites[i].videoUrl == currentVideoUrl) {
                    document.getElementById("favoriteIcon").style.color = "red";
                    break;
                } else {
                    document.getElementById("favoriteIcon").style.color = "black";
                }
            }
        }
    })
}

// Function to remove a video from favourites
function removeFromFavourite(currentVideoUrl) {
    let current_user = JSON.parse(localStorage.getItem("USER"));

    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).once('value', function (snapshot) {
        if (snapshot.exists()) {
            currentFavourites = snapshot.val();
            for (i in currentFavourites) {
                if (currentFavourites[i].videoUrl == currentVideoUrl) {
                    currentFavourites.splice(i);
                    updateFirebase(currentFavourites, current_user, 'videoFavourite')
                }
            }
        }
    })
}

// Function to update watch history of specific user in database
function updateFirebase(video_list, current_user, child_name) {
    firebase.database().ref('users').child(`${current_user.phone}`).child(child_name).set(
        video_list
        , function (error) {
            if (error) {
                console.log(error)
            }
        })
}

// Function to update description based on current video (to be done)
function updateDescription(description) {
    document.getElementById('videoDescription').innerHTML = description;
}

// Function to check whether user completed survey or not
function checkSurveyCompletion() {
    let phoneNum = "";
    let current_user = JSON.parse(localStorage.getItem("USER"));
    phoneNum = current_user['phone'];
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);
    let db = firebase.firestore();


    db.collection(phoneNum).get().then((querySnapshot) => {
        if (db.collection(phoneNum).exists) {
            userRef.update({ completedSurvey: 'yes' });  // indicates user completed survey
            location.href = "recommenderUi.html"; // redirect to recommender page
        } else {
            userRef.update({ completedSurvey: 'no' });  // indicates user has not completed survey 
        }
    });

    checkForPreference(stringPath);

}

function checkForPreference(stringPath) {
    firebase.database().ref(stringPath + "/preferences").once('value').then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            location.href = "recommenderUi.html"; // redirect to recommender
        }
        else {
            console.log("No data available");
            location.href = "recommender_select_skills.html";   // redirect to skill page (for first time user only)
        }
    }).catch((error) => {
        console.error(error);
    });
}

// Calls the Youtube Data Api v3 to find videos based on the keyword
function makeRequest(keywordList) {

    playlist = Array(keywordList.length);
    for (i in keywordList) {
        playlist[i] = [];
        let key = i;
        let keyword = keywordList[i]
        let request = new XMLHttpRequest();
        let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keyword}&key=${API_KEY}`

        request.onreadystatechange = function () {
            if (this.readyState == 4 && request.status == 200) {
                let videos = JSON.parse(this.response);
                for (j in videos.items) {
                    let videoUrl = "https://www.youtube.com/watch?v=" + videos.items[j].id.videoId;
                    let thumbnailUrl = videos.items[j].snippet.thumbnails.high.url;
                    let description = videos.items[j].snippet.title;
                    playlist[key].push([videoUrl, thumbnailUrl, description, keyword])

                    localStorage.setItem("playlist", JSON.stringify(playlist))

                    if (playlist[0] != []) {
                        playVideo();
                    }
                }
            }
        }

        request.open('GET', url);
        request.send()
    }


}

function querySelector() {
    let current_user = JSON.parse(localStorage.getItem("USER"));
    phoneNum = current_user['phone'];
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);
    let pref = JSON.parse(localStorage.getItem("preference"));
    userRef.update({preferences: pref});
    
    queryVideosOnPreferences(pref);

}

function queryVideosOnPreferences(preferences) {
    console.log(preferences)
    if (localStorage.getItem("playlist") == null) {
        makeRequest(preferences);
    }
}

function playVideo() {

    playlist = JSON.parse(localStorage.getItem("playlist"));

    player = videojs('my-video', {
        controls: true,
        techOrder: ['html5', 'youtube'],
        sources: [{
            type: 'video/youtube',
            src: playlist[0][0][0]
        }],
        youtube: { "customVars": { "rel": 0 } }
    })

    updateDescription(playlist[0][0][2]);
    changeShareDetails();

    checkFavoriteStatus(playlist[0][0][0]);
    // Fires when the player is ready
    player.ready(function () {

    })

    checkIcon();

    // Fires when player starts playing a video
    player.one('play', function () {
        let playlist = JSON.parse(localStorage.getItem('playlist'));
        let currentVideoUrl = player.currentSrc();
        for (i in playlist[0]) {
            if (playlist[0][i][0] == currentVideoUrl) {
                let currentVideoInfo = playlist[0][i];
                updateHistory(currentVideoInfo);
                break;
            }
        }
    })

    // Fires when players finishes playing a video
    player.on('ended', function () {
        player.exitFullscreen();
        player.resetProgressBar_();
        player.pause();
        skipToNextVideo();
    })
}

function skipToNextVideo() {
    let playlist = JSON.parse(localStorage.getItem("playlist"));

    if (player != null) {
        if (playlist.length != 0) {
            playlist[0].shift();
            if (playlist[0].length != 0) {
                localStorage.setItem("playlist", JSON.stringify(playlist))
                location.reload();
            } else {
                playlist.shift();
                localStorage.setItem("playlist", JSON.stringify(playlist))
                if (playlist.length == 0) {
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
const API_KEY = "AIzaSyAVC1xcE4jHY7m1lGcgKEcHNwE8MCDVHBs";
var current_user = JSON.parse(localStorage.getItem("USER"));

var playlist = null;
var player = null;

if (localStorage.getItem('playlist') != null) {
    playlist = JSON.parse(localStorage.getItem('playlist'));
    playVideo();
    queryVideoOnChatbot();
} else {
    querySelector();
}

