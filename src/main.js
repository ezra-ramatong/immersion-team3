// Import styles
import "./styles/main.scss";

// Import utilities and services
import { showPage } from "./router.js";
import { User } from "./models/user_model.js";
import { LocalStorageService } from "./services/local_store_service.js";
import QuizService from "./services/QuizService.js";
import { selectElement } from "./utils/dom.js";
import { startQuiz } from "./screens/quizScreen.js";
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
  const checkboxes = document.querySelectorAll(
    '#user-categories input[type="checkbox"]:checked',
  );
  const selectedCategories = Array.from(checkboxes).map((cb) => cb.value);

  if (!username || selectedCategories.length === 0) {
    alert("Please enter your username and select at least one category.");
    return;
  }

  const user = new User(username, selectedCategories);

  try {
    const settings = await quizService.getSettings();
    user.timePerQuestion = settings.timePerQuestion || 30;
    user.numQuestions = settings.numQuestions;

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

    localStorageService.saveUser(user);

    showPage("quiz-screen");

    startQuiz(user);
  } catch (error) {
    console.error("Error loading quiz data:", error);
    alert("An error occurred while starting the quiz. Please try again.");
  }
};

const resultsBackBtn = document.getElementById("results-back-btn");
if (resultsBackBtn) {
  resultsBackBtn.onclick = () => {
    showPage("start-screen");
  };
}
