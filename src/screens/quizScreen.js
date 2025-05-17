import { getQuestions } from "../data/questions.js";
import { showPage } from "../router.js";
import {
  setUser,
  setSettings,
  setQuestions,
  getCurrentQuestion,
  getState,
  nextQuestion,
} from "../state.js";

import { clearElement, selectElement } from "../utils/dom.js";

import { shuffleArray } from "../utils/shuffle.js";
import { createQuestionUI } from "../components/ui/createQuestionUI.js";

export function startQuiz(username, categories) {
  setUser(username);
  setSettings({ categories });

  const allQuestions = getQuestions();
  const filtered = allQuestions.filter((q) => categories.includes(q.category));

  const shuffled = shuffleArray(filtered);
  const { numQuestions } = getState().settings;

  setQuestions(shuffled.slice(0, numQuestions));

  showPage("quiz-screen");
  renderQuizPage(getCurrentQuestion());
}

export function loadNextQuestion() {
  nextQuestion();
  const { currentQuestionIndex, questions } = getState();

  if (currentQuestionIndex < questions.length) {
    renderQuizPage(getCurrentQuestion());
  } else {
    console.log("Quiz complete!");
    // showResultsPage() or similar
  }
}

export function renderQuizPage(
  questionData,
  containerSelector = ".screen__question",
) {
  const root = selectElement(containerSelector);
  clearElement(root);
  const questionUI = createQuestionUI(questionData, loadNextQuestion);
  root.appendChild(questionUI);
}
