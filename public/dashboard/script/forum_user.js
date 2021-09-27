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

    
    
    
    
   