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

import {
  createElement,
  appendChildren,
  clearElement,
  selectElement,
  addClasses,
} from "../utils/dom.js";

import { shuffleArray } from "../utils/shuffle.js";

export function startQuiz(username, categories) {
  setUser(username);
  setSettings({
    numQuestions: 10,
    timePerQuestion: 30,
    categories,
  });

  const allQuestions = getQuestions();
  const filtered = allQuestions.filter((q) => categories.includes(q.category));

  const shuffled = shuffleArray(filtered);
  const { numQuestions } = getState().settings;

  setQuestions(shuffled.slice(0, numQuestions));

  showPage("quiz-view");
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
  const questionUI = createQuestionUI(questionData);
  root.appendChild(questionUI);
}

function createQuestionUI(questionData) {
  const container = createElement("div", ["question"]); // Changed to "question"

  const { currentQuestionIndex } = getState();
  const questionNumber = createElement("h3", ["question__number"]);
  questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;

  const categoryText = createElement("span", ["question__category"]);
  categoryText.textContent = questionData.category;

  const questionText = createElement("h2", ["question__name"]);
  questionText.textContent = questionData.question_text;

  const contentSection = createElement("section", ["question__content"]);
  appendChildren(contentSection, [categoryText, questionText]);

  const infoSection = createElement("section", ["question__info"]);
  appendChildren(infoSection, [questionNumber, contentSection]);

  container.appendChild(infoSection);

  switch (questionData.question_type) {
    case "multiple_choice":
      addClasses(container, ["multiple-choice"]);
      container.appendChild(createMultipleChoiceQuestion(questionData));
      break;
    // TODO: Add cases for other question types
  }

  return container;
}

function createMultipleChoiceQuestion(data) {
  const optionsContainer = createElement("div", ["options__container"]);
  let answered = false;

  const { timePerQuestion } = getState().settings;

  // Start the countdown timer
  const timerId = setTimeout(() => {
    if (!answered) {
      answered = true;
      console.log("Time's up!");
      loadNextQuestion(); // Automatically load next question when time's up
    }
  }, timePerQuestion * 1000);

  // Loop through options and create the multiple choice elements
  data.options.forEach((option) => {
    const optionDiv = createElement("div", [
      "option",
      `option--${option.letter.toLowerCase()}`,
    ]);

    const letterSpan = createElement("span", ["option__letter"]);
    letterSpan.textContent = `${option.letter}.`;

    const textP = createElement("p");
    textP.textContent = option.text;

    appendChildren(optionDiv, [letterSpan, textP]);

    optionDiv.addEventListener("click", () => {
      if (answered) return; // prevent double clicks after answering
      answered = true;

      // Clear the timeout since the user answered manually
      clearTimeout(timerId);

      // Visually mark selection
      optionsContainer
        .querySelectorAll(".option")
        .forEach((opt) => opt.classList.remove("selected"));
      optionDiv.classList.add("selected");

      // Optionally: Save answer to state here (e.g. store the user's selection)

      // Show feedback briefly, then move to next question
      setTimeout(() => {
        loadNextQuestion();
      }, 1500);
    });

    optionsContainer.appendChild(optionDiv);
  });

  return optionsContainer;
}
