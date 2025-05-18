import { createElement, appendChildren } from "../../utils/dom.js";
import { startQuestionTimer } from "../../utils/timer.js";
import { handleAnswer } from "../handlers/handleAnswer.js";

/**
 * Renders a fill-in-the-blank question.
 * @param {Object} data - The question object.
 * @param {Function} onNext - Callback when question is complete (timeout or submission).
 * @returns {HTMLElement} - The rendered DOM element for the question.
 */
export function createFillInBlanksQuestion(
  data,
  onNext,
  onTick,
  timePerQuestion,
) {
  const container = createElement("div", ["fill-in-blanks__container"]);
  let answered = false;

  const input = createElement("input", ["fill-in-blanks__input"], {
    type: "text",
    placeholder: "Type your answer...",
  });

  const submitBtn = createElement("button", ["fill-in-blanks__submit"]);
  submitBtn.textContent = "Submit";

  const submit = () => {
    if (answered) return;
    answered = true;

    timer.clear();

    handleAnswer(input, null, onNext, {
      correctAnswer: data.correct_answer,
      questionId: data.id,
    });
  };

  // Keyboard submit (Enter key)
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submit();
  });

  // Button submit
  submitBtn.addEventListener("click", submit);

  const timer = startQuestionTimer(
    timePerQuestion,
    () => {
      if (!answered) {
        answered = true;
        console.log("Time's up!");
        handleAnswer(input, null, onNext, {
          correctAnswer: data.correct_answer,
          questionId: data.id,
        });
      }
    },
    onTick,
  );

  appendChildren(container, [input, submitBtn]);
  return container;
}
