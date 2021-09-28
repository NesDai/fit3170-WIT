// fixed list of 20 main interests
const interest_list = [ ["Email", 0] , ["Online collaboration",0], ["Browser search",0], ["Device use",0], ["Social media use",0],
["Active listening",0], ["Effective communication",0], ["Negotiation skill",0], ["Persuasion",0], ["Relationship management",0],
["Art",0], ["Caregiving",0], ["Cooking",0], ["Exercise",0], ["Professional writing",0], ["Collaboration and teamwork",0], ["Critical thinking",0],
["Entrepreneurship",0], ["People and Leadership",0], ["Personal selling",0]];

// GLOBAL VARIABLES
let posts;
let likes_arr;
let dislikes_arr;
let  choosen_interest= document.getElementById("interest");
choosen_interest.addEventListener('change', display_posts); //runs the function when there is a change made to the value choosen from the drop list

window.onload = execute();
display_posts(); //runs it when the page is first loaded

async function execute() {

    collectPosts().then(() => {

        updateChart();
    })
}

/**
 * This function purposes to collect all the post from the database
 * and also to obtain data of the number of post posted per interest.
 */
async function collectPosts(){

    // variables
    posts = [];

    await firebase.database().ref('posts')
    .once('value', x => {
        x.forEach(data => {
            posts.push(data.val());
            checkInterest(data.val().interest);
        })
    })

}

/**
 * This function purposes to create and update a bar chart which holds
 * information about the number of likes, dislikes and post posted for each
 * interest.
 */
function updateChart() {

    // variable
    let xValues = [];
    let yValues = [];
    likes_arr = [];
    dislikes_arr = [];

    // to get number of post posted for each interest for x-axis and y-axis values
    for (let i = 0; i < interest_list.length; i++){
        xValues.push(interest_list[i][0]);
        yValues.push(interest_list[i][1]);

        // set the value for both likes and dislikes arr per interest to be 0 initially
        likes_arr.push(0);
        dislikes_arr.push(0);
    }

    // to get number of likes and dislikes for each interest
    for (let i = 0; i < posts.length; i++){
        getLikesAndDislikes(posts[i]);
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
        datasets: [{
            // for number of likes
            label: "Likes",
            barThickness: 10,
            backgroundColor: "rgba(210, 214, 222, 1)",
            borderColor: "rgba(210, 214, 222, 1)",
            data: likes_arr,
            fill: "",
            lineTension: .1
        }, {
            // for number of post posted
            label: "Number of Post Posted",
            barThickness: 10,
            backgroundColor: base.primaryColor,
            borderColor: base.primaryColor,
            data: yValues,
            fill: "",
            lineTension: .1
        }, {
            // for number of dislikes
            label: "Dislikes",
            barThickness: 10,
            backgroundColor: "rgba(150, 214, 222, 1)",
            borderColor: "rgba(150, 214, 222, 1)",
            data: dislikes_arr,
            fill: "",
            lineTension: .1
        }]
    }
    var barChartjs = document.getElementById("myInterestChart");
    barChartjs && new Chart(barChartjs, {
        type: "bar",
        data: ChartData,
        options: ChartOptions
});


}

/**
 * This function purposes to get the number of post posted per interest
 * @param {*} found_interests the interest(s) found in a post
 */
function checkInterest(found_interests){
    found_interests.forEach(interest => {
        for (let i = 0; i < interest_list.length; i++) {

            if (interest == interest_list[i][0]) {
                let current_num = interest_list[i][1];
                interest_list[i][1] = current_num + 1;
            }
        }
    })
}

/**
 * This function purposes to collect the number of likes and dislikes for each interest
 * based on all current post available in the forum.
 * @param {*} post a singular post in a forum
 */
function getLikesAndDislikes(post){

    let post_interest = post.interest;
    post_interest.forEach(interest => {
        for (let i = 0; i < interest_list.length; i++) {
            if (interest == interest_list[i][0]){
                let curr_likes = likes_arr[i];
                let curr_dislikes = dislikes_arr[i];
                likes_arr[i] = curr_likes + post.likes;
                dislikes_arr[i] = curr_dislikes + post.dislikes;
            }
        }
    })

}

/*
* Function that displays the posts based on the selected option
*/
function display_posts(){

  let  choosen_interest= document.getElementById("interest").value;
  let displayed_posts = [];
  console.log(posts);
  console.log(choosen_interest);
  //getting the rows based on the interest choosen
  for (let i = 0; i < posts.length; i++){
    let post = posts[i];
    let post_interest = post.interest;

    for (let i = 0; i < post_interest.length; i++) {
        if (choosen_interest == post_interest[i]){
          displayed_posts.push(post);
        }
      }
  }

  //outputing the rows of posts
  let display_table = document.getElementById("posts-rows");
  let output_rows = "<table class='pure-table' id='historyTable'><thead><th>Post Id</th><th>Post Title</th><th>No. of likes</th><th>No. of dislikes</th></thead><tbody>";
  for (let i = 0; i < displayed_posts.length; i++){
    let post = displayed_posts[i];
    output_rows += "<tr><td>" + post.id + "</td><td> " + post.title + " </td><td>" + post.likes + "</td><td>" + post.dislikes + "</td></tr>";
  }

  output_rows += "</tbody></table>";
  display_table.innerHTML = output_rows;


}
