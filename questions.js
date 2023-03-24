const QUESTIONS = [
    {
        id: "1",
        question: "This is my question",
        type: "SELECT", // RADIO, MULTIPLE_IMAGE
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3"
        },
        difficulty: "EASY",
        correctAnswer: "c"
    },
    {
        id: "2",
        question: "This is my multiple choice question (HARD QUESTION) #1",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4",
            e: "Answer 5"
        },
        type: "CHECKBOX", // RADIO, MULTIPLE_IMAGE
        difficulty: "HARD",
        correctAnswer: ["c", "d"]
    },
    {
        id: "3",
        question: "This is my multiple choice question (HARD question) #2",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4",
            e: "Answer 5"
        },
        type: "CHECKBOX", // RADIO, MULTIPLE_IMAGE
        difficulty: "HARD",
        correctAnswer: ["a", "b"]
    },
    {
        id: "4",
        question: "This is my multiple choice question",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4",
            e: "Answer 5"
        },
        difficulty: "MEDIUM",
        correctAnswer: ["c", "d"]
    }
];