import { createElement } from "../../utils/dom.js";

/**
 * Creates a timer element that displays countdown as text.
 * @param {number} totalSeconds - Total time to count down from.
 * @returns {{ element: HTMLElement, update: (remaining: number) => void }}
 */
export function createTimerUI(totalSeconds) {
  const timerText = createElement("p", ["timer-text"]);
  timerText.textContent = totalSeconds.toString();

  const update = (remainingSeconds) => {
    timerText.textContent = Math.ceil(remainingSeconds).toString();
  };

  return { element: timerText, update };
}
