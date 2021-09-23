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
    '97CZlwR9i5LAOGoDA0eU',
    'UI87LYHm2t48pDP33b3W',
    't6IdJmJl86GptX3wceqx',
    'Ttg5Gaj7LhfcFkAVeYil',
    'FJ6h87xxovaT4gHJNqdR',
    'qCURrsJ78pw8KmsSLxOn',
    'JU4CUokiarx4VezKU4V4',
    'xYmWMQzvcekUkvlRFJkF',
    'rQCttvYOlGRd3SaCXzv2',
    '48I5h7d3OSCK3eU0fbqB',
    'XmLMzVlK0xJleP2lfOp1',
    'jqYwvwrJpdAQOgYwGDja',
    'uvdZ4DRXcgyMJNPa8Irq',
    'fZzBLQn07Slft3mLtzgt',

    // Part 2
    '55i88aywrPXUpZQHOhNB',
    'XntBkc8ucAS0RpdsmXrU',
    'eyBkfq8X7vFTrX6Nfo8r',
    'W8MSIRlxs7fcOln2OXgS',
    'qv49aN7bddR4Z7WCuX2b',
    '7an0h0SbtFzwNSdQvKrk',
    'Kb2OAGkMNAjy7kzxSwKa',

    // Part 3
    'Z5JqsrL17Kcn8gE7pBtQ',
    '76CqJj4uWlOzdLpeZvzV',

    // Part 4
    '3UjWRM7J6ykqzaQo3pvp',
    '7MnMgfXVkJyucVUOT2Ap',
    'M16oBJ94sCqQWl2kvPQ0',
    'q02KCLUHrzbcOCtGTvVe',
    'wS3YFYkLSg5acQYda7Sx',

    // Part 5
    'JCjP9diQVuN4sJwbR0Zv',
    'tgU2XIaLjuLeLJj0DsQX',
    'LK3hfoPfwOMAjFWANLc8',
    'MtpfX0thgfZXVH917lFP'
];

const QUESTION_IDS_ZH_CN = [
    // Part 1
    'B3OannF8ceuSgqkAZTqw',
    'anBHAGUhJUgKUKru8rYU',
    'aOK1k1KoJ7xiHyfsnZNr',
    'nOEKxNzA9dUlfRjrBVk3',
    'y8g6WsfZcnWxd1Up5hQW',
    '5yvncAb2I41mRbdfTBbu',
    'Oi41h67c7iGqyFWMUnzq',
    'I7o6GRLan3hm5G6KgfU8',
    'Yw20N5IQg3nOjVcFrQIh',
    'FxEjHAFIN9JgXqejGeAq',
    'MicMJ6yfaCRqwPwU697y',
    'rQT76P0kWfy7kVcAYhIf',
    '1Lm6H9DSd1pYDCp5q9em',
    '2zhNOCb5c3VKdlDJfOZc',

    // Part 2
    'yfdhvZSTWSAFT2fn17pX',
    'F41XOOdUJzFfnL4A4fqq',
    'i5h7OqE467F0vKf9EGwp',
    'Vr51uFnCy7hztf7Msj1D',
    'kHtQj8ShinBGsp6eXcVg',
    'g9zGeOafMmDedxyjHa8u',
    '85w1wHSVODet8tZDaJaL',

    // Part 3
    'K3ev0PdIqjrT4oQnlQyK',
    'Gfa6M1Ckf2lXv2GlD4Zb',

    // Part 4
    'R7e3qZfjAvHgjXWwhhC1',
    'NbrrLh6E1eSM0NFAfsD6',
    'k5pm6hBrGtiHgYkoNmJ9',
    'ufY0DoEtpNS7EyeJAxZD',
    'apyYan0zrL879CyxbUIQ',

    // Part 5
    'GqJmSz1B8j0tHNncEfbz',
    'c80Fgx34DhPsFO2ifdPl',
    'SdDLmwqteOhuApQ46hZc',
    'dbcUs9CBIPx94DpPpRJj'
];

const QUESTION_IDS_MS = [
    // Part 1
    'oXuX8HjfpBAwqim05WD8',
    'fWfB8bISixCvm93BP0pQ',
    'EQrAi6dCr1FfwkwPEXp9',
    'FGSDTpGnqeMYoBbFTJ1T',
    'HUtZ6hMFTbvKXxcmb8yd',
    'dMUlw12MtwGltLrVC5xj',
    'jTZrN0LmPt0FsAG7URaX',
    'MI4Z1Uh9NV3Qb6kAShn5',
    'u1ONAMvbV2RVpNaK8RxK',
    'NekmK8sb4NFlyACY7q1N',
    's0mb7JpPO9G6hA0UeJaK',
    'u1TKNJIOhQtMSaZa7J8n',
    'hEXE9tR5OTAl3PIHBCDF',
    'RIePDPNCorIoGeEcmW7s',

    // Part 2
    'aa2psbkWUR13zpNQs64C',
    'Z5hvGLNjIH6rGPHz7Ebn',
    'wbe4gOCGTRM1iKcpvdrf',
    'GwD1nsmGxT4S9j6atJ3x',
    'EbbY006OKjJujRITmZCV',
    'RE32vv0MipVcG1UUBJsK',
    'eiOQHsAH7j26oam6voNT',

    // Part 3
    '5tpGYIk5J2fWHpSomt4V',
    'hoUIjRpMPNz8hBjvAl9b',

    // Part 4
    'ortiQ7k104DPm9f8ezyW',
    'bIwg3QvSxxsCs5wreRnY',
    'SusWfgUScAP8DERXsoz0',
    'Gv62RNW4qEy4N8PQ7w3E',
    'vfjaLD0MfADtAMlaPLKK',

    // Part 5
    'NUDK9MnOSaGxoNXIKrRI',
    'KKENaDFEFusYMokF6pRF',
    'LhphKzy0Z9zDZuNWdnVv',
    'MiyfFunyGx0fPbAQZ5sU'
];

const QUESTION_IDS_TH = [
    // Part 1
    'Jgu21ovzhwZjrWabH5HR',
    'wISXTb9jV0z3R3yiC2cr',
    'z2E0aOAUu1y3UaJA1HF0',
    'PMpKoZbKFCzm4nPpadAE',
    'zDeZOz6ShbbSz5IB5FRF',
    '1yLucBmpefNb6C3RIQgk',
    'I9NAwKEly4CW8133dFfw',
    'Or6rq8o7MTDhgS9JxRsP',
    'f8uX9pyo2Zq8cbcWZTh4',
    'wTmCnJjhxgA9Wp2yGkaf',
    'zSLNZV0MRJ17oHlBH7sj',
    'sOl2ftJgDrY1phjShOXH',
    'RN0CmYOgHBs3aKZ4kSh2',
    'uv0EKwW6GgLUNmBHTmVU',

    // Part 2
    'ogPAJHiKaaZP5d7IGTmj',
    'qy4F0kdz67xjEVoVTQyS',
    'aQdmnwDjdN7qMAvEv48W',
    'jKCCWLnQqyZl8nyT47qE',
    'hlTQysH6sxsg7wQ5wUja',
    'utEDObXmtOvycBfm6PEo',
    'tH2EaY3oPui53xMbVnzo',

    // Part 3
    'mPyXec1bEj9J9KO2jPk4',
    'pqsbvgOX7Af3rpGi3cy7',

    // Part 4
    'uHubVDeRpf63tHw9XLgg',
    'rGbvfFY8Ccrwc2vfac8h',
    'qcRqeOsZphuKCSwkqdf7',
    '0Ya6dB9NBcn45EPIv8KR',
    'fL0cI9hqJwZcHQAlxuTA',

    // Part 5
    'PPSKU5gm2r3gheYFNyMM',
    'b9F6Sm6E8xXMvdPlPcAR',
    'g0BlfZNpBgiAUNiq411h',
    'vPPELb1eH5hy8if9E9zi'
];

// A list of arrays of IDs of question objects of each supported language that are stored in the Firestore Database
QUESTION_IDS = [
    QUESTION_IDS_EN,
    QUESTION_IDS_ZH_CN,
    QUESTION_IDS_MS,
    QUESTION_IDS_TH
];

OTHERS_OPTION_HINTS = [
    "Type in a Response",
    "输入回复",
    "Taipkan tindak balas",
    "พิมพ์ตอบกลับ"
]

// The value of questionIndex when answering the first question
const NO_QUESTIONS_DONE = 0;

// Tha value of questionIndex when the survey has been completed
const LAST_QUESTION_DONE = QUESTION_IDS[0].length;

// The users branch in the Firestore Database, currently stores
// user responses
const USERS_BRANCH = "users";