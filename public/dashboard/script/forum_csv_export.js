

function csvExportForum() {
    firebase.database().ref().once("value").then(snapshot => {
       root_data = snapshot.val();
       console.log(root_data);
    });
}