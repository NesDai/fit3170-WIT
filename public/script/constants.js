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
    '97CZlwR9i5LAOGoDA0eU', //what is your age in years
    'UI87LYHm2t48pDP33b3W', //what is your gender
    't6IdJmJl86GptX3wceqx', //what is your ethnic group
    'Ttg5Gaj7LhfcFkAVeYil', //where do you currently live
    'FJ6h87xxovaT4gHJNqdR', //average household income
    'qCURrsJ78pw8KmsSLxOn', //education level
    'JU4CUokiarx4VezKU4V4', //marital status
    'xYmWMQzvcekUkvlRFJkF', //how many children have you raised
    'rQCttvYOlGRd3SaCXzv2', //how many children do you talk to weekly
    '48I5h7d3OSCK3eU0fbqB', //how many other relatives do you feel close to
    'XmLMzVlK0xJleP2lfOp1', //how many close friends do you have
    'jqYwvwrJpdAQOgYwGDja', //long question
    'uvdZ4DRXcgyMJNPa8Irq', //long question
    'fZzBLQn07Slft3mLtzgt', //long question

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
    'YFEBSPKjmcLaJOBZaYjQ',
    'V86AF5rcSIQCAlUEDFBq',
    '12dA4pCjud0ubZ5c8bSk',
    '5Cd7n5f6MQRXCYOjWI8O',
    'D4Ci4VTeDlIzuyuVG6jG',
    'KnZhqNR2vqjE6JZ3Lawz',
    'd049xMTwl1nu7srt4pZx',
    'XudiWHxAUkDU4vdzCp52',
    'WymsOphqooOzdx40claG',
    '9XtE4t0AELWRdaU6C02H',
    '4syTgpXHDAxSFsKr8T0K',
    'hIW1HqAt19uuYOvvQqNs',
    'SObgEqkKmLjhoJvRn9Xj',
    'e8JbtaeuXZnKwF51d17s',

    // Part 2
    'PEse3mrEeSTbvaAvO99T',
    'lSJ91kDErq2gUB1Hl2Qo',
    'piHtQ0u6FPhgzObW2ZQh',
    'M1Lzw2Ee6tcOdretsrq6',
    'wzclKG9eDUK39OFYWk7s',
    'sLKbe8FBUx5ruwdVKhoL',
    '1afxR3DNaY3g9aFeZjYJ',

    // Part 3
    'K39SNQjQxYt9TC7SGu00',
    'pU8V8WC9eT23sGVueVMl',

    // Part 4
    'xGHBGIg9qILAGFlXdk0E',
    'KpZJNT5N4tivOSo7BTIe',
    '5p8KJTn7nr65VhUTA0cC',
    'mHQni51q8Ga3nxrHNANZ',
    'qzz06dGR8iCqDYgO41oa',

    // Part 5
    'CoLP3cCf4DOpm4ropWpN',
    '3LgyXl9EIUQ9nQENgHHM',
    'PRrwOpdgC7NGb2YMuqCI',
    '4UvW3Bvg0P6IiHy1TEUW'
];

const QUESTION_IDS_MS = [
    // Part 1
    '1CWOrR8SnpVE6QLuBm8g',
    'aRkv2Tie5GhbnuNFgQOb',
    '8l0CjOE424tVyerCscFZ',
    'OHCq9Mg6hI7dXukqUWMj',
    'kD75U3vFXRvYssKXW9hP',
    '4rjh8c2zrLxKV3frOKQc',
    'Ij6JvJ3uVgQFiUe7TT9y',
    'aSJORMKbELimkjVceFA5',
    'IF2oVUOiuENhpxwAkjlk',
    'f7us3JoI9zzrHgYC0ylL',
    'zAyW5SHDXXpoZPxb14tu',
    'Q8eJyTrw2l9DL7L7DbKc',
    'trp1QlT8Cxz03RxtpsOs',
    'nDrUbQdQsPH5stp7QMnL',

    // Part 2
    'aiPiDE8NFiiQu2j68Nk6',
    'o5yTI0qLbA3BuGRhRCNW',
    'XyynFSbhay8bqTjsbrlL',
    'GJL6Vrw70oMPEwedjCSy',
    'Drra4GdWYZbfSdptc1W1',
    'jvd0m4PfyTlBUZgNRFHj',
    'ZBtR02CEvoTMffrrxMth',

    // Part 3
    '4ewieerHxUqn1GlmiWSR',
    'MPxdUPYSURgqHukARjoe',

    // Part 4
    'IctVliFqifjZhZK6pUBR',
    'L163XAIG5wcl22JidNBa',
    'y9nc4hRXDlGLFRxb6hZP',
    'YqP2ohRMGTUsC9MI3CRn',
    'GLerc6NKNPFzFybfWZYX',

    // Part 5
    'mK8YeG4abJ2UUMv2s27n',
    'MxbWCenwBm706TvlHBVz',
    'BN9CSX0dTJVyW3jNcPPW',
    'wSx9hFb3bUfj4uLCX0qR'
];

const QUESTION_IDS_TH = [
    // Part 1
    'EkrbBJcNXZaf992YiHEz',
    'g3aaHbUdnpOFOS3C7Kuw',
    '42BPDbNUNmSAeqSswQIt',
    'xWhgX7Pv6Qc6zStj5M0e',
    'TnTPLxdAU65mDVxtbn5u',
    'xcJ0siWFZKBZoJbjNEsu',
    'EElt6QyKTJfG4IZs1APb',
    'gBsz1uJirHGvCVPQjeDp',
    'Tr93jiFtAAxVIULHy2ob',
    'L5837fXAdB2ZsJPqPkKo',
    'ppKw9T6O6zmo0MPHwvmM',
    'l3S525EUyCma1ddm3N6C',
    '6Ljxvl8Xd5paaOHfjYxt',
    '29o1QUyVx8LbUe8ksszM',

    // Part 2
    'cNExFyfKj2H2MhyPEKXC',
    'ExbbxHjr1pJ8jXMtYI2r',
    '6hr6g1Nsf23XF2igWr4I',
    'OqWJduwDWnDxHH3oefJ4',
    '8oEGnDYXXEzKsITZnVV5',
    'de9MCppPjPsSKAhCM8qV',
    'BnGffx22Yl4sqEGaIZLX',

    // Part 3
    'OLNiTOfsFE8aaRTkeh6r',
    'BZ5l4xvVbpVhbCEzxmrL',

    // Part 4
    'QW77LSrlvT6n4j0w1fMs',
    'juYynqJVRlokY5qa0YGf',
    '1tJvF5eG1pKvEN7ZlKFo',
    '71TSaty5wdD514tDDLE9',
    'hQ0ArGLZXfdP52FdTswW',

    // Part 5
    'bcGS7ZLXMcY8y4AOfkEU',
    'Yj0Zn2P1BNvXakYfVuXh',
    'BH4BB2S3qpDf54O2hlGj',
    'qdTVgCzANxKdu3YqczoC'
];

// A list of arrays of IDs of question objects of each supported language that are stored in the Firestore Database
const QUESTION_IDS = [
    QUESTION_IDS_EN,
    QUESTION_IDS_ZH_CN,
    QUESTION_IDS_MS,
    QUESTION_IDS_TH
];

const OTHERS_OPTION_HINTS = [
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