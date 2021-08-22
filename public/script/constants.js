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

// The path for storing/retrieving questions from
// the Firebase Firestore Database
const QUESTIONS_BRANCH = "chatbot/survey_questions/questions/";

// The time it takes for the chat bot to output
// a chat bubble (in milliseconds)
const MESSAGE_OUTPUT_DELAY = 2000;

// The maximum number of characters for short
// text question responses
const SHORT_TEXT_LENGTH = 50;

// A list of IDs of question objects that are stored in
// the Firestore Database
const QUESTION_IDS = [
    "qC30vPwEsHpHnYvD9QXB",
    "DwWJ09e2O6HoJhG79tVC",
    "NQapG2Sza1k83AbogmnJ",
    "manHOQxof67bC8XJmIj7",
    "jbrg3JcjhHYbpvEHKzfL",
    "wy5SfvDs5rdUC27xMvOB",
    "bZdEsihZC2DIrWuAQq5h",
    "FSVOpGPeTgqtzcDyxdTR",
    "bYpaM02WbSUmRcxZRsyq",
    "1jYu9xdifnQ7llB1DHMB",
    "H71i9RHymtTuzhFZXCIy",
    "82RGqhLUvMVVNLWy9FW4",
    "rSlTouzaBKnCyAnIQR6v",
    "NwbXmR1GXjhLg4YxY92w",
    "tMpjXNl6AbI9WLaecgkN",
    "WE7Vi36RErNCOob1UHEl",
    // Part 1 question IDs above

    "TEOwiUE6GB7Iq1ES2V51",
    "voPtzLatVbFW0CPW7Nk1",
    "B8fOWT41S3rSNPW1PMR4",
    "rn2AyiT4vsTfbVZcunk2",
    "mougeniM918D5SuQfRch",
    "ggrHOs3vT3XjOtmgJEiS",
    "0osl0CmmauF3CrEARsfT",
    // Part 2 question IDs above

    "zRqZSkzNO47HcN603gf4",
    "u3IlB0pTPiGSBwUCsqiQ",
    // Part 3 question IDs above

    "CGTRT6raPn6VXTOIg6AW",
    "sZ6yqev0JxB3zF9ATqn4",
    "seaY5cG4KPn8JCFEodgE",
    "Tf4h3sSJUyUksVgjmk8S",
    // Part 4 question IDs above

    "lQ2uRyqYM9Q9SLBySwxR",
    "Za7YzeVKvK6EGAUqKKAb",
    "Y1K4EBPDvlC1zmDO0oEk",
    "KHr0k5h5soAEv9JXy8Pk",
    // Part 5 question IDs above
];

// The value of questionIndex when answering the first question
const NO_QUESTIONS_DONE = 0;

// Tha value of questionIndex when the survey has been completed
const LAST_QUESTION_DONE = QUESTION_IDS.length;

const USER_BRANCH = "users";