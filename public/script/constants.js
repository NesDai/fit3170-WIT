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
    "Qewazm7VdrIeXcnux52e",
    "IrQS86OeFbXl2ZUByCab",
    "0kDlIT8VfMrf1WNid0hz",
    "tkoooA77emcZqIqgrt9h",
    "2CAE2p3GuNG88AYwy036",
    "HLoEsEzqUn76nihrjSUo",
    "TMFGfXIVkoFZXH93wHlU",
    "lTjHU9FeNsHAK89ENgek",
    "00nA0wmCHUdJwTKJ8pbh",
    "Ve9RTybJoxHRb7cjBt6T",
    "QFSaKEGgqPrYDZHf6ZIM",
    "lAyZfjL2L7tW9WTv5M2X",
    "rYoVPJPJ6ZZByomOe2mb",
    "Wh3og6FrtsYTagGaz1Sp",

    // Part 2
    "ZCun8rlriLJSCyZKQuNA",
    "oMSGRHnMrrYY64EMDNBd",
    "nLGBSGoVqYd1373rYwgg",
    "ozJBMxxKQvUUS5jiUIH1",
    "8JqHyF0QSSviEBflBTSG",
    "zZeVC9P7W18bOzJuiX16",
    "auw8gKHisfK1WKPCAq0j",

    // Part 3
    "fMVZKpqHreI5tz5QJ1kO",
    "AOC6Ue13ZO4GzSPij41u",

    // Part 4
    "9HvUriOBO6c2wbN7BZuH",
    "L6r5XSy1k1DZrGkqipFN",
    "hKRtGNBSXpGQXeMmBf6m",
    "Ai7dwnxP2z9wd9eS6PpU",
    "eymFMFiO3XrlA8v8FBB9",

    // Part 5
    "IbTTrpEDUzM00hdKMXK3",
    "oE7K4WdaLZ6BB2Whrtdz",
    "cvtDBpFu26frWEuVUYFc",
    "xEvhKdbdPM1z1CBxnJCq"
];

const QUESTION_IDS_ZH_CN = [
    // Part 1
    "LhBmuXl9O6CQqwGrq2nx",
    "CoLYuiQgroToqeNpiDw0",
    "wiceKl7ey5GMW2aINVgD",
    "mPcKB476cxVpqBWJukRk",
    "BjXJOZrHoFLUU2hgFeH2",
    "0jneenETAWsZKWZNT7Lv",
    "lPca56pILoHo6edH0imv",
    "RLANG7cRsjhGctys89Dt",
    "PzRbCkKe1Fux8SVwgf7z",
    "YfcVPTK17QpmBZ6ELcQV",
    "nivFwJPVqyfpg44QmVa0",
    "XYYhYhjqr9XvQ2Oq2rbX",
    "nKJO7HHoVNa3zALGCQ8d",
    "odcaqfntrXa0kBFfYGfD",

    // Part 2
    "TKAmFnFpNZLW52YBWBBo",
    "QzsZjX3vnsdi53dAou97",
    "BTCKTVylGfhot20pjbqZ",
    "tssex4Wq4LQdhPmiLJvE",
    "wrwzTlBOyHabm4O8CQgI",
    "BO7Pp7xSclcW3uvLIKMs",
    "h3VypWQAKv9Rk5IGg9me",

    // Part 3
    "MB4hb6lBFwEE1Oa87XeR",
    "zQiBRrI10cwKg1woIFxM",

    // Part 4
    "9BHwDUTuAZtY4NZ9cePG",
    "ieXGFSScKsUQWC8zcPHH",
    "MG3VJdpbZBYH3PtFxzuC",
    "cvNMuromz6LfSoWqG3Cs",
    "JFVTFwkpcITtGsObRHLq",

    // Part 5
    "SM74oI6G3N2AXDBxhCUV",
    "9COCmdenB1YsaPdBiMgT",
    "blTvHQjn70xxJfcmrByV",
    "TeaaBWpb3FYqmzqv8fhj"
];

const QUESTION_IDS_MS = [
    // Part 1
    "QkD5dswNePyvH7DwJXxw",
    "SYitEDssmYVOLTNAJ7lZ",
    "GI7sXcb5VbgCZNCEAPbN",
    "hXNcKlEBwLDJGuQOB5hV",
    "0PIPq27uKPkJ5e5NPmab",
    "qamPhkbpM20NsXLKdfJH",
    "dWG0JN90GH7uINCh2jYs",
    "pAoOJmse2QDPvBOPLjgI",
    "aZVgoMLwNsYLwJ03RdtU",
    "QZpbqkmn82XcbzmyFB6A",
    "R7bWmPREuylqcEkYYdJx",
    "4oRR5DIomjVjeEH3GUF1",
    "z9sHa9FXxHLBo0Eu1Gy5",
    "qlfVL9BZYdg5e6tXsSXO",

    // Part 2
    "RoH1FzfObcmnKYhKDfgK",
    "TSR9WgpbURcBdIAt5hPO",
    "mVV5oPYNd7ogWDBRRE6U",
    "INuk7EtJyCKyh2uRA0el",
    "QmDU8zKGzfqLe7cWyCl8",
    "slQivgTDnadE423bFc6l",
    "kYX9cWSguK0ivbosKfVb",

    // Part 3
    "0r0YUMgu6XKFtkKuivks",
    "HwflWbmP2qAMd8NfIJXZ",

    // Part 4
    "vb2dB5G8htbbANIXEjjf",
    "7GvhWU2JgUr6n9XFljbd",
    "ZsFxPnK9TEhWIssyOq9f",
    "yWZ2pm1iwZURfD1Fw3TW",
    "mO0tgX10wa28VTBSWllK",

    // Part 5
    "wyCRum0cKrKQVnNWd73S",
    "OZRk5WFEomo23hXWSEXX",
    "IoI85kC2slHYu6L7OeiB",
    "7SCHD0LQIraM0JcXwzcq"
];

const QUESTION_IDS_TH = [
    // Part 1
    "heHMtIxx6v52gG51K4d1",
    "ctP7c3mpNIXLf0udZpOH",
    "PgrlUqn5BzZStH5Y2MnL",
    "vW5ExsxDmcLJm5fZZ0Xu",
    "2nqaY1DULl43VSu2casQ",
    "nfIVgMP7QohnZCz0N5pP",
    "gcs23btsSwcwTw3MXt5F",
    "RylePWKrAfKB6ziF4Zcv",
    "62H6KRs8R0CDP3lIgOZT",
    "3mbLa6jUJ9g6aF17TXeM",
    "brs52coBbUKxUJ2fgV3K",
    "EVRTS3sAoWGvYgf5YqQW",
    "BEioOJriXg6bBq9mM4dg",
    "YP1So4hh6vnfVB6oKh9h",

    // Part 2
    "qE9shInVE7zqeRkUxf46",
    "uk3jGjmSEnj6mNq2ZhXw",
    "Xlu6MN6yzqbrvX26GbsS",
    "6pieWZe20yaE0857avWs",
    "spCIerE3LvIGZvU68IYZ",
    "6i06pRSdc0lvOhez2dcC",
    "VkKTUROec5oQ2hrpj02X",

    // Part 3
    "Pd0lZM8dXQ5jAnJozGos",
    "rYfGSLyWAxTNYIhJR1ps",

    // Part 4
    "akt7zDyx7cAsgcvZ1QFA",
    "c8eclgAj39JmDlEOT5BY",
    "w3Mm6WoxWmkIkLdLMcrC",
    "z7mGUwSiCVyx29yhkraU",
    "8lPoBoAc17rC7LqV2UoG",

    // Part 5
    "EJkPZ9CvTIYgmVpHa98D",
    "Mzsh0toTvY1xqVv2yNbX",
    "nlMvXKQab1XMqmDafK2O",
    "T8DRIcsFQbbVx5mKZZce"
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