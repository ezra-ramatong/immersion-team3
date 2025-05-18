// Import styles
import "./styles/main.scss";

// Import utilities and services
import { showPage } from "./router.js";
import { User } from "./models/user_model.js";
import { LocalStorageService } from "./services/local_store_service.js";
import QuizService from "./services/QuizService.js"; // renamed from UserService
import { selectElement } from "./utils/dom.js";
import { startQuiz } from "./screens/quizScreen.js"; // assumed quiz logic starts here

// Initialize services
const localStorageService = new LocalStorageService();
const quizService = new QuizService();

// DOM elements
const submitBtn = selectElement(".submit-user-info");
const startBtn = selectElement(".start-btn");

// Navigation: go to user info screen
startBtn.onclick = () => {
  showPage("user-info-screen");
};

// Handle user submission
submitBtn.onclick = async () => {
  const username = selectElement("#userName").value;
  const category = selectElement("#tech-category").value;

  // Basic validation
  if (!username || !category) {
    alert("Please enter your username and select a category.");
    return;
  }

  const user = new User(username, category);

  try {
    // Get quiz settings (e.g. time per question)
    const settings = await quizService.getSettings();
    user.timePerQuestion = settings.timePerQuestion || 30;
    user.numQuestions = settings.numQuestions;

    // Fetch and assign category-specific questions
    let questions = await quizService.getQuestionsByCategory(category);
    console.log(questions);
    if (!questions.length) {
      alert("No questions found for this category. Please try another.");
      return;
    }

    if (settings.numQuestions && questions.length > settings.numQuestions) {
      questions = questions.sort(() => Math.random() - 0.5).slice(0, settings.numQuestions);
    }

    user.questions = questions;
    user.numQuestions = questions.length;

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
