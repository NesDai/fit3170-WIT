let tableArea = document.getElementById('favtable');
let favCount = 0;
let current_user = JSON.parse(localStorage.getItem("USER"));
let emptyTxt = "<br><br><br>There are no videos saved in favorites right now";
let listInterest = ["Email Management and Setup","Search Engine Use","Smartphone/Tablet Use","Social Media Use","Online Collaboration","Effective Communication","Negotiation","Listening","Relationship Management","Persuasion","Cooking","Art","Caregiving","Exercise","Professional Writing","Collaboration and Teamwork","Leadership","Entrepreneurship","Personal Selling","Critical Thinking"];

// let listInterest = ["Art","Baking","Smartphone/Tablet Use","Interest4","Interest5","Interest6","Interest7","Interest8","A very very very long interest with spaces in between","Looooooooooooooooooooooooooooooooooonnnnnnnggggggggggggggggggg","Interest3","Interest4","Interest5","Interest6","Interest7","Interest8","Art","Baking","Interest3","Interest4","Interest5","Interest6","Interest7","Interest8"]
phoneNum = current_user['phone'];
let myFavList = [];
let sortGenerated = false;

let mylst = [];
displayFav();

// function addFavIdCount(){
//   let count = parseInt(getFavIdCount());
//   count += 1
//   firebase.database().ref('users/'+phoneNum+'/favCount').set(count);
// }

// function getFavIdCount(){
//   firebase.database().ref('users/'+phoneNum+'/favCount').on('value', (snapshot) => {
//     // console.log("get: " + snapshot.val())
//     if (snapshot.val() != null){ 
//       document.getElementById("favIdCount").innerHTML = snapshot.val();
//     }
//     else{
//       firebase.database().ref('users/'+phoneNum+'/favCount').set(0);
//     }
//   })
//   return document.getElementById("favIdCount").innerHTML
// }
// output += `<p onclick="addFavIdCount()">a</p>`+`<p onclick="getFavIdCount()">b</p>`

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
