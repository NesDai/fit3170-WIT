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
const QUESTIONS_BRANCHES = ["chatbot/survey_questions/questions_en/",
    "chatbot/survey_questions/questions_zh_CN/",
    "chatbot/survey_questions/questions_ms/",
    "chatbot/survey_questions/questions_th/"]; // english, chinese, malay, thai

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
    "1dt5vNIdDV6WS8Wd5hhU",
    "UKHjnLKi0AiAr4i2NIZR",
    "QdzETx8jbANwzQH6ExQK",
    "bCMihmGQFaAx2f1u3zEn",
    "cfwjGGK1wa3pWH6CoBMT",
    "9ObGoD0GjCX6H8RDaAHT",
    "ryss7rTzC5j6fAIu1fHY",
    "uFeFhRkAhsdrM0Nj0Slu",
    "w0vLfxyLcX962XjKmNdo",
    "lEIy3QHqgVbZ11fWdCfB",
    "6JxKtrk2CxS3HEL876E7",
    "JMYoU0jNB4MbgJh7pyfS",
    "NBgKgFhzdRhAGq0NAx4K",
    "IM4AOPEqIddvVnz4DQ0v",

    // Part 2
    "KJqSmJiCjKGm8mJvfTps",
    "OA10XHh5OxrkoF4rU6Og",
    "uj1UkXuvAUl00BpwrcY2",
    "apHxMXpW2pZiTkQQ2tqP",
    "9StOFk9lSyj3yljXUH64",
    "9nF2zFTJCvmKcwPff1uA",
    "gzCE6IxYVo8MnaOEdFTB",

    // Part 3
    "tAWQp2892S3HvWj02eLP",
    "srGfnhTKEE5psygufCoR",

    // Part 4
    "EWzn63MaKmMz0huFZu5G",
    "IxQqTRGyF0dZInHza1y3",
    "Xc45gvWhFMEchFU4ojbh",
    "Y78FcQh9pa9K8vdDSx24",
    "X6CBzwXnK2cmXMPKtRZ0",

    // Part 5
    "KCRkRMiBwblPymEIVbvB",
    "SMzF3MTuTqvfIdyBqXuo",
    "VOulp3vklhIz75p0EIHw",
    "B50PZVaOysWklquuF7w3"
];

const QUESTION_IDS_ZH_CN = [];

const QUESTION_IDS_MS = [];

const QUESTION_IDS_TH = [];

// A list of IDs of question objects that are stored in
// the Firestore Database
/*const QUESTION_IDS = [
    "9XWi28mXWRKj2Ep1eorE",
    "qJK6vwfA3VBsCP3SxiZ2",
    "VZNbbdQulmXV6eMp8LbI",
    "EGunY6hZQaQwAvSzc1dZ",
    "IUBo2wTNn6vT7I6WgF6X",
    "lzjuCieujl7KbfyOprD0",
    "klG5WuK8lsYVivfTIj40",
    "PTpy6N0RiQfGUQUVWxsG",
    "iHXOSFyBoZrrT58r2tto",
    "YQ0gwtZukwnWbCwUIrRW",
    "huRG5TXmipfNV7PVPfrb",
    "XA7INiQKyEvkjz6oxAmT",
    "vTCjQkdvbIyjZRrXVyHJ",
    "9sjOmnvxINNT3ObwHOra",
    // Part 1 question IDs above

    "1bQl9X6vGkBC47wmSchS",
    "bmjmPJuQlXDp4ReMnEc0",
    "EmTZPbos4mbbpdjMT8Qb",
    "BT0FPFqlqgsug4gFmjqB",
    "wEbBE6x3j0Nc76qxnAlB",
    "70j9g3TBMluafFGa0y0v",
    "DM8jaip2d8xmNREaWdRj",
    // Part 2 question IDs above

    "VTgVVDExbu84CBqvLMo0",
    "NoBBJVvUPl4NdtC164Qy",
    // Part 3 question IDs above

    "Z2oN64I8dHWsLJ4r1qZq",
    "fhi8d6a2s0CiCBPjkbPF",
    "gSvZjaBmBIbrLrCCuwK3",
    "E8jb3LKomsH3nVjw13N4",
    "dpO89uFkNXJTPuxwt9VS",
    // Part 4 question IDs above

    "h9ocDajgErspM12E0eA4",
    "xjt2xaEN7X0zlhxWoBTd",
    "6nNTBhgUmSisSVDH9dEa",
    "FYlnoJEFCdrRmlz49HRg"
    // Part 5 question IDs above
];*/

QUESTION_IDS = [
    QUESTION_IDS_EN,
    QUESTION_IDS_ZH_CN,
    QUESTION_IDS_MS,
    QUESTION_IDS_TH
]

// The value of questionIndex when answering the first question
const NO_QUESTIONS_DONE = 0;

// Tha value of questionIndex when the survey has been completed
const LAST_QUESTION_DONE = QUESTION_IDS.length;

// The users branch in the Firestore Database, currently stores
// user responses
const USERS_BRANCH = "users";