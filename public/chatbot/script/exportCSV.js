compiledQuestionIDs = [QUESTION_IDS_EN, QUESTION_IDS_ZH_CN, QUESTION_IDS_MS,QUESTION_IDS_TH];
branch_ids = [EN_INDEX, ZH_CN_INDEX, MS_INDEX, TH_INDEX];

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
                        //case TYPE_MULTIPLE_CHOICE:
                        //case TYPE_MULTIPLE_CHOICE_SUB_QUESTION:
                        //case TYPE_MULTIPLE_CHOICE_OTHERS:
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
                                                    compiledData.push([questionObjectTemp.question_number, "\"" + questionObjectTemp.question.replace('<b>','').replace('</b>','') + "\"", "\"" + responseObj.answer + "\""]);

                                                    // if (questionObjectTemp.question_number == "4.5m") {
                                                    //     download_csv_file(compiledData);
                                                    // }
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
                                        compiledData.push(["\"" + questionObject.question_number + "\"", "\"" + questionObject.question.replace('<b>','').replace('</b>','') + "\"", "\"" + responseObj.answer + "\""]);
                                    });
                                });
                            break;
                    }
                });
        }
    }
    download_csv_file(compiledData);
}

function download_csv_file(csvFileData) {

    //define the heading for each row of the data
    let csv = 'Question Number,Question,Response\n';


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