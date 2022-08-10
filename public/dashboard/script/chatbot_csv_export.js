compiledQuestionIDs = [QUESTION_IDS_EN, QUESTION_IDS_ZH_CN, QUESTION_IDS_MS,QUESTION_IDS_TH];
branch_ids = [EN_INDEX, ZH_CN_INDEX, MS_INDEX, TH_INDEX];
let language = ["English", "Chinese", "Malay", "Thai"];
let options = {year: 'numeric', month: 'long', day: 'numeric'};
let question_id =['1.1','1.2','1.3','1.4','1.5','1.6','1.7','1.9','1.10','1.11','1.12a','1.12b','1.12c','1.12d','1.13a','1.13b','1.13c','1.13d','1.14a','1.14b','1.14c','2.1','2.2','2.3','2.4','2.5','2.6','2.7','3.1','3.2a','3.2b','3.2c','3.2d','3.2e','3.2f','3.2g','3.2h','3.2i','3.2j','3.2k','3.2l','3.2m','3.2n','3.2o','3.2p','3.2q','3.2r','4.1','4.2','4.3a','4.3b','4.3c','4.3d','4.4','4.5a','4.5b','4.5c','4.5d','4.5e','4.5f','4.5g','4.5h','4.5i','4.5j','4.5k','4.5l','4.5m','5.1','5.2','5.3','5.4'];

/**
 * Obtain users records contain phone number and username
 */
async function getUsers() {
    let userData;

    // iterate through the users child in firebase
    await firebase.database().ref('users').once('value', data => {
        userData = data.val();
    })
    // return the user records include phone number and username
    return userData;
}

/**
 * Compiles data from firebase to compiledData[] Array
 */

async function exportQues() {
    // obtain the user records contain phone number and username
    let userData = await getUsers();
    // console.log(userData)

    let compiledData = [];

    // only gets the question number and name of english questions
    for (let a = 0; a < branch_ids.length; a++) {
        for (let b = 0; b < compiledQuestionIDs[a].length; b++){
            await firebase.firestore().collection(QUESTIONS_BRANCHES[branch_ids[a]])
                .doc(compiledQuestionIDs[a][b])
                .get()
                .then((docRef) => {
                    let questionObject = docRef.data();
                    let questionType = questionObject.type;
                    switch (questionType) {
                        // question object
                        case TYPE_LONG_QUESTION:
                            for (let i = 0; i < (questionObject.arrangement).length; i++) {
                                firebase.firestore().collection(QUESTIONS_BRANCHES[branch_ids[a]])
                                    .doc(questionObject.arrangement[i])
                                    .get()
                                    .then((docRefTemp) => {
                                        let questionObjectTemp = docRefTemp.data();
                                        //query responses
                                        firebase.firestore().collection(RESPONSE_BRANCH + '/' + questionObject.arrangement[i])
                                            .get()
                                            .then((querySnapshot) => {
                                                querySnapshot.forEach(response => {
                                                    let responseObj = response.data();
                                                    let subQuestionType = questionObjectTemp.type;
                                                    // convert timestamp to date
                                                    let dateObj = responseObj.timestamp.toDate();
                                                    let date = dateObj.toLocaleDateString(undefined, options);
                                                    // obtain phone number or ID, and admin phone number if available
                                                    let user = responseObj.phone;
                                                    let admin = "";
                                                    let userInfo = userData[user];
                                                    if (!user.includes("+")) {
                                                        admin = userInfo.phone;
                                                    }
                                                    // obtain username
                                                    let username = userInfo.username;
                                                    // obtain user's location (city and state)
                                                    let city = userInfo.city;
                                                    let state = userInfo.state;
                                                    if (city === undefined) {
                                                        city = "";
                                                    }
                                                    if (state === undefined) {
                                                        state = "";
                                                    }

                                                    // let avatarState = "";
                                                    // // whether the user use avatar chatbot or not
                                                    // firebase.firestore().collection("users/" + user).get().then((querySnap) => {
                                                    //     let state = querySnap.getString("avatarState");
                                                    //     if (state === undefined) {
                                                    //         avatarState = "";
                                                    //     }
                                                    //     else if (state === "N/A") {
                                                    //         avatarState = "";
                                                    //     }
                                                    //     else {
                                                    //         avatarState = state
                                                    //     }
                                                    // })

                                                    switch(subQuestionType) {
                                                        case TYPE_MULTIPLE_CHOICE:
                                                        case TYPE_MULTIPLE_CHOICE_SUB_QUESTION:
                                                        case TYPE_MULTIPLE_CHOICE_OTHERS:
                                                            compiledData.push([questionObjectTemp.question_number, "\"" + questionObjectTemp.question.replaceAll('<b>', '').replaceAll('</b>', '') + "\"", "\"" + responseObj.answer + "\"", "\"" + array_to_str(questionObjectTemp.restrictions.choices) + "\"" , "\"" + user + "\"", "\"" + username + "\"", "\"" + city + "\"", "\"" + state + "\"", "\"" + language[a] + "\"", "\"" + date + "\"", "\"" + admin + "\""]);
                                                            break;
                                                        default:
                                                            compiledData.push([questionObjectTemp.question_number, "\"" + questionObjectTemp.question.replaceAll('<b>', '').replaceAll('</b>', '') + "\"", "\"" + responseObj.answer + "\"", , "\"" + user + "\"", "\"" + username + "\"", "\"" + city + "\"", "\"" + state + "\"", "\"" + language[a] + "\"", "\"" + date + "\"", "\"" + admin + "\""]);
                                                            break;
                                                    }
                                                });
                                            });
                                    });
                            }
                            break;
                        default:
                            //query responses
                            firebase.firestore().collection(RESPONSE_BRANCH + '/' + compiledQuestionIDs[a][b])
                                .get()
                                .then((querySnapshot) => {
                                    querySnapshot.forEach(response => {
                                        let responseObj = response.data();
                                        // convert timestamp to date
                                        let dateObj = responseObj.timestamp.toDate();
                                        let date = dateObj.toLocaleDateString(undefined, options);
                                        // obtain phone number or ID, and admin phone number if available
                                        let user = responseObj.phone;
                                        let admin = "";
                                        let userInfo = userData[user];
                                        if (!user.includes("+")) {
                                            admin = userInfo.phone;
                                        }
                                        // obtain username
                                        let username = userInfo.username;
                                        // obtain user's location (city and state)
                                        let city = userInfo.city;
                                        let state = userInfo.state;
                                        if (city === undefined) {
                                            city = "";
                                        }
                                        if (state === undefined) {
                                            state = "";
                                        }

                                        // let avatarState = "";
                                        // // whether the user use avatar chatbot or not
                                        // firebase.firestore().collection("users/" + user).get().then((querySnap) => {
                                        //     let state = querySnap.getString("avatarState");
                                        //     if (state === undefined) {
                                        //         avatarState = "";
                                        //     }
                                        //     else if (state === "N/A") {
                                        //         avatarState = "";
                                        //     }
                                        //     else {
                                        //         avatarState = state
                                        //     }
                                        // })

                                        switch(questionType){
                                            case TYPE_MULTIPLE_CHOICE:
                                            case TYPE_MULTIPLE_CHOICE_SUB_QUESTION:
                                            case TYPE_MULTIPLE_CHOICE_OTHERS:
                                                compiledData.push(["\"" + questionObject.question_number + "\"", "\"" + questionObject.question.replaceAll('<b>','').replaceAll('</b>','') + "\"", "\"" + responseObj.answer + "\"", "\"" + array_to_str(questionObject.restrictions.choices) + "\"" , "\"" + user + "\"", "\"" + username + "\"", "\"" + city + "\"", "\"" + state + "\"", "\"" + language[a] + "\"", "\"" + date + "\"", "\"" + admin + "\""]);
                                                break;

                                            default:
                                                compiledData.push(["\"" + questionObject.question_number + "\"", "\"" + questionObject.question.replaceAll('<b>','').replaceAll('</b>','') + "\"", "\"" + responseObj.answer + "\"" , , "\"" + user + "\"" , "\"" + username + "\"", "\"" + city + "\"", "\"" + state + "\"", "\"" + language[a] + "\"", "\"" + date + "\"", "\"" + admin + "\""]);
                                                break;
                                        }
                                    });
                                });
                            break;
                    }
                });
        }
    }
    download_csv_file(compiledData, 1);
}


async function exportQues2() {
    let user_ans = {}
    await firebase.firestore().collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((data) => {
            user_ans[data.id] = []
        })
    })

    // obtain the user records contain phone number and username
    let userData = await getUsers();

    // only gets the question number and name of english questions
    for (let a = 0; a < branch_ids.length; a++) {
        for (let b = 0; b < compiledQuestionIDs[a].length; b++){
            await firebase.firestore().collection(QUESTIONS_BRANCHES[branch_ids[a]])
                .doc(compiledQuestionIDs[a][b])
                .get()
                .then((docRef) => {
                    let questionObject = docRef.data();
                    let questionType = questionObject.type;
                    switch (questionType) {
                        // question object
                        case TYPE_LONG_QUESTION:
                            for (let i = 0; i < (questionObject.arrangement).length; i++) {
                                firebase.firestore().collection(QUESTIONS_BRANCHES[branch_ids[a]])
                                    .doc(questionObject.arrangement[i])
                                    .get()
                                    .then((docRefTemp) => {
                                        let questionObjectTemp = docRefTemp.data();
                                        //query responses
                                        firebase.firestore().collection(RESPONSE_BRANCH + '/' + questionObject.arrangement[i])
                                            .get()
                                            .then((querySnapshot) => {
                                                querySnapshot.forEach(response => {
                                                    let responseObj = response.data();
                                                    let subQuestionType = questionObjectTemp.type;
                                                    // convert timestamp to date
                                                    let dateObj = responseObj.timestamp.toDate();
                                                    let date = dateObj.toLocaleDateString(undefined, options);
                                                    // obtain phone number or ID, and admin phone number if available
                                                    let user = responseObj.phone;
                                                    let admin = "";
                                                    let userInfo = userData[user];
                                                    if (!user.includes("+")) {
                                                        admin = userInfo.phone;
                                                    }
                                                    // obtain username
                                                    let username = userInfo.username;
                                                    // obtain user's location (city and state)
                                                    let city = userInfo.city;
                                                    let state = userInfo.state;
                                                    if (city === undefined) {
                                                        city = "";
                                                    }
                                                    if (state === undefined) {
                                                        state = "";
                                                    }

                                                    switch(subQuestionType) {
                                                        case TYPE_MULTIPLE_CHOICE:
                                                        case TYPE_MULTIPLE_CHOICE_SUB_QUESTION:
                                                        case TYPE_MULTIPLE_CHOICE_OTHERS:
                                                            user_ans[user].push([questionObjectTemp.question_number, responseObj.answer]);
                                                            break;
                                                        default:
                                                            user_ans[user].push([questionObjectTemp.question_number, responseObj.answer]);
                                                            break;
                                                    }
                                                });
                                            });
                                    });
                            }
                            break;
                        default:
                            //query responses
                            firebase.firestore().collection(RESPONSE_BRANCH + '/' + compiledQuestionIDs[a][b])
                                .get()
                                .then((querySnapshot) => {
                                    querySnapshot.forEach(response => {
                                        let responseObj = response.data();
                                        // convert timestamp to date
                                        let dateObj = responseObj.timestamp.toDate();
                                        let date = dateObj.toLocaleDateString(undefined, options);
                                        // obtain phone number or ID, and admin phone number if available
                                        let user = responseObj.phone;
                                        let admin = "";
                                        let userInfo = userData[user];
                                        if (!user.includes("+")) {
                                            admin = userInfo.phone;
                                        }
                                        // obtain username
                                        let username = userInfo.username;
                                        // obtain user's location (city and state)
                                        let city = userInfo.city;
                                        let state = userInfo.state;
                                        if (city === undefined) {
                                            city = "";
                                        }
                                        if (state === undefined) {
                                            state = "";
                                        }

                                        switch(questionType){
                                            case TYPE_MULTIPLE_CHOICE:
                                            case TYPE_MULTIPLE_CHOICE_SUB_QUESTION:
                                            case TYPE_MULTIPLE_CHOICE_OTHERS:
                                                user_ans[user].push([questionObject.question_number, responseObj.answer]);
                                                break;

                                            default:
                                                user_ans[user].push([questionObject.question_number, responseObj.answer]);
                                                break;
                                        }
                                    });
                                });
                            break;
                    }
                });
        }
    }
    // console.log(user_ans)
    let data_csv = [];
    // for (var key in user_ans) {
    //     let data = user_ans[key]
    //     if (data.length > 0) {
    //         console.log(data[0])
    //     }
    // }

    for (var key in user_ans) {
        let data = user_ans[key];
        let count = 0;
        let temp_data = ["\"" + key + "\""]
        let got_ans = 0;
        for (let x = 0; x < question_id.length; x++) {
            if (data.length > count) {
                if (data[count][0] == question_id[x]) {
                    temp_data.push("\"" + data[count][1] + "\"");
                    got_ans = 1;
                    count++;
                }
                else {
                    temp_data.push("");
                }
            }
            else {
                temp_data.push("");
            }
        }
        if (got_ans > 0) {
              data_csv.push(temp_data);
        }
    }
    // console.log(data_csv)
    download_csv_file(data_csv, 2);
}


/**
 * Compiles csv file from the data, adds meta data and headers.
 */

function download_csv_file(csvFileData, format) {

    //TEMP COMMENT
    //define the heading for each row of the data

    let csv = "\ufeff";
    if (format == 1) {
        csv += 'For Likert Scales The following convention is used: \n';
        csv += 'Agreeableness: [1] Strongly Disagree [2] Disagree [3] Neutral [4] Agree [5] Strongly Agree\n';
        csv += 'Satisfaction: [0] Not Applicable (N/A) [1] Very Dissatisfied [2] Dissatisfied [3] Neutral [4] Satisfied [5] Very Satisfied\n';
        csv += 'Confidence: [0] Not Applicable (N/A) [1] Not Confident At All [2] Somewhat Not Confident [3] Moderately Confident [4] Somewhat Confident [5] Extremely Confident\n';
        csv += 'Interest: [1] Extremely Not Interested [2] Not Interested [3] Neutral [4] Interested [5] Extremely Interested\n';
        csv += 'Question Number,Question,Response,Options,User,Username,City,State,Language,Date,Admin\n';
    }
    else if (format == 2) {
      csv += 'User,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.9,1.10,1.11,1.12a,1.12b,1.12c,1.12d,1.13a,1.13b,1.13c,1.13d,1.14a,1.14b,1.14c,2.1,2.2,2.3,2.4,2.5,2.6,2.7,3.1,3.2a,3.2b,3.2c,3.2d,3.2e,3.2f,3.2g,3.2h,3.2i,3.2j,3.2k,3.2l,3.2m,3.2n,3.2o,3.2p,3.2q,3.2r,4.1,4.2,4.3a,4.3b,4.3c,4.3d,4.4,4.5a,4.5b,4.5c,4.5d,4.5e,4.5f,4.5g,4.5h,4.5i,4.5j,4.5k,4.5l,4.5m,5.1,5.2,5.3,5.4\n';
    }

    // TEMP COMMENT
    // merge the data with CSV
    csvFileData.forEach(function(row) {
        csv += row.join(',');
        csv += "\n";
    });

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';

    //provide the name for the CSV file to be downloaded
    hiddenElement.download = 'responses.csv';
    hiddenElement.click();
}

function array_to_str(array){
    let returnStr = ""
    for (let i=0; i < array.length; i ++){
        returnStr += "[" + i + "] " + array[i] + " "
    }
    return returnStr;
}
