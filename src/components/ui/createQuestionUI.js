import { getState } from "../../state.js";
import { createElement, appendChildren, addClasses } from "../../utils/dom.js";
import { createMultipleChoiceQuestion } from "../questions/multipleChoice.js";
import { createFillInBlanksQuestion } from "../questions/fillInBlanks.js";
import { createMultiSelectQuestion } from "../questions/multiSelect.js";
import { createTrueFalseQuestion } from "../questions/trueFalse.js";
import { createTimerUI } from "./createTimerUI.js";

export function createQuestionUI(questionData, onNext) {
  const container = createElement("div", ["question"]);

  const { currentQuestionIndex, settings } = getState();
  const timePerQuestion = settings.timePerQuestion;

  // ⏱ Setup timer bar
  const header = document.querySelector(".screen__header");
  header.innerHTML = "";
  const { element: timerElement, update: updateTimerBar } =
    createTimerUI(timePerQuestion);
  header.appendChild(timerElement);

  const onTick = (remaining) => updateTimerBar(remaining);

  const questionNumber = createElement("h3", ["question__number"]);
  questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;

  const categoryText = createElement("span", ["question__category"]);
  categoryText.textContent = questionData.category;

  const questionText = createElement("h2", ["question__name"]);
  questionText.textContent = questionData.question_text;

  const contentSection = createElement("section", ["question__content"]);
  appendChildren(contentSection, [categoryText, questionText]);

  const infoSection = createElement("section", ["question__info"]);
  appendChildren(infoSection, [questionNumber, contentSection]);

  container.appendChild(infoSection);

  switch (questionData.question_type) {
    case "multiple_choice":
      addClasses(container, ["multiple-choice"]);
      container.appendChild(
        createMultipleChoiceQuestion(questionData, onNext, onTick),
      );
      break;
    case "fill_in_blanks":
      addClasses(container, ["fill-in-blanks"]);
      container.appendChild(
        createFillInBlanksQuestion(questionData, onNext, onTick),
      );
      break;
    case "multi_select":
      addClasses(container, ["multi-select"]);
      container.appendChild(
        createMultiSelectQuestion(questionData, onNext, onTick),
      );
      break;
    case "true_false":
      addClasses(container, ["true-false"]);
      container.appendChild(
        createTrueFalseQuestion(questionData, onNext, onTick),
      );
      break;
    default:
      console.warn("Unsupported question type:", questionData.question_type);
  }

  return container;
}
