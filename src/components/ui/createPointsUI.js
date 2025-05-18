import { appendChildren, createElement } from "../../utils/dom.js";
import star from "../../assets/star.svg";

export function createPointsUI(totalScore) {
  const starIcon = createElement("img", ["star-icon"]);
  starIcon.src = star;
  starIcon.alt = "Star Icon";

  const pointsContainer = createElement("div", [
    "checkbox",
    "points__container",
  ]);
  const pointsText = createElement("p", ["points-text"]);
  pointsText.textContent = `${totalScore.toString()} points`;
  appendChildren(pointsContainer, [starIcon, pointsText]);

  const update = (score) => {
    pointsText.textContent = score.toString();
  };

  return { element: pointsContainer, update };
}
