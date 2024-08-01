import { mongoData } from "@/app/_helpers/server/mongo";

export const seedData = {
    question: [
        {
            question: "What is the capital of France?",
            questionType: "text",
            questionPoints: 10,
            questionTime: 10,
            questionMedia: "",
            questionNote: "",
            questionLink: "",
            correctAnswer: "Paris",
            answer2: "London",
            answer3: "Berlin",
            answer4: "Madrid",
            usedLocations: []
        },
        {
            question: "What is the capital of Germany?",
            questionType: "text",
            questionPoints: 10,
            questionTime: 10,
            questionMedia: "",
            questionNote: "",
            questionLink: "",
            correctAnswer: "Berlin",
            answer2: "London",
            answer3: "Paris",
            answer4: "Madrid",
            usedLocations: []
        },
        {
            question: "What is the capital of Spain?",
            questionType: "text",
            questionPoints: 10,
            questionTime: 10,
            questionMedia: "",
            questionNote: "",
            questionLink: "",
            correctAnswer: "Madrid",
            answer2: "London",
            answer3: "Paris",
            answer4: "Berlin",
            usedLocations: []
        },
        {
            question: "What is the capital of England?",
            questionType: "text",
            questionPoints: 10,
            questionTime: 10,
            questionMedia: "",
            questionNote: "",
            questionLink: "",
            correctAnswer: "London",
            answer2: "Paris",
            answer3: "Berlin",
            answer4: "Madrid",
            usedLocations: []
        }
    ],
    location: [
        {
            locationName: "Resolute"
        },
        {
            locationName: "HalfPenny"
        },
        {
            locationName: "6and40"
        },
        {
            locationName: "Waldschanke"
        }
    ]
};


