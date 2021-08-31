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
    "tUaig3CbVaCakauGrdUj",
    "AdfIXBJFv0fZ54Yk9Wx8",
    "v6DlVSeURkBqibRxVJrS",
    "72NIR1vu7VSPAxUMXjx6",
    "nsV6JwzUk2Kydiw0xXo5",
    "yDlntSyy7WlDCV6RhDTZ",
    "xIR76SqHtOoVXGsO4RvN",
    "OXkgfKwFBInq1kXPcboN",
    "GX8kVYIbwb4rMlEeFjl7",
    "bZgu9SjgpydubXh3e2Li",
    "YKGtzAdLBC1XAWUCKyUu",
    "fQSHltRUKBg8oCno8SKj",
    "5UEMyCniKMesgnmMJpIY",
    "L8fbSqH7Lelz3iDAYPTy",

    // Part 2
    "1dcWTPjVNgOCXrKNzGg2",
    "U0QeHHheWFycZBYyRP2Z",
    "QJm8oZekTbvMm3y0vCFV",
    "P7h4nmb4WaWC5PEHQiLS",
    "6xkj0mEb74D9fWUEeSV9",
    "qigQgGIH4vy2COeVYwHX",
    "MO0DZYZb22I7HtH8mVYC",

    // Part 3
    "pzkgvkCia9TbCMIM2WaO",
    "cCkbv1TTXOqEbC27J80R",

    // Part 4
    "XIz4TpHDHTwDd2nUXnXL",
    "Yp60l9Qtc2GtItenDYmZ",
    "e3jprSwPBvHQVpjiDk38",
    "XnDOVHsyRcvex8rPBT9d",
    "xF3SPapO2iNKW8tf81jm",

    // Part 5
    "U9mnvQeCjmCA8UgpH47l",
    "5oMLb3TUHFNqL4z1GQdq",
    "oIx4075RidhSX1pNO2TV",
    "SsV2bqTQJ9jWStjc0AfX"
];

const QUESTION_IDS_ZH_CN = [
    // Part 1
    "JNTxse2RmQ8BNBAKwzJG",
    "01pjqlTJEangiTmJSMJK",
    "d0j8hQ7otfpOp2pIxb09",
    "SRqJmpTI1MqHqeEyYD6p",
    "tpVeaGqtL0J5dnfwKNBc",
    "QVXDRmlwWtGw4fyC7pkK",
    "isefIirfcqJYPqv42uxZ",
    "VoNfTpQN9aVQTngtW1ak",
    "BTsI8zuUOPLJpa3e7bQi",
    "A4203n7bXFSl2abcC4fC",
    "L09bpkwqA4LScMBafH7b",
    "onP6wUD4bTzna7MTFkbK",
    "6eTzZU6tE3mMNvut2pd3",
    "8hBWdvPSVzkKYIWSbqoH",

    // Part 2
    "LyUiZad2pd0EySQxRHBv",
    "oEdiqtGOb1aOmJYN2GQs",
    "dM0juejakqrMpw1Z1SI2",
    "E1nWa1nd1PJT76yQ7ntr",
    "cN1fXRxX3d3UND6RY3dm",
    "XcJ1yy5j6t0PXZ7t0kK2",
    "6ucsie5r6IM2vZXXdhWd",

    // Part 3
    "VPIgZjhrnome72d4JYnR",
    "bCd368961SOCrcJpA4KK",

    // Part 4
    "JB3MVy2QVj7QinBSW16d",
    "FNqN2PiM0ORQWzGEgo67",
    "9IZNCYKxa6dnXrrAXrAG",
    "RluLoBdUmWLAIRCLRZ12",
    "zIohoZ408MhajTIW6rhe",

    // Part 5
    "y4wu56dfHC5v2HMVADAv",
    "ALMPP5cc97zmXW3u6WK1",
    "TcMSJ3tRkm4NQ5OUT9cK",
    "oCXa8CasJU7JdGcT59zf"
];

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
];

// The value of questionIndex when answering the first question
const NO_QUESTIONS_DONE = 0;

// Tha value of questionIndex when the survey has been completed
const LAST_QUESTION_DONE = QUESTION_IDS[0].length;

// The users branch in the Firestore Database, currently stores
// user responses
const USERS_BRANCH = "users";