const questionsNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const timeLimits = [3, 6, 10, 15, 20];
let startIndex = 0;
let timeIndex = 0;
const visibleCount = 3;
let selectedQuestions = questionsNumber[0];
let selectedTime = timeLimits[0];

function renderQuestionsNumber() {
  const quantityButton = document.getElementById("quantityButton");
  const allCircles = quantityButton.querySelectorAll(".circle");
  allCircles.forEach((c, i) => {
    if (i !== 0 && i !== allCircles.length - 1) c.remove();
  });

  questionsNumber
    .slice(startIndex, startIndex + visibleCount)
    .forEach((quantity) => {
      const div = document.createElement("div");
      div.className = "circle";
      div.textContent = quantity;
      if (quantity === selectedQuestions)
        (div.style.background = "#4f8cff"), (div.style.color = "white");
      div.onclick = () => {
        selectedQuestions = quantity;
        renderQuestionsNumber();
        updateSelectedValues();
      };
      quantityButton.insertBefore(
        div,
        quantityButton.children[quantityButton.children.length - 1],
      );
    });
}

function renderTimeLimit() {
  const timeLimitDiv = document.getElementById("timeLimit");
  const allCircles = timeLimitDiv.querySelectorAll(".circle");
  allCircles.forEach((c, i) => {
    if (i !== 0 && i !== allCircles.length - 1) c.remove();
  });

  timeLimits.slice(timeIndex, timeIndex + visibleCount).forEach((limit) => {
    const div = document.createElement("div");
    div.className = "circle";
    div.textContent = limit + "s";
    if (limit === selectedTime)
      (div.style.background = "#4f8cff"), (div.style.color = "white");
    div.onclick = () => {
      selectedTime = limit;
      renderTimeLimit();
      updateSelectedValues();
    };
    timeLimitDiv.insertBefore(
      div,
      timeLimitDiv.children[timeLimitDiv.children.length - 1],
    );
  });
}

function prev(type) {
  if (type === "questions" && startIndex > 0) {
    startIndex--;
    renderQuestionsNumber();
  }
  if (type === "time" && timeIndex > 0) {
    timeIndex--;
    renderTimeLimit();
  }
}

function next(type) {
  if (
    type === "questions" &&
    startIndex + visibleCount < questionsNumber.length
  ) {
    startIndex++;
    renderQuestionsNumber();
  }
  if (type === "time" && timeIndex + visibleCount < timeLimits.length) {
    timeIndex++;
    renderTimeLimit();
  }
}

function updateSelectedValues() {
  document.getElementById("selectedValues").textContent =
    `Selected: ${selectedQuestions} questions, ${selectedTime}s time limit`;
}

function showSaveMsg(msg, success = true) {
  const el = document.getElementById("saveMsg");
  el.textContent = msg;
  el.style.display = "block";
  el.style.color = success ? "#4f8cff" : "#d32f2f";
  setTimeout(() => {
    el.style.display = "none";
  }, 2000);
}

document.querySelector(".save-button").onclick = function () {
  const btn = this;
  btn.disabled = true;
  fetch("/api/quiz-settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      questionsNumber: selectedQuestions,
      timeLimit: selectedTime,
    }),
  })
    .then((res) => res.json())
    .then((data) => showSaveMsg("Settings saved!"))
    .catch(() => showSaveMsg("Failed to save settings", false))
    .finally(() => (btn.disabled = false));
};

document.getElementById("quantityButton").children[0].onclick = () =>
  prev("questions");

document.getElementById("quantityButton").children[
  document.getElementById("quantityButton").children.length - 1
].onclick = () => next("questions");

document.getElementById("timeLimit").children[0].onclick = () => prev("time");

document.getElementById("timeLimit").children[
  document.getElementById("timeLimit").children.length - 1
].onclick = () => next("time");

document.getElementById("addQuestionBtn").onclick = function () {
  const input = document.getElementById("customQuestionInput");
  input.style.display = "inline-block";
  input.value = "";
  input.focus();
  document.getElementById("questionHelper").style.display = "block";
};
document.getElementById("customQuestionInput").onblur = function () {
  this.style.display = "none";
  document.getElementById("questionHelper").style.display = "none";
};

document.getElementById("customQuestionInput").onkeydown = function (e) {
  if (e.key === "Enter") {
    const val = parseInt(this.value, 10);
    if (!isNaN(val) && val > 0 && !questionsNumber.includes(val)) {
      questionsNumber.push(val);
      questionsNumber.sort((a, b) => a - b);
      selectedQuestions = val;
      renderQuestionsNumber();
      updateSelectedValues();
    }
    this.style.display = "none";
    document.getElementById("questionHelper").style.display = "none";
  }
};

document.getElementById("addTimeBtn").onclick = function () {
  const input = document.getElementById("customTimeInput");
  input.style.display = "inline-block";
  input.value = "";
  input.focus();
  document.getElementById("timeHelper").style.display = "block";
};
document.getElementById("customTimeInput").onblur = function () {
  this.style.display = "none";
  document.getElementById("timeHelper").style.display = "none";
};

document.getElementById("customTimeInput").onkeydown = function (e) {
  if (e.key === "Enter") {
    const val = parseInt(this.value, 10);
    if (!isNaN(val) && val > 0 && !timeLimits.includes(val)) {
      timeLimits.push(val);
      timeLimits.sort((a, b) => a - b);
      selectedTime = val;
      renderTimeLimit();
      updateSelectedValues();
    }
    this.style.display = "none";
    document.getElementById("timeHelper").style.display = "none";
  }
};

window.onload = () => {
  fetch("/api/quiz-settings")
    .then((res) => res.json())
    .then((data) => {
      if (data.questionsNumber) selectedQuestions = data.questionsNumber;
      if (data.timeLimit) selectedTime = data.timeLimit;
      renderQuestionsNumber();
      renderTimeLimit();
      updateSelectedValues();
    })
    .catch(() => {
      renderQuestionsNumber();
      renderTimeLimit();
      updateSelectedValues();
    });
};

module.exports = {
  renderQuestionsNumber,
  renderTimeLimit,
  prev,
  next,
  updateSelectedValues,
};