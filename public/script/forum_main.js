
let current_user = JSON.parse(localStorage.getItem("USER"));

//check id the user is signed in
function checkUserExistence() {
    // if a user is signed in then 
    if (current_user["username"] && current_user["phone"]) {
        return true;
    } else {
        return false;
    }
}



// for counting the number of posts
// function countNumberOfPosts() {
//     firebase.database().ref(`posts`).once('value', data => {
//         posts = data.val();
//         count = 0;

//         for (post_id in posts) {
//             count+=1; 
//         }
//         alert(count);
//         return count;
//     });
// }


//Making a new post 
function makeNewPost(title, description, interest, like=0, dislike=0){
    if (checkUserExistence()) {

        firebase.database().ref(`posts`).once('value', data => {
            // initialize the count
            count = 0;
            posts = data.val();
            
            //count how many posts there are 
            for (post_id in posts) {
                count+=1; 
            }

            // add count + 1 to create a new post id (possible collision?)
            //TODO: figure out how to avoid a possible collision 
            new_post_id = count + 1;
            new_post_id = "PostID" + new_post_id.toString();
            
            // insert relevant information of post under the newly created post_id
            firebase.database().ref(`posts/${new_post_id}`).set({
                description: description,
                dislike: dislike,
                interest: interest,
                like: like,
                title: title,
                userID: current_user["phone"],
            });
        });
    } else {
        window.location("index.html")
    }
}

function getPostsByCurrentUser() {
    // get all the posts 
    firebase.database().ref(`posts`).once('value', data => {
        posts = data.val();
        user_id = current_user["phone"];
        //loop through each post
        for (post_id in posts) {
            firebase.database().ref(`posts/${post_id}`).once('value', data => {
                post = data.val();
                owner_id = post["userID"];
                // if the user_id and owner_id matches then it means that it is their post 
                if (owner_id== user_id) {
                    console.log(post); // display posts 
                }
            });
        }
    });
}


//TODO: fix it according to the new db table
function updatePost(title, description) {
    user_phone = current_user["phone"];
    let update_data = {
        title: title, 
        description: description
    };
    firebase.database().ref(`posts/${user_phone}`).update(update_data);
}

//TODO: fix it according to the new db table
function removePost(post_id) {
    user_phone = current_user["phone"];
    firebase.database().ref(`posts/${user_phone}`).remove();
}