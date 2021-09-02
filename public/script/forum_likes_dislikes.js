// Likes for posts
async function likePostDetailed(post_id) {

    like_btn_addr=document.getElementsByClassName("like")[0]
    dislike_btn_addr=document.getElementsByClassName("dislike")[0]

    let res = await checkForLikeDislike(post_id);
    if (!res) {
        // if there is no action at all, lilke
        firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({
            action: 1
        }).then(() => {
            updateLikes(post_id, 1) // add 1 like 
        });

        // UI   
        like_btn_addr.style.background='#2bbd7e';
        like_btn_addr.style.color='white';

        //increase like count
        current_value=like_btn_addr.value
        new_value=parseInt(current_value)+1
        like_btn_addr.value=new_value
        document.getElementsByClassName("number_of_likes")[0].innerHTML=new_value



    } else {
        // if there is action 
        firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}/action`).once('value', (snapshot) => {
            let current_state = snapshot.val();
            if (current_state == -1) {
                // if action is dislike
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({
                    action: 1
                }).then(() => {
                    //alert("Liked");
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
                document.getElementsByClassName("number_of_likes")[0].innerHTML=new_value
                //decrease dislike count
                current_value=dislike_btn_addr.value
                new_value=parseInt(current_value)-1
                dislike_btn_addr.value=new_value
                document.getElementsByClassName("number_of_dislikes")[0].innerHTML=new_value
         
            } else {
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).remove();
                //alert('post was already liked');
                updateLikes(post_id, -1)  // remove 1 like 
                //UI 
                like_btn_addr.style.background='#dadada';
                like_btn_addr.style.color='black';
                // change like number 
                current_value=like_btn_addr.value
                new_value=parseInt(current_value)-1
                like_btn_addr.value=new_value
                document.getElementsByClassName("number_of_likes")[0].innerHTML=new_value
            }
        })
    }
}

async function dislikePostDetailed(post_id)
{
    like_btn_addr=document.getElementsByClassName("like")[0]
    dislike_btn_addr=document.getElementsByClassName("dislike")[0]

    let res = await checkForLikeDislike(post_id);

    if (!res){
        // if there is no action at all
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({ action: -1}).then(()=>{
                //alert("Disliked");
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
        document.getElementsByClassName("number_of_dislikes")[0].innerHTML=new_value
    }
    else{
        // if there is action 
        firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}/action`).once('value', (snapshot) => {
            let current_state=snapshot.val();
            if (current_state==1){
                // if action is like
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({action: -1}).then(()=>{
                    //alert("Disiked");
                });  
                // add 1 dislike and remove 1 like
                updateDislikes(post_id, 1)
                updateLikes(post_id,-1)
                //});  
                // UI   
                like_btn_addr.style.background='#dadada';
                like_btn_addr.style.color='black';
                dislike_btn_addr.style.background='#e53935';
                dislike_btn_addr.style.color='white';

                // increase dislike count
                current_value=dislike_btn_addr.value
                new_value=parseInt(current_value)+1
                dislike_btn_addr.value=new_value
                document.getElementsByClassName("number_of_dislikes")[0].innerHTML=new_value
                //decrease like count
                current_value=like_btn_addr.value
                new_value=parseInt(current_value)-1
                like_btn_addr.value=new_value
                document.getElementsByClassName("number_of_likes")[0].innerHTML=new_value

               
            }
            else{
                // remove 1 dislike
                updateDislikes(post_id, -1)
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).remove();
                //alert('post was already disliked');

                // UI 
                // change color
                dislike_btn_addr.style.background='#dadada';
                dislike_btn_addr.style.color='black';
                // change dislike number 
                current_value=dislike_btn_addr.value
                new_value=parseInt(current_value)-1
                dislike_btn_addr.value=new_value
                document.getElementsByClassName("number_of_dislikes")[0].innerHTML=new_value
                
            }
        }
        )
    }
}

function checkForLikeDislike(post_id)
{
    return new Promise(resolve => {
            firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).once("value", snapshot => {
                if (snapshot.exists()){
                resolve(true);
                }
                else{
                    resolve(false);
                }
            });
    });
}

function updateDislikes(post_id, number)
{
    firebase.database().ref(`posts/${post_id}/dislikes`).once('value', (snapshot) => {
        let current_dislikes = snapshot.val();
        var updates = {};
        updates[`posts/${post_id}/dislikes`] = current_dislikes + number
        firebase.database().ref().update(updates);
    })
}

function updateLikes(post_id, number)
{
    firebase.database().ref(`posts/${post_id}/likes`).once('value', (snapshot) => {
        let current_likes = snapshot.val();
        var updates = {};
        updates[`posts/${post_id}/likes`] = current_likes + number
        firebase.database().ref().update(updates);
    })
}

function checkIfLiked(post_id)
{
let data_list = [];

    firebase.database().ref('likes').once('value', x => { x.forEach(data => {
                data_list.push(data.val());
            });
        })
        .then(()=>{
        for (let i = 0; i < data_list.length; i++) {
            if (data_list[i].user_id==current_user["phone"] && post_id==data_list[i].post_id) {
                    return true
                }
            }
        return false;  
        }
    )
}
