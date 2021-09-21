

let posts;
let postid;
let numOfPostsUsers;
let numbOfPostsRecommender;





window.onload = execute();

async function execute(){
    // onload function
    collectPosts().then(()=>{
        
        updateUI();
        // autocomplete(document.getElementById("searchInput"), postid);


        $('#searchInput').autocomplete({

            source : postid,              
        }).attr('style', 'max-height: 40px; overflow-y: auto; overflow-x: hidden;');


})
}

/**
 * Function used to collect all the posts into an array from firebase
 */
async function collectPosts(){


    posts = []; // reset posts to 0 / initialize to a list
    postid = [];
    numOfPostsRecommender=0;
    numOfPostsUsers=0;

     await firebase.database().ref('posts')
    .once('value', x => {
        x.forEach(data => {
            posts.push(data.val()); //pus  h the data to the list
            postid.push(data.val().id);
            if(data.val().recommender)
                numOfPostsRecommender++;
            else
                numOfPostsUsers++;
        })
    
            
    });
}


/**
 * Function used to update all the data on the user interface
 */
function updateUI(){

    $("#postsByUsers").html(`<h3>${numOfPostsUsers}</h3>`);
    $("#postsByRecommender").html(`<h3>${numOfPostsRecommender}</h3>`);

}


// update posts on an interval (10 sec) to mimic realtime dashboard
// setInterval(
//     async function(){ 
//     collectPosts().then(()=>{
//         //call function to update all the ui fields
//         let a = 0;
//     }); 

    
// }, 10000);





