// Activated when "Rate" is pressed, transitioning the users to the screen where they will rate their last recommendation
/**
 * Function used to check if a video link is from youtube.
 * If it is, then it manipulates the url to be able to display a video on the app.
 * @param {1} url: input url of a video from create_post.html
 * @returns youtube_url: the url with embed param added if the condition is satisfied. Or else, it returns 0
 */
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
    console.log("...")
    // TODO like and dislike btn check
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let likeBtn = document.getElementById("positiveRating")
        let dislikeBtn = document.getElementById("negativeRating")

        let ss = snapshot.val();
        let title = document.getElementById("videoDescription");

        for (let i = 0; i < ss.length; i++) {
            // console.log(i)
            // console.log(title.innerHTML);
            // console.log(ss[i]["videoTitle"]);
            if (title.innerHTML === ss[i]["videoTitle"]) {
                if(ss[i]["like"] === true){
                    likeBtn.innerHTML = `<img src="./css/images/button-designs_17.png" style="height:80%"></img>`
                }
                else if(ss[i]["dislike"] === true){
                    dislikeBtn.innerHTML = `<img src="./css/images/button-designs_18.png" style="height:80%"></img>`
                }
                else{
                    likeBtn.innerHTML = `<img src="./css/images/button-designs_23.png" style="height:80%"></img>`
                    dislikeBtn.innerHTML = `<img src="./css/images/button-designs_24.png" style="height:80%"></img>`
                }

            }
        }


    })

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

    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));

    // Remove Like
    if (likeBtn.innerHTML == `<img src="./css/images/button-designs_17.png" style="height:80%">`) {
        likeBtn.innerHTML = `<img src="./css/images/button-designs_23.png" style="height:80%">`

        console.log("Remove like")
        updateLikeDislike(playlist[currentVideoNum], 'none')
    }
    // Like
    else {
        likeBtn.innerHTML = `<img src="./css/images/button-designs_17.png" style="height:80%">`
        dislikeBtn.innerHTML = `<img src="./css/images/button-designs_24.png" style="height:80%">`

        console.log("Like")
        updateLikeDislike(playlist[currentVideoNum], 'like')
    }
    
}

// Executes when the user gives a negative rating
function negativeRating() {
    //TODO add recomender update here

    let likeBtn = document.getElementById("positiveRating")
    let dislikeBtn = document.getElementById("negativeRating")

    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));

    // Remove dislike
    if (dislikeBtn.innerHTML == `<img src="./css/images/button-designs_18.png" style="height:80%">`) {
        dislikeBtn.innerHTML = `<img src="./css/images/button-designs_24.png" style="height:80%">`

        console.log("Remove dislike")
        updateLikeDislike(playlist[currentVideoNum], 'none')
    }
    // Dislike
    else {
        dislikeBtn.innerHTML = `<img src="./css/images/button-designs_18.png" style="height:80%">`
        likeBtn.innerHTML = `<img src="./css/images/button-designs_23.png" style="height:80%">`

        console.log("Dislike")
        updateLikeDislike(playlist[currentVideoNum], 'dislike')
    }
    
}

// Executes when the user clicks the favourite button (for adding a video to their favourites list)
function favoriteRating() {
    let current_color = document.getElementById("favoriteIcon").style.color;
    let snackbarContainer = document.querySelector('#messagePopUp');
    let data = null;
    let playlist = JSON.parse(localStorage.getItem("playlist"));
    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));

    if (current_color == "red") {
        document.getElementById("favoriteIcon").style.color = "black";
        data = { message: 'Removed from Favourite Videos' };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
        removeFromFavourite(playlist[currentVideoNum].videoUrl);

        let btn = document.getElementById("favoriteIcon");
        btn.innerHTML = `<img src="./css/images/button-designs_25.png" style="height:80%"></img>`

    } else {
        document.getElementById("favoriteIcon").style.color = "red";
        data = { message: 'Added to Favourite Videos' };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
        addToFavourite(playlist[currentVideoNum]);

        let btn = document.getElementById("favoriteIcon");
        btn.innerHTML = `<img src="./css/images/button-designs_28.png" style="height:80%"></img>`
    }
}

// Function to add video to favourites
function addToFavourite(currentVideoInfo) {
    let current_user = JSON.parse(localStorage.getItem("USER"));
    let currentVideo = {
        videoUrl: currentVideoInfo.videoUrl,
        videoThumbnail: currentVideoInfo.videoThumbnail,
        videoTitle: currentVideoInfo.title,
        videoPreference: currentVideoInfo.interest
    }

    let videoUrlEnd = currentVideo.videoUrl.split("https://www.youtube.com/embed/");
    videoUrlEnd = videoUrlEnd[1];
    console.log(videoUrlEnd);

    let time = Date.now();

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite/`).once("value", function (snapshot) {
        let currentFavourites = []
        let videoExist = false

        // If favourite is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()) {
            currentFavourites = snapshot.val();
            for (i in currentFavourites) {
                if (currentFavourites[i].videoUrl == currentVideoInfo.videoUrl) {
                    videoExist = true;
                }
            }
        }

        // Add video url to history only if video doesn't exist
        if (videoExist != true) {
            currentFavourites.push(currentVideo);
            updateFirebase(currentFavourites, current_user, 'videoFavourite');
        }
    })

    current_user["time"] = time;
    //Storing data on how many times each video has been favourited, cumulatively
    firebase.database().ref('recommenderData').child(`favourite/`).once("value", function (snapshot) {
        if (snapshot.exists()) {
            currentFavourites = snapshot.val();
            // If the video has previously been favourited
            if (currentFavourites[videoUrlEnd] != undefined){
                // If the user has not previously favourited this video
                if (currentFavourites[videoUrlEnd].favouritedUsers[current_user.phone] == undefined){
                    currentFavourites[videoUrlEnd].favouritedAmmount += 1;
                    currentFavourites[videoUrlEnd].favouritedUsers[current_user.phone] = current_user;
                }
            }

            // If the video has not been previously favourited
            else{
                let user = {}
                user[current_user.phone] = current_user;
                let newFavourite = {
                    favouritedAmmount: 1,
                    preferenceType: currentVideo.videoPreference,
                    favouritedUsers: user
                }

                currentFavourites[videoUrlEnd] = newFavourite;
            }

            // Setting changes on firebase
            console.log(currentFavourites);
            firebase.database().ref('recommenderData/favourite').set(
                currentFavourites
                , function (error) {
                    if (error) {
                        console.log(error)
                    }
                })
        }
    })

    id = currentVideo.videoPreference;
    // Update skill favourited statistics
    firebase.database().ref('recommenderData').child(`skills/`).once("value", function (snapshot) {
        if (snapshot.exists()) {
            currentSkills = snapshot.val();

            // Check if the skill has previously selected/favourited on the database, update if so
            if (currentSkills[id] != undefined){
                if(currentSkills[id].favouritedAmmount != undefined){
                    currentSkills[id].favouritedAmmount += 1;
                }
                else{
                    currentSkills[id].favouritedAmmount = 1;
                }
                
            }
            
            // Else if this is the first time skill is being selected/favourited
            else {
                let selectedTime = {}
                selectedTime[time] = time;
                
                let newSkillCombine = {
                    selectedAmmount: 0,
                    favouritedAmmount: 1,
                    selectedTime: selectedTime
                }

                currentSkills[id] = newSkillCombine;
            }

            // Update the firebase skills data section with changes
            firebase.database().ref('recommenderData/skills').set(
                currentSkills
                , function (error) {
                    if (error) {
                        console.log(error)
                    }
                })
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
                    let btn = document.getElementById("favoriteIcon");
                    btn.innerHTML = `<img src="./css/images/button-designs_28.png" style="height:80%"></img>`
                    break;
                } else {
                    document.getElementById("favoriteIcon").style.color = "black";
                    let btn = document.getElementById("favoriteIcon");
                    btn.innerHTML = `<img src="./css/images/button-designs_25.png" style="height:80%"></img>`
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

// Function to update description based on current video
function updateDescription(description) {
    document.getElementById('videoDescription').innerHTML = description;
}

// Function to check whether user completed survey or not
function checkForPreference() {
    let phoneNum = "";
    let current_user = JSON.parse(localStorage.getItem("USER"));
    phoneNum = current_user['phone'];
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);
    let db = firebase.firestore();


    firebase.database().ref(stringPath + "/preferences").once('value').then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            location.href = "recommender_Ui.html"; // redirect to recommender
        }
        else {
            console.log("No data available");
            location.href = "recommender_select_skills.html";   // redirect to skill page (for first time user only)
        }
    }).catch((error) => {
        console.error(error);
    });

}


function queryVideosOnPreferences() {
    let current_user = JSON.parse(localStorage.getItem("USER"));
    phoneNum = current_user['phone'];
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);
    let pref = JSON.parse(localStorage.getItem("preference"));
    userRef.update({preferences: pref});
    
    if (localStorage.getItem("playlist") == null) {
        makeRequest(pref);
    }
}

function getVideoId(videoURL){
    var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

    videoId = videoURL.match(rx);
    
    return videoId[1];
}

// Gets all the video that fits the preference and stores them in localstorage
function makeRequest(preference) {

    firebase.database().ref("posts").once('value').then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach(function(childSnap){
                if (childSnap.val().interest[0] == preference && childSnap.val().recommender){
                    let value = childSnap.val();
                    let videoObj = {
                        title: value.title,
                        videoUrl: value.videoURL,
                        videoThumbnail: value.videoThumbnail,
                        videoId: getVideoId(value.videoURL),
                        postId: value.id,
                        interest: value.interest[0]
                    }
                    if (childSnap.val().topVideo){
                        playlist.unshift(videoObj);
                    } else {
                        playlist.push(videoObj);
                    }
                }
            })
            localStorage.setItem("playlist", JSON.stringify(playlist));
            localStorage.setItem("currentVideoNumber", 0);
            playVideo();
        }
        else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function playVideo() {
    changeShareDetails();

    playlist = JSON.parse(localStorage.getItem("playlist"));
    currentVideoNumber = JSON.parse(localStorage.getItem("currentVideoNumber"));

    //Checks favourite status
    checkFavoriteStatus(playlist[currentVideoNumber].videoUrl);


    // Loads a new video
    player.loadVideoById(playlist[currentVideoNumber].videoId);
    player.stopVideo();

    // Updates the page's description with the video title
    updateDescription(playlist[currentVideoNumber].title);

    checkIcon();
}

// Fires when the move to forum button is clicked
function moveToForum(){
    const baseurl = "/post.html?post_id=";

    playlist = JSON.parse(localStorage.getItem("playlist"));
    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));

    let destinationUrl = baseurl.concat(playlist[currentVideoNum].postId);
    window.location = destinationUrl;
}

// Fires when the skip previous button is clicked
function skipToPreviousVideo() {
    playlist = JSON.parse(localStorage.getItem("playlist"));

    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));
    currentVideoNum -= 1;
    
    if (currentVideoNum < 0){
        currentVideoNum = 0;
        alert("You are already at the beginning of the list of recommended videos");
    }
    
    localStorage.setItem("currentVideoNumber", currentVideoNum);
    
    player.loadVideoById(playlist[currentVideoNum].videoId);
    updateDescription(playlist[currentVideoNum].title);
    changeShareDetails();
}

// Fires when the skip next button is clicked
function skipToNextVideo() {
    playlist = JSON.parse(localStorage.getItem("playlist"));

    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));
    currentVideoNum += 1;
    
    if (currentVideoNum >= playlist.length){
        currentVideoNum = 0;
        alert("You have gone through all the recommended videos");
    }
    
    localStorage.setItem("currentVideoNumber", currentVideoNum);

    player.loadVideoById(playlist[currentVideoNum].videoId);
    updateDescription(playlist[currentVideoNum].title);
    changeShareDetails();
}

function onPlayerReady(){
    console.log("ready")
    // Adds listener to the state change of the player (play,pause, etc.)

    if (localStorage.getItem('playlist') != null) {
        playlist = JSON.parse(localStorage.getItem('playlist'));
        playVideo();
    } else {
        queryVideosOnPreferences();
    }

    player.stopVideo();
}



// Function to update watch history
function updateHistory(currentVideoInfo) {
    let current_user = JSON.parse(localStorage.getItem("USER"));
    let currentVideo = {
        videoUrl: currentVideoInfo.videoUrl,
        videoThumbnail: currentVideoInfo.videoThumbnail,
        videoTitle: currentVideoInfo.title,
        postId: currentVideoInfo.postId
    }

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let currentHistory = []
        let videoExist = false

        // If history is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()) {
            currentHistory = snapshot.val();
            for (i in currentHistory) {
                if (currentHistory[i].videoUrl == currentVideoInfo.videoUrl) {
                    videoExist = true;
                }
            }
        }

        // Add video url to history only if video doesn't exist
        if (videoExist != true) {
            currentVideo.totalWatchCount = 0;
            currentVideo.like = false;
            currentVideo.dislike = false;
            currentHistory.push(currentVideo)
            updateFirebase(currentHistory, current_user, 'videoHistory');
        }
    })
}

function updateWatchCount(currentVideoInfo){
    let current_user = JSON.parse(localStorage.getItem("USER"));

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let currentHistory = []

        // If history is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()) {
            currentHistory = snapshot.val();
            for (i in currentHistory) {
                if (currentHistory[i].videoUrl == currentVideoInfo.videoUrl) {
                    let updateCount = parseInt(currentHistory[i].totalWatchCount)
                    updateCount += 1;
                    console.log("Update count", updateCount)
                    firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({totalWatchCount: updateCount});

                }
            }
        }

    })
}

function updateLikeDislike(currentVideoInfo, actionType){
    let current_user = JSON.parse(localStorage.getItem("USER"));

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let currentHistory = []

        // If history is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()) {
            currentHistory = snapshot.val();
            for (i in currentHistory) {
                if (currentHistory[i].videoUrl == currentVideoInfo.videoUrl) {
                    if(actionType === 'like'){
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({like: true});
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({dislike: false});
                    }
                    else if(actionType === 'dislike'){
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({dislike: true});
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({like: false});
                    }
                    else if(actionType === 'none'){
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({like: false});
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({dislike: false});
                    }
                }
            }
        }

    })
}

// Function to get video analytics and store it to Firebase
function saveAnalytics(currentVideoAnalytics, currentGTMUrl){
    let current_user = JSON.parse(localStorage.getItem("USER"));
    let todaysDate = new Date()
    const offset = todaysDate.getTimezoneOffset()
    todaysDate = new Date(todaysDate.getTime() - (offset*60*1000))
    todaysDate = todaysDate.toISOString().split('T')[0];
    //let currentUnixTimestamp = Date.now();
    let currentTimestamp = new Date().toISOString().substr(11, 8);

    let videoIndex = -1;

    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let currentHistory = []

        // If history is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()) {
            currentHistory = snapshot.val();
            for (i in currentHistory) {
                let currentHistoryUrlStrip = currentHistory[i].videoUrl.replace("https://www.youtube.com/embed/", "")
                
                let index = currentGTMUrl.indexOf(currentHistoryUrlStrip)
                let currentGTMUrlStrip = currentGTMUrl.substring(index, currentGTMUrl.length);
                
                console.log(currentHistoryUrlStrip)
                console.log(currentGTMUrlStrip)

                if (currentHistoryUrlStrip === currentGTMUrlStrip) {
                    videoIndex = i;
                }
                else{
                console.log("Not" + i);
                }
            }
        }

        if(videoIndex !== -1){
            firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${videoIndex}/videoAnalytics/${todaysDate}/${currentTimestamp}`).set(currentVideoAnalytics).then(() => {
                console.log(videoIndex);
                console.log(currentTimestamp);
            });
        }
        else{
        console.log("Something is not right")
        }
        
    })
}

function onPlayerStateChange(event){
    console.log(event.data)
    // Fires if the video is playing
    updateHistory(playlist[currentVideoNumber]);
    if (event.data == YT.PlayerState.PLAYING) {
        //Do something
        let currentVideoNumber = JSON.parse(localStorage.getItem("currentVideoNumber"));
        playlist = JSON.parse(localStorage.getItem("playlist"));
        console.log("Fire")
        //updateHistory(playlist[currentVideoNumber]);
    }
}

// Runs on page load
// Initializing variables
var current_user = JSON.parse(localStorage.getItem("USER"));
var playlist = [];
var player = null;


// Loads youtube iframe api
setTimeout(()=>{
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    $(function(){
        player = new YT.Player('my-video', {
            height: '390',
            width: '640',
            playerVars: {
            'autoplay': 0
            },
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady,
                'onError': function(){
                    console.log("error");
                }
            },
            enablejsapi: 1
        });
    })
}, 500);

// Fetch the analytics and store every 10s
let pauseCounter = 0; 
let intervalTime = 10000;

let interval = setInterval(function (){
    let currentDataLayerEntry = dataLayer[dataLayer.length-1]

    if(currentDataLayerEntry['event'] === 'gtm.video'){
        let currentGTMUrl = currentDataLayerEntry['gtm.videoUrl']
        let currentVideoAnalytics = {
            //currentWatchCount: 
            videoCurrentTime: currentDataLayerEntry['gtm.videoCurrentTime'],
            videoDuration: currentDataLayerEntry['gtm.videoDuration'],
            videoElapsedTime: currentDataLayerEntry['gtm.videoElapsedTime'],
            videoPercent: currentDataLayerEntry['gtm.videoPercent'],
            videoStatus: currentDataLayerEntry['gtm.videoStatus'],
            videoVisible: currentDataLayerEntry['gtm.videoVisible']
        }

    
        if(currentVideoAnalytics.videoStatus === 'start'){
            updateWatchCount(playlist[currentVideoNumber])
               
            pauseCounter = 0;
            saveAnalytics(currentVideoAnalytics, currentGTMUrl);
        }
        else if(currentVideoAnalytics.videoStatus === 'pause' || currentVideoAnalytics.videoStatus === 'complete'){
            pauseCounter += 1;
            if(pauseCounter < 13) {
                saveAnalytics(currentVideoAnalytics, currentGTMUrl);
            }

            // if video is paused / not replayed for some time (2 mins), stop saving to database
        }
        else if(currentVideoAnalytics.videoStatus === 'progress'){
            pauseCounter = 0;
            saveAnalytics(currentVideoAnalytics, currentGTMUrl);
        }
    }
}, intervalTime)

