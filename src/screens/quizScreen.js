import { showPage } from "../router.js";
import { clearElement, selectElement } from "../utils/dom.js";
import { createQuestionUI } from "../components/ui/createQuestionUI.js";

let currentUser = null; // Module-local user session state

export function startQuiz(user) {
  currentUser = user;
  showPage("quiz-screen");
  renderQuizPage(currentUser.currentQuestion);
}

export function loadNextQuestion() {
  currentUser.currentQuestionIndex++;

  if (currentUser.currentQuestionIndex < currentUser.questions.length) {
    renderQuizPage(currentUser.questions[currentUser.currentQuestionIndex]);
  } else {
    console.log("Quiz complete!");
    // TODO: showResultsPage(currentUser) or similar
  }
}

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
