import { getState } from "../../state.js";
import { createElement } from "../../utils/dom.js";
import { startQuestionTimer } from "../../utils/timer.js";
import { handleAnswer } from "../handlers/handleAnswer.js";
import { createOptionUI } from "../ui/createOptionUI.js";

export function createMultipleChoiceQuestion(data, onNext) {
  const optionsContainer = createElement("div", ["options__container"]);
  let answered = false;

  const { timePerQuestion } = getState().settings;

  const timer = startQuestionTimer(timePerQuestion, () => {
    if (!answered) {
      answered = true;
      console.log("Time's up!");
      onNext();
    }
  });

  data.options.forEach((option) => {
    const optionDiv = createOptionUI(option);

    optionDiv.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      timer.clear();

      handleAnswer(optionDiv, optionsContainer, () => {
        onNext();
      });
    });

    optionsContainer.appendChild(optionDiv);
  });

  return optionsContainer;
}
