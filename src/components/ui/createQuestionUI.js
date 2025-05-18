import {
  createElement,
  appendChildren,
  addClasses,
  selectElement,
} from "../../utils/dom.js";
import formatCategory from "../../utils/formatCategory.js";
import { createMultipleChoiceQuestion } from "../questions/multipleChoice.js";
import { createFillInBlanksQuestion } from "../questions/fillInBlanks.js";
import { createMultiSelectQuestion } from "../questions/multiSelect.js";
import { createTrueFalseQuestion } from "../questions/trueFalse.js";
import { createTimerUI } from "./createTimerUI.js";
import { createProgressBar } from "./createProgressBar.js";
import { createPointsUI } from "./createPointsUI.js";

export function createQuestionUI(questionData, user, onNext) {
  const container = createElement("div", ["question"]);
  const screen = selectElement(".screen--quiz");

  // Get state from user object
  const currentQuestionIndex = user.currentQuestionIndex;
  const timePerQuestion = user.timePerQuestion;
  const numQuestions = user.numQuestions;
  const totalScore = user.score;
  console.log("CQUI TIMER: ", timePerQuestion);

  // Setup timer and progress bar in header, label etc
  const header = document.querySelector(".screen__header");
  header.innerHTML = "";

  const oldProgressBar = selectElement(".progress-bar-wrapper");
  if (oldProgressBar) {
    oldProgressBar.remove();
  }

  const { element: progressElement, update: updateProgress } =
    createProgressBar(numQuestions);
  screen.insertBefore(progressElement, header);

  const { element: timerElement, update: updateTimerBar } =
    createTimerUI(timePerQuestion);

  const { element: pointsElement, update: updatePoints } =
    createPointsUI(totalScore);

  const questionNumber = createElement("h3", ["question__number"]);
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${numQuestions}`;

  const logo = createElement("span", ["logo"]);
  logo.textContent = `Memory Leak`;

  appendChildren(header, [logo, timerElement, pointsElement]);

  updateProgress(currentQuestionIndex);

  const onTick = (remaining) => updateTimerBar(remaining);

  updatePoints(totalScore);

  // Question info

  const categoryText = createElement("span", ["question__category"]);
  categoryText.textContent = formatCategory(questionData.category);

  const questionText = createElement("h2", ["question__name"]);
  questionText.textContent = questionData.question_text;

  const contentSection = createElement("section", ["question__content"]);
  appendChildren(contentSection, [categoryText, questionText]);

  const infoSection = createElement("section", ["question__info"]);
  appendChildren(infoSection, [questionNumber, contentSection]);

  container.appendChild(infoSection);

  // Render question UI based on type
  switch (questionData.question_type) {
    case "multiple_choice":
      addClasses(container, ["multiple-choice"]);
      container.appendChild(
        createMultipleChoiceQuestion(
          questionData,
          onNext,
          onTick,
          timePerQuestion,
        ),
      );
      break;
    case "fill_in_blanks":
      addClasses(container, ["fill-in-blanks"]);
      container.appendChild(
        createFillInBlanksQuestion(
          questionData,
          onNext,
          onTick,
          timePerQuestion,
        ),
      );
      break;
    case "multi_select":
      addClasses(container, ["multi-select"]);
      container.appendChild(
        createMultiSelectQuestion(
          questionData,
          onNext,
          onTick,
          timePerQuestion,
        ),
      );
      break;
    case "true_false":
      addClasses(container, ["true-false"]);
      container.appendChild(
        createTrueFalseQuestion(questionData, onNext, onTick, timePerQuestion),
      );
      break;
    default:
      console.warn("Unsupported question type:", questionData.question_type);
  }

  return container;
}
