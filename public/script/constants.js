/**
 * This file is used to store constants that are used throughout
 * the application.
 *
 * @author Yong Peng (ychi0014@student.monash.edu)
 */

// Indicates the question type as numeric
const TYPE_NUMERIC = "numeric";

// Indicates a numeric sub-question
const TYPE_NUMERIC_SUB_QUESTION = "numeric";

// Indicates the question type as multiple choice
const TYPE_MULTIPLE_CHOICE = "multiple-choice";

// Indicates a multiple choice question with an
// "Others" free text input
const TYPE_MULTIPLE_CHOICE_OTHERS = "multiple-choice-others";

// Indicates a multiple choice sub-question with an
// "Others" free text input
const TYPE_MULTIPLE_CHOICE_SUB_QUESTION = "multiple-choice-sub-question";

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

// The paths for storing/retrieving questions from
// the Firebase Firestore Database
const QUESTIONS_BRANCH = "chatbot/survey_questions/questions/";
const QUESTIONS_BRANCHES = [
    "chatbot/survey_questions/questions_en/",
    "chatbot/survey_questions/questions_zh_CN/",
    "chatbot/survey_questions/questions_ms/",
    "chatbot/survey_questions/questions_th/"
]; // english, chinese, malay, thai

// Index for access of each language branches
const EN_INDEX = 0;
const ZH_CN_INDEX = 1;
const MS_INDEX = 2;
const TH_INDEX = 3;

// The time it takes for the chat bot to output
// a chat bubble (in milliseconds)
const MESSAGE_OUTPUT_DELAY = 2000;

// The maximum number of characters for short
// text question responses
const SHORT_TEXT_LENGTH = 50;

// list of Questions IDs for each language translation
const QUESTION_IDS_EN = [
    // Part 1
    "qDMHLhnu6pImKdkVQO7D",
    "cCg2eg7NxIvgkzCfa63m",
    "BGqrzs7vL9WXGrDTEM7e",
    "Qe7xiNSf9xqP8dG2caZI",
    "GwBUWDR7QUJBCyC5wNrN",
    "sNl7unEqhn5jOElINsUL",
    "1iZGPmYgr9ainI8u8Q62",
    "LnSlALwsEnLaudnEMTlk",
    "AInZGyydxeE4zq4IMhqU",
    "N0O2CE9Ymlj45caDl197",
    "EyVEofFe6YATuzUUhmSC",
    "84YkNiQTHJavecX7TAjV",
    "sHl2iekFpHcq2uLbJT0f",
    "A1JIraLx9lEzYq3oeq9e",

    // Part 2
    "IHbTJWAMN5lcXANEjw8k",
    "KOnddW0eTZ5C9G5YLkXc",
    "DGRVRhkEYM4qgFBa7vlH",
    "FZ283N4kvPyRwZL7BCY1",
    "MSlFRZhKW4FXerNRRC7s",
    "MuyHooXnEcvXwHjeOtPU",
    "OBlcxTj2JM2LqNSXLJIa",

    // Part 3
    "y89pVLzhUSNNVrG1bouv",
    "H5EsMRRNoL8FvZuSQAge",

    // Part 4
    "yJN6ezSj0rpAsI4doyyW",
    "srpDEz6WFTU4uveEflfZ",
    "pZB4qdPSA4xGxdx3VKZG",
    "0FFUKtyhKJppJEIFRhmu",
    "gALSEDLYx37u32JxzxaB",

    // Part 5
    "DR3KV0oWqzoOGD3uunet",
    "w7LLq4ArCY0uHTxkdIbB",
    "X0vMj5AdXnWl7dBuPRL3",
    "vbx05KqF1yIRnXkMWRqu"
];

const QUESTION_IDS_ZH_CN = [
    // Part 1
    "Sucb0OKW6XbdESOFeY38",
    "qzKmrmxzfiBzGRKoVbdH",
    "9pWsYgX60LXCv12r18Lo",
    "hMpxhHn6rodZIPrKMF6p",
    "Z78yt65sWYqlQ6siHxpa",
    "3mfW4DAbjdWF1MPY5xUU",
    "izjVfSA3INyXTMHetzU6",
    "MpYPcnGVwitLSrIGZTv3",
    "lIHAhNYdmuPxsqV4ENZt",
    "1jlBPJ2d0bkGcttcfTnO",
    "FlAFE5mvX2fW2OQOhift",
    "EqIP5Rp5bMGDTj7orbxc",
    "as5MwUF2U0CarxqaNoPc",
    "w4JpL1LyWKSQorNUDK40",

    // Part 2
    "QoWRMXktqAmccYlU0e1A",
    "PkyL6vBu04B7FpvPbN39",
    "dWF86vSCPJ780UfYwXCF",
    "XkTwo45v5cd15ImO4gr1",
    "6RQcjTIyniN66GquUvfI",
    "uWd84X20ACgxO4hGeTbF",
    "KkOY4hGfrxmXqOspvKdP",

    // Part 3
    "ArRpdWM16KdHGRAsYGn6",
    "MSceZuqYJwBAdezxQdr2",

    // Part 4
    "Xbx8xrTauNYRtKQBLPeF",
    "FcE0ikX8bkV3AzBoDIZC",
    "isQo55nEA9keIjSKyqTl",
    "PwmyROrDu94o1nwz3FD4",
    "KHY3FNB2sTBHRYzJkdzP",

    // Part 5
    "dUrc4w7e5nz37AG9jkAN",
    "Oz1VfLGNvGMq8TDIrCLQ",
    "8fFZhYy07mUMOukQv25O",
    "0uH2bE0XhkPWhVqOQLRA"
];

const QUESTION_IDS_MS = [
    // Part 1
    "X1nJ91HTb7K8CHFPmwbW",
    "ze9cH4j6Wk07XIXKcHqS",
    "yH7zl5esAvBPx5PaNHvT",
    "Pjq5lm2y2ppmIzMR9ZJc",
    "IkfWCC36CcKMmV3bmZxi",
    "QQLZaTDFWZb75NQoxJLG",
    "KMKObp7aGrtr71689tik",
    "Dyz1L1dYq8qvk3FAUwaw",
    "ydXH7BgFfMYiEDaZCSrW",
    "JNdudKUiQFPiDeeohR4y",
    "pKhg2tfukLLYLAyPMc60",
    "C2UOUza7D7kl4cbih027",
    "JYI6a0Q0j4aJFZESZjk9",
    "SJKmJqxpUZorjUeDjOpl",

    // Part 2
    "qXII8nUA2qsQj3O0XoBU",
    "OJ5qg50QIxrwRAlqBQzS",
    "Pm7cxaxtpnfsAHBaHTXc",
    "BmtD282mwyxSssNeAmak",
    "zL2XeXslRvul23DAsYsw",
    "Ooul85sRk6FOUYI51L9l",
    "llO6hTuyGGqCsVpAiTnD",

    // Part 3
    "PRDGL4LlN0QR3YpDat0L",
    "pK3CIPYTKNTkE49RMJLK",

    // Part 4
    "7MmEl38Pp7kMeMT8odb3",
    "bq6MeOTqz9G8561OxPfa",
    "sitDakOKex4hL3iO98En",
    "nQQhl56TkKRuMq15GhQ0",
    "SOXGJuxcrIaKB8aV21Qm",

    // Part 5
    "5GQFm4K7AokxnXSFQV9C",
    "kp1KlCgFdhMfZspJCjsG",
    "J2Fmb5XB7Ooomr5raDFG",
    "sT4uJnIm3el3EDHIBtII"
];

const QUESTION_IDS_TH = [
    // Part 1
    "7q0nwnN0kZ1Wy2I5q4eD",
    "nR1OoyBUUYxNACA0lDZW",
    "znabAyc4vFNps0dsMzmt",
    "i7taaV1r3AcXzVkmpSlw",
    "ZwuoUQ6mgKR96s9seLEX",
    "7b8IAvo56xMPSPLyqaEU",
    "4AMWhILHUcxQjgsHwC8v",
    "B4XOf7idOXrQjrFNRLq9",
    "R7vqabvq3vKx2lPbYTBN",
    "hORl30wTN1W9jEIttBB4",
    "soaxVrY8QoLqaZWobNs9",
    "vSQu1NKrG74x3BtfkSMO",
    "5xGDQDZ40SHCZPvRJRyZ",
    "h6hdgHlHd5sRjTWq1U5S",

    // Part 2
    "vj9wcLzviLxnCBWAywDi",
    "nZZOxqiOJS8H2zr16Pui",
    "BIAX43Lry0CC9bmmhOpq",
    "ZAFlV41Yt5lo9jeIgNYx",
    "BbNI8oPX4ShInjVTdRGw",
    "g2nHg97MeGiBN4P0gDe9",
    "q6j4Kaa83LUIrhfDoJ4l",

    // Part 3
    "uUGmJjhRtn8DHln63gJ4",
    "ws9fLJ0XRBlKw3QHHypL",

    // Part 4
    "sZTsZQJdxVducAaSQXvP",
    "B8gugHAAUyCTijKM8OBK",
    "H4xJafSVPZDNtuV0eEMa",
    "ArrELhCv1bIBy7bZHnMB",
    "69VqD5eo9qBWX2txNS4Y",

    // Part 5
    "cKwjbV5f0lcMWt9ywlgZ",
    "X2WG5H17ZxopoM3dheLK",
    "m1zwzos1gvjrGJYCPfkc",
    "3WcSH9sUiBCo1AfCJDNd"
];

// A list of arrays of IDs of question objects of each supported language that are stored in the Firestore Database
QUESTION_IDS = [
    QUESTION_IDS_EN,
    QUESTION_IDS_ZH_CN,
    QUESTION_IDS_MS,
    QUESTION_IDS_TH
];

// The value of questionIndex when answering the first question
const NO_QUESTIONS_DONE = 0;

// Tha value of questionIndex when the survey has been completed
const LAST_QUESTION_DONE = QUESTION_IDS[0].length;

// The users branch in the Firestore Database, currently stores
// user responses
const USERS_BRANCH = "users";