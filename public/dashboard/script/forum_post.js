

let posts;
let postid;
let numOfPosts;





window.onload = execute();

async function execute(){
    // onload function
    collectPosts().then(()=>{

        // autocomplete(document.getElementById("searchInput"), postid);
        $( "#searchInput" ).autocomplete({
            source: postid
    })

})
}

/**
 * Function used to collect all the posts into an array from firebase
 */
async function collectPosts(){


    posts = []; // reset posts to 0 / initialize to a list
    postid = [];
    numOfPosts=0;

     await firebase.database().ref('posts')
    .once('value', x => {
        x.forEach(data => {
            posts.push(data.val()); //pus  h the data to the list
            postid.push(data.val().id);
            numOfPosts++;
        })
    
            
    });
}


/**
 * Function used to update all the data on the user interface
 */
function updateData(){

}


// update posts on an interval (10 sec) to mimic realtime dashboard
// setInterval(
//     async function(){ 
//     collectPosts().then(()=>{
//         //call function to update all the ui fields
//         let a = 0;
//     }); 

    
// }, 10000);





