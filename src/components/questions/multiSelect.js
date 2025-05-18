import {
  createElement,
  appendChildren,
  selectElements,
} from "../../utils/dom.js";
import { startQuestionTimer } from "../../utils/timer.js";

/**
 * Renders a multi-select question.
 * @param {Object} data - The question object.
 * @param {Function} onNext - Callback to call when question is complete.
 * @param {Function} [onTick] - Optional callback called every second with remaining time.
 * @param {number} onTick.remainingSeconds - The number of seconds left in the countdown.
 * @returns {HTMLElement} - The rendered DOM element for the question.
 */
export function createMultiSelectQuestion(
  data,
  onNext,
  onTick,
  timePerQuestion,
) {
  const container = createElement("div", ["multi-select__container"]);
  let answered = false; 

  const optionsContainer = createElement("div", ["options__container"]);

  data.options.forEach((option) => {
    const optionDiv = createElement(
      "div",
      ["option", `option--${option.letter.toLowerCase()}`],
      {
        "data-option-letter": option.letter,
      },
    );

    const letterSpan = createElement("span", ["option__letter"]);
    letterSpan.textContent = `${option.letter}.`;

    const textP = createElement("p");
    textP.textContent = option.text;

    appendChildren(optionDiv, [letterSpan, textP]);

    optionDiv.addEventListener("click", () => {
      if (answered) return; // disable selection after answering
      optionDiv.classList.toggle("selected");
    });

    optionsContainer.appendChild(optionDiv);
  });

  const submitBtn = createElement("button", ["multi-select__submit"]);
  submitBtn.textContent = "Submit";

  const markAnswers = () => {
    const allOptions = selectElements(".option", optionsContainer);
    allOptions.forEach((el) => {
      const letter = el.dataset.optionLetter;
      const isSelected = el.classList.contains("selected");
      const isCorrect = data.correct_answer.includes(letter);

      if (isCorrect) {
        el.classList.add("correct");
      }
      if (isSelected && !isCorrect) {
        el.classList.add("incorrect");
      }

      el.classList.add("locked");
    });
  };

  const submit = () => {
    if (answered) return;
    answered = true;

    timer.clear();

    const allOptions = selectElements(".option", optionsContainer);
    const selected = Array.from(allOptions)
      .filter((el) => el.classList.contains("selected"))
      .map((el) => el.dataset.optionLetter);
    const correct = data.correct_answer || data.correct_answers;
    const isCorrect =
      Array.isArray(correct) &&
      selected.length === correct.length &&
      selected.every((val) => correct.includes(val)) &&
      correct.every((val) => selected.includes(val));
    if (isCorrect && window.currentUser) {
      window.currentUser.correctAnswers++;
    }

    markAnswers();

    setTimeout(() => {
      onNext();
    }, 1500);
  };

  submitBtn.addEventListener("click", submit);

  const timer = startQuestionTimer(
    timePerQuestion,
    () => {
      if (!answered) {
        answered = true;
        console.log("Time's up!");

        markAnswers();

        setTimeout(onNext, 1500);
      }
    },
    onTick,
  );

  appendChildren(container, [optionsContainer, submitBtn]);
  return container;
}
