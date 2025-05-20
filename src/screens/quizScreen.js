import { showPage } from "../router.js";
import { clearElement, selectElement } from "../utils/dom.js";
import { createQuestionUI } from "../components/ui/createQuestionUI.js";
import { setCurrentUser } from "../components/handlers/handleAnswer.js";
import { LocalStorageService } from "../services/local_store_service.js";

let currentUser = null;

const localStorageService = new LocalStorageService();

/**
 * Function to show the results page.
 * 
 * @param {Object} user - The user object containing user details and results.
 */
function showResultsPage(user) {
  showPage("results-screen");
  const usernameEl = document.getElementById("results-username");
  const scoreEl = document.getElementById("results-score");
  const percent = Math.round((user.correctAnswers / user.numQuestions) * 100);
  usernameEl.textContent = `Username: ${user.userName}`;
  scoreEl.textContent = `Score: ${user.correctAnswers} / ${user.numQuestions} (${percent}%)`;
  localStorageService.setTheScore(user, user.correctAnswers);
}

/**
 * Function to start the quiz.
 * 
 * @param {Object} user 
 */
export function startQuiz(user) {
  currentUser = user;
  window.currentUser = user;
  currentUser.score = 0;
  currentUser.currentQuestionIndex = 0;
  currentUser.correctAnswers = 0;
  setCurrentUser(user);

  showPage("quiz-screen");
  renderQuizPage(currentUser.currentQuestion);
}

/**
 * Function to load the next question in the quiz.
 */
export function loadNextQuestion() {
  currentUser.currentQuestionIndex++;

  if (currentUser.currentQuestionIndex < currentUser.questions.length) {
    renderQuizPage(currentUser.questions[currentUser.currentQuestionIndex]);
  } else {
    showResultsPage(currentUser);
  }
}

/**
 * Function to render the quiz page with the current question.
 * @param {*} questionData 
 * @param {*} containerSelector 
 */
export function renderQuizPage(
  questionData,
  containerSelector = ".screen__question",
) {
  const root = selectElement(containerSelector);
  clearElement(root);

  const questionUI = createQuestionUI(
    questionData,
    currentUser,
    loadNextQuestion,
  );

  root.appendChild(questionUI);
}
