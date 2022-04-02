compiledQuestionIDs = [QUESTION_IDS_EN, QUESTION_IDS_ZH_CN, QUESTION_IDS_MS,QUESTION_IDS_TH];
branch_ids = [EN_INDEX, ZH_CN_INDEX, MS_INDEX, TH_INDEX];
let language = ["English", "Chinese", "Malay", "Thai"];
let options = {year: 'numeric', month: 'long', day: 'numeric'};

/**
 * Compiles data from firebase to compiledData[] Array
 */

async function exportQues() {
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
                                                    if (!user.includes("+")) {
                                                        getAdmin(user).then(data => {
                                                            localStorage.setItem(ADMIN_KEY, data)
                                                        });
                                                        admin = localStorage.getItem(ADMIN_KEY);
                                                    }
                                                    switch(subQuestionType) {
                                                        case TYPE_MULTIPLE_CHOICE:
                                                        case TYPE_MULTIPLE_CHOICE_SUB_QUESTION:
                                                        case TYPE_MULTIPLE_CHOICE_OTHERS:
                                                            compiledData.push([questionObjectTemp.question_number, "\"" + questionObjectTemp.question.replaceAll('<b>', '').replaceAll('</b>', '') + "\"", "\"" + responseObj.answer + "\"", "\"" + array_to_str(questionObjectTemp.restrictions.choices) + "\"" , "\"" + user + "\"", "\"" + language[a] + "\"", "\"" + date + "\"", "\"" + admin + "\""]);
                                                            break;
                                                        default:
                                                            compiledData.push([questionObjectTemp.question_number, "\"" + questionObjectTemp.question.replaceAll('<b>', '').replaceAll('</b>', '') + "\"", "\"" + responseObj.answer + "\"", , "\"" + user + "\"", "\"" + language[a] + "\"", "\"" + date + "\"", "\"" + admin + "\""]);
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
                                        if (!user.includes("+")) {
                                            getAdmin(user).then(data => {
                                                localStorage.setItem(ADMIN_KEY, data)
                                            });
                                            admin = localStorage.getItem(ADMIN_KEY);
                                        }
                                        switch(questionType){
                                            case TYPE_MULTIPLE_CHOICE:
                                            case TYPE_MULTIPLE_CHOICE_SUB_QUESTION:
                                            case TYPE_MULTIPLE_CHOICE_OTHERS:
                                                compiledData.push(["\"" + questionObject.question_number + "\"", "\"" + questionObject.question.replaceAll('<b>','').replaceAll('</b>','') + "\"", "\"" + responseObj.answer + "\"", "\"" + array_to_str(questionObject.restrictions.choices) + "\"" , "\"" + user + "\"", "\"" + language[a] + "\"", "\"" + date + "\"", "\"" + admin + "\""]);
                                                break;

                                            default:
                                                compiledData.push(["\"" + questionObject.question_number + "\"", "\"" + questionObject.question.replaceAll('<b>','').replaceAll('</b>','') + "\"", "\"" + responseObj.answer + "\"" , , "\"" + user + "\"" , "\"" + language[a] + "\"", "\"" + date + "\"", "\"" + admin + "\""]);
                                                break;
                                        }

                                    });
                                });
                            break;
                    }
                });
        }
    }
    download_csv_file(compiledData);
}

/**
 * Obtain admin phone number from user ID
 */
async function getAdmin(user) {
    let adminPhone = "";
    await firebase.database().ref(`users/${user}`).once('value', data => {
        adminPhone = data.val().phone;
    });
    return adminPhone;
}

/**
 * Compiles csv file from the data, adds meta data and headers.
 */

function download_csv_file(csvFileData) {

    //define the heading for each row of the data
    let csv = "\ufeff" + 'For Likert Scales The following convention is used: \n';
    csv += 'Agreeableness: [1] Strongly Disagree [2] Disagree [3] Neutral [4] Agree [5] Strongly Agree\n';
    csv += 'Satisfaction: [0] Not Applicable (N/A) [1] Very Dissatisfied [2] Dissatisfied [3] Neutral [4] Satisfied [5] Very Satisfied\n';
    csv += 'Confidence: [0] Not Applicable (N/A) [1] Not Confident At All [2] Somewhat Not Confident [3] Moderately Confident [4] Somewhat Confident [5] Extremely Confident\n';
    csv += 'Interest: [1] Extremely Not Interested [2] Not Interested [3] Neutral [4] Interested [5] Extremely Interested\n';
    csv += 'Question Number,Question,Response,Options,User,Language,Date,Admin\n';

    //merge the data with CSV
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
