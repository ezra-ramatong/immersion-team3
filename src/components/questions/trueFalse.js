import { getState } from "../../state.js";
import { createElement, appendChildren } from "../../utils/dom.js";
import { startQuestionTimer } from "../../utils/timer.js";
import { handleAnswer } from "../handlers/handleAnswer.js";

/**
 * Renders a true/false question.
 * @param {Object} data - The question object.
 * @param {Function} onNext - Callback to call when question is complete.
 * @returns {HTMLElement} - The rendered DOM element for the question.
 */
export function createTrueFalseQuestion(data, onNext) {
  const container = createElement("div", ["true-false__container"]);
  let answered = false;

  const { timePerQuestion } = getState().settings;

  const options = [
    { text: "True", value: true },
    { text: "False", value: false },
  ];

  const optionsContainer = createElement("div", ["options__container"]);

  options.forEach((opt) => {
    const optionDiv = createElement("div", ["option"]);
    optionDiv.textContent = opt.text;

    optionDiv.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      timer.clear();

      handleAnswer(optionDiv, optionsContainer, onNext);
    });

    optionsContainer.appendChild(optionDiv);
  });

  const timer = startQuestionTimer(timePerQuestion, () => {
    if (!answered) {
      answered = true;
      console.log("Time's up!");
      onNext();
    }
  });

  appendChildren(container, [optionsContainer]);
  return container;
}
