import { createElement, appendChildren } from "../../utils/dom.js";

/**
 * Creates a single option element for a multiple choice question.
 * @param {Object} option - The option object { letter, text }.
 * @returns {HTMLElement} - The rendered DOM element.
 */
export function createOptionUI(option, index, optionalLetter) {
  const colors = ["bg-blue", "bg-orange", "bg-coral", "bg-purple"];
  const color = colors[index % colors.length];

  const letter =
    optionalLetter ||
    option?.letter ||
    (option?.text ? option.text.charAt(0).toUpperCase() : "?");

  const optionDiv = createElement("div", [
    "option",
    `option--${letter.toLowerCase()}`,
    color,
  ]);

  optionDiv.dataset.optionLetter = letter;

  const letterContainer = createElement("div", ["option__letter-container"]);

  const letterSpan = createElement("span", ["option__letter"]);
  letterSpan.textContent = letter;

  letterContainer.appendChild(letterSpan);

  const textP = createElement("p");
  textP.textContent = option?.text || "Missing text";

  appendChildren(optionDiv, [letterContainer, textP]);

  return optionDiv;
}
