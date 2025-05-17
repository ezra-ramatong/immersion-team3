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

  const isCorrect = answerContext?.isCorrect || false;
  if (isCorrect) {
    incrementScore();
    addClasses(selectedEl, ["correct"]);
  } else {
    addClasses(selectedEl, ["incorrect"]);
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

  if (userAnswer === "") {
    // Optionally provide feedback on empty input or ignore
    return;
  }

  inputEl.disabled = true;

  // Check if the user's input matches the correct answer (case-insensitive)
  if (userAnswer === correctAnswer) {
    incrementScore();
    addClasses(inputEl, ["correct"]);
  } else {
    addClasses(inputEl, ["incorrect"]);
  }

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
