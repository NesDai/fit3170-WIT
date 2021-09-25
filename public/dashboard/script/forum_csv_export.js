
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

csvExportForum();