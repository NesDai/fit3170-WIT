let users;
let user_ids_arr;
let current_user;
let posts;

window.onload = execute();

async function execute(){
    await collectUsers().then(() => {
        updateUserUI(null);

        $('#userSearchInput').autocomplete({
            source : user_ids_arr,
        }).attr('style', 'max-height: 40px; overflow-y: auto; overflow-x: hidden;')
    });
}

async function collectUsers() {
    users = [];
    user_ids_arr = [];

    await firebase.database().ref('users').once('value', x => {
        x.forEach(snapshot => {
            users.push(snapshot.val());
            user_ids_arr.push(snapshot.key);
        })
    });
}

function updateUserUI(user_id) {
    collectPosts().then(() => {
        collectUsers().then(() => {
                
            if (users.length > 0) {
                $('#totalUsers').html(`${users.length}`)
            }

            if(user_id == null || user_id == undefined){
                return;
            }

            let user;
        
            for (let i = 0; i < users.length; i++){
                if(user_ids_arr[i] == user_id){
                    user = user_ids_arr[i] // if the user is found from the given user_id
                    break; 
                }
            }
        
            if (user == undefined) { // if the user is undefined
                $("#userError").html("Invalid User Id");
                return; // exit from the function block
            } else {
                $("#userError").html("");
            }

            current_user = user_id;

            firebase.database().ref('users').orderByChild('phone').equalTo(current_user).once('value', x => {
                x.forEach(snapshot => {
                    current_username = snapshot.val().username;
                    if (current_username !== undefined && current_username !== null) {
                        let user_info_intro = "information about @" + current_username + ", " + current_user;
                        $("#username").html(user_info_intro);
                        
                        //represent all the total information
                        $("#username").html(user_info_intro);
                    }
                });

                //print the cards
                let cards=
                `<div class="container-fluid">
                    <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="row">

                        <div class="col-md-4 mb-3">
                            <div class="card shadow userInfoCard">
                            <div class="card-header">
                                Likes on Posts
                            </div>
                                <div class="card-body" id="likesOnPosts"> </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4 mb-3">
                            <div class="card shadow userInfoCard">
                            <div class="card-header">
                                Dislikes on Posts
                            </div>
                                <div class="card-body" id="dislikesOnPosts"></div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card shadow userInfoCard">
                            <div class="card-header">
                                Comments & Replies
                                </div>
                                <div class="card-body" id="commentsReplies"></div>
                            </div>
                        </div>

                        </div> <!-- .row-->
                    </div> <!-- .col -->
                    </div> <!-- .justify content -->       
                </div> <!-- /.cont fluid -->


                <div class="container-fluid">
                    <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="row">

                        <div class="col-md-4 mb-3">
                            <div class="card shadow userInfoCard">
                            <div class="card-header">
                                Favourite Posts
                            </div>
                                <div class="card-body" id="favouritePosts"></div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card shadow userInfoCard">
                            <div class="card-header">
                                Posts Created
                            </div>
                                <div class="card-body" id="postsCreated"></div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card shadow userInfoCard">
                            <div class="card-header">
                                Likes on Comments
                            </div>
                                <div class="card-body" id="likesOnComments"></div>
                            </div>
                        </div>
                        </div> <!-- /.row -->
                    </div> <!-- /.col -->
                    </div> <!-- /.justify content -->
                </div> <!-- /.container fluid -->
                `;
                $("#card-body").html(cards);

                
                let loading_bar=`<div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>`
                    $("#likesOnPosts").html(loading_bar);
                    $("#dislikesOnPosts").html( loading_bar);
                    $("#commentsReplies").html(loading_bar);
                    $("#postsCreated").html(loading_bar);
                    $("#favouritePosts").html( loading_bar);
                    $("#likesOnComments").html(loading_bar);
            }).then(() => {
                //updates the total number of likes and dislikes for the chosen user 
                updateLikesDislikes(current_username)
                //updates the number of replies and comments
                updateCommentsReplies(current_username)
                //updates the number of posts favorited by the user
                updateFavorites(current_user)
                //updates the number of posts created by the user
                updatePosts(current_username)
                //updates the number of likes on comments
                updateLikesComments(current_username)
            });
        });
    });
}

/**
 * Function used to collect all the posts into an array from firebase
 */
 async function collectPosts(){
    posts = []; // reset posts to 0 / initialize to a list
    await firebase.database().ref('posts')
    .once('value', x => {
        x.forEach(data => {
            posts.push(data.val()); //push the data to the list
        })   
    });
}

function updateLikesDislikes(current_username){
    let likes_count=0;
    let dislikes_count=0;
    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[current_username] != undefined){ // if the user performed an action on the post
                if (data.val()[current_username].action==1)
                    likes_count+=1;
                else 
                    dislikes_count+=1
            }
        })
        $("#likesOnPosts").html(`<h3>${likes_count}</h3>`);
        $("#dislikesOnPosts").html( `<h3>${dislikes_count}</h3>`);
    })
}

function updateCommentsReplies(current_username){
    let comments_replies_count=0;
    firebase.database().ref('comments')
    .once('value', x => {
        x.forEach(data => {
            if(data.val().username== current_username){ // if the user performed an action on the post
                comments_replies_count+=1;
            }
        })
    }).then(() => {
        firebase.database().ref('replies')
        .once('value', x => {
            x.forEach(data => {
                if(data.val().username== current_username){ // if the user performed an action on the post
                    comments_replies_count+=1;
                }
            })
            $("#commentsReplies").html(`<h3>${comments_replies_count}</h3>`);
        })
    });
}

function updatePosts(current_username){
    let posts_count=0;
    for (let i=0; i<posts.length; i++) {
        if (posts[i].username == current_username){
            posts_count+=1 
        }
    }
    $("#postsCreated").html(`<h3>${posts_count}</h3>`);

}

function updateFavorites(current_user_phone){
    let favourites=0;
    for (let i=0; i<posts.length; i++) {
        if (posts[i].users_favourite!=undefined){
            for (let k=0; k<posts[i].users_favourite.length; k++){
                if (posts[i].users_favourite[k]==current_user_phone){
                    favourites+=1;
                }
            }
        }
    }
    $("#favouritePosts").html( `<h3>${favourites}</h3>`);
}

function updateLikesComments(current_username){
    let likes_count=0;
    firebase.database().ref('likesComments')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[current_username] != undefined){ // if the user performed an action on the post
                if (data.val()[current_username].action==1)
                    likes_count+=1;
            }
        })
        $("#likesOnComments").html(`<h3>${likes_count}</h3>`);
    })
}

// update posts on an interval (10 sec) to mimic realtime dashboard
setInterval(
    async function(){ 
    collectUsers().then(()=>{
        if (current_user == undefined || current_user == null) {
            updateUserUI(null);
        } else {
            updateUserUI(current_user);
        }
    }); 
}, 30000);

    
    
    
    
   