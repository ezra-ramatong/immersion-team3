import { createElement } from "../../utils/dom.js";

/**
 * Creates a clean, full-width progress bar UI.
 * @param {number} totalQuestions - Total number of questions.
 * @returns {{ element: HTMLElement, update: (currentIndex: number) => void }}
 */
export function createProgressBar(totalQuestions) {
  const wrapper = createElement("div", ["progress-bar-wrapper"]);

  const progressBar = createElement("div", ["progress-bar"]);
  const fill = createElement("div", ["progress-bar__fill"]);

  progressBar.appendChild(fill);
  wrapper.appendChild(progressBar);

  const update = (currentIndex) => {
    const percent = ((currentIndex + 1) / totalQuestions) * 100;
    fill.style.width = `${percent}%`;
  };

  return { element: wrapper, update };
}
