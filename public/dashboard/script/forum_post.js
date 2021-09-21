

let posts;
let postid;
let numOfPostsUsers;
let numbOfPostsRecommender;





window.onload = execute();

async function execute(){
    // onload function
    collectPosts().then(()=>{
        
        updateUI(null);
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
function updateUI(postId){

  

    $("#postsByUsers").html(`<h3>${numOfPostsUsers}</h3>`);
    $("#postsByRecommender").html(`<h3>${numOfPostsRecommender}</h3>`);

    if(postId==null){
        return // exit
    }

    let post;

    for (let i =0; i<posts.length ;i++){
        if(posts[i].id == postId){
            post = posts[i]
            break; //break out of the loop when found the unique key
        }
    }

    //else continue to show data
    $("#chart").html(`
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    `);
    $("#postDetailTable").html(`
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    `);



    let creator;
    let interests;

    if(post.creator != undefined){
        creator = post.creator;
    }
    else{
        creator = "Recommender";
    }

    
    if(post.interest.length == 2){
        interests = post.interest[0] + ", " + post.interest[1]
    }
    else{
        interests = post.interest[0]
    }

    $("#postDetailTable").html(`
                <table class="table table-bordered">
                <tr>
                    <th>POST TITLE</th>
                    <td>${post.title}</td>
                </tr>

                <tr>
                    <th>DESCRIPTION</th>
                    <td>${post.description} </td>
                </tr>

                <tr>
                    <th>VIDEO LINK</th>
                    <td>${post.videoURL}</td>
                </tr>

                <tr>
                    <th>CREATOR or RECOMMENDED</th>
                    <td>${creator}</td>
                </tr>

                <tr>
                    <th>APPLIED INTERESTS</th>
                    <td>${interests}</td>
                </tr>

            </table>
    `);

}




// update posts on an interval (10 sec) to mimic realtime dashboard
// setInterval(
//     async function(){ 
//     collectPosts().then(()=>{
//         //call function to update all the ui fields
//         let a = 0;
//     }); 

    
// }, 10000);





