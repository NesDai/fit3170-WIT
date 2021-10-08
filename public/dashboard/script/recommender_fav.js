// fixed list of skills
const skill_list = [["Email", 0] , ["Online collaboration",0], ["Search for information",0], ["Smartphone/tablet/computer use",0], ["Social media use",0],
["Active listening",0], ["Effective communication",0], ["Negotiation skill",0], ["Persuasion",0], ["Relationship management",0],
["Art",0], ["Caregiving",0], ["Cooking",0], ["Exercise",0], ["Professional writing",0], ["Collaboration and teamwork",0], ["Critical thinking",0],
["Entrepreneurship",0], ["People and Leadership",0], ["Personal selling",0]];

const total_list = [["ICT/Tech­nology Skills", 0], ["Social Communi­cation Skills", 0], ["Comple­mentary Skills", 0], ["Work-related Skills", 0]];

let myChart;

window.onload = execute();

async function execute() {

    collectData().then(() => {

        updatePieChart();
    })
}

/* collect all skill favourite data from firebase */
async function collectData(){
  let favs = [];

  await firebase.database().ref('recommenderData').child('favourite')
  .once('value', x => {
      x.forEach(data => {
          favs.push(data.val());
          checkSkill(data.val().preferenceType, data.val().favouritedAmmount);
      })
  })
}

/* function to display selected skill */
function selectedSkill(){
  let select = document.getElementById("skills");
  let option = select.options[select.selectedIndex];

  document.getElementById("selected").innerHTML = option.value;
  document.getElementById("selectedBarChart").innerHTML = option.value;

  // generate bar chart based on selected skill
  updateBarChart(option.value);

}

/* Function to determine the number of favourites for each skill and interest */
function checkSkill(preference, amount){
  for (let i = 0; i < skill_list.length; i++) {
    if (preference == skill_list[i][0]) {
      let current_num = skill_list[i][1];
      skill_list[i][1] = current_num + amount;
      // ict skill
      if(i<5){
        let current_value = total_list[0][1];
        total_list[0][1] = current_value + amount;
      }
      // social skill
      else if(i<10){
        let current_value = total_list[1][1];
        total_list[1][1] = current_value + amount;
      }
      // complementary skill
      else if(i<15){
        let current_value = total_list[2][1];
        total_list[2][1] = current_value + amount;
      }
      // work skill
      else{
        let current_value = total_list[3][1];
        total_list[3][1] = current_value + amount;
      }
    }
  }
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
            label: "Number of favourites",
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
    var pieChartjs = document.getElementById("pieChart");
    pieChartjs && new Chart(pieChartjs, {
        type: "pie",
        data: ChartData,
        options: ChartOptions
});
}
