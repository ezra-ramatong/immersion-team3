import { createElement, appendChildren } from "../../utils/dom.js";
import { startQuestionTimer } from "../../utils/timer.js";
import { markAnswers } from "../../utils/markAnswers.js";
import { createOptionUI } from "../ui/createOptionUI.js";

/**
 * Renders a true/false question.
 * @param {Object} data - The question object.
 * @param {Function} onNext - Callback to call when question is complete.
 * @returns {HTMLElement} - The rendered DOM element for the question.
 */
export function createTrueFalseQuestion(data, onNext, onTick, timePerQuestion) {
  const container = createElement("div", ["true-false__container"]);
  let answered = false;

  const options = [
    { text: "True", value: true },
    { text: "False", value: false },
  ];

  const optionsContainer = createElement("div", ["options__container"]);

  options.forEach((option) => {
    const optionDiv = createOptionUI(option);

    optionDiv.dataset.value = option.value;

    optionDiv.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      timer.clear();

      const correctValue = String(data.correct_answer).toLowerCase() === "true";
      if (option.value === correctValue && window.currentUser) {
        window.currentUser.correctAnswers++;
      }

      markAnswers(optionDiv, data.correct_answer, optionsContainer, "value");

      setTimeout(onNext, 1500);
    });

    optionsContainer.appendChild(optionDiv);
  });

  const timer = startQuestionTimer(
    timePerQuestion,
    () => {
      if (!answered) {
        answered = true;
        console.log("Time's up!");

        markAnswers(null, data.correct_answer, optionsContainer, "value");

        setTimeout(onNext, 1500);
      }
    },
    onTick,
  );

  appendChildren(container, [optionsContainer]);
  return container;
}
