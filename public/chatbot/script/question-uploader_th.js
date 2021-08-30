/**
 * This file is used to automatically upload the survey questions
 * to the Firestore Database.
 *
 * @author Yong Peng (ychi0014@student.monash.edu)
 */

const SUB_QUESTIONS_1_12 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "", // Qs 1.12.1
    "", // Qs 1.12.2
    "", // Qs 1.12.3
    "" // Qs 1.12.4
];

// TODO Fill in tooltips
const SUB_QUESTIONS_HINTS_1_12 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
];

const SUB_QUESTIONS_1_13 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "", // Qs 1.13.a
    "", // Qs 1.13.b
    "", // Qs 1.13.c
    "" // Qs l.13.d
];

// TODO Fill in tooltips
const SUB_QUESTIONS_HINTS_1_15 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
];

const SUB_QUESTIONS_1_14 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "", // Qs 1.14.a
    "", // Qs 1.14.b
    "" // Qs 1.14.c
];

// TODO Fill in tooltips
const SUB_QUESTIONS_HINTS_1_14 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
];

const PART1 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "", // Qs 1.1
    "", // Qs 1.2
    "", // Qs 1.3
    "", // Qs 1.4
    "", // Qs 1.5
    "", // Qs 1.6
    "", // Qs 1.7
    "", // Qs 1.8
    "", // Qs 1.9

    // The question above this line is question 1.9

    "", // Qs 1.10
    "", // Qs 1.11
    "", // Qs 1.12

    // The question above this line is a long question 1.12

    "", // Qs 13

    // The question above this line is a long question (1.13)

    "" // Qs 1.14

    // The question above this line is a long question 1.14
];

const HINTS_PART1 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Enter a Number",
    "Select an Option",
    "Select an Option",
    "Select an Option",
    "Select an Option",
    "Select an Option",
    "Select an Option",
    "Enter a Number",
    "Enter a Number",

    // The question above this line is question 1.10


    "Enter a Number",
    "Select an Option",
    "Select an Option",
    // The question above this line is a long question (1.14)

    "Select an Option",
    // The question above this line is a long question (1.14)

    "Select an Option"
    // The question above this line is a long question (1.14)
];

const PART2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "", // Qs 2.1
    "", // Qs 2.2
    "", // Qs 2.3
    "", // Qs 2.4
    "", // Qs 2.5
    "", // Qs 2.6
    "" // Qs 2.7
];

const HINTS_PART2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
];

const SUB_QUESTIONS_3_2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "", // Qs 3.2.a
    "", // Qs 3.2.b
    "", // Qs 3.2.c
    "", // Qs 3.2.d
    "", // Qs 3.2.e
    "", // Qs 3.2.f
    "", // Qs 3.2.g
    // The question above this line is question 3.2g

    "", // Qs 3.2.h
    "", // Qs 3.2.i
    "", // Qs 3.2.j
    "", // Qs 3.2.k
    "", // Qs 3.2.l
    "", // Qs 3.2.m
    "", // Qs 3.2.n
    "", // Qs 3.2.o
    // The question above this line is question 3.2o

    "", // Qs 3.2.p
    "", // Qs 3.2.q
    "" // Qs 3.2.r
];

const SUB_QUESTIONS_HINTS_3_2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    // The question above this line is question 3.2g

    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    // The question above this line is question 3.2p

    "placeholder",
    "placeholder",
    "placeholder",
];

const PART3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "", // Qs 3.1
    // The question above this line is question 3.1

    "" // Qs 3.2
    // The question above this line is a long question (3.2)
];

const HINTS_PART3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    // The question above this line is question 3.1

    ""
    // The question above this line is a long question (3.2)

];

const SUB_QUESTIONS_4_3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "", // Qs 4.3.a
    "", // Qs 4.3.b
    "", // Qs 4.3.c
    "" // Qs 4.3.d
];

const SUB_QUESTIONS_HINTS_4_3 = [
    "",
    // The above question is a placeholder to allow 1-indexing
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
];

const SUB_QUESTIONS_4_5 = [
    "",
    // The above question is a placeholder to allow 1-indexing
    "", // Qs 4.5.a
    "", // Qs 4.5.b
    "", // Qs 4.5.c
    "", // Qs 4.5.d
    "", // Qs 4.5.e
    "", // Qs 4.5.f
    "", // Qs 4.5.g
    "", // Qs 4.5.h
    "", // Qs 4.5.i
    "", // Qs 4.5.j
    "", // Qs 4.5.k
    "", // Qs 4.5.l
    "" // Qs 4.5.m
];

const SUB_QUESTIONS_HINTS_4_5 = [
    "",
    // The above question is a placeholder to allow 1-indexing
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
];

const PART4 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "", // Qs 4.1

    "", // Qs 4.2
    // The question above this line is question 4.2

    "", // Qs 4.3
    // The question above this line is a long question (4.3)

    "", // Qs 4.4
    // The question above this line is question 4.4

    "" // Qs 4.5
    // The question above this line is question 4.5
];

const HINTS_PART4 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    "placeholder",
    // The question above this line is question 4.2

    "",
    // The question above this line is a long question (4.3)

    "placeholder",
]

const PART5 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "", // Qs 5.1
    "", // Qs 5.2
    "", // Qs 5.3
    "" // Qs 5.4
]

const HINTS_PART5 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
]

// TODO 2.6 and 2.7 - Likert Scale

let question_2_1_id = "";
let question_2_3_id = "";

function pushPart1Questions() {
    // Set part index to 1 and reset
    // the question counter
    setPartNumber(1);

    // Question 1.1
    pushNumeric("1.1", PART1[1], 50, 100, true, HINTS_PART1[1]);

    // Question 1.2
    let choices_1_2 = ["Male", "Female"]
    let skip_choices_1_2 = ["Male"];
    pushMultipleChoice("1.2", PART1[2], choices_1_2, skip_choices_1_2, SKIP_END_SURVEY, HINTS_PART1[2]);

    // Question 1.3
    let choices_1_3 = ["Malay", "Chinese", "Indian", "Thai", "Others"];
    pushMultipleChoice("1.3", PART1[3], choices_1_3, [], SKIP_NOT_ALLOWED, HINTS_PART1[3]);

    // Question 1.4
    let choices_1_4 = ["Urban area", "Rural area"];
    pushMultipleChoice("1.4", PART1[4], choices_1_4, [], SKIP_NOT_ALLOWED, HINTS_PART1[4]);

    // Question 1.5
    let choices_1_5 = ["No income", "Less than MYR2500", "MYR2501-3169", "MYR3170-3969", "MYR3970-4849", "MYR4850 or more"];
    pushMultipleChoice("1.5", PART1[5], choices_1_5, [], SKIP_NOT_ALLOWED, HINTS_PART1[5]);

    // Question 1.6
    let choices_1_6 = ["No formal education", "Primary school", "Secondary/ high school", "Vocational/ technical certification", "University"];
    pushMultipleChoice("1.6", PART1[6], choices_1_6, [], SKIP_NOT_ALLOWED, HINTS_PART1[6]);

    // Question 1.7
    let choices_1_7 = ["Single", "Married", "Divorced", "Widowed", "Other relationship"];
    pushMultipleChoice("1.7", PART1[7], choices_1_7, [], SKIP_NOT_ALLOWED, HINTS_PART1[7]);

    // Question 1.8
    pushNumeric("1.8", PART1[8], 0, 999, false, HINTS_PART1[8]);

    // Question 1.9
    pushNumeric("1.9", PART1[9], 0, 999, false, HINTS_PART1[9]);

    // Question 1.10
    pushNumeric("1.10", PART1[10], 0, 999, false, HINTS_PART1[10]);

    // Question 1.11
    pushNumeric("1.11", PART1[11], 0, 999, false, HINTS_PART1[11]);

    // Question 1.13
    pushLongQuestion("1.13", PART1[13]).then((q13docRef) => {
        // [START]                  Question 1.12                   [START]
        // Inserted after Question 1.13

        pushLongQuestion("1.12", PART1[12]).then((q12docRef) => {
            // Record the id of the question itself
            longQuestionIds.push(q12docRef.id);

            // Log it in the console
            let questionNumber = "1.12";
            recordLongQuestionPush(questionNumber, q12docRef);

            // Start preparing for the pushes of its sub-questions
            initLongQuestionParams();

            // Question 1.12a
            let choices_1_12 = ["Yes", "No"];
            let skip_choices_1_12 = ["Yes"];
            appendMultipleChoice(questionNumber, q12docRef.id, SUB_QUESTIONS_1_12[1], choices_1_12, skip_choices_1_12, q13docRef.id, SUB_QUESTIONS_HINTS_1_12[1]);

            // Question 1.12b
            appendMultipleChoice(questionNumber, q12docRef.id, SUB_QUESTIONS_1_12[2], choices_1_12, skip_choices_1_12, q13docRef.id, SUB_QUESTIONS_HINTS_1_12[2]);

            // Question 1.12c
            appendMultipleChoice(questionNumber, q12docRef.id, SUB_QUESTIONS_1_12[3], choices_1_12, skip_choices_1_12, q13docRef.id, SUB_QUESTIONS_HINTS_1_12[3]);

            // Question 1.12d
            appendMultipleChoice(questionNumber, q12docRef.id, SUB_QUESTIONS_1_12[4], choices_1_12, skip_choices_1_12, q13docRef.id, SUB_QUESTIONS_HINTS_1_12[4]);
        });

        // [END]                       Question 1.12                    [END]

        // Record the id of the question itself
        longQuestionIds.push(q13docRef.id);

        // Log it in the console
        let questionNumber = "1.13";
        recordLongQuestionPush(questionNumber, q13docRef)

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Question 1.13a
        let choices_1_13 = ["Yes", "No"];
        appendMultipleChoice(questionNumber, q13docRef.id, SUB_QUESTIONS_1_13[1],
            choices_1_13, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_15[1]);

        // Question 1.13b
        appendMultipleChoice(questionNumber, q13docRef.id, SUB_QUESTIONS_1_13[2],
            choices_1_13, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_15[2]);

        // Question 1.13c
        appendMultipleChoice(questionNumber, q13docRef.id, SUB_QUESTIONS_1_13[3],
            choices_1_13, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_15[3]);

        // Question 1.13d
        appendMultipleChoice(questionNumber, q13docRef.id, SUB_QUESTIONS_1_13[4],
            choices_1_13, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_15[4]);
    });

    // Question 1.14
    pushLongQuestion("1.14", PART1[14]).then((docRef) => {
        // Record the id of the question itself
        longQuestionIds.push(docRef.id);

        // Log it in the console
        let questionNumber = "1.14";
        recordLongQuestionPush(questionNumber, docRef)

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Question 1.16a
        appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_1_14[1],
            1, 5, false, SUB_QUESTIONS_HINTS_1_14[1]);

        // Question 1.16b
        appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_1_14[2],
            1, 5, false, SUB_QUESTIONS_HINTS_1_14[2]);

        // Question 1.16c
        appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_1_14[3],
            1, 5, false, SUB_QUESTIONS_HINTS_1_14[3]);
    });
}

function pushPart2Questions() {
    // Set part index to 2 and reset
    // the question counter
    setPartNumber(2);

    // Question 2.1
    let choices_2_1 = ["Working", "Retired", "Semi-retired", "Not working", "Not working but doing voluntary work", "Not working but looking for a job"];
    let skip_choices_2_1 = ["Retired", "Not working", "Not working but doing voluntary work", "Not working but looking for a job"];
    pushMultipleChoiceOthers("2.1", PART2[1], choices_2_1, skip_choices_2_1, "insert question 2.3 id here", HINTS_PART2[1]);

    // Question 2.2
    pushShortText("2.2", PART2[2], HINTS_PART2[2]);

    // Question 2.3
    pushNumeric("2.3", PART2[3], 0, 5, false, HINTS_PART2[3]);

    // Question 2.4
    let choices_2_4 = ["Yes", "No", "Not applicable"];
    pushMultipleChoice("2.4", PART2[4], choices_2_4, [],
        SKIP_NOT_ALLOWED, HINTS_PART2[4]);

    // Question 2.5
    let choices_2_5 = ["Yes", "No", "Not applicable"];
    pushMultipleChoice("2.5", PART2[5], choices_2_5, [],
        SKIP_NOT_ALLOWED, HINTS_PART2[5]);

    // TODO 2.6 and 2.7 - Are these numeric questions or multiple-choice questions?

    // Question 2.6
    let choices_2_6 = ["Not applicable", "Not confident at all", "Somewhat not confident", "Moderately confident", "Somewhat confident", "Extremely confident"];
    pushNumeric("2.6", PART2[6], 0, 5, false, HINTS_PART2[6]);

    // Question 2.7
    let choices_2_7 = ["Not applicable", "Not confident at all", "Somewhat not confident", "Moderately confident", "Somewhat confident", "Extremely confident"];
    pushNumeric("2.7", PART2[7], 0, 5, false, HINTS_PART2[7]);
}

function pushPart3Questions() {
    // Set part index to 3 and reset
    // the question counter
    setPartNumber(3);

    // Question 3.1
    let choices_3_1 = [
        "Prepaid mobile data plan",
        "Postpaid mobile data plan",
        "Home WiFi broadband plan",
        "Public WiFi hotspot",
        "I don't know how to access the Internet"
    ];
    pushMultipleChoice("3.1", PART3[1], choices_3_1, [],
        SKIP_NOT_ALLOWED, HINTS_PART3[1]);

    // Question 3.2
    pushLongQuestion("3.2", PART3[2]).then((docRef) => {
        // Record the id of the question itself
        longQuestionIds.push(docRef.id);

        // Log it in the console
        let questionNumber = "3.2";
        recordLongQuestionPush(questionNumber, docRef);

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Questions 3.2 a to r (18 questions in total)
        for (let i = 1; i < SUB_QUESTIONS_3_2.length; i++) {
            appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_3_2[i],
                0, 5, false,
                SUB_QUESTIONS_HINTS_3_2[i]);
        }
    });
}

function pushPart4Questions() {
    // Set part index to 4 and reset
    // the question counter
    setPartNumber(4);

    // Question 4.1
    pushNumeric("4.1", PART4[1], 1, 7, false,
        HINTS_PART4[1]);

    // Question 4.2
    pushNumeric("4.2", PART4[2], 0, 168, false,
        HINTS_PART4[2]);

    // Question 4.3
    pushLongQuestion("4.3", PART4[3]).then((docRef) => {
        // Record the id of the question itself
        longQuestionIds.push(docRef.id);

        // Log it in the console
        let questionNumber = "4.3";
        recordLongQuestionPush(questionNumber, docRef);

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Questions 4.3 a to d (4 questions in total)
        for (let i = 1; i < 5; i++) {
            appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_4_3[i],
                1, 5, false,
                SUB_QUESTIONS_HINTS_4_3[i]);
        }
    });

    // Question 4.4
    pushLongText("4.4", PART4[4], HINTS_PART4[4]);

    // Question 4.5
    pushLongQuestion("4.5", PART4[5]).then((docRef) => {
        // Record the id of the question itself
        longQuestionIds.push(docRef.id);

        // Log it in the console
        let questionNumber = "4.5";
        recordLongQuestionPush(questionNumber, docRef);

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Questions 4.5 a to m (13 questions in total)
        for (let i = 1; i < 14; i++) {
            appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_4_5[i],
                1, 5, false,
                SUB_QUESTIONS_HINTS_4_5[i]);
        }
    });
}

function pushPart5Questions() {
    // Set part index to 5 and reset
    // the question counter
    setPartNumber(5);

    // Question 5.1
    pushLongText("5.1", PART5[1], HINTS_PART5[1]);

    // Question 5.2
    pushLongText("5.2", PART5[2], HINTS_PART5[2]);

    // Question 5.3
    pushLongText("5.3", PART5[3], HINTS_PART5[3]);

    // Question 5.4
    pushLongText("5.4", PART5[4], HINTS_PART5[4]);
}

function pushNumeric(questionNumber, questionText, lowerRange, upperRange, skipIfInvalid, hint) {
    // Leaving this here as a reference to numeric
    // question objects.
    let reference = {
        question_number: "1.1",
        category: "Part I: About yourself",
        type: "numeric",
        question: "What is your age in years? (enter a number)",
        restrictions: {
            lowerRange: 50,
            upperRange: 100,
            skipIfInvalid: true
        },
        hint: "placeholder"
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_NUMERIC,
        question: questionText,
        restrictions: {
            lowerRange: lowerRange,
            upperRange: upperRange,
            skipIfInvalid: skipIfInvalid
        },
        hint: hint
    };

    // Increment the question number
    questionNumber++;

    // Record the IDs
    pushQuestionObject(questionObject)
        .then((docRef) => recordQuestionPush(questionObject, docRef));
}

function pushMultipleChoice(questionNumber, questionText, choices, skipChoices, skipTarget, hint) {
    // Leaving these here as references to multiple choice
    // question objects.
    let reference = {
        question_number: "1.2",
        category: "Part I: About yourself",
        type: "multiple-choice",
        question: "What is your gender?",
        restrictions: {
            choices: ["Male", "Female"],
            skipChoice: ["Male"],
            skipTarget: "end_survey"
        },
        hint: "placeholder"
    };

    let reference2 = {
        question_number: "1.3",
        category: "Part I: About yourself",
        type: "multiple-choice",
        question: "What is your ethnic group?",
        restrictions: {
            choices: ["Malay", "Chinese", "Indian", "Thai", "Others"],
            skipChoices: [],
            skipTarget: "skip_not_allowed"
        },
        hint: "placeholder"
    };

    let reference3 = {
        question_number: "1.14a",
        category: "Part I: About yourself",
        type: "multiple-choice",
        question: "Are you currently living with someone at home?",
        restrictions: {
            choices: ["Yes", "No"],
            skipChoices: "Yes",
            skipTarget: "insert 1.15 question id here"
        },
        hint: "placeholder"
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_MULTIPLE_CHOICE,
        question: questionText,
        restrictions: {
            choices: choices,
            skipChoices: skipChoices,
            skipTarget: skipTarget
        },
        hint: hint
    };

    // Increment the question number
    questionNumber++;

    // Record the IDs
    pushQuestionObject(questionObject)
        .then((docRef) => recordQuestionPush(questionObject, docRef));
}


function pushMultipleChoiceOthers(questionNumber, questionText, choices,
                                  skipChoices, skipTarget, hint) {
    // Leaving this here as a reference to multiple choice
    // question objects with an "Others" free text input
    let reference = {
        question_number: "2.1",
        category: "Part II: About your employment",
        type: "multiple-choice-others",
        question: "What is your current employment status?",
        restrictions: {
            choices: ["Working", "Retired", "Semi-retired", "Not working",
                "Not working but doing voluntary work",
                "Not working but looking for a job"],
            skipChoices: ["Retired", "Not working",
                "Not working but doing voluntary work",
                "Not working but looking for a job"],
            skipTarget: "insert 2.1 question id here"
        },
        hint: "placeholder"
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_MULTIPLE_CHOICE_OTHERS,
        question: questionText,
        restrictions: {
            choices: choices,
            skipChoices: skipChoices,
            skipTarget: skipTarget
        },
        hint: hint
    };

    // Increment the question number
    questionNumber++;

    // Record the IDs
    pushQuestionObject(questionObject)
        .then((docRef) => recordQuestionPush(questionObject, docRef));
}

function pushShortText(questionNumber, questionText, hint) {
    // Leaving this here as a reference to short text
    // question objects.
    let reference = {
        question_number: "2.2",
        category: "Part II: About your employment",
        type: "short-text",
        question: "What is your current job/ occupation/ profession?",
        restrictions: {},
        hint: "placeholder"
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_SHORT_TEXT,
        question: questionText,
        restrictions: {},
        hint: hint
    };

    // Increment the question number
    questionNumber++;

    // Record the IDs
    pushQuestionObject(questionObject)
        .then((docRef) => recordQuestionPush(questionObject, docRef));
}

function pushLongText(questionNumber, questionText, hint) {
    // Leaving this here as a reference to long text
    // question objects.
    let reference = {
        question_number: "5.1",
        category: "Part V: About your learning engagement",
        type: "long-text",
        question: "Why are you interested in learning using a mobile phone?",
        restrictions: {},
        hint: "placeholder"
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_LONG_TEXT,
        question: questionText,
        restrictions: {},
        hint: hint
    };

    // Increment the question number
    questionNumber++;

    // Record the IDs
    pushQuestionObject(questionObject)
        .then((docRef) => recordQuestionPush(questionObject, docRef));
}

function pushLongQuestion(questionNumber, questionText) {
    // Leaving this here as a reference to long questions
    // (questions with sub-questions)
    let reference = {
        question_number: "4.3",
        category: "Part IV: About your learning interest",
        type: "long-question",
        question: "How interested are you to learn the following skills" +
            "using a mobile phone ? (Rate from 1 to 7)" +
            "[1] extremely not interested, [2] very not interested, " +
            "[3] not interested," +
            "[4] moderately interested, [5] highly interested, " +
            "[6] very interested," +
            "[7] extremely interested",
        restrictions: {},
        hint: "placeholder",
        arrangement: []
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_LONG_QUESTION,
        question: questionText,
        restrictions: {},
        hint: {},
        arrangement: []
    };

    // Increment the question number
    questionNumber++;

    return pushQuestionObject(questionObject);
}

function appendNumeric(questionNumber, longQuestionId, questionText,
                       lowerRange, upperRange, skipIfInvalid, hint) {
    // Leaving this here as a reference to numeric
    // question objects.
    let reference = {
        question_number: "3.2b",
        category: "Part III: About your mobile phone usage",
        type: "numeric-sub-question",
        question: "SMS, text messaging (such as Whatsapp, WeChat, etc.)",
        restrictions: {
            lowerRange: 1,
            upperRange: 5,
            skipIfInvalid: false
        },
        hint: "placeholder",
        longQuestionId: longQuestionId
    };

    let questionObject = {
        question_number: getLongQuestionNumber(questionNumber),
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_NUMERIC_SUB_QUESTION,
        question: questionText,
        restrictions: {
            lowerRange: lowerRange,
            upperRange: upperRange,
            skipIfInvalid: skipIfInvalid
        },
        hint: hint,
        longQuestionId: longQuestionId
    };

    // Increment the alphabetIndex (the alphabetic numericals of sub-questions)
    alphabetIndex++;

    pushQuestionObject(questionObject)
        .then((docRef) => {
            recordSubQuestionPush(longQuestionId, questionObject, docRef)
        });
}

function appendMultipleChoice(questionNumber, longQuestionId,
                              questionText, choices, skipChoices, skipTarget,
                              hint) {
    // Leaving this here as a reference to multiple choice
    // question objects.
    let reference = {
        question_number: "1.2",
        category: "Part I: About yourself",
        type: "multiple-choice-sub-question",
        question: "What is your gender?",
        restrictions: {
            choices: ["Male", "Female"],
            skipChoice: ["Male"],
            skipTarget: "end_survey"
        },
        hint: "placeholder",
        longQuestionId: longQuestionId
    };

    let questionObject = {
        question_number: getLongQuestionNumber(questionNumber),
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_MULTIPLE_CHOICE_SUB_QUESTION,
        question: questionText,
        restrictions: {
            choices: choices,
            skipChoices: skipChoices,
            skipTarget: skipTarget
        },
        hint: hint,
        longQuestionId: longQuestionId
    };

    // Increment the alphabetIndex (the alphabetic numericals of sub-questions)
    alphabetIndex++;

    pushQuestionObject(questionObject)
        .then((docRef) => {
            recordSubQuestionPush(longQuestionId, questionObject, docRef)
        });
}

function pushQuestionObject(questionObject) {
    return firebase.firestore().collection(QUESTIONS_BRANCHES[TH_INDEX]).add(questionObject);
}

let partNumber = 0;
let questionNumber = 0;
let alphabetIndex = 0;

// A list of question IDs of the current survey part
let questionIds = [];

// A sequence of IDs of long questions, will come in handy
// when we need to append the IDs of sub-questions to them.
let longQuestionIds = [];

// A dictionary for storing IDs of sub-questions where the key
// is the question ID of its associated long question
let subQuestionIds = {};

function recordQuestionPush(questionObject, docRef) {
    // Save the question ID
    questionIds.push(docRef.id);

    if (questionObject.question_number === "2.3") {
        question_2_3_id = docRef.id;
    } else if (questionObject.question_number === "2.1") {
        question_2_1_id = docRef.id;
    }

    // Print some logs, maybe even display the questions via HTML
    console.log(
        `Question ${questionObject.question_number} pushed with ID ${docRef.id}`
    );
}

function recordLongQuestionPush(questionNumber, docRef) {
    // Save the question ID
    questionIds.push(docRef.id);

    // Print some logs, maybe even display the questions via HTML
    console.log(
        `Question ${questionNumber} pushed with ID ${docRef.id}`
    );
}

function setPartNumber(number) {
    partNumber = number;
    questionNumber = 1;
}

function recordSubQuestionPush(longQuestionId, questionObject, docRef) {
    // Record the ID of the current sub-question
    if (!(longQuestionId in subQuestionIds)) {
        // List does not exist in dictionary, make one
        // before pushing
        subQuestionIds[longQuestionId] = [];
    }
    subQuestionIds[longQuestionId].push(docRef.id);

    // Increment the alphabet index
    alphabetIndex++;

    // Print some logs, maybe even display the questions via HTML
    console.log(
        `Sub-question ${questionObject.question_number} pushed with ID ${docRef.id}`
    );
}

function initLongQuestionParams() {
    // Initialize the ASCII code to 97 for 'a'
    alphabetIndex = 97;
}

/**
 * Returns the alphabetic numeral of the current sub-question
 */
function getLongQuestionNumber(questionNumber) {
    let alphabet = String.fromCharCode(alphabetIndex);
    return `${questionNumber}${alphabet}`;
}

/**
 * Extracts the part number from a question number string.
 * @param questionNumber A question number string
 * (e.g. "1.14a" or "1.14")
 * @return {number} An integer representing the part number
 * (e.g. 1 if the question number is "1.14a")
 */
function getPartNumber(questionNumber) {
    return parseInt(questionNumber.split(".")[0]);
}

/**
 * "What the **** is up with this long function name?" - Probably you
 * <br>
 * "Hey, you only need to call it once, why fret?" - Probably me
 */
function updateLongQuestionsWithSubQuestionIds() {
    for (let longQuestionId of Object.getOwnPropertyNames(subQuestionIds)) {
        // For each long question, update its
        // arrangement attribute with a list
        // of IDs representing its sub-questions.

        let arrangement = subQuestionIds[longQuestionId];

        firebase.firestore().collection(QUESTIONS_BRANCHES[TH_INDEX]).doc(longQuestionId)
            .update({
                "arrangement": arrangement
            })
            .then(() => {
                let info = "Long question with id " +
                    longQuestionId +
                    "has been updated with subQuestionIds:";
                console.log(info);
                console.log(arrangement);
            });
    }
}

function uploadQuestions_thx() {
    pushPart1Questions();
    pushPart2Questions();
    pushPart3Questions();
    pushPart4Questions();
    pushPart5Questions();
}

/**
 * Call this manually AFTER uploadQuestions() has completely finished to
 * <br>
 * 1. Output the question IDs for each part and
 * <br>
 * 2. To update the long question objects with IDs of their sub-questions.
 */
function housekeeping_th() {
    updateLongQuestionsWithSubQuestionIds();

    let result = [];
    // Try to output the list of question Ids for each part
    // 14 questions for part 1
    // 7 questions for part 2
    // 2 questions for part 3
    // 5 questions for part 4
    // 4 questions for part 5

    // These are the indices where each survey part changes to the next one
    let startingIndex = 0;
    let indices = [14, 21, 23, 28, 32];

    // Before we start slicing, insert the last item (Q1.12)
    // to the correct spot (before Q1.13, or before index 11)
    // This is because Q1.12 is pushed last to firebase and we need to move it's ID from last to its corresponding place
    let lastItem = questionIds[questionIds.length - 1];
    questionIds.splice(11, 0, lastItem);

    for (let endingIndex of indices) {
        result.push(questionIds.slice(startingIndex, endingIndex));
        startingIndex = endingIndex;
    }

    // Print the parts and their question IDs onto the console (Copy and paste these IDs into constants.js)
    for (let i = 0; i < result.length; i++) {
        console.log(`Part ${i + 1} IDs:`);
        console.log(result[i]);
    }

    // Update question 2.1's skipTarget with 2.3's ID
    firebase.firestore().collection(QUESTIONS_BRANCHES[TH_INDEX]).doc(question_2_1_id)
        .update({
            "restrictions.skipTarget": question_2_3_id
        })
        .then(() => {
            let info = "Question 2.1 has been updated with Question 2.3 ID: " +
                question_2_3_id;
            console.log(info);
        });
}