import { createElement, appendChildren, addClasses } from "../../utils/dom.js";
import { createMultipleChoiceQuestion } from "../questions/multipleChoice.js";
import { createFillInBlanksQuestion } from "../questions/fillInBlanks.js";
import { createMultiSelectQuestion } from "../questions/multiSelect.js";
import { createTrueFalseQuestion } from "../questions/trueFalse.js";
import { createTimerUI } from "./createTimerUI.js";
import { createProgressBar } from "./createProgressBar.js";

export function createQuestionUI(questionData, user, onNext) {
  const container = createElement("div", ["question"]);

  // Get state from user object
  const currentQuestionIndex = user.currentQuestionIndex;
  const timePerQuestion = user.timePerQuestion;
  const numQuestions = user.numQuestions;
  console.log("CQUI TIMER: ", timePerQuestion);

  // Setup timer and progress bar in header
  const header = document.querySelector(".screen__header");
  header.innerHTML = "";

  const { element: progressElement, update: updateProgress } =
    createProgressBar(numQuestions);
  const { element: timerElement, update: updateTimerBar } =
    createTimerUI(timePerQuestion);
  appendChildren(header, [progressElement, timerElement]);

  updateProgress(currentQuestionIndex);

  const onTick = (remaining) => updateTimerBar(remaining);

  // Question info
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
