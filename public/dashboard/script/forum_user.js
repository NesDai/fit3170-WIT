
let users;
let user_ids_arr;

let curren_user;
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
    
        collectUsers().then(()=>{
            
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
            console.log(user);
        
            if (user == undefined) { // if the user is undefined
                $("#userError").html("Invalid User Id");
                return;
            } else {
                $("#userError").html("");
            }

            current_user = user_id;
            alert(current_user);
            console.log(current_user);
        });
    
}
    
    
    
    
    
   