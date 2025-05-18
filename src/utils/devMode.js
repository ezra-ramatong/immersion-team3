const isDevMode = true;

if (isDevMode) {
  const dummyUser = new User("DevUser", ["general_it"]);
  dummyUser.timePerQuestion = 3000000;
  dummyUser.numQuestions = 10;
  dummyUser.currentQuestionIndex = 0;

  dummyUser.questions = [
    {
      question_text: "What does HTML stand for?",
      question_type: "multiple_choice",
      category: "general_it",
      correct_answer: "B",
      options: [
        { letter: "A", text: "HighText Machine Language" },
        { letter: "B", text: "HyperText Markup Language" },
        { letter: "C", text: "HyperTool Multi Language" },
        { letter: "D", text: "Hyperlink and Text Markup Language" },
      ],
    },
    {
      question_type: "true_false",
      question_text: "SQL stands for Structured Query Language.",
      category: "database_management_systems",
      correct_answer: true,
    },
    {
      question_type: "fill_in_blanks",
      question_text: "In CSS, the property used to make text bold is ___.",
      category: "css",
      correct_answer: "font-weight",
    },
    {
      question_type: "multi_select",
      question_text: "Which of the following are valid CSS units?",
      category: "css",
      options: [
        { letter: "A", text: "px" },
        { letter: "B", text: "%" },
        { letter: "C", text: "em" },
        { letter: "D", text: "pt" },
      ],
      correct_answers: ["A", "B", "C", "D"],
    },
  ];

  // Show quiz screen right away
  showPage("quiz-screen");

  import("./screens/quizScreen.js").then(({ startQuiz }) => {
    startQuiz(dummyUser);
  });
}
