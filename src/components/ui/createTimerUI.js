import { appendChildren, createElement } from "../../utils/dom.js";
import clock from "../../assets/clock.svg";

/**
 * Creates a timer element that displays countdown as text.
 * @param {number} totalSeconds - Total time to count down from.
 * @returns {{ element: HTMLElement, update: (remaining: number) => void }}
 */
export function createTimerUI(totalSeconds) {
  console.log("TOTALSECONDS: ", totalSeconds);
  const clockIcon = createElement("img", ["timer-icon"]);
  clockIcon.src = clock;
  clockIcon.alt = "Clock Icon";

  const timerContainer = createElement("div", ["timer-container"]);
  const timerText = createElement("p", ["timer-text"]);
  timerText.textContent = totalSeconds.toString();
  appendChildren(timerContainer, [clockIcon, timerText]);

  const update = (remainingSeconds) => {
    timerText.textContent = Math.ceil(remainingSeconds).toString();
  };

  return { element: timerContainer, update };
}
