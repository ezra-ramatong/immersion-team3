// src/data/questions.js

export const defaultQuestions = [
  {
    id: 1,
    question_type: "multiple_choice",
    question_text:
      "What is the purpose of the <fieldset> and <legend> elements in HTML?",
    category: "HTML",
    options: [
      { letter: "A", text: "To create a collapsible dropdown in a form" },
      {
        letter: "B",
        text: "To group related inputs and provide a label for the group",
      },
      { letter: "C", text: "To style form buttons with CSS" },
      { letter: "D", text: "To style form buttons with CSS" },
      { letter: "E", text: "To style form buttons with CSS" },
    ],
  },
  // Add more questions here as needed...
];

// Function to get questions (could pull from localStorage later)
export function getQuestions() {
  const storedQuestions = JSON.parse(localStorage.getItem("questions"));
  if (storedQuestions && Array.isArray(storedQuestions)) {
    return storedQuestions;
  } else {
    return defaultQuestions;
  }
}

// Function to save questions to localStorage (useful if adding new questions later)
export function saveQuestions(questions) {
  localStorage.setItem("questions", JSON.stringify(questions));
}

export function loadQuestionsFromStorage() {
  const questions = localStorage.getItem("questions");
  return questions ? JSON.parse(questions) : [];
}

export function saveQuestionsToStorage(questions) {
  localStorage.setItem("questions", JSON.stringify(questions));
}
