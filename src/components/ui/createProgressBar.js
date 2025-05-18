import { createElement, appendChildren } from "../../utils/dom.js";

/**
 * Creates a question progress bar UI with a label.
 * @param {number} totalQuestions - Total number of questions.
 * @returns {{ element: HTMLElement, update: (currentIndex: number) => void }}
 */
export function createProgressBar(totalQuestions) {
  const wrapper = createElement("div", ["progress-bar-wrapper"]);

  // Label showing current question out of total
  const label = createElement("span", ["progress-bar__label"]);
  label.textContent = `1 / ${totalQuestions}`;

  // Progress bar container and fill
  const progressBar = createElement("div", ["progress-bar"]);
  const fill = createElement("div", ["progress-bar__fill"]);

  progressBar.appendChild(fill);
  appendChildren(wrapper, [label, progressBar]);

  const update = (currentIndex) => {
    // currentIndex is zero-based, so add 1 for display
    const displayIndex = currentIndex + 1;
    label.textContent = `${displayIndex} / ${totalQuestions}`;

    const percent = (displayIndex / totalQuestions) * 100;
    fill.style.width = `${percent}%`;
  };

  return { element: wrapper, update };
}
