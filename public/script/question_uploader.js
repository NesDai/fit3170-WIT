// Indicates the question type as numeric
const TYPE_NUMERIC = "numeric";

// Indicates the question type as multiple choice
const TYPE_MULTIPLE_CHOICE = "multiple-choice";

// Indicates a multiple choice question with an
// "Others" free text input
const TYPE_MULTIPLE_CHOICE_OTHERS = "multiple-choice-others";

// Indicates a question accepting short text inputs
const TYPE_SHORT_TEXT = "short-text";

// Indicates a question accepting long text inputs
const TYPE_LONG_TEXT = "long-text";

// Indicates a long question (a questions containing sub-questions)
const TYPE_LONG_QUESTION = "long-question";

// Represents a logical survey skip operation
// that ends the survey
const SKIP_END_SURVEY = "end_survey";

// Represents a skip logic that doesn't allow skips
const SKIP_NOT_ALLOWED = "skip_not_allowed";


// Contains title strings for the survey parts
const PART_TITLE = [
    "",
    // The above title is a placeholder to allow 1-indexing

    "Part 1: About yourself",
    "Part 2: About your employment",
    "Part 3: About your mobile phone usage",
    "Part 4: About your learning interest",
    "Part 4: About your learning engagement"
]

// The path for storing/retrieving questions from
// the Firebase Firestore Database
const QUESTIONS_BRANCH = "chatbot/survey_questions/questions/";

const SUB_QUESTIONS_1_14 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "living with someone at home?",
    "living alone at home?",
    "living with someone at aged care setting?",
    "living alone at aged care setting?"
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

const SUB_QUESTIONS_1_15 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Depending on others to meet my needs.",
    "Not being able to get medical treatment.",
    "Had no money to buy groceries.",
    "Not being able to pay at least one bill.",
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

const SUB_QUESTIONS_1_16 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "In most ways my life is closed to my ideal.",
    "The conditions of my life are excellent.",
    "I am satisfied with my life."
];

// TODO Fill in tooltips
const SUB_QUESTIONS_HINTS_1_16 = [
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

    "What is your age in years? (enter a number)",
    "What is your gender?",
    "What is your ethnic group?",
    "Where do you currently live?",
    "What is your average net household income per month?",
    "What is your completed highest education level?",
    "What is your marital status?",
    "How many children have you raised? (enter a number)",
    "How many do you talk or correspond with weekly? (enter a number)",
    "How many do you talk or correspond with monthly? (enter a number)",

    // The question above this line is question 1.10

    "How many do you correspond with several times a year? (enter a number)",
    "How many other relatives do you feel close to? (enter a number)",
    "How many close friends do you have? (enter a number)",
    "Are you currently...",

    // The question above this line is a long question (1.14)

    "In the past 6 months, have you experienced the following situations?",

    // The question above this line is a long question (1.15)

    "How satisfied are you with your current life now? (Rate from 1 to 5)\n" +
    "[1] Very dissatisfied, [2] dissatisfied, [3] moderately satisfied,\n" +
    "[5] satisfied, [6] very satisfied"

    // The question above this line is a long question (1.16)
];

// TODO Fill in tooltips
const HINTS_PART1 = [
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

    // The question above this line is question 1.10

    "placeholder",
    "placeholder",
    "placeholder",

    "placeholder",
    // The question above this line is a long question (1.14)

    "placeholder",
    // The question above this line is a long question (1.15)

    "placeholder"
    // The question above this line is a long question (1.16)
];

const PART2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "What is your current employment status?",
    "What is your current job/ occupation/ profession?",
    "How satisfied are you in your current employment status? (Rate from 1 to 7)\n" +
    "[1] completely dissatisfied, [2] very dissatisfied, [3] dissatisfied,\n" +
    "[4] moderately satisfied, [5] satisfied, [6] very satisfied," +
    " [7] extremely satisfied.",
    "Did you lose your job due to the COVID-19 pandemic?",
    "Did you lose your earning income due to the COVID-19 pandemic?",
    "How confident are you in finding a new job in the near future?",
    "How confident are you in being able to keep your current job in the near future?",
];

// TODO Fill in tooltips
const HINTS_PART2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
];

const SUB_QUESTIONS_3_2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "SMS, text messaging (such as Whatsapp, WeChat, etc.)",
    "Browsing/ surfing websites",
    "Watching videos",
    "Using Zoom, Facetime, Skype, Google Talk, etc.",
    "Using COVID-19 contact tracing app (such as MySejahtera)",
    // TODO Thailand will update the app name for the above question
    "Online shopping or e-commerce (such as Lazada, Shopee, etc.)",
    // TODO Thailand will update the relevant app name for the above question
    "Using mobile banking/ e-wallet (such as GrabPay, BoostPay, FavePay, Touch N" +
    "Go Pay, etc.)",
    // TODO Thailand will update the relevant app name for the above question
    // The question above this line is question 3.2g

    "Online ordering for food or groceries",
    "Using social network (such as Facebook, Instagram, Twitter, etc.)",
    "Taking a photo",
    "Mapping, navigator (such as Google Map, Waze, Tom-Tom, etc.)",
    "Managing my appointment on my calendar",
    "Reading online news or online magazines",
    "Taking notes (such as shopping lists or tasks) that I need to do",
    "Filming a video",
    "Using social network (such as Facebook, Instagram, Twitter, etc.)",
    // The question above this line is question 3.2p

    "Listening to music",
    "Playing games",
    "Using to contact government authorities",
];

// TODO Fill in tooltips
const SUB_QUESTIONS_HINTS_3_2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    // TODO Thailand will update the app name for the above question
    "placeholder",
    // TODO Thailand will update the relevant app name for the above question
    "placeholder",
    // TODO Thailand will update the relevant app name for the above question
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

    "How do you access the Internet using your mobile phone?",
    // The question above this line is question 3.1

    "How confident are you in using the following platforms? (Rate from 1 to 5)\n" +
    "[1] Not confident at all, [2] Somewhat not confident, [3] Moderately confident,\n" +
    "[4] Somewhat confident, [5] Extremely confident."
    // The question above this line is a long question (3.2)
];

// TODO Fill in tooltips
const HINTS_PART3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    // The question above this line is question 3.1

    "",
    // The question above this line is a long question (3.2)

];

const SUB_QUESTIONS_4_3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "ICT/ technology skills (such as how to use mobile phone or computer software",
    "Social communication skills (such as how to improve relationships or interact" +
    "with others)",
    "Complementary skills (such as learning non-work-related skills or hobbies)",
    "Work-related skills (such as how to increase job/ business productivity)"
];

// TODO Fill in tooltips
const SUB_QUESTIONS_HINTS_4_3 = [
    "",
    // The above question is a placeholder to allow 1-indexing
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
];

const PART4 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "How long have you been trying to learn something new or useful using a mobile\n" +
    "phone? (Rate from 1 to 7)\n" +
    "[1] Never, [2] Once a month, [3] Few times a month,\n" +
    "[4] Once a week, [5] Few times a week, [6] Once a day, [7] Many times a day",

    "How many hours per week do you devote to learning something new or useful" +
    "using a mobile phone? (enter a number)",
    // The question above this line is question 4.2

    "How interested are you to learn the following skills using a mobile phone?" +
    "(Rate from 1 to 7)\n" +
    "[1] extremely not interested, [2] very not interested, [3] not interested," +
    "[4] moderately interested, [5] highly interested, [6] very interested," +
    "[7] extremely interested",
    // The question above this line is a long question (4.3)

    "What do you wish to learn using a mobile phone?",
];

// TODO Fill in tooltips
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

    "What are you interested in learning using a mobile phone?",
    "What resources do you wish to have for learning using a mobile phone?",
    "What has been the most frustrating things so far about learning using a " +
    "mobile phone?",
    "Tell us about your problems or challenges faced at work."
]

// TODO Fill in tooltips
const HINTS_PART5 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
]

// TODO Weird questions: Last survey question & Question 4.5
// TODO 2.6 and 2.7 - Are these numeric questions or multiple-choice questions?


function pushPart1Questions() {
    // Set part index to 1 and reset
    // the question counter
    setPartNumber(1);

    // Question 1.1
    pushNumeric(PART1[1], 50, 200, true,
        HINTS_PART1[1]);

    // Question 1.2
    let choices_1_2 = ["Male", "Female"]
    let skip_choices_1_2 = ["Male"];
    pushMultipleChoice(PART1[2], choices_1_2, skip_choices_1_2,
        SKIP_END_SURVEY, HINTS_PART1[2]);

    // Question 1.3
    let choices_1_3 = ["Malay", "Chinese", "Indian", "Thai", "Others"];
    pushMultipleChoice(PART1[3], choices_1_3, [], SKIP_NOT_ALLOWED,
        HINTS_PART1[3]);

    // Question 1.4
    let choices_1_4 = ["urban area", "rural area"];
    pushMultipleChoice(PART1[4], choices_1_4, [], SKIP_NOT_ALLOWED,
        HINTS_PART1[4]);

    // Question 1.5
    let choices_1_5 = ["No income", "less than MYR2500", "MYR2501-3169",
        "MYR3170-3969", "MYR3970-4849", "MYR4850 or more"];
    pushMultipleChoice(PART1[5], choices_1_5, [], SKIP_NOT_ALLOWED,
        HINTS_PART1[5]);
    // TODO Thailand will update the THB equivalent currency

    // Question 1.6
    let choices_1_6 = ["No formal education", "Primary school",
        "Secondary/ high school", "Vocational/ technical certification",
        "University"];
    pushMultipleChoice(PART1[6], choices_1_6, [], SKIP_NOT_ALLOWED,
        HINTS_PART1[6]);
    // TODO Thailand will update the secondary/high classification

    // Question 1.7
    let choices_1_7 = ["Single", "Married", "Divorced", "Widowed",
        "Other relationship"];
    pushMultipleChoice(PART1[7], choices_1_7, [], SKIP_NOT_ALLOWED,
        HINTS_PART1[7]);

    // Question 1.8
    pushNumeric(PART1[8], 0, 999, false,
        HINTS_PART1[8]);

    // Question 1.9
    pushNumeric(PART1[9], 0, 999, false,
        HINTS_PART1[9]);

    // Question 1.10
    pushNumeric(PART1[10], 0, 999, false,
        HINTS_PART1[10]);

    // Question 1.11
    pushNumeric(PART1[11], 0, 999, false,
        HINTS_PART1[11]);

    // Question 1.12
    pushNumeric(PART1[12], 0, 999, false,
        HINTS_PART1[12]);

    // Question 1.13
    pushNumeric(PART1[13], 0, 999, false,
        HINTS_PART1[13]);

    // Question 1.14
    pushLongQuestion(PART1[14]).then((docRef) => {
        // Record the id of the question itself
        questionIds.push(docRef.id);

        // Log it in the console
        recordLongQuestionPush(14, docRef)

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Question 1.14a
        let choices_1_14 = ["Yes", "No"];
        let skip_choices_1_14 = ["Yes"];
        appendMultipleChoice(14, docRef.id, SUB_QUESTIONS_1_14[1],
            choices_1_14, skip_choices_1_14, "insert question 1.15 id here",
            SUB_QUESTIONS_HINTS_1_14[1]) // TODO

        // Question 1.14b
        appendMultipleChoice(14, docRef.id, SUB_QUESTIONS_1_14[2],
            choices_1_14, skip_choices_1_14, "insert question 1.15 id here",
            SUB_QUESTIONS_HINTS_1_14[2]);  // TODO

        // Question 1.14c
        appendMultipleChoice(14, docRef.id, SUB_QUESTIONS_1_14[3],
            choices_1_14, skip_choices_1_14, "insert question 1.15 id here",
            SUB_QUESTIONS_HINTS_1_14[3]);  // TODO

        // Question 1.14d
        appendMultipleChoice(14, docRef.id, SUB_QUESTIONS_1_14[4],
            choices_1_14, skip_choices_1_14, "insert question 1.15 id here",
            SUB_QUESTIONS_HINTS_1_14[4]);  // TODO
    });

    // Question 1.15
    pushLongQuestion(PART1[15]).then((docRef) => {
        // Record the id of the question itself
        questionIds.push(docRef.id);

        // Log it in the console
        recordLongQuestionPush(15, docRef)

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Question 1.15a
        let choices_1_15 = ["Yes", "No"];
        appendMultipleChoice(15, docRef.id, SUB_QUESTIONS_1_15[1],
            choices_1_15, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_15[1]);

        // Question 1.15b
        appendMultipleChoice(15, docRef.id, SUB_QUESTIONS_1_15[2],
            choices_1_15, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_15[2]);

        // Question 1.15c
        appendMultipleChoice(15, docRef.id, SUB_QUESTIONS_1_15[3],
            choices_1_15, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_15[3]);

        // Question 1.15d
        appendMultipleChoice(15, docRef.id, SUB_QUESTIONS_1_15[4],
            choices_1_15, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_15[4]);
    });

    // Question 1.16
    pushLongQuestion(PART1[16]).then((docRef) => {
        // Record the id of the question itself
        questionIds.push(docRef.id);

        // Log it in the console
        recordLongQuestionPush(16, docRef)

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Question 1.16a
        appendNumeric(16, docRef.id, SUB_QUESTIONS_1_16[1],
            1, 5, false, SUB_QUESTIONS_HINTS_1_16[1]);

        // Question 1.16b
        appendNumeric(16, docRef.id, SUB_QUESTIONS_1_16[2],
            1, 5, false, SUB_QUESTIONS_HINTS_1_16[2]);

        // Question 1.16c
        appendNumeric(16, docRef.id, SUB_QUESTIONS_1_16[3],
            1, 5, false, SUB_QUESTIONS_HINTS_1_16[3]);
    });
}

function pushPart2Questions() {
    // Set part index to 2 and reset
    // the question counter
    setPartNumber(2);

    // Question 2.1
    let choices_2_1 = ["Working", "Retired", "Semi-retired", "Not working",
        "Not working but doing voluntary work", "Not working but looking for a" +
        "job"];
    let skip_choices_2_1 = ["Retired", "Not working",
        "Not working but doing voluntary work",
        "Not working but looking for a job"];
    pushMultipleChoiceOthers(PART2[1], choices_2_1,
        skip_choices_2_1,
        "insert question 2.3 id here", // TODO
        HINTS_PART2[1]);

    // Question 2.2
    pushShortText(PART2[2], HINTS_PART2[2]);

    // Question 2.3
    pushNumeric(PART2[3], 1, 7, false,
        HINTS_PART2[3]);

    // Question 2.4
    let choices_2_4 = ["Yes", "No", "Not applicable"];
    pushMultipleChoice(PART2[4], choices_2_4, [],
        SKIP_NOT_ALLOWED, HINTS_PART2[4]);

    // Question 2.5
    let choices_2_5 = ["Yes", "No", "Not applicable"];
    pushMultipleChoice(PART2[5], choices_2_5, [],
        SKIP_NOT_ALLOWED, HINTS_PART2[5]);

    // TODO 2.6 and 2.7 - Are these numeric questions or multiple-choice questions?

    // Question 2.6
    let choices_2_6 = ["Not confident at all", "Somewhat not confident",
        "Moderately confident", "Somewhat confident", "Extremely confident",
        "Not applicable"];
    pushMultipleChoice(PART2[6], choices_2_6, [],
        SKIP_NOT_ALLOWED, HINTS_PART2[6]);

    // Question 2.7
    let choices_2_7 = ["Not confident at all", "Somewhat not confident",
        "Moderately confident", "Somewhat confident", "Extremely confident",
        "Not applicable"];
    pushMultipleChoice(PART2[7], choices_2_7, [],
        SKIP_NOT_ALLOWED, HINTS_PART2[7]);
}

function pushPart3Questions() {
    // Set part index to 3 and reset
    // the question counter
    setPartNumber(3);

    // Question 3.1
    let choices_3_1 = [
        "prepaid mobile data plan",
        "postpaid mobile data plan",
        "home WiFi broadband plan",
        "public WiFi hotspot",
        "I don't have access to Internet"
    ];
    pushMultipleChoice(PART3[1], choices_3_1, [],
        SKIP_NOT_ALLOWED, HINTS_PART3[1]);

    // Question 1.16
    pushLongQuestion(PART3[2]).then((docRef) => {
        // Record the id of the question itself
        questionIds.push(docRef.id);

        // Log it in the console
        recordLongQuestionPush(2, docRef)

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Questions 3.2 a to s (19 questions in total)
        for (let i = 1; i < 20; i++) {
            appendNumeric(2, docRef.id, SUB_QUESTIONS_3_2[i],
                1, 5, false,
                SUB_QUESTIONS_HINTS_3_2[i]);
        }
    });
}

function pushPart4Questions() {
    // Set part index to 4 and reset
    // the question counter
    setPartNumber(4);

    // Question 4.1
    pushNumeric(PART4[1], 1, 7, false,
        HINTS_PART4[1]);

    // Question 4.2
    pushNumeric(PART4[2], 0, 168, false,
        HINTS_PART4[2]);

    // Question 4.3
    pushLongQuestion(PART4[3]).then((docRef) => {
        // Record the id of the question itself
        questionIds.push(docRef.id);

        // Log it in the console
        recordLongQuestionPush(3, docRef)

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Questions 4.3 a to d (4 questions in total)
        for (let i = 1; i < 5; i++) {
            appendNumeric(4, docRef.id, SUB_QUESTIONS_4_3[i],
                1, 7, false,
                SUB_QUESTIONS_HINTS_4_3[i]);
        }
    });

    // Question 4.4
    pushShortText(PART4[4], HINTS_PART4[4]);

    // Question 4.5
    // TODO Weird questions: Last survey question & Question 4.5
}

function pushPart5Questions() {
    // Set part index to 5 and reset
    // the question counter
    setPartNumber(5);

    // Question 5.1
    pushLongText(PART5[1], HINTS_PART5[1]);

    // Question 5.2
    pushLongText(PART5[2], HINTS_PART5[2]);

    // Question 5.3
    pushLongText(PART5[3], HINTS_PART5[3]);

    // Question 5.4
    pushLongText(PART5[4], HINTS_PART5[4]);
}

function pushNumeric(questionText, lowerRange, upperRange, skipIfInvalid,
                     hint) {
    // Leaving this here as a reference to numeric
    // question objects.
    let reference = {
        question_number: "1.1",
        category: "Part I: About yourself",
        type: "numeric",
        question: "What is your age in years? (enter a number)",
        restrictions: {
            lowerRange: 50,
            upperRange: 200,
            skipIfInvalid: true
        },
        hint: "placeholder"
    };

    let questionObject = {
        question_number: `${partNumber}.${questionNumber}`,
        category: PART_TITLE[partNumber],
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

function pushMultipleChoice(questionText, choices, skipChoices, skipTarget,
                            hint) {
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
            //TODO
            skipTarget: "insert 1.15 question id here"
        },
        hint: "placeholder"
    };

    let questionObject = {
        question_number:`${partNumber}.${questionNumber}`,
        category: PART_TITLE[partNumber],
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


function pushMultipleChoiceOthers(questionText, choices, skipChoices, skipTarget,
                                  hint) {
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
            //TODO
            skipTarget: "insert 2.1 question id here"
        },
        hint: "placeholder"
    };

    let questionObject = {
        question_number:`${partNumber}.${questionNumber}`,
        category: PART_TITLE[partNumber],
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

function pushShortText(questionText, hint) {
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
        question_number:`${partNumber}.${questionNumber}`,
        category: PART_TITLE[partNumber],
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

function pushLongText(questionText, hint) {
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
        question_number:`${partNumber}.${questionNumber}`,
        category: PART_TITLE[partNumber],
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

function pushLongQuestion(questionText) {
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
        hint: "placeholder"
    };

    let questionObject = {
        question_number:`${partNumber}.${questionNumber}`,
        category: PART_TITLE[partNumber],
        type: TYPE_LONG_QUESTION,
        question: questionText,
        restrictions: {},
        hint: {}
    };

    // Increment the question number
    questionNumber++;

    return pushQuestionObject(questionObject);
}

function appendNumeric(questionNumber, longQuestionId, questionText, lowerRange,
                       upperRange, skipIfInvalid, hint) {
    // Leaving this here as a reference to numeric
    // question objects.
    let reference = {
        question_number: "3.2b",
        category: "Part III: About your mobile phone usage",
        type: "numeric",
        question: "SMS, text messaging (such as Whatsapp, WeChat, etc.)",
        restrictions: {
            lowerRange: 1,
            upperRange: 5,
            skipIfInvalid: false
        },
        hint: "placeholder"
    };

    let questionObject = {
        question_number: getLongQuestionNumber(questionNumber),
        category: PART_TITLE[partNumber],
        type: TYPE_NUMERIC,
        question: questionText,
        restrictions: {
            lowerRange: lowerRange,
            upperRange: upperRange,
            skipIfInvalid: skipIfInvalid
        },
        hint: hint
    };

    // Increment the alphabetIndex (the alphabetic numericals of sub-questions)
    alphabetIndex++;

    pushQuestionObject(questionObject)
        .then((docRef) => recordSubQuestionPush(questionObject, docRef));
}

function appendMultipleChoice(questionNumber, longQuestionId, questionText, choices, skipChoices,
                              skipTarget, hint) {
    // Leaving this here as a reference to multiple choice
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

    let questionObject = {
        question_number: getLongQuestionNumber(questionNumber),
        category: PART_TITLE[partNumber],
        type: TYPE_MULTIPLE_CHOICE,
        question: questionText,
        restrictions: {
            choices: choices,
            skipChoices: skipChoices,
            skipTarget: skipTarget
        },
        hint: hint
    };

    // Increment the alphabetIndex (the alphabetic numericals of sub-questions)
    alphabetIndex++;

    pushQuestionObject(questionObject)
        .then((docRef) => recordSubQuestionPush(questionObject, docRef));
}

function pushQuestionObject(questionObject) {
    return firebase.firestore().collection(QUESTIONS_BRANCH).add(questionObject);
}

let partNumber = 0;
let questionNumber = 0;
let alphabetIndex = 0;

// A list of question IDs of the current survey part
let questionIds = [];

// A list of question IDs for sub-questions within the current long question
let subQuestionIds = [];

function recordQuestionPush(questionObject, docRef) {
    // Print some logs, maybe even display the questions via HTML
    console.log(
        `Question ${questionObject.question_number} pushed with ID ${docRef.id}`
    );
}

function recordLongQuestionPush(questionNumber, docRef) {
    // Print some logs, maybe even display the questions via HTML
    console.log(
        `Question ${partNumber}.${questionNumber} pushed with ID ${docRef.id}`
    );
}

function setPartNumber(number) {
    partNumber = number;
    questionNumber = 1;
}

function recordSubQuestionPush(questionObject, docRef) {
    // Record the ID of the current sub-question
    subQuestionIds.push(docRef.id);

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
    return `${partNumber}.${questionNumber}${alphabet}`;
}

function uploadQuestions() {
    pushPart1Questions();
    pushPart2Questions();
    pushPart3Questions();
    pushPart4Questions();
    pushPart5Questions();
}