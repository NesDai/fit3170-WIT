let sub_questions_1_14 = [
    "living with someone at home?",
    "living alone at home?",
    "living with someone at aged care setting?",
    "living alone at aged care setting?"
];

let sub_questions_1_15 = [
    "Depending on others to meet my needs.",
    "Not being able to get medical treatment.",
    "Had no money to buy groceries.",
    "Not being able to pay at least one bill.",
];

let sub_questions_1_16 = [
    "In most ways my life is closed to my ideal.",
    "The conditions of my life are excellent.",
    "I am satisfied with my life."
]

let part1 = [
    "",
    // TODO The above question is a placeholder to allow 1-indexing

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
    "In the past 6 months, have you experienced the following situations?",

    "How satisfied are you with your current life now? (Rate from 1 to 5)\n" +
    "[1] Very dissatisfied, [2] dissatisfied, [3] moderately satisfied,\n" +
    "[5] satisfied, [6] very satisfied"
]

let part2 = [
    "",
    // TODO The above question is a placeholder to allow 1-indexing

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
]

let sub_questions_3_2 = [
    "SMS, text messaging (such as Whatsapp, WeChat, etc.)",
    "Browsing/ surfing websites",
    "Watching videos",
    "Using Zoom, Facetime, Skype, Google Talk, etc.",
    "Using COVID-19 contact tracing app (such as MySejahtera)",
    // TODO Thailand will update the app name for the above question
    "Online shopping or e-commerce (such as Lazada, Shopee, etc.)",
    // TODO Thailand will update the relevant app name for the above question
    "Using mobile banking/ e-wallet (such as GrabPay, BoostPay, FavePay, Touch N" +
    // TODO Thailand will update the relevant app name for the above question
    "Go Pay, etc.)",
    "Online ordering for food or groceries",
    "Using social network (such as Facebook, Instagram, Twitter, etc.)",
    "Taking a photo",
    "Mapping, navigator (such as Google Map, Waze, Tom-Tom, etc.)",
    "Managing my appointment on my calendar",
    "Reading online news or online magazines",
    "Taking notes (such as shopping lists or tasks) that I need to do",
    "Filming a video",
    "Using social network (such as Facebook, Instagram, Twitter, etc.)",
    "Listening to music",
    "Playing games",
    "Using to contact government authorities",
]

let part3 = [
    "",
    // TODO The above question is a placeholder to allow 1-indexing

    "How do you access the Internet using your mobile phone?",
    "How confident are you in using the following platforms? (Rate from 1 to 5)\n" +
    "[1] Not confident at all, [2] Somewhat not confident, [3] Moderately confident,\n" +
    "[4] Somewhat confident, [5] Extremely confident."
]

let sub_questions_4_3 = [
    "ICT/ technology skills (such as how to use mobile phone or computer software",
    "Social communication skills (such as how to improve relationships or interact" +
    "with others)",
    "Complementary skills (such as learning non-work-related skills or hobbies)" +
    "Work-related skills (such as how to increase job/ business productivity)"
]

let part4 = [
    "",
    // TODO The above question is a placeholder to allow 1-indexing

    "How long have you been trying to learn something new or useful using a mobile\n" +
    "phone? (Rate from 1 to 7)\n" +
    "[1] Never, [2] Once a month, [3] Few times a month,\n" +
    "[4] Once a week, [5] Few times a week, [6] Once a day, [7] Many times a day",
    "How many hours per week do you devote to learning something new or useful" +
    "using a mobile phone? (enter a number)",
    "How interested are you to learn the following skills using a mobile phone?" +
    "(Rate from 1 to 7)\n" +
    "[1] extremely not interested, [2] very not interested, [3] not interested," +
    "[4] moderately interested, [5] highly interested, [6] very interested," +
    "[7] extremely interested",
    "What do you wish to learn using a mobile phone?",
]

let part5 = [
    "",
    // TODO The above question is a placeholder to allow 1-indexing

    "What are you interested in learning using a mobile phone?",
    "What resources do you wish to have for learning using a mobile phone?",
    "What has been the most frustrating things so far about learning using a " +
    "mobile phone?",
    "Tell us about your problems or challenges faced at work."
]


let questionObject = {
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
}

let questionObject2 = {
    question_number: "1.2",
    category: "Part I: About yourself",
    type: "multiple-choice",
    question: "What is your gender?",
    restrictions: {
        choices: ["Male", "Female"],
        skipChoice: "Male",
        skipTarget: "end_survey"
    },
    hint: "placeholder"
}

let questionObject3 = {
    question_number: "1.3",
    category: "Part I: About yourself",
    type: "multiple-choice",
    question: "What is your ethnic group?",
    restrictions: {
        choices: ["Malay", "Chinese", "Indian", "Thai", "Others"],
        skipChoice: null,
        skipTarget: null
    },
    hint: "placeholder"
}

let questionObject14 = {
    question_number: "1.14a",
    category: "Part I: About yourself",
    type: "multiple-choice",
    question: "Are you currently living with someone at home?",
    restrictions: {
        choices: ["Yes", "No"],
        skipChoice: "Yes",
        //TODO
        skipTarget: "insert 1.15 question id here"
    },
    hint: "placeholder"
}

let question_2_1 = {
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
}

let question_2_2 = {
    question_number: "2.2",
    category: "Part II: About your employment",
    type: "short-text",
    question: "What is your current job/ occupation/ profession?",
    restrictions: null,
    hint: "placeholder"
}

let question_5_1 = {
    question_number: "5.1",
    category: "Part V: About your learning engagement",
    type: "long-text",
    question: "Why are you interested in learning using a mobile phone?",
    restrictions: null,
    hint: "placeholder"
}

// TODO Weird questions: Last survey question & Question 4.5
// TODO 2.6 and 2.7 - Are these numeric questions or multiple-choice questions?


function pushPart1Questions() {
    // Question 1.1
    let hint_1_1 = "placeholder";
    // TODO
    pushNumeric(part1[1], 50, 200, true,
        hint_1_1);

    // Question 1.2
    let choices_1_2 = ["Male", "Female"]
    let hint_1_2 = "placeholder";
    // TODO
    pushMultipleChoice(part1[2], choices_1_2, "Male",
        "end_survey", hint_1_2);

    // Question 1.3
    let choices_1_3 = ["Malay", "Chinese", "Indian", "Thai", "Others"];
    let hint_1_3 = "placeholder";
    // TODO
    pushMultipleChoice(part1[3], choices_1_3, null, null,
        hint_1_3);

    // Question 1.4
    let choices_1_4 = ["urban area", "rural area"];
    let hint_1_4 = "placeholder";
    // TODO
    pushMultipleChoice(part1[4], choices_1_4, null, null,
        hint_1_4);

    // Question 1.5
    let choices_1_5 = ["No income", "less than MYR2500", "MYR2501-3169",
        "MYR3170-3969", "MYR3970-4849", "MYR4850 or more"];
    let hint_1_5 = "placeholder";
    // TODO
    pushMultipleChoice(part1[5], choices_1_5, null, null,
        hint_1_5);
    // TODO Thailand will update the THB equivalent currency

    // Question 1.6
    let choices_1_6 = ["No formal education", "Primary school",
        "Secondary/ high school", "Vocational/ technical certification",
        "University"];
    let hint_1_6 = "placeholder";
    // TODO
    pushMultipleChoice(part1[6], choices_1_6, null, null,
        hint_1_6);
    // TODO Thailand will update the secondary/high classification

    // Question 1.7
    let choices_1_7 = ["Single", "Married", "Divorced", "Widowed",
        "Other relationship"];
    let hint_1_7 = "placeholder";
    // TODO
    pushMultipleChoice(part1[7], choices_1_7, null, null,
        hint_1_7);

    // Question 1.8
    let hint_1_8 = "placeholder";
    // TODO
    pushNumeric(part1[8], 0, 999, hint_1_8);
    // TODO What's the right upper bound for the number of children
    //  raised? :thinking:

    // Question 1.9
    let hint_1_9 = "placeholder";
    // TODO
    pushNumeric(part1[9], 0, 999, hint_1_9);

    // Question 1.10
    let hint_1_10 = "placeholder";
    // TODO
    pushNumeric(part1[10], 0, 999, hint_1_10);

    // Question 1.11
    let hint_1_11 = "placeholder";
    // TODO
    pushNumeric(part1[11], 0, 999, hint_1_11);

    // Question 1.12
    let hint_1_12 = "placeholder";
    // TODO
    pushNumeric(part1[12], 0, 999, hint_1_12);

    // Question 1.13
    let hint_1_13 = "placeholder";
    // TODO
    pushNumeric(part1[13], 0, 999, hint_1_13);

    // Question 1.14 // TODO subquestion 1.14 to 1.16
    let hint_1_14 = "placeholder";
    // TODO
    pushNumeric(part1[14], 0, 999, hint_1_14);

}

function pushPart2Questions() {
    // Question 2.1
    let choices_2_1 = ["Working", "Retired", "Semi-retired", "Not working",
        "Not working but doing voluntary work", "Not working but looking for a" +
        "job"];
    let hint_2_1 = "placeholder";
    // TODO
    pushMultipleChoiceOthers(part2[1], choices_2_1,
        ["Retired", "Not working",
            "Not working but doing voluntary work",
            "Not working but looking for a job"],
        "insert question 2.3 id here", // TODO
        hint_2_1);

    // Question 2.2
    let hint_2_2 = "placeholder";
    // TODO
    pushShortText(part2[2], hint_2_2);

    // Question 2.3
    let hint_2_3 = "placeholder";
    // TODO
    pushNumeric(part2[3], 1, 7, false,
        hint_2_3);

    // Question 2.4
    let choices_2_4 = ["Yes", "No", "Not applicable"];
    let hint_2_4 = "placeholder";
    // TODO
    pushMultipleChoice(part2[4], choices_2_4, null,
        null, hint_2_4);

    // Question 2.4
    let choices_2_5 = ["Yes", "No", "Not applicable"];
    let hint_2_5 = "placeholder";
    // TODO
    pushMultipleChoice(part2[4], choices_2_5, null,
        null, hint_2_5);

    // TODO 2.6 and 2.7 - Are these numeric questions or multiple-choice questions?
}

function pushPart3Questions() {
    // Question 3.1
    let choices_3_1 = [
        "prepaid mobile data plan",
        "postpaid mobile data plan",
        "home WiFi broadband plan",
        "public WiFi broadband plan",
        "public WiFi hotspot",
        "I don't have access to Internet"
    ];
    let hint_3_1 = "placeholder";
    // TODO
    pushMultipleChoice(part3[1], choices_3_1, null,
        null, hint_3_1);

    // TODO Q3.2 subquestions
}

function pushPart4Questions() {
    // Question 4.1
    let hint_4_1 = "placeholder";
    // TODO
    pushNumeric(part4[1], 1, 7, false,
        hint_4_1);

    // Question 4.2
    let hint_4_2 = "placeholder";
    // TODO
    pushNumeric(part4[2],0, 168, hint_4_2);

    // TODO 4.3 subq

    // Question 4.4
    let hint_4_4 = "placeholder";
    // TODO
    pushShortText(part4[4], hint_4_4);

    // TODO Weird questions: Last survey question & Question 4.5
}

function pushPart5Questions() {
    // Question 5.1
    let hint_5_1 = "placeholder";
    // TODO
    pushLongText(part5[1], hint_5_1);

    // Question 5.2
    let hint_5_2 = "placeholder";
    // TODO
    pushLongText(part5[2], hint_5_2);

    // Question 5.3
    let hint_5_3 = "placeholder";
    // TODO
    pushLongText(part5[3], hint_5_3);

    // Question 5.4
    let hint_5_4 = "placeholder";
    // TODO
    pushLongText(part5[4], hint_5_4);
}

function pushNumeric(questionText, lowerRange, upperRange, skipIfInvalid,
                     hint) {

}

function pushMultipleChoice(questionText, choices, skipChoice, skipTarget,
                            hint) {

}

function pushMultipleChoiceOthers(questionText, choices, skipChoice, skipTarget,
                                  hint) {

}

function pushShortText(questionText, hint) {

}

function pushLongText(questionText, hint) {

}

function pushLongQuestion() {

}