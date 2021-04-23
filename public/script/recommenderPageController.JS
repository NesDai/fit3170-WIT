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
