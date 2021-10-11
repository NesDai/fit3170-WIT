firebase.database().ref('users').once("value", function (snapshot) {
    let tableHtml = "";
    if (snapshot.exists()){
        tableHtml += `<tbody>`;
        let i = 0;
        snapshot.forEach((child)=>{
            if (child.val().username == undefined){
                tableHtml += 
                `
                <tr>
                <th>${i}</th>
                <td>${child.val().phone}</td>
                <td>Username not set</td>
                <td><button onclick="updateSelectedUser(${child.val().phone})" class="pure-button pure-button-primary">View</button></td>
                </tr>
                `;
                i++;
            } else {
                tableHtml += 
                `
                <tr>
                <th>${i}</th>
                <td>${child.val().phone}</td>
                <td>${child.val().username}</td>
                <td><button onclick="updateVideoList(${child.val().phone})" class="pure-button pure-button-primary">View</button></td>
                </tr>
                `;
                i++;
            }
        })
        tableHtml += `</tbody>`;
        $("#userListTable").append(tableHtml);
    } else {
        console.log("No users");
    }
});

// $('#search-butt').click(function(){
//     let inputPhoneNum = $('#searchUsername').val();
//     firebase.database().ref('users').once('value', function(snapshot){
//         snapshot.forEach((child)=>{
//             if (child.val().phone == inputPhoneNum){
//                 updateSelectedUser(child.val());
//             } else {
//                 //Error
//             }
//         });
//     })
// })

function updateVideoList(phoneNum){
    firebase.database().ref(`users/+${phoneNum}`).once("value", function(snapshot){
        if (snapshot.exists()){
            console.log(snapshot.val())
            $('#videoListContainer').show();
            if (snapshot.val().videoHistory != null){
                let videoHistory = snapshot.val().videoHistory;
                buildVideoListTable(videoHistory, phoneNum)
            } else {
                buildVideoListTable(null)
            }
        } else {
            console.error("Unexpected error");
        }
    })
}

function buildVideoListTable(videoDetails, phoneNum){
    if (videoDetails == null){
        $('#videoListBody').html("No data available");
    } else {
        let bodyHtml = 
        `
        <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">

            <div class="row my-1" >
                <table class="pure-table" id="videoListTable">
                
                </table>
            </div>
            </div>
        </div>
        </div>
        `;
        $('#videoListBody').html(bodyHtml);

        let videoListTableHtml = ``;
        videoListTableHtml += `
        <thead style="background-color: dimgray;">
            <tr>
                <th style="color: white;">No.</th>
                <th style="color: white;">Video title</th>
                <th style="color: white;">Video</th>
                <th style="color: white;">Watchcount</th>
                <th style="color: white;">Video tag</th>
                <th style="color: white;">View analytics</th>
            </tr>
        </thead>
        <tbody>`;

        for (i in videoDetails){
            videoListTableHtml += `
            <tr>
            <th>${i}</th>
            <td>${videoDetails[i].videoTitle}</td>
            <td><a href="${videoDetails[i].videoUrl}" target="_blank">Link</a></td>
            <td>${videoDetails[i].totalWatchCount}</td>
            <td>Preference placeholder</td>
            <td><button onclick="updateVideoAnalytics(${phoneNum}, ${i})" class="pure-button pure-button-primary">View</button></td>
            </tr>
            `;
            console.log(videoDetails[i]);
        }

        videoListTableHtml += `</tbody>`;
        $('#videoListTable').html(videoListTableHtml);
    }
    
}

function updateVideoAnalytics(phoneNum, i){
    $('#videoAnalyticContainer').show();
    firebase.database().ref(`users/+${phoneNum}`).once("value", function(snapshot){

    })
    console.log(phoneNum,i)
}




// let ChartOptionss = {
//     maintainAspectRatio: !1,
//     responsive: !0,
//     legend: {
//         display: !1
//     },
//     scales: {
//         xAxes: [{
//             gridLines: {
//                 display: !1
//             }
//         }],
//         yAxes: [{
//             gridLines: {
//                 display: !1,
//                 color: colors.borderColor,
//                 zeroLineColor: colors.borderColor
//             }
//         }]
//     }
// }
// let ChartDatas = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
//     datasets: [{
//         label: "Visitors",
//         barThickness: 10,
//         backgroundColor: base.primaryColor,
//         borderColor: base.primaryColor,
//         pointRadius: !1,
//         pointColor: "#3b8bba",
//         pointStrokeColor: "rgba(60,141,188,1)",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "rgba(60,141,188,1)",
//         data: [28, 48, 40, 19, 64, 27, 90, 85, 92],
//         fill: "",
//         lineTension: .1
//     }, {
//         label: "Orders",
//         barThickness: 10,
//         backgroundColor: "rgba(210, 214, 222, 1)",
//         borderColor: "rgba(210, 214, 222, 1)",
//         pointRadius: !1,
//         pointColor: "rgba(210, 214, 222, 1)",
//         pointStrokeColor: "#c1c7d1",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "rgba(220,220,220,1)",
//         data: [65, 59, 80, 42, 43, 55, 40, 36, 68],
//         fill: "",
//         borderWidth: 2,
//         lineTension: .1
//     }]
// }

// new Chart("chart1", {
//     type: "bar",
//     data: ChartDatas,
//     options: ChartOptionss
// });