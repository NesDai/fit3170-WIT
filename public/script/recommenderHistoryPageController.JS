document.addEventListener('DOMContentLoaded', showHistoryTable(), false);

const API_KEY = "API_KEY";

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

// videojs player below
let videoUrl = localStorage.getItem('videoUrl')
// Creates the player
if (videoUrl == null){
    var player = videojs('my-video',{
        controls: true,
        techOrder: ['html5','youtube'],
        sources: [{
            type: 'video/youtube',
            src: 'https://www.youtube.com/watch?v=fcD94e93cCk'
        }],
        youtube: { "customVars": { "rel": 0 } }
    })
} else {
    var player = videojs('my-video',{
        controls: true,
        techOrder: ['html5','youtube'],
        sources: [{
            type: 'video/youtube',
            src: videoUrl
        }],
        youtube: { "customVars": { "rel": 0 } }
    })
}


// Fires when the player is ready
player.ready(function(){
    let currentVideoUrl = player.currentSrc();
    updateHistory(currentVideoUrl);
})


// Fires when player starts playing a video
player.on('play',function(){
    player.requestFullscreen()
})

// Fires when players finishes playing a video
player.on('ended', function(){
    player.exitFullscreen();
    player.resetProgressBar_();
    player.pause();
    localStorage.setItem('videoUrl', 'https://www.youtube.com/watch?v=ahLNCzV56yk')
    location.reload()
})

// Calls the Youtube Data Api v3 to find videos based on the keyword
function makeRequest(keyword){
    let request = new XMLHttpRequest();
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=${API_KEY}`

    request.onreadystatechange = function() {
        if (this.readyState == 4 && request.status == 200) {
            let text = JSON.parse(this.response)
            console.log(text)
        }
    }

    request.open('GET',url);
    request.send()
}

// Function to update watch history
function updateHistory(currentVideoUrl){
    let current_user = JSON.parse(localStorage.getItem("USER"));
    let currentVideo = {
        videoUrl: currentVideoUrl
    }

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function(snapshot){
        let currentHistory = []
        let videoExist = false

        // If history is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()){
            currentHistory = snapshot.val();
            console.log(currentHistory);
            for (i in currentHistory){
                if (currentHistory[i].videoUrl == currentVideoUrl){
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
function addToFavourite(currentVideoUrl){
    let current_user = JSON.parse(localStorage.getItem("USER"));
    let currentVideo = {
        videoUrl: currentVideoUrl
    }

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).once("value", function(snapshot){
        let currentFavourites = []
        let videoExist = false

        // If favourite is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()){
            currentFavourites = snapshot.val();
            for (i in currentFavourites){
                if (currentFavourites[i].videoUrl == currentVideoUrl){
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
function updateDescription(){

}

var videoNames = [];
// Function to populate history page table
function showHistoryTable(){
  console.log("Show history table ran.");
  let current_user = JSON.parse(localStorage.getItem("USER"));

  table = document.getElementById('historyTableBody');
  table.innerHTML = "";

  // Retrieves the currently stored watch history
  firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function(snapshot){
      let currentHistory = []

      // If history is not empty and video already exists in history, set videoExist to true
      if (snapshot.exists()){
          currentHistory = snapshot.val();
          console.log(currentHistory);


          table = document.getElementById('historyTableBody');
          var title;

          for (i in currentHistory){
            currentVideo = currentHistory[i].videoUrl;
            console.log(currentHistory);
            currentVideo = currentVideo.split("watch?v=");
            currentVideo = currentVideo[1];

            snippet = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + currentVideo + "&key=" + API_KEY;

            $.getJSON(snippet, function(data) {
              console.log("second success callback");

              url = "https://www.youtube.com/watch?v=" + getVideoUrl(data);

              tr = document.createElement("tr");

              td0 = document.createElement("td");
              td0.className = "mdl-data-table__cell--non-numeric";
              img = document.createElement("img");
              img.src = getVideoThumbnailUrl(data);
              td0.appendChild(img);

              td1 = document.createElement("td");
              td1.className = "mdl-data-table__cell--non-numeric";

              td2 = document.createElement("td");
              td2.className = "mdl-data-table__cell--non-numeric";
              td2.innerHTML = url;

              td3 = document.createElement("td");
              a = document.createElement("a");
              a.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent";
              a.innerHTML = "DELETE";

              td4 = document.createElement("td");
              a2 = document.createElement("a");
              a2.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button";
              a2.innerHTML = "VIEW";

              console.log(data);

              title = getTitle(data);
              td1.innerHTML = title;

              a.addEventListener('click', function(){
                if(confirm("Are you sure you want to delete this entry?")){
                  console.log("Deleted an entry.");
                  var row = this.parentElement.parentElement;
                  console.log("Row index: " + row.rowIndex);
                  var url = row.getElementsByTagName("td")[2].innerHTML;
                  console.log(url);
                  var table = this.parentElement.parentElement.parentElement;
                  removeFromHistory(url);
                  table.deleteRow(row.rowIndex-1);
                };
              }, false);

              td3.appendChild(a);

              td4.appendChild(a2);

              a2.addEventListener('click', function(){
                var row = this.parentElement.parentElement;
                var url = row.getElementsByTagName("td")[2].innerHTML;
                console.log(url);
                window.open(url, '_blank').focus();
              }, false);

              tr.appendChild(td0);
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td4);
              tr.appendChild(td3);
              table.appendChild(tr);


              // console.log(data);
              videoNames += title;


            })
            .fail(function() {
              console.log("error, see network tab for response details");
            });

            //console.log(typeof title);
          }
      }

      // If history is empty, add message to show history is empty
      else{
        console.log("History is currently empty.")
      }
  })
}

function getTitle(json_data){
  var title = json_data.items[0].snippet.title;
  //console.log(title);

  return title;
}


function getVideoUrl(json_data){
  var url = json_data.items[0].id;

  return url;
}

function getVideoThumbnailUrl(json_data){
  var url = json_data.items[0].snippet.thumbnails.default.url;

  return url;
}

function deleteAllHistory(){
  if(confirm("Are you sure you want to delete your entire watch history?")){
    console.log("All history deleted.");
  }
  let current_user = JSON.parse(localStorage.getItem("USER"));
  firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).remove();

  location.reload();
}

// Function to remove a video from history
function removeFromHistory(currentVideoUrl){
    let current_user = JSON.parse(localStorage.getItem("USER"));

    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once('value', function(snapshot){
        if (snapshot.exists()){
            currentHistory = snapshot.val();;
            for (i in currentHistory){
                if (currentHistory[i].videoUrl == currentVideoUrl){
                    currentHistory.splice(i);
                    updateFirebase(currentHistory, current_user, 'videoHistory')
                }
            }
        }
    })
}

// Runs on page load
var counter = 1
