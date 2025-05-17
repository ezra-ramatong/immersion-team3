import { addClasses, selectElements } from "../../utils/dom.js";
import { incrementScore } from "../../state.js";

/**
 * Handles user selecting an option answer.
 * @param {HTMLElement} selectedEl - The clicked option element.
 * @param {HTMLElement} container - The parent container of all options.
 * @param {Function} onComplete - Callback after feedback delay.
 * @param {Object} answerContext - Context containing correct answer info.
 */
export function handleOptionAnswer(
  selectedEl,
  container,
  onComplete,
  answerContext,
) {
  selectElements(".option", container).forEach((el) =>
    el.classList.remove("selected"),
  );

  addClasses(selectedEl, ["selected"]);

  const correctLetter = answerContext.correctAnswer;

  selectElements(".option", container).forEach((el) => {
    const letter = el.dataset.optionLetter;

    if (letter === correctLetter) {
      addClasses(el, ["correct"]);
    } else if (el === selectedEl) {
      addClasses(el, ["incorrect"]);
    }

    el.classList.add("locked");
  });

  if (answerContext.isCorrect) {
    incrementScore();
  }

  setTimeout(onComplete, 1500);
}

/**
 * Handles user submitting an input answer.
 * @param {HTMLInputElement} inputEl - The input element where user types the answer.
 * @param {Function} onComplete - Callback after feedback delay.
 * @param {Object} answerContext - Context containing correct answer info.
 */
export function handleInputAnswer(inputEl, onComplete, answerContext) {
  const userAnswer = inputEl.value.trim().toLowerCase();
  const correctAnswer = (answerContext.correctAnswer || "").toLowerCase();

  inputEl.disabled = true;

  const feedbackMsg = document.createElement("div");
  feedbackMsg.classList.add("feedback");

  if (userAnswer === correctAnswer) {
    incrementScore();
    addClasses(inputEl, ["correct"]);
    feedbackMsg.textContent = "Correct!";
    feedbackMsg.classList.add("feedback--correct");
  } else {
    addClasses(inputEl, ["incorrect"]);
    feedbackMsg.textContent = `Correct answer: ${answerContext.correctAnswer}`;
    feedbackMsg.classList.add("feedback--incorrect");
  }

  inputEl.insertAdjacentElement("afterend", feedbackMsg);

  setTimeout(onComplete, 1500);
}

/**
 * Dispatcher that calls appropriate handler based on element type.
 * @param {HTMLElement} el - The selected element (input or option).
 * @param {HTMLElement|null} container - The container for options (null for inputs).
 * @param {Function} onComplete - Callback after feedback delay.
 * @param {Object} answerContext - Context containing correct answer info.
 */
export function handleAnswer(el, container, onComplete, answerContext = {}) {
  if (el.tagName === "INPUT") {
    handleInputAnswer(el, onComplete, answerContext);
  } else {
    handleOptionAnswer(el, container, onComplete, answerContext);
  }
}
