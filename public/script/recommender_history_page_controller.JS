document.addEventListener('DOMContentLoaded', showHistoryTable(), false);


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


var videoNames = [];
// Function to populate history page table
function showHistoryTable(){
  console.log("Show history grid ran.");
  let current_user = JSON.parse(localStorage.getItem("USER"));

  grid = document.getElementById('historyGrid');

  // Retrieves the currently stored watch history
  firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function(snapshot){
      let currentHistory = []

      // If history is not empty and video already exists in history, set videoExist to true
      if (snapshot.exists()){
          currentHistory = snapshot.val();
          console.log(currentHistory);

          // Table implementation
          var title;

          for (i in currentHistory){
            currentVideo = currentHistory[i];

            $(document).ready(function() {

              console.log("second success callback");
              title = currentVideo.videoTitle;


              // console.log(data);
              videoNames += title;

              // Grid implementation

              cell = document.createElement("div");
              cell.className = "mdl-cell mdl-cell--6-col";

              card = document.createElement("div");
              card.className = "demo-card-wide mdl-card mdl-shadow--2dp";
              card.style.height = "400px";

              cardTitle = document.createElement("div");
              cardTitle.className = "mdl-card__title";
              cardTitle.style.background = "url(" + currentVideo.videoThumbnail + ") center / cover";
              cardTitle.style.height = "300px";
              console.log(currentVideo.videoThumbnail);

              card.appendChild(cardTitle);

              cardSupport_1 = document.createElement("div");
              cardSupport_1.className = "mdl-card__supporting-text";
              cardSupport_1.innerHTML = currentVideo.videoUrl;
              cardSupport_1.style.display = "none";
              cardSupport_1.style.height = "1px";
              card.appendChild(cardSupport_1);

              cardSupport_2 = document.createElement("div");
              cardSupport_2.className = "mdl-card__supporting-text";
              cardSupport_2.innerHTML = title;
              card.appendChild(cardSupport_2);

              cardAction = document.createElement("div");
              cardAction.className = "mdl-card__actions mdl-card--border";
              cardActionButton_1 = document.createElement("a");
              cardActionButton_1.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";
              cardActionButton_1.innerHTML = "VIEW";
              cardAction.appendChild(cardActionButton_1);

              cardActionButton_1.addEventListener('click', function(){
                var row = this.parentElement.parentElement;
                var url = row.getElementsByTagName("div")[1].innerHTML;
                console.log(url);
                window.open(url, '_blank').focus();
              }, false);

              cardActionButton_2 = document.createElement("a");
              cardActionButton_2.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent";
              cardActionButton_2.innerHTML = "DELETE";
              cardAction.appendChild(cardActionButton_2);

              cardActionButton_2.addEventListener('click', function(){
                if(confirm("Are you sure you want to delete this entry?")){
                  console.log("Deleted an entry.");
                  var row = this.parentElement.parentElement;
                  console.log("Row index: " + row.rowIndex);
                  var url = row.getElementsByTagName("div")[1].innerHTML;
                  console.log(url);
                  var cell = this.parentElement.parentElement.parentElement;
                  console.log(cell);
                  removeFromHistory(url);
                  cell.remove();
                };
              }, false);

              card.appendChild(cardAction);

              cell.appendChild(card);
              grid.appendChild(cell);
            })
          }
      }

      // If history is empty, add message to show history is empty
      else{
        console.log("History is currently empty.")
      }
  })
}


function deleteAllHistory(){
  if(confirm("Are you sure you want to delete your entire watch history?")){
    console.log("All history deleted.");

    let current_user = JSON.parse(localStorage.getItem("USER"));
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).remove();

    location.reload();
  }
}

// Function to remove a video from history
function removeFromHistory(currentVideoUrl){
    let current_user = JSON.parse(localStorage.getItem("USER"));

    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once('value', function(snapshot){
        if (snapshot.exists()){
            currentHistory = snapshot.val();
            for (i in currentHistory){
                if (currentHistory[i].videoUrl == currentVideoUrl){
                    currentHistory.splice(i,1);
                    updateFirebase(currentHistory, current_user, 'videoHistory');
                    break;
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
