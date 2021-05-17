

const params = new URLSearchParams(window.location.search)

firebase.database().ref(`posts/${params.get('post_id')}`).once("value").then(snapshot => {
    let post = snapshot.val();
    field = document.getElementsByClassName("forum-posts");
    //add the html card here 
});


window.onload = function(){
    printPostDetails();
    hideTranslationModal();
}


function showTranslationModal(){
    document.getElementById("myModal").style.display = "block";  
}

function hideTranslationModal(){
    document.getElementById("myModal").style.display = "none";  
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