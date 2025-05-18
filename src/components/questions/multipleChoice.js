import { createElement } from "../../utils/dom.js";
import { startQuestionTimer } from "../../utils/timer.js";
import { markAnswers } from "../../utils/markAnswers.js";
import { createOptionUI } from "../ui/createOptionUI.js";

export function createMultipleChoiceQuestion(
  data,
  onNext,
  onTick,
  timePerQuestion,
) {
  const optionsContainer = createElement("div", ["options__container"]);
  let answered = false;

  const timer = startQuestionTimer(
    timePerQuestion,
    () => {
      if (!answered) {
        answered = true;
        console.log("Time's up!");

        markAnswers(null, data.correct_answer, optionsContainer, "letter");

        setTimeout(onNext, 1500);
      }
    },
    onTick,
  );

  data.options.forEach((option) => {
    const optionDiv = createOptionUI(option);

    optionDiv.dataset.letter = option.letter;

    optionDiv.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      timer.clear();

      if (option.letter === data.correct_answer && window.currentUser) {
        window.currentUser.correctAnswers++;
      }

      markAnswers(optionDiv, data.correct_answer, optionsContainer, "letter");

      setTimeout(onNext, 1500);
    });

    optionsContainer.appendChild(optionDiv);
  });

  return optionsContainer;
}
