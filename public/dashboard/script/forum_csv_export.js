
function objectToCsv(data) {

    // get the headers 
    var headers = Object.keys(data[0]);
    headers = headers.join(',') + "\n";

    // loop through the rows
    var body = data.map(function(d) {
        return Object.keys(d).map(function(key) {
            return d[key];
        }).join(',');
    }).join("\n");

    return headers + body;
}

function csvDownload(csv_data) {

    // output filename 
    var filename = "forum user data" + '.' + "csv";

    var blob = new Blob([csv_data], {type: 'text/csv;charset=utf-8'});
    const url = window.URL.createObjectURL(blob);
    const a= document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function csvExportForum() { // later change the function name appropriately
    const user_arr = [];
    var data;
    var csv_data;
    firebase.database().ref('users').once("value", x => {
        x.forEach(snapshot => {
            user_arr.push(snapshot.val());
            data = user_arr.map(user => ({
                user_id: user.phone,
                username: user.username, 
                phone: user.phone
            }));
        });
    }).then(() => {
        csv_data = objectToCsv(data); 
    }).then(() => {
        csvDownload(csv_data);
    });
}

function removeSpecialChar(str) {
    if (str == null || str == '') {
        return '';
    }
    return str.replace(/[^a-zA-Z0-9 ]/g, '');
}

function csvExportPost() {
    // TODO: find a bug that causes other values of a key to go to different keys (maybe because of , ? or emoji or character length)
    // TODO: maybe limit the char length?
    var data;
    var csv_data;
    const post_arr = [];
    firebase.database().ref('posts').once('value', x => {
        x.forEach(snapshot => {
            const post_data = snapshot.val();
            post_data["post_id"] = snapshot.key; 
            post_arr.push(post_data);
            data = post_arr.map(post => ({
                post_id: post.post_id,
                title: removeSpecialChar(JSON.stringify(post.title)),
                description: removeSpecialChar(JSON.stringify(post.description)),
                username: post.username ? post.username : "No username",
                created: post.created ? post.created : "No created time given",
                interest_1: post.interest[0] ? post.interest[0] : "No interest given",
                interest_2: post.interest[1] ? post.interest[1] : "No interest given",
                likes: post.likes ? post.likes : 0,
                dislikes: post.dislikes ? post.dislikes : 0,
                videoURL: post.videoURL ? post.videoURL : "No video URL given",
                // later add recommender key and value
            }));
        });
    }).then(() => {
        csv_data = objectToCsv(data);
    }).then(() => {
        csvDownload(csv_data);
    })
}

csvExportPost();
csvExportForum();