const params = new URLSearchParams(window.location.search)

firebase.database().ref(`posts/${params.get('post_id')}`).once("value").then(snapshot => {
    let post = snapshot.val();
    field = document.getElementsByClassName("forum-posts");
    //add the html card here 
});