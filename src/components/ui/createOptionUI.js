import { createElement, appendChildren } from "../../utils/dom.js";

/**
 * Creates a single option element for a multiple choice question.
 * @param {Object} option - The option object { letter, text }.
 * @returns {HTMLElement} - The rendered DOM element.
 */
export function createOptionUI(option) {
  const optionDiv = createElement("div", [
    "option",
    `option--${option.letter.toLowerCase()}`,
  ]);

  optionDiv.dataset.optionLetter = option.letter;

  const letterSpan = createElement("span", ["option__letter"]);
  letterSpan.textContent = `${option.letter}.`;

  const textP = createElement("p");
  textP.textContent = option.text;

  appendChildren(optionDiv, [letterSpan, textP]);
  return optionDiv;
}
