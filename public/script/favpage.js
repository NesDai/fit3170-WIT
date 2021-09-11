let tableArea = document.getElementById('favtable');
let favCount = 0;
let current_user = JSON.parse(localStorage.getItem("USER"));
let emptyTxt = "<br><br><br>There are no videos saved in favorites right now";
let listInterest = ["Art","Caregiving","Collaboration and Teamwork","Cooking","Critical Thinking","Effective Communication","Email Management and Setup","Entrepreneurship","Exercise","Leadership","Listening","Negotiation","Online Collaboration","Personal Selling","Persuasion","Professional Writing","Relationship Management","Search Engine Use","Smartphone/Tablet Use","Social Media Use"]
// let listInterest = ["Art","Baking","Interest3","Interest4","Interest5","Interest6","Interest7","Interest8","A very very very long interest with spaces in between","Looooooooooooooooooooooooooooooooooonnnnnnnggggggggggggggggggg","Interest3","Interest4","Interest5","Interest6","Interest7","Interest8","Art","Baking","Interest3","Interest4","Interest5","Interest6","Interest7","Interest8"]
phoneNum = current_user['phone'];
let myFavList = [];
let sortGenerated = false;

let mylst = [];
// displayFav();
showFavTable();

function displayFav(){
  // Read from firebase realtime database and display fav in html
    
  firebase.database().ref('users/'+phoneNum+'/videoFavourite').on('value', (snapshot) => {
    // console.log(snapshot.val())
    if (snapshot.val() == null){
      let showEmpty = document.getElementById("favEmptyText");
      showEmpty.innerHTML = "";
      showEmpty.innerHTML = emptyTxt;
    }
    else{
      let favList = snapshot.val();
      // console.log(Object.keys(favList).length)
      // console.log(favList[0]);
      // console.log(favList[1]);
      // console.log(favList[2]);
      // console.log(favList.length);
      // console.log("len: " + favList.length);
      // console.log("favList: " + favList[favList.length-1]);
      // console.log("favList: " + favList[favList.length-1]["videoTitle"]);
      
      // console.log(favList);
      // console.log(favList[0]);
      // console.log(favList[0]['videoPreference']);
      // console.log(favList[0]['videoThumbnail']);
      // console.log(favList[0]['videoTitle']);
      // console.log(favList[0]['videoUrl']);
      output = "";
      let count = 0;
      myFavList = []
      for (let i = 0; count<Object.keys(favList).length; i++){
        if (favList[i]){
          let url = favList[i]['videoUrl']
          output += `<div id="favCard${i}" class="favCard">`
          output += `<p class="hideStuff" id=favUrl${i}>`+url+`</p>`
          output += `<div class="favCardThumbnail" onclick="watch_vid(${i})"><img src=`+ favList[i]['videoThumbnail'] +` style="width:auto;height:100%; position: relative; background-color: #fff;"></div>`
          output += `<div class="favCardTopBtn">`
          output += `<button class="favDeleteBtn" onclick="fav_delete(${i})">
                      <img src="./css/images/trash_icon.jpeg" style="background:transparent; height: 80%;"/>
                    </button></div>`
          output += `<div class="favCardInterest" onclick="watch_vid(${i})">`+favList[i]['videoPreference']+`</div>`
          output += `<div class="favCardTitle" onclick="watch_vid(${i})">`+favList[i]['videoTitle']+`</div>`
          
          output += `</div>`
          favCount += 1
          count += 1
          myFavList.push(favList[i]['videoPreference'])
        }
      }
      tableArea.innerHTML = output;
    }
  })
}

function fav_delete(id){
  // Delete a favCard element in HTML
  // alert("You deleted me :C" + id)

  let a = false;
  a = confirm("Remove from favourite?");
  if (a == true) {
    let card = document.getElementById("favCard"+id);
    card.parentNode.removeChild(card);
    favCount -= 1;
    fav_del_db(id);
    
    if (favCount == 0){
      let showEmpty = document.getElementById("favEmptyText");
      showEmpty.innerHTML = emptyTxt;
    } 
  }
}

function fav_del_db(id){
  firebase.database().ref('users').child(`${current_user.phone}/videoFavourite/`).once("value", function(snapshot){
    let currentFav = []

    console.log(snapshot.val())
    if (snapshot.exists()){
      myFavList[id] = myFavList[myFavList.length-1]
      myFavList.pop()
      currentFav = snapshot.val();
      currentFav[id] = currentFav[currentFav.length-1]
      currentFav.pop()
      // console.log("After: " + currentFav)
      // Delete favourite data in firebase realtime database
      firebase.database().ref('users/'+phoneNum+'/videoFavourite/').set(currentFav);
      // firebase.database().ref('users/'+phoneNum+'/videoFavourite/'+currentFav.length-1).remove();
      filter()
    }
  })
}

function watch_vid(id){
  // Watch video of id, top video id = 0, id+=1 for following vids
  // Show and hide video of specific ID

  let player = document.getElementById("favVideo");
  player.style.display = "block";
  // player.style.opacity = 1;
  let url = document.getElementById("favUrl"+id).innerHTML;

  let vid = document.getElementById("favVideoPlayer");

  let link = `<button style="float:right; height: 100px;" onclick="hide_vid()">Return to Favourite</button>`
  link += `<div class="h_iframe">`
  link += `<iframe src=` + "https://www.youtube-nocookie.com/embed/" + url.substring(32) +"?rel=1"
  link += `title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen;></iframe></div>`
  console.log(link)
  player.innerHTML = link;
}
function hide_vid(){
  // Hide video show fav page
  let player = document.getElementById("favVideo");
  player.style.display = "none";
  player.innerHTML = "";
}

function show_sort(){
  let sortArea = document.getElementById("sortingArea");
  let myBtn = document.getElementById("favSortBtn");

  if (sortArea.style.display == "none"){
    sortArea.style.display = "block";
    myBtn.innerHTML = "Close sort"
  }
  else{
    sortArea.style.display = "none";
    myBtn.innerHTML = "Sort by interest"
    filter()
  }
  // alert(myFavList)
  if (sortGenerated == false){
    sortGenerated = true;
    sortArea.innerHTML+=`<br><br>`;
    for (let i = 0; i<listInterest.length; i++){
      sortArea.innerHTML+=`<div class="sortInterestBox"><input type="checkbox" name="interest" style="margin-left: 15px;margin-top: 10px;" value="`+listInterest[i]+`"><label class="labelSort">`+listInterest[i]+"&nbsp"+`</label></div>`
    }
  }
}

function inList(value, list){
  // Determine to hide or show favCard when user sort

  console.log(value)
  console.log(list)

  if (list.length == 0){
    // if none of the filter option is selected show all
    return true;
  }
  for (let i = 0; i<list.length; i++){
    if (value == list[i]){
      console.log(true)
      return true;
    }
  }
  console.log(false)
  return false;
}
function filter() {
  let checkboxes = document.getElementsByName("interest");
  console.log(checkboxes);
  let values = [];
  for (let i = 0; i < checkboxes.length; i++){  
    if(checkboxes[i].checked){
      values.push(checkboxes[i].value)
    } 
  }
  console.log(values, myFavList, favCount);
  

  let cards = "";
  for (let j = 0; j < myFavList.length; j++){
    // this does not work
    // console.log(myFavList[j] in values);
    // console.log(!(myFavList[j] in values));
    cards = document.getElementById(`favCard${j}`);
    cards.style.display = "block"
    // If not in values hide favCard
    if (inList(myFavList[j], values) == false){
      cards = document.getElementById(`favCard${j}`);
      cards.style.display = "none"
    }
  }
}

function showFavTable(){
  console.log("Show history grid ran.");
  let current_user = JSON.parse(localStorage.getItem("USER"));

  grid = document.getElementById('favGrid');

  // Retrieves the currently stored watch history
  firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).once("value", function(snapshot){
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
              skill = currentVideo.videoPreference;

              // Grid implementation

              cell = document.createElement("div");
              cell.className = "mdl-cell mdl-cell--6-col";

              card = document.createElement("div");
              card.className = "demo-card-wide mdl-card mdl-shadow--2dp";
              card.style.height = "400px";
              card.style.width = "auto";

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
              cardSupport_2.innerHTML = `<b>`+skill+`<b><br>`;
              cardSupport_2.innerHTML += title;
              card.appendChild(cardSupport_2);

              cardAction = document.createElement("div");
              cardAction.className = "mdl-card__actions mdl-card--border";
              cardActionButton_1 = document.createElement("a");
              cardActionButton_1.className = "mdl-button mdl-button--colored mdl-js-button";
              cardActionButton_1.innerHTML = "VIEW";
              cardAction.appendChild(cardActionButton_1);

              cardActionButton_1.addEventListener('click', function(){
                var row = this.parentElement.parentElement;
                var url = row.getElementsByTagName("div")[1].innerHTML;
                console.log(url);
                window.open(url, '_blank').focus();
              }, false);

              cardActionButton_2 = document.createElement("a");
              cardActionButton_2.className = "mdl-button mdl-js-button mdl-button--raised mdl-button--accent";
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

      // If favourite is empty, add message to show history is empty
      else{
        console.log("Fav is currently empty.")
      }
  })
}
