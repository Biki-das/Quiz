import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";
    this.get("/quizzes", () => [
      {
        type: "choice-based",
        id: 1,
        flagged: false,
        questionTitle: "Select the missing number in the given question",
        question: "3+_=12",
        answer: "9",
        attempts: 3,
        options: [6, 5, 9, 11],
      },
      {
        type: "choice-based",
        id: 2,
        flagged: false,
        questionTitle: "Find the distance between (3, 2) and (-4, 1).",
        question: "",
        answer: ["$5\\sqrt{2}$"],
        attempts: 2,
        options: ["$5\\sqrt{2}$", "$5\\sqrt{3}$", "$5\\sqrt{5}$"],
      },
      {
        type: "input-based",
        id: 3,
        flagged: false,
        questionTitle: "Add 5 + 6",
        question: "",
        answer: "11",
        attempts: 6,
      },
      {
        type: "choice-based",
        id: 3,
        flagged: false,
        questionTitle: "Which of the following equations are quadratic?",
        question: "",
        answer: [],
        attempts: 2,
        options: [
          "$${6}x^2 + ${11}x - ${35} = 0$",
          "$${2}x^2 - ${64} = 0$",
          "$${4}x^2y = 0$",
        ],
      },
    ]);
  },
});

export default createServer;
