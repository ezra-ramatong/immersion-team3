let questions = [];
let categories = [];

fetch("/api/questions")
  .then((res) => res.json())
  .then((data) => {
    questions = data;
    categories = Array.from(new Set(questions.map((q) => q.category)));
    renderHeaders();
    renderQuestions();
  });

function renderHeaders() {
  const headerRow = document.getElementById("categoryHeaders");
  headerRow.innerHTML = "";
  categories.forEach((cat) => {
    headerRow.innerHTML += `
        <th>
          ${cat.replace(/_/g, " ")}
          <button class="add-btn" onclick="addQuestion('${cat}')">
            <i class="fa fa-plus"></i>
          </button>
        </th>
      `;
  });
}

function renderQuestions() {
  const tbody = document.getElementById("questionsBody");
  tbody.innerHTML = "";
  const grouped = {};
  categories.forEach(
    (cat) => (grouped[cat] = questions.filter((q) => q.category === cat)),
  );
  const maxRows = Math.max(...categories.map((cat) => grouped[cat].length));
  for (let i = 0; i < maxRows; i++) {
    let row = "<tr>";
    categories.forEach((cat) => {
      const q = grouped[cat][i];
      if (q) {
        row += `<td class="question-row">
            <div>${q.question_text ? q.question_text : q.question}</div>
            ${renderOptions(q)}
            <div class="answer"><strong>Answer:</strong> ${renderAnswer(q)}</div>
            <div style="font-size:0.9em;color:#888;margin-top:2px;">Type: ${q.question_type.replace(/_/g, " ")}</div>
          </td>`;
      } else {
        row += `<td></td>`;
      }
    });
    row += "</tr>";
    tbody.innerHTML += row;
  }
}

function renderOptions(q) {
  if (q.options && Array.isArray(q.options) && q.options.length > 0) {
    return `<ul style="margin:8px 0 0 0; padding-left:18px; color:#444; font-size:0.97rem;">
        ${q.options.map((opt) => `<li><b>${opt.letter ? opt.letter + ". " : ""}</b>${opt.text ? opt.text : opt}</li>`).join("")}
      </ul>`;
  }
  return "";
}

function renderAnswer(q) {
  if (q.question_type === "multi_select") {
    return (q.correct_answers || []).join(", ");
  }
  if (q.question_type === "true_false") {
    return q.correct_answer === true ? "True" : "False";
  }
  if (q.question_type === "fill_in_blanks") {
    return q.correct_answer;
  }
  return q.correct_answer || q.answer || "";
}

function addQuestion(category) {
  const type = prompt(
    "Enter question type (multiple_choice, true_false, fill_in_blanks, multi_select):",
    "multiple_choice",
  );
  if (!type) return;
  let question_text = prompt(
    `Enter question text for ${category.replace(/_/g, " ")}:`,
  );
  if (!question_text) return;
  let newQ = { question_type: type, category, question_text };

  if (type === "multiple_choice" || type === "multi_select") {
    let options = [];
    let optionCount = parseInt(prompt("How many options? (2-6)"), 10);
    if (isNaN(optionCount) || optionCount < 2) optionCount = 4;
    const letters = ["A", "B", "C", "D", "E", "F"];
    for (let i = 0; i < optionCount; i++) {
      let text = prompt(`Option ${letters[i]}:`);
      if (!text) text = `Option ${letters[i]}`;
      options.push({ letter: letters[i], text });
    }
    newQ.options = options;
    if (type === "multiple_choice") {
      let correct = prompt("Enter correct answer letter (e.g. A):");
      newQ.correct_answer = correct ? correct.toUpperCase() : "A";
    } else {
      let correct = prompt(
        "Enter all correct answer letters separated by commas (e.g. A,C):",
      );
      newQ.correct_answers = correct
        ? correct.split(",").map((l) => l.trim().toUpperCase())
        : [];
    }
  } else if (type === "true_false") {
    let correct = prompt("Enter correct answer (true/false):");
    newQ.correct_answer = correct && correct.toLowerCase() === "true";
  } else if (type === "fill_in_blanks") {
    let correct = prompt("Enter correct answer (the blank):");
    newQ.correct_answer = correct || "";
  }
  questions.push(newQ);
  renderHeaders();
  renderQuestions();
  fetch("/api/questions", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questions),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to save questions");
      return res.json();
    })
    .then(() => {
      alert("Questions updated successfully!");
    })
    .catch((err) => {
      alert("Error saving questions: " + err.message);
    });
}
