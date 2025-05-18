import { selectElements } from "./dom.js";

/**
 * Marks correct, incorrect, and locks all options.
 * @param {HTMLElement|null} selectedEl - The option element the user selected, or null if timed out.
 * @param {string|boolean} correctValue - The correct answer's value to compare against.
 * @param {HTMLElement} container - The container element holding all option elements.
 * @param {string} [dataAttr="value"] - The data attribute key to check on option elements (default is "value").
 */
export function markAnswers(
  selectedEl,
  correctValue,
  container,
  dataAttr = "value",
) {
  const allOptions = selectElements(".option", container);

  allOptions.forEach((el) => {
    const optionValue = el.dataset[dataAttr];
    const isCorrect = String(optionValue) === String(correctValue);

    if (isCorrect) {
      el.classList.add("correct");
    } else {
      el.classList.add("incorrect");
    }
    el.classList.add("locked");
  });
}
