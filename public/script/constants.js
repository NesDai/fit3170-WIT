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
    'IoX9n0O8SEk82gR8SWoL',
    'ofqTyifcznzY7hSbDA02',
    'ao6z2nPQQiA5ZNTkm2Hf',
    '5SbM8rAT3qL6RVry0mKE',
    '9tFDMdDMjFV7QG5jJkJ7',
    'q74FOp2KJHt5uF6JMeEt',
    'elLYCd03V09Hi7vV2Bna',
    'nlnAGAnCN9WipmJ7Fze5',
    'Whd0m9fo4FkwLsUXCIb3',
    '5oIGSLnxnngdYO6jRUyY',
    'hskQGsQreAxqoGZSBnFH',
    '7sqnbWljNVuwCE6XWUaf',
    '2XYFBRF4C92K7rVFzR0m',
    'srmae3poWvPqjLeemnRq',

    // Part 2
    '1QK9R4yVJKZjUNhXcVd5',
    'ltv12cKVae9ltpbl2LYT',
    'pdFwO49cWdsnMGbhPP9N',
    'tTCkJ0fQEgp5ubsH0vmr',
    'nHsWNICn1iyuinudIG3c',
    'gyVaEdwJk0MLfV14zj3Z',
    'YRFUCePqwwdfAINOCn0D',

    // Part 3
    'VCLHGwzQHVckpB1LTMjY',
    'os37yw51uVaKj2BsfrU5',

    // Part 4
    'pwcuxOTscZGBW4M4fUbd',
    'izWrQUUI4ARCUotG0WDq',
    'dpYqljnw1c4Cb8JNWT9L',
    '4GsEA1f25wgKxAQVwoGN',
    'dXCJdjRnnr3EUj0Itoig',

    // Part 5
    'i3tAkn1my4bD8JgeVr8j',
    'zhJmzBKzA7f3qotBFzjV',
    'MioHXcjBIADX5rbmzPfK',
    'gmWgalOEj2wMsmZPcCXZ'
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

// The value of questionIndex when answering the first question
const NO_QUESTIONS_DONE = 0;

// Tha value of questionIndex when the survey has been completed
const LAST_QUESTION_DONE = QUESTION_IDS[0].length;

// The users branch in the Firestore Database, currently stores
// user responses
const USERS_BRANCH = "users";