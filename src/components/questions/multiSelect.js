// src/components/questions/multiSelect.js

import { getState } from "../../state.js";
import { createElement, appendChildren } from "../../utils/dom.js";
import { startQuestionTimer } from "../../utils/timer.js";

/**
 * Renders a multi-select question.
 * @param {Object} data - The question object.
 * @param {Function} onNext - Callback to call when question is complete.
 * @returns {HTMLElement} - The rendered DOM element for the question.
 */
export function createMultiSelectQuestion(data, onNext) {
  const container = createElement("div", ["multi-select__container"]);
  let answered = false;

  const { timePerQuestion } = getState().settings;

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

    // Toggle selection on click
    optionDiv.addEventListener("click", () => {
      optionDiv.classList.toggle("selected");
    });

    optionsContainer.appendChild(optionDiv);
  });

  const submitBtn = createElement("button", ["multi-select__submit"]);
  submitBtn.textContent = "Submit";

  const submit = () => {
    if (answered) return;
    answered = true;

    timer.clear();

    // TODO: could collect selected answers here if needed

    // Disable further interaction
    optionsContainer
      .querySelectorAll(".option")
      .forEach((el) => el.classList.add("locked"));

    setTimeout(() => {
      onNext();
    }, 1500);
  };

  submitBtn.addEventListener("click", submit);

  const timer = startQuestionTimer(timePerQuestion, () => {
    if (!answered) {
      answered = true;
      console.log("Time's up!");
      submit();
    }
  });

  appendChildren(container, [optionsContainer, submitBtn]);
  return container;
}
