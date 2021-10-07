// fixed list of skills
const ict_list = [["Email", 0], ["Online collaboration",0], ["Search for information",0], ["Smartphone/tablet/computer use",0], ["Social media use",0]];
const social_list = [["Active listening",0], ["Effective communication",0], ["Negotiation skill",0], ["Persuasion",0], ["Relationship management",0]];
const complementary_list = [["Art",0], ["Caregiving",0], ["Cooking",0], ["Exercise",0], ["Professional writing",0]];
const work_list = [["Collaboration and teamwork",0], ["Critical thinking",0], ["Entrepreneurship",0], ["People and Leadership",0], ["Personal selling",0]];

// global variables
let skill_list;

/* function to display selected skill */
function selectedSkill(){
  let select = document.getElementById("skills");
  let option = select.options[select.selectedIndex];

  document.getElementById("selected").innerHTML = option.value;
  document.getElementById("selectedBarChart").innerHTML = option.value;

  // obtain favourites data
  collectFavourites();
  // generate bar chart
  updateChart(option.value);
}

/* function to retrieve favourite data from firebase */
function collectFavourites(){

    favs = [];

    firebase.database().ref('recommenderData').child('favourite')
    .once('value', x => {
        x.forEach(data => {
            favs.push(data.val());
            checkSkill(data.val().preferenceType, data.val().favouritedAmmount);
        })
    })        

}

/* Function to determine the number of favourites for each interest*/
function checkSkill(preference, amount){
    preference.forEach(skill => {
        for (let i = 0; i < skill_list.length; i++) {

            if (skill == skill_list[i][0]) {
                let current_num = skill_list[i][1];
                skill_list[i][1] = current_num + amount;
            }
        }
    })
}

function updateChart(skill) {

    // variable
    let xValues = [];
    let yValues = [];

    // determine which skill is selected;
    if(skill == "ICT/Tech­nology Skills"){skill_list = ict_list;}
    else if(skill == "Social Communi­cation Skills"){skill_list = social_list;}
    else if(skill == "Comple­mentary Skills"){skill_list = complementary_list;}
    else{skill_list = work_list;}

    // to get number of post posted for each interest for x-axis and y-axis values
    for (let i = 0; i < skill_list.length; i++){
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
    var barChartjs = document.getElementById("skillChart");
    barChartjs && new Chart(barChartjs, {
        type: "bar",
        data: ChartData,
        options: ChartOptions
});


}
