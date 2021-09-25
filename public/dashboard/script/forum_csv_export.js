
function objectToCsv(data) {

    const csv_rows = [];
    // get the headers 
    const headers = Object.keys(data[0]);
    csv_rows.push(headers.join(','));
    console.log(headers);
}

function csvExportForum() { // later change the function name appropriately
    const user_arr = [];
    var data;
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
        const csvData = objectToCsv(data); 
    });
}