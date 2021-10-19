// List of users
// Format: [[phoneNumber,username,preferences,videoFavourite,videoHistory]]
const user_list = [];
let foundUser = 0;
let userNumber;

const total_list = [["ICT/Tech­nology Skills", 0], ["Social Communi­cation Skills", 0], ["Comple­mentary Skills", 0], ["Work-related Skills", 0]];

let myChart;

window.onload = execute();

async function execute() {

    collectData().then(() => {

        updatePieChart();
    })
}

/* collect all user data from firebase */
async function collectData(){
  let users = [];

  await firebase.database().ref('users')
  .once('value', x => {
      x.forEach(data => {
          users.push(data.val());
          checkUser(data.val());
      })
  })

  console.log(user_list);
  updateUserList();
}

// Update user list
function updateUserList(){
  let userTable = document.getElementById("userListTableBody");
  let newRow, userId, userPhone, userName, buttonCell, button;
  // Add details of each user
  for (let i=0; i<user_list.length; i++){
    newRow = document.createElement("tr");

    userId = document.createElement("td");
    userId.innerHTML = i+1;
    userId.id=i+1;

    userPhone = document.createElement("td");
    userPhone.innerHTML = user_list[i][0];

    userName = document.createElement("td");
    userName.innerHTML = user_list[i][1];

    buttonCell = document.createElement("td");
    button = document.createElement("button");
    button.class = "pure-button pure-button-primary";
    button.innerHTML = "View";
    button.addEventListener('click', function(){
      let row = this.parentElement.parentElement;
      selectedUser(row.cells[1].innerHTML);
    });
    buttonCell.appendChild(button);

    newRow.appendChild(userId);
    newRow.appendChild(userPhone);
    newRow.appendChild(userName);
    newRow.appendChild(buttonCell);

    userTable.appendChild(newRow);
  }
}

/* function to display searched user */
function selectedUser(manualInput=false){
  let searchInput;
  if (!manualInput)
  {
    searchInput = document.getElementById("searchValue").value;
  }
  else{
    searchInput = manualInput;
  }

  foundUser = 0;
  userNumber = -1;

  console.log(searchInput);
  if (searchInput == null){
    return;
  }

  // Search for Number
  if (searchInput[0] == "+"){
    for(let i=0; i<user_list.length; i++){
      //Check for match
      if (user_list[i][0] == searchInput){
        foundUser = user_list[i];
        userNumber = i;
        break;
      }
    }
  }
  // Search for name
  else{
    for(let i=0; i<user_list.length; i++){
      //Check for match
      if (user_list[i][1] == searchInput){
        foundUser = user_list[i];
        userNumber = i;
        break;
      }
    }
  }

  // Check for error
  let error = document.getElementById("searchError");
  if (!foundUser){
    error.style.visibility = "visible";
    return;
  }
  else{
    error.style.visibility = "hidden";
  }

  // Update username
  let userName = document.getElementById("selectedUserName");
  userName.innerHTML = foundUser[1];

  // Update video history
  let videoHistoryTitle = document.getElementById("videoHistoryTitle");
  videoHistoryTitle.innerHTML = "Video History of " + foundUser[1];

  $("#videoHistoryTableBody").empty();
  let videoHistoryTableBody = document.getElementById("videoHistoryTableBody");

  let newRow,number,date,name,buttonCell, button, rating;
  for (let i=0; i<user_list[userNumber][4].length; i++){
    // Add row elements and their data
    newRow = document.createElement("tr");

    number = document.createElement("td");
    number.innerHTML = i+1;
    number.id=i+1;

    date = document.createElement("td");
    date.innerHTML = "PLACEHOLDER";

    name = document.createElement("td");
    name.innerHTML = user_list[userNumber][4][i].videoTitle;

    buttonCell = document.createElement("td");
    button = document.createElement("button");
    button.class = "pure-button pure-button-primary";
    button.innerHTML = "View";
    button.addEventListener('click', function(){
      let row = this.parentElement.parentElement;
      let id = row.cells[0].innerHTML;

      displayVideoAnalytic(id-1);
    });
    buttonCell.appendChild(button);

    rating = document.createElement("td");
    rating.innerHTML = " = ";
    if (user_list[userNumber][4][i].dislike == true){
      rating.innerHTML = `<img src="/css/images/button-designs_18.png" style="height:20px;">`;
    }
    
    else if (user_list[userNumber][4][i].like == true){
      rating.innerHTML = `<img src="/css/images/button-designs_17.png" style="height:20px;">`;
    }
    else{
      rating.innerHTML = " - ";
    }
    console.log(user_list[userNumber][4][i].like);
    
    

    newRow.appendChild(number);
    newRow.appendChild(date);
    newRow.appendChild(name);
    newRow.appendChild(buttonCell);
    newRow.appendChild(buttonCell);
    newRow.appendChild(rating);

    videoHistoryTableBody.appendChild(newRow);
  }
}

// Display detailed information about a specific video
function displayVideoAnalytic(id){
  let video = user_list[userNumber][4][id];

  let title = document.getElementById("videoAnalyticTitle");
  title.innerHTML = "Video analytic of #" + (id+1) + ": " + video.videoTitle;

  let tableTitle = document.getElementById("videoAnalyticTableTitle");
  tableTitle.innerHTML = video.videoTitle;
}

/* Function to determine the number of favourites for each skill and interest */
function checkUser(user){
  let newUser = [];
  // Store phone Number
  newUser.push(user.phone);

  // Store Username
  newUser.push(user.username);

  // Store preferences
  newUser.push(user.preferences);

  // Store videoFavourite
  newUser.push(user.videoFavourite);

  // Store videoHistory
  newUser.push(user.videoHistory);

  user_list.push(newUser);
}

/* generate bar chart based on selected skill */
function updateBarChart(skill) {

    // variable
    let xValues = [];
    let yValues = [];
    let low = 0;
    let maxi = 0;

    // determine which skill is selected;
    if(skill == "ICT/Tech­nology Skills"){low = 0; maxi = 5;}
    else if(skill == "Social Communi­cation Skills"){low = 5; maxi = 10;}
    else if(skill == "Comple­mentary Skills"){low = 10; maxi = 15;}
    else{skill = low = 15; maxi = 20;}


    // to get number of favourties for each interest for x-axis and y-axis values
    for (let i = low; i < maxi; i++){
        xValues.push(skill_list[i][0]);
        yValues.push(skill_list[i][1]);

    }

    var ChartOptions = {
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    min: 0
                }
            }]
        },
    },
    ChartData = {
        labels: xValues,
        datasets: [
          {
            // for number of facourites
            label: "Number of selections",
            barThickness: 50,
            backgroundColor: base.primaryColor,
            borderColor: base.primaryColor,
            data: yValues,
            fill: "",
            lineTension: .1
        }]
    }

    // if the chart is not undefined (e.g. it has been created)
    // then destory the old chart and create new one
    if(myChart){
        myChart.destroy();
    }

    let barChartjs = document.getElementById("skillChart");
    myChart =  new Chart(barChartjs, {
        type: "bar",
        data: ChartData,
        options: ChartOptions
});


}

/* generate pie chart to display total favourties number for each skill */
function updatePieChart() {

    // variable
    let xValues = [];
    let yValues = [];

    // to get total number of favourites for each skill for x-axis and y-axis values
    for (let i = 0; i < total_list.length; i++){
        xValues.push(total_list[i][0]);
        yValues.push(total_list[i][1]);

    }

    var ChartOptions = {
      title: {
        display: true
      }
    },
    ChartData = {
        labels: xValues,
        datasets: [
          {
            data: yValues,
            backgroundColor: chartColors,
            borderColor: colors.borderColor
        }]
    }
    var pieChartjs = document.getElementById("skillPieChartjs");
    pieChartjs && new Chart(pieChartjs, {
        type: "pie",
        data: ChartData,
        options: ChartOptions
});
}
