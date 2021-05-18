let current_user = JSON.parse(localStorage.getItem("USER"));

const params = new URLSearchParams(window.location.search)

firebase.database().ref(`posts/${params.get('post_id')}`).once("value").then(snapshot => {
    let post = snapshot.val();
    field = document.getElementsByClassName("forum-posts");
    //add the html card here
});


window.onload = printPostDetails();

//check id the user is signed in
function checkUserExistence() {
    // if a user is signed in then
    if (current_user["username"] && current_user["phone"]) {
        return true;
    } else {
        return false;
    }
}

function printPostDetails(){

    let id = localStorage.getItem("POST_ID");


    let poster_field = document.getElementById('poster_id');
    let time_field = document.getElementById('date_posted');
    let title_field = document.getElementById('title');
    let description_field = document.getElementById('description');
    let interest_field = document.getElementById('post_interests');


    firebase.database().ref('posts')
    .orderByChild('id')
        .equalTo(id)
            .once('value', x => {
                x.forEach(data => {
                    let post = data.val();
                    // print the post details in here

                    poster_field.innerHTML = post.username;
                    time_field.innerHTML = post.created;
                    title_field.innerHTML = post.title;
                    description_field.innerHTML = post.description;
                    interest_field.innerHTML = "";
                    for(let i =0; i<post.interest.length;i++){

                        interest_field.innerHTML += `<button class="mdl-button mdl-js-button  mdl-color-text--black"> #${post.interest[i]}</button>`;
                    }
                });
            })


}

// Creating comment
function addComment(){
  if (checkUserExistence()) {
    let post_id = localStorage.getItem("POST_ID");
    // error handling if it is empty??
    let comment = document.getElementById("comment_input").value
    let stay_anonymous = document.getElementById("anonymous").checked

    //generating a key for the comment
    let myRef = firebase.database().ref(`comments`);
    let key = myRef.push().key;

    // new data to upload in api
    let newData = {
        anonymous: stay_anonymous,
        commenterID: current_user["phone"],
        content: comment,
        dislike:0,
        like:0,
        postID: post_id,
        username: current_user["username"]
    }

    firebase.database().ref(`comments/${key}`).set(newData).then(()=>{
        alert("Comment made successfully!")
        window.location = "post.html";
    });

  } else {
    window.location = "post.html";
  }
}
