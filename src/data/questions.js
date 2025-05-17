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
    ],
    correct_answer: "B",
  },
  {
    id: 2,
    question_type: "fill_in_blanks",
    question_text: "In CSS, the property used to make text bold is ___.",
    category: "CSS",
    correct_answer: "font-weight",
  },
  {
    id: 3,
    question_type: "true_false",
    question_text: "In JavaScript, `null === undefined` evaluates to true.",
    category: "JavaScript",
    correct_answer: false,
  },
  {
    id: 5,
    question_type: "multi_select",
    question_text: "Which of the following are valid HTML5 semantic elements?",
    category: "HTML",
    options: [
      { letter: "A", text: "<article>", is_correct: true },
      { letter: "B", text: "<div>", is_correct: false },
      { letter: "C", text: "<section>", is_correct: true },
      { letter: "D", text: "<header>", is_correct: true },
    ],
  },
  {
    id: 6,
    question_type: "true_false",
    question_text:
      "In CSS, `em` units are relative to the font-size of the element’s parent.",
    category: "CSS",
    correct_answer: true,
  },
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
