
function objectToCsv(data) {

    const csv_rows = [];
    // get the headers 
    const headers = Object.keys(data[0]);
    csv_rows.push(headers.join(','));
    console.log(headers);
}

function csvExportForum() { // later change the function name appropriately
    firebase.database().ref('users').once("value").then(snapshot => {
      user_data = snapshot.val(); 
    });
    console.log(user_data);
    console.log("outside");

    const data = user_data.map(user => ({
        user_id: a,
        username: user.username, 
        phone: user.phone,
    }));

    const csvData = objectToCsv(data);
}