// Import styles
import "./styles/main.scss";

// Import utilities and services
import { showPage } from "./router.js";
import { User } from "./models/user_model.js";
import { LocalStorageService } from "./services/local_store_service.js";
import QuizService from "./services/QuizService.js"; // renamed from UserService
import { selectElement } from "./utils/dom.js";
import { startQuiz } from "./screens/quizScreen.js"; // assumed quiz logic starts here
import { shuffleArray } from "./utils/shuffle.js";

// Initialize services
const localStorageService = new LocalStorageService();
const quizService = new QuizService();
let rank = 0;

// DOM elements
const submitBtn = selectElement(".submit-user-info");
const startBtn = selectElement(".start-btn");
const categoryOption = selectElement(".leaderboard-category");

// Navigation: go to user info screen
startBtn.onclick = () => {
  showPage("user-info-screen");
};

//When leaderboard category is selected
categoryOption.addEventListener("change", function () {
  const leaderboard = localStorageService.getLeaderboard(categoryOption.value);
  const resultsTableBody = selectElement("#results-body");
  rank = 0;

  while (resultsTableBody.firstChild) {
    resultsTableBody.removeChild(resultsTableBody.firstChild);
  }

  leaderboard.forEach((userResult) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${++rank}</td>
      <td>${userResult.userName}</td>
      <td>${userResult.correctAnswers}</td>`;
    resultsTableBody.appendChild(row);
  });
});

// Handle user submission
submitBtn.onclick = async (event) => {
  event.preventDefault();
  const username = selectElement("#userName").value;
  // const category = selectElement("#tech-category").value;
  const checkboxes = document.querySelectorAll(
    '#user-categories input[type="checkbox"]:checked',
  );
  const selectedCategories = Array.from(checkboxes).map((cb) => cb.value);

  if (!username || selectedCategories.length === 0) {
    alert("Please enter your username and select at least one category.");
    return;
  }

  // Basic validation
  /*
  if (!username || !category) {
    alert("Please enter your username and select a category.");
    return;
  }*/

  const user = new User(username, selectedCategories);

  try {
    // Get quiz settings (e.g. time per question)
    const settings = await quizService.getSettings();
    user.timePerQuestion = settings.timePerQuestion || 30;
    user.numQuestions = settings.numQuestions;

    // Fetch and assign category-specific questions
    const questions =
      await quizService.getQuestionsByCategories(selectedCategories);
    console.log(questions);

    if (!questions.length) {
      alert("No questions found for this category. Please try another.");
      return;
    }

    const limitedQuestions = shuffleArray(questions).slice(
      0,
      user.numQuestions,
    );

    user.questions = limitedQuestions;
    // user.numQuestions = questions.length;

    // Optionally save user to localStorage
    localStorageService.saveUser(user);

    // Navigate to quiz screen
    showPage("quiz-screen");

    // Start the quiz logic
    startQuiz(user);
  } catch (error) {
    console.error("Error loading quiz data:", error);
    alert("An error occurred while starting the quiz. Please try again.");
  }
};

// Results screen logic
const resultsBackBtn = document.getElementById("results-back-btn");
if (resultsBackBtn) {
  resultsBackBtn.onclick = () => {
    showPage("start-screen");
  };
}

// DEV ONLY: Skip to quiz screen with dummy user and question
const isDevMode = false;

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
