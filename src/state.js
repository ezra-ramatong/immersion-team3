// src/state.js

const state = {
  user: { name: "", score: 0 },
  settings: {
    numQuestions: 10,
    timePerQuestion: 5,
    categories: [],
  },
  currentQuestionIndex: 0,
  questions: [],
  highScores: [],
};

// --- Getters ---
export function getState() {
  return state;
}

export function getCurrentQuestion() {
  return state.questions[state.currentQuestionIndex];
}

export function getUser() {
  return state.user;
}

export function getSettings() {
  return state.settings;
}

export function getHighScores() {
  return state.highScores;
}

// --- Setters / Mutators ---
export function setUser(name) {
  state.user.name = name;
  state.user.score = 0; // reset score when starting new quiz
}

export function setSettings(newSettings) {
  if (
    typeof newSettings !== "object" ||
    newSettings === null ||
    Array.isArray(newSettings)
  ) {
    console.warn("setSettings expects an object.");
    return;
  }

  state.settings = {
    ...state.settings,
    ...newSettings,
  };
}

export function setQuestions(questions) {
  state.questions = questions;
  state.currentQuestionIndex = 0;
}

export function incrementScore() {
  state.user.score++;
}

export function nextQuestion() {
  state.currentQuestionIndex++;
}

export function setHighScores(scores) {
  state.highScores = scores;
}

export function resetQuizState() {
  state.user.score = 0;
  state.currentQuestionIndex = 0;
  state.questions = [];
}
