let current_user = JSON.parse(localStorage.getItem("USER"));


window.onload = execute()

function execute(){
    printAllPosts();

}

//check id the user is signed in
function checkUserExistence() {
    // if a user is signed in then
    if (current_user["username"] && current_user["phone"]) {
        return true;
    } else {
        return false;
    }
}

function showTranslationModal(){
    document.getElementById("myModal").style.display = "block";  
}

function hideTranslationModal(){
    document.getElementById("myModal").style.display = "none";  
}



//Making a new post
function makeNewPost() {

    const options = {  // options for Date
        timeZone:"Africa/Accra",
        hour12 : true,
        hour:  "2-digit",
        minute: "2-digit",
       second: "2-digit"
     };


    if (checkUserExistence()) {
        interest_arr = [];
        $("input:checkbox[name=interests]:checked").each(function(){
            interest_arr.push($(this).val());
        });

        if (!interest_arr.length){
            alert("The post needs to have at least one interest")
            return
        }


        // error handling if it is empty??
        let title = document.getElementById("post_title").value
        let description = document.getElementById("post_description").value

        let myRef = firebase.database().ref(`posts`);
        let key = myRef.push().key;
        // let key = myRef.key; // generate a key for post id

        let newData = {
            id: key,
            description: description,
            interest: interest_arr,
            title: title,
            userID: current_user["phone"],
            username: current_user["username"],
            created: new Date().toString(), 
            likes:0, 
            dislikes:0
        }

        firebase.database().ref(`posts/${key}`).set(newData).then(()=>{
            alert("Posted successfully. Redirecting back to forum")
            window.location = "forum.html";
        });
     } else{
            window.location = "forum.html";
        }
}


function updatePost(post_id) {

    firebase.database().ref(`posts/${post_id}`).once("value").then(snapshot => {
        let post = snapshot.val();
        if (post.userID == current_user["phone"]) {

            let title = document.getElementById("post_title").value
            let description = document.getElementById("post_description").value
            interest_arr = [];
            $("input:checkbox[name=interests]:checked").each(function(){
                interest_arr.push($(this).val());
            });

            // if either of the inputs are empty then it should store the already stored one
            let update_data = {
                title: title,
                description: description,
                interest: interest_arr
            };

            firebase.database().ref(`posts/${post_id}`).update(update_data);
        } else {
            console.log("Nope");
        }
    });
}

function validatePostOwner(post_id) {
    firebase.database().ref(`posts/${post_id}`).once("value").then(snapshot => {
        let post = snapshot.val();
        if (post["userID"] == current_user["phone"]) {
            return 1;
        } else {
            return 0;
        }
    });
}


function findAllPosts() {
    firebase.database().ref("posts").once("value").then(snapshot => {
        let postsObj = snapshot.val();
        for (let post_id in postsObj) {
            firebase.database().ref(`posts/${post_id}`).once("value").then(snapshot => {
                let post = snapshot.val();
            });
        }
    });
}

function printAllPosts(){

    let field = document.getElementById("postField");
    field.innerHTML = ""; // emtpy the field of any previous posts 

    let data_list = [];
    let button_nums = []
    let posts = [];
    
    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  )  // push the post key into list
            }

        })
    }).then(()=>{
        firebase.database().ref('posts')
        .once('value', x => {
            x.forEach(data => {
                let button_num=0
                for (let i =0; i<data_list.length; i++) {
                    if(data_list[i][0] == data.key){  // if an action was performed on this post
                        if(data_list[i][1] == 1) { // liked
                            button_num=1
                        }
                        else{
                            button_num=-1
                        }
                    }
            }
                button_nums.push(button_num);
                posts.push(data.val());
            });

        }).then(()=>{
            for(let i=posts.length-1; i>=0 ; i--){
                printPost(posts[i], button_nums[i], i )
            }
        });
    });
}

function printPost(post, button_num, i )
{
    let button = `
    <button class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"  onclick="likePost('${post.id}', ${i});" value="${post.likes}" >
    <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
    </button>
    <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  onclick="dislikePost('${post.id}', ${i});"  value="${post.dislikes}" >
    <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
    </button>
    `
    if (button_num==0)     // nothing
    {
        button = `
                <button class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"  onclick="likePost('${post.id}', ${i});"  value="${post.likes}">
                <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
                </button>
                <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  onclick="dislikePost('${post.id}', ${i});" value="${post.dislikes}" >
                <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
                </button>
                `
    }
    else if (button_num==1)
    {
         // liked
         button = `<button 
         class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"  style="color: white !important; background-color:#2bbd7e !important;" onclick="likePost('${post.id}', ${i});"  value="${post.likes}">
         <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
         </button>
         <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  onclick="dislikePost('${post.id}', ${i});"  value="${post.dislikes}" >
         <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
         </button>
         `
    }
    else if(button_num==-1)
    {
         // disliked
         button = `<button class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="likePost('${post.id}', ${i});"  value="${post.likes}">
         <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
         </button>
         <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  style="background-color:#e53935; color: white;" onclick="dislikePost('${post.id}', ${i});"  value="${post.dislikes}">
         <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
         </button>`
    }

    // <img src="./css/images/button-designs_23.png" style="height:80%"></img>

    let field = document.getElementById("postField");
    field.innerHTML +=
    `   <div style="padding-top: 20px;">
            <span class="post_card">
               <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                  <!-- POST HEADER -->
                  <br>
                  <div class="f">
                     <h2 class="mdl-card__title-text mdl-color-text--black notranslate" style="text-align: left; float: left; position: relative; left: 10px" id='poster_id'>@${post.username}</h2>
                  </div>
                  <br>
                  <div class="post_header" style="margin:0 10px; background-color: white">
                     <h5 class="post_header mdl-color-text--black;"style="padding-left:18px; font-size: 30px; color: #006DAE">${post.title}</h5>
                  </div>
                  <!-- POST FORM -->
                  <form class="post_content" style="margin:0 10px; background-color: white">
                     <h6 class="post_content mdl-color-text--black" style="margin:0 10px; background-color: white; padding-left:10px; font-size: 20px" >${post.description} </h6>
                     <br>
                     <div style='display: inline-block'>
                        <button class="mdl-button mdl-js-button  mdl-color-text--white" id="interest1_id">${post.interest[0]} </button>
                        <button class="mdl-button mdl-js-button mdl-color-text--white" id="interest2_id">${post.interest[1]}</button>
                     </div>
                     <br><br>
                  </form>
                  <div class="f">
                  <h2 class="mdl-card__title-text mdl-color-text--black" id='date_posted'>${post.created}</h2>
                  </div>
                  <br>
                     <!--  LIKE DISLIKE FOR POST -->
                     <br>
                    <div id="button_div${i}">
                     ${button}
                     <button class="more mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-shadow--5dp"  id="more_btn" onclick="postDetail('${post.id}');">
                    <i class="material-icons notranslate" id="more_icon">read_more</i><span id="number_of_dislikes"> More</span>
                    </button>
                    </div>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
                    <script type="text/javascript">
                    $(document).ready(function() {
                        $( "#button_div${i} .like" ).on( "click", function() {
                            alert( 'hi' );
                          });
                      });
                    </script>
                  <br>
            </span>
     </div>`;

}

/**
 * A function which prints an array of post that user has favourited
 * @param {*} current_user_posts a list of user's personal posts
 * @param {*} button_nums an indicator for like and dislike button
 */
function printUserFavouritePosts(current_user_posts, button_nums){
    let post_arr = [];
    let fav_post_arr =[];
    let users_arr = [];

    firebase.database().ref(`posts`)
        .orderByChild(`users_favourite`)
            .once('value', x => {
                x.forEach(data => {
                    // console.log("data: " + data.key) // data.key = post id
                    let hasFavouriteAttribute = data.hasChild("users_favourite");
                    // console.log(hasFavouriteAttribute)

                    if (hasFavouriteAttribute){
                        // if attribute is in db
                        users_arr = data.val()["users_favourite"];
                        let current_user_exist = false;

                        for(let i = 0; i < users_arr.length; i++){
                            if (users_arr[i] == current_user["phone"]){
                                current_user_exist = true
                            }
                        }

                        if (current_user_exist){
                            // if found user favourite a post, oush post into fav post arr
                            fav_post_arr.push(data.val());
                        }
                    }
                })

                //console.log(fav_post_arr);
                fav_post_arr.forEach(fav_post => {
                    let duplicate = false;

                    for (let i = 0; i < current_user_posts.length; i++){
                        if (current_user_posts[i]["id"] == fav_post["id"]){
                            duplicate = true
                        }
                    }

                    if (!duplicate){
                        post_arr.push(fav_post);
                    }
                })
            })
            .then(() => {
                for(let i=post_arr.length-1; i>=0 ; i--){
                    printPost(post_arr[i], button_nums[i], i )
                }
            })
}

function printUserPosts(){

    document.getElementById("searchBox").value = "";

    let field = document.getElementById("postField");
    field.innerHTML = ""; // emtpy the field of any previous posts
    
    let data_list = [];
    let button_nums = []
    let posts = [];
    
    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  )  // push the post key into list
            }

        })
    }).then(()=>{
        firebase.database().ref('posts')
            .orderByChild('username')
                .equalTo(current_user['username'])
                    .once('value', x => {
                        x.forEach(data => {
                            let button_num=0
                            for (let i =0; i<data_list.length; i++) {
                                if(data_list[i][0] == data.key){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{
                                        button_num=-1
                                    }
                                }
                        }
                            button_nums.push(button_num);
                            posts.push(data.val());
                        });

                    }).then(()=>{
                        for(let i=posts.length-1; i>=0 ; i--){
                            printPost(posts[i], button_nums[i], i )
                        }
                    }).then(() => {
                        printUserFavouritePosts(posts,button_nums);
                    })
                });
}

function postDetail(id) {
        window.location = "post.html" + "?post_id=" + id;
}



/**
 * Function used to search forum posts in feed. A parameter is typed (interest or a name of the post)
 * @param {param} a search parameter. Could be one of the two. Post title, or interest linked to a post. 
 * @returns Nothing. The function automatically updates the screen with relevant posts.
 */
 function searchAllPosts(param){
    
    let data_list = [];
    let button_nums = []
    let posts = []; 

    let tab = document.getElementsByName("tabs");

    if(tab[1].checked){  // if the navigated tab is "Your feed", delegate the work to the helper function
        searchYourPosts(param);
        return
    }

    let field = document.getElementById("postField");

    if(!param.replace(/\s/g, '').length){  //check if only contains white spaces
        printAllPosts();
        return // exit function
    }

    field.innerHTML = ""; // emtpy the field of any previous posts


    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  )  // push the post key into list
            }

        })
    }).then(()=>{
        let button_num=0
        firebase.database().ref(`posts`).orderByChild('title')
        .startAt(param)
            .endAt(param+"\uf8ff").once("value", x=> {
                x.forEach(data => {
                    for (let i =0; i<data_list.length; i++) {
                        if (data.val()['id']==data_list[i][0])
                        {
                            if(data_list[i][0] == data.key){  // if an action was performed on this post
                                if(data_list[i][1] == 1) { // liked
                                    button_num=1
                                }
                                else{
                                    button_num=-1
                                }
                            }
                        }
                    }
                    button_nums.push(button_num);
                    posts.push(data.val());
                })
            }) 
        //find interests in posts
        firebase.database().ref(`posts`).orderByChild('interest/0')
        .startAt(param)
            .endAt(param+"\uf8ff").once("value", x=> {
                x.forEach(data => {
                    for (let i =0; i<data_list.length; i++) {
                        if (data.val()['id']==data_list[i][0])
                        {
                            if(data_list[i][0] == data.key){  // if an action was performed on this post
                                if(data_list[i][1] == 1) { // liked
                                    button_num=1
                                }
                                else{
                                    button_num=-1
                                }
                            }
                        }
                    }
                    button_nums.push(button_num);
                    posts.push(data.val());
                })
            })
 
        firebase.database().ref(`posts`).orderByChild('interest/1')
            .startAt(param)
                .endAt(param+"\uf8ff").once("value", x=> {
                    x.forEach(data => {
                        for (let i =0; i<data_list.length; i++) {
                            if (data.val()['id']==data_list[i][0])
                            {
                                if(data_list[i][0] == data.key){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{
                                        button_num=-1
                                    }
                                }
                            }
                        }
                        button_nums.push(button_num);
                        posts.push(data.val());
                    })
                }).then(()=>{
                    for(let i=posts.length-1; i>=0 ; i--){
                        printPost(posts[i], button_nums[i], i )
                    }
                });
    })
}


/**
 * Function used to search forum posts in "Your posts". A parameter is typed (interest or a name of the post)
 * @param {param} a search parameter. Could be one of the two. Post title, or interest linked to a post. 
 * @returns Nothing. The function automatically updates the screen with relevant posts.
 */
function searchYourPosts(param){
    let data_list = [];
    let button_nums = []
    let posts = []; 
    let field = document.getElementById("postField");


    if(!param.replace(/\s/g, '').length){  //check if only contains white spaces
        printUserPosts();
        return // exit function
    }

    field.innerHTML = ""; // emtpy the field of any previous posts


    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  )  // push the post key into list
            }
        })
    }).then(()=>{
        let button_num=0
        firebase.database().ref(`posts`).orderByChild('title')
        .startAt(param)
            .endAt(param+"\uf8ff").once("value", x=> {
                x.forEach(data => {

                    if(data.val().username == current_user["username"]){
                        for (let i =0; i<data_list.length; i++) {
                            if (data.val()['id']==data_list[i][0])
                            {
                                if(data_list[i][0] == data.key){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{
                                        button_num=-1
                                    }
                                }
                            }
                        }
                        button_nums.push(button_num);
                        posts.push(data.val());
                    }
                })
            }) 
        //find interests in posts
        firebase.database().ref(`posts`).orderByChild('interest/0')
        .startAt(param)
            .endAt(param+"\uf8ff").once("value", x=> {
                x.forEach(data => {
                    if(data.val().username == current_user["username"]){
                        for (let i =0; i<data_list.length; i++) {
                            if (data.val()['id']==data_list[i][0])
                            {
                                if(data_list[i][0] == data.key){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{
                                        button_num=-1
                                    }
                                }
                            }
                        }
                        button_nums.push(button_num);
                        posts.push(data.val());
                    }
                })
            })
 
        firebase.database().ref(`posts`).orderByChild('interest/1')
            .startAt(param)
                .endAt(param+"\uf8ff").once("value", x=> {
                    x.forEach(data => {
                        if(data.val().username == current_user["username"]){
                            for (let i =0; i<data_list.length; i++) {
                                if (data.val()['id']==data_list[i][0])
                                {
                                    if(data_list[i][0] == data.key){  // if an action was performed on this post
                                        if(data_list[i][1] == 1) { // liked
                                            button_num=1
                                        }
                                        else{
                                            button_num=-1
                                        }
                                    }
                                }
                            }
                            button_nums.push(button_num);
                            posts.push(data.val());
                        }
                    })
                }).then(()=>{
                    for(let i=posts.length-1; i>=0 ; i--){
                        printPost(posts[i], button_nums[i], i )
                    }
                });
    })
}





// Likes for posts
async function likePost(post_id, i) {

    like_btn_addr=document.getElementById("button_div"+i).getElementsByClassName("like")[0]
    dislike_btn_addr=document.getElementById("button_div"+i).getElementsByClassName("dislike")[0]

    let res = await checkForLikeDislike(post_id);
    if (!res) {
        // if there is no action at all, lilke
        firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({
            action: 1
        }).then(() => {
            alert("Liked");
            updateLikes(post_id, 1) // add 1 like 
        });

        // UI   
        like_btn_addr.style.background='#2bbd7e';
        like_btn_addr.style.color='white';

        //increase like count
        current_value=like_btn_addr.value
        new_value=parseInt(current_value)+1
        like_btn_addr.value=new_value
        document.getElementById("button_div"+i).getElementsByClassName("number_of_likes")[0].innerHTML=new_value



    } else {
        // if there is action 
        firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}/action`).once('value', (snapshot) => {
            let current_state = snapshot.val();
            if (current_state == -1) {
                // if action is dislike
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({
                    action: 1
                }).then(() => {
                    alert("Liked");
                    updateLikes(post_id, 1) // add 1 like 
                    updateDislikes(post_id, -1)
                });

                // UI   
                like_btn_addr.style.background='#2bbd7e';
                like_btn_addr.style.color='white';
                dislike_btn_addr.style.background='#dadada';
                dislike_btn_addr.style.color='black';

                // increase like count
                current_value=like_btn_addr.value
                new_value=parseInt(current_value)+1
                like_btn_addr.value=new_value
                document.getElementById("button_div"+i).getElementsByClassName("number_of_likes")[0].innerHTML=new_value
                //decrease dislike count
                current_value=dislike_btn_addr.value
                new_value=parseInt(current_value)-1
                dislike_btn_addr.value=new_value
                console.log(dislike_btn_addr.value)
                document.getElementById("button_div"+i).getElementsByClassName("number_of_dislikes")[0].innerHTML=new_value
         
            } else {
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).remove();
                alert('post was already liked');
                updateLikes(post_id, -1)  // remove 1 like 
                //UI 
                like_btn_addr.style.background='#dadada';
                like_btn_addr.style.color='black';
                // change like number 
                current_value=like_btn_addr.value
                new_value=parseInt(current_value)-1
                like_btn_addr.value=new_value
                document.getElementById("button_div"+i).getElementsByClassName("number_of_likes")[0].innerHTML=new_value
            }
        })
    }
}

async function dislikePost(post_id, i)
{
    like_btn_addr=document.getElementById("button_div"+i).getElementsByClassName("like")[0]
    dislike_btn_addr=document.getElementById("button_div"+i).getElementsByClassName("dislike")[0]

    let res = await checkForLikeDislike(post_id);

    if (!res){
        // if there is no action at all
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({ action: -1}).then(()=>{
                alert("Disliked");
                // add 1 dislike 
                updateDislikes(post_id, 1)
            });   
            
        // UI   
        dislike_btn_addr.style.background='#e53935';
        dislike_btn_addr.style.color='white';

        //increase dislike count
        current_value=dislike_btn_addr.value
        new_value=parseInt(current_value)+1
        dislike_btn_addr.value=new_value
        document.getElementById("button_div"+i).getElementsByClassName("number_of_dislikes")[0].innerHTML=new_value
    }
    else{
        // if there is action 
        firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}/action`).once('value', (snapshot) => {
            let current_state=snapshot.val();
            if (current_state==1){
                // if action is like
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({action: -1}).then(()=>{alert("Disiked");});  
                // add 1 dislike and remove 1 like
                updateDislikes(post_id, 1)
                updateLikes(post_id,-1)
                // UI   
                like_btn_addr.style.background='#dadada';
                like_btn_addr.style.color='black';
                dislike_btn_addr.style.background='#e53935';
                dislike_btn_addr.style.color='white';

                // increase dislike count
                current_value=dislike_btn_addr.value
                new_value=parseInt(current_value)+1
                dislike_btn_addr.value=new_value
                document.getElementById("button_div"+i).getElementsByClassName("number_of_dislikes")[0].innerHTML=new_value
                //decrease like count
                current_value=like_btn_addr.value
                new_value=parseInt(current_value)-1
                like_btn_addr.value=new_value
                document.getElementById("button_div"+i).getElementsByClassName("number_of_likes")[0].innerHTML=new_value

               
            }
            else{
                // remove 1 dislike
                updateDislikes(post_id, -1)
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).remove();
                alert('post was already disliked');

                // UI 
                // change color
                dislike_btn_addr.style.background='#dadada';
                dislike_btn_addr.style.color='black';
                // change dislike number 
                current_value=dislike_btn_addr.value
                new_value=parseInt(current_value)-1
                dislike_btn_addr.value=new_value
                document.getElementById("button_div"+i).getElementsByClassName("number_of_dislikes")[0].innerHTML=new_value
                
            }
        }
        )
    }
}

// /* 
// A function that checks if the user has favourited the selected post and 
// will output the correct text on button
// */
// function checkUserFavouritedPost(post){
//     let post_id = post.id; 
//     let user_exist = false;
//     let button = document.getElementById("favourite_post_btn");
  
//     firebase.database().ref(`posts/${post_id}`).once("value", (snapshot) => {
//       let hasFavouriteData = snapshot.hasChild("users_favourite");
//       if (hasFavouriteData){
//         let users_arr = snapshot.val()["users_favourite"];
        
//         // looping through users list in database
//         for(let i = 0; i < users_arr.length; i++) {
//           if (current_user["phone"] == users_arr[i]){
//             user_exist = true;
//           }
//         }
  
//         if (user_exist){
//           button.innerHTML = `                                 
//           <i class=\"material-icons notranslate\" id=\"favourite_post_icon\">favorite</i>
//           <span id=\"favourite_btn\"> Remove</span>
//           `
//         } else {
//           button.innerHTML = `                                 
//           <i class=\"material-icons notranslate\" id=\"favourite_post_icon\">favorite</i>
//           <span id=\"favourite_btn\"> Add</span>
//           `
//         }
//       }
//     })
//   }

