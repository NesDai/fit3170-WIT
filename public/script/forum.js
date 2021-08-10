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
            created: new Date().toString()
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
                console.log(post["title"]);
                console.log(post["description"]);
                console.log(post["interest"]);
                console.log(post["like"]);
                console.log(post["dislike"]);
            });
        }
    });
}


function printAllPosts(){

    document.getElementById("searchBox").value = "";
    let data_list = [];
    let field = document.getElementById("postField");
    field.innerHTML = ""; // emtpy the field of any previous posts

    firebase.database().ref('posts')
        .once('value', x => {
            x.forEach(data => {
                data_list.push(data.val())
                // let post = data.val()
            });

        }).then(()=>{
            for(let i=data_list.length-1; i>=0 ; i--){
                let post = data_list[i]
                printPostCard(post,field);
            }
        });




}


function printUserPosts(){

    document.getElementById("searchBox").value = "";

    let field = document.getElementById("postField");
    field.innerHTML = ""; // emtpy the field of any previous posts
    let data_list = []

    firebase.database().ref('posts')
        .orderByChild('username')
            .equalTo(current_user['username'])
                .once('value', x => {
                    x.forEach(data => {
                        data_list.push(data.val())

                    });
                }).then(()=> {
                    for(let i=data_list.length-1; i>=0 ; i--){
                        let post = data_list[i]
                        printPostCard(post,field);
                    }
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
function searchForumByTitle(param){

   

    let tab = document.getElementsByName("tabs");

    if(tab[1].checked){  // if the navigated tab is "Your feed", delegate the work to the helper function
        searchYourPosts(param);
        return
    }

    let field = document.getElementById("postField");
    console.log(` in func ${param} FORUM FEED`);


    if(!param.replace(/\s/g, '').length){  //check if only contains white spaces
        printAllPosts();
        return // exit function
    }

    field.innerHTML = ""; // emtpy the field of any previous posts

    firebase.database().ref(`posts`).orderByChild('title')
                 .startAt(param)
                 .endAt(param+"\uf8ff").once("value", x=> {
                    x.forEach(data => {
                        printPostCard(data.val(),field);
                    })
                })   

        //find interests in posts

        //! tech debt? idk any better way of doing this atm
    firebase.database().ref(`posts`).orderByChild('interest/0')
        .startAt(param)
        .endAt(param+"\uf8ff").once("value", x=> {
           x.forEach(data => {

                printPostCard(data.val(),field);
               
           })
           })  

    firebase.database().ref(`posts`).orderByChild('interest/1')
           .startAt(param)
           .endAt(param+"\uf8ff").once("value", x=> {
              x.forEach(data => {
   
                   printPostCard(data.val(),field);
                  
              })
              })  


         
}


/**
 * Function used to search forum posts in "Your posts". A parameter is typed (interest or a name of the post)
 * @param {param} a search parameter. Could be one of the two. Post title, or interest linked to a post. 
 * @returns Nothing. The function automatically updates the screen with relevant posts.
 */
function searchYourPosts(param){



    let field = document.getElementById("postField");


    if(!param.replace(/\s/g, '').length){  //check if only contains white spaces
        printUserPosts();
        return // exit function
    }

    field.innerHTML = ""; // emtpy the field of any previous posts

    firebase.database().ref(`posts`).orderByChild('title')
                 .startAt(param)
                 .endAt(param+"\uf8ff").once("value", x=> {
                    x.forEach(data => {

                       
                        if(data.val().username == current_user["username"]){

                                printPostCard(data.val(),field);
                        }
                    })
                    })   

        //find interests in posts

        //! tech debt? idk any better way of doing this atm
        firebase.database().ref(`posts`).orderByChild('interest/0')
        .startAt(param)
        .endAt(param+"\uf8ff").once("value", x=> {
           x.forEach(data => {
                if(data.val().username == current_user["username"]){
                    printPostCard(data.val(),field);
                }
           })
           })  

    firebase.database().ref(`posts`).orderByChild('interest/1')
           .startAt(param)
           .endAt(param+"\uf8ff").once("value", x=> {
              x.forEach(data => {
                    if(data.val().username == current_user["username"]){
                        printPostCard(data.val(),field);
                    }
                  
              })
              })  
            

}



/**
 * Function prints postCard with data onto field
 * @param {1} data specifies a JSON object that is to be used to get data for the post card (provide with .val())
 * @param {2} field specifies the html field where the card is to be printer (provide without .HTML)
 */
function printPostCard(data,field){

    field.innerHTML +=  // add the post card
    `   <div style="padding-top: 20px;">
            <span class="post_card">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                <!-- POST HEADER -->
                <br>
                <div class="f">
                    <h2 class="mdl-card__title-text mdl-color-text--black notranslate" style="text-align: left; float: left; position: relative; left: 10px" id='poster_id'>@${data.username}</h2>
                </div>
                <br>
                <div class="post_header" style="margin:0 10px; background-color: white">
                    <h5 class="post_header mdl-color-text--black;"style="padding-left:18px; font-size: 30px; color: #006DAE">${data.title}</h5>
                </div>
                <!-- POST FORM -->
                <form class="post_content" style="margin:0 10px; background-color: white">
                    <h6 class="post_content mdl-color-text--black" style="margin:0 10px; background-color: white; padding-left:10px; font-size: 20px" >${data.description} </h6>
                    <br>
                    <div style='display: inline-block'>
                        <button class="mdl-button mdl-js-button  mdl-color-text--white" id="interest1_id">${data.interest[0]} </button>
                        <button class="mdl-button mdl-js-button mdl-color-text--white" id="interest2_id">${data.interest[1]}</button>
                    </div>
                    <br><br>
                </form>
                <div class="f">
                <h2 class="mdl-card__title-text mdl-color-text--black" id='date_posted'>${data.created}</h2>
                <div>
                <br>
                <div>
                    <!--  LIKE DISLIKE FOR POST -->
                    <br>
                    <button class="like mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect "  id="like_post_btn">
                    <i class="material-icons notranslate" id="like_post_icon">thumb_up</i><span id="number_of_likes"> 400</span>
                    </button>
                    <button class="dislike mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect " id="dislike_post_btn">
                    <i class="material-icons notranslate" id="dislike_post_icon">thumb_down</i><span id="number_of_dislikes"> 20</span>
                    </button>
                    <button class="more mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-shadow--5dp"  id="more_btn" onclick="postDetail('${data.id}');">
                    <i class="material-icons notranslate" id="more_icon">read_more</i><span id="number_of_dislikes"> More</span>
                    </button>
                </div>
                <br>
            </span>
    </div>`;

}