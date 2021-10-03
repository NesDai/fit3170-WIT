compiledQuestionIDs = [QUESTION_IDS_EN, QUESTION_IDS_ZH_CN, QUESTION_IDS_MS,QUESTION_IDS_TH];
branch_ids = [EN_INDEX, ZH_CN_INDEX, MS_INDEX, TH_INDEX];

function exportMultipleChoiceQues(){
    firebase.firestore().collection(QUESTIONS_BRANCHES[branch_ids[0]])
        .doc(QUESTION_IDS_EN[0])
        .get()
        .then((docRef) => {
            let questionObject = docRef.data();
            let questionType = questionObject.type;
            switch(questionType){
                case TYPE_MULTIPLE_CHOICE:
                case TYPE_MULTIPLE_CHOICE_SUB_QUESTION:
                case TYPE_MULTIPLE_CHOICE_OTHERS:
                    // question object
                    console.log(questionObject.question_number);
                    console.log(questionObject.question);
                    break;
            }

        });

}