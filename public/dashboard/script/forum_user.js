let users;
let user_ids_arr;
let current_user;

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
                }
            });
        }).then(() => {
            //TODO: retrieve the number of likes and dislikes 
            //TODO: retrieve the number of posts created by the user
            //TODO: retrieve the number of posts favorited by the user
            //TODO: retrieve the number of likes on comments
            //TODO: retroeve the number of replies and comments
            console.log(current_username);
        });
    });
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

    
    
    
    
   