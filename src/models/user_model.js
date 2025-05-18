export class User {
  #userName;
  #score = 0;
  #numQuestions = 0;

  /*set to default 30seconds admin can configure the time  and create a method to expose it 
  to the front-end*/
  #timePerQuestion;
  #category;
  #questions = [];
  #currentQuestionIndex = 0;
  #highScores = [];
  #correctAnswers = 0;

  constructor(userName, category) {
    this.#userName = userName;
    this.#category = category;
  }

  get userName() {
    return this.#userName;
  }

  get score() {
    return this.#score;
  }

  get numQuestions() {
    return this.#numQuestions;
  }

  get timePerQuestion() {
    return this.#timePerQuestion;
  }

  get category() {
    return this.#category;
  }

  get questions() {
    return this.#questions;
  }

  get currentQuestionIndex() {
    return this.#currentQuestionIndex;
  }

  get highScores() {
    return this.#highScores;
  }

  get correctAnswers() {
    return this.#correctAnswers;
  }

  get currentQuestion() {
    return this.#questions[this.#currentQuestionIndex];
  }

  set userName(username) {
    this.#userName = username;
  }

  set category(category) {
    this.#category = category;
  }

  set score(score) {
    this.#score = score;
  }

  set numQuestions(numQuestions) {
    this.#numQuestions = numQuestions;
  }

  set timePerQuestion(timePerQuestion) {
    this.#timePerQuestion = timePerQuestion;
  }

  set questions(questions) {
    this.#questions = questions;
  }

  set currentQuestionIndex(index) {
    this.#currentQuestionIndex = index;
  }

  set highScores(highScores) {
    this.#highScores = highScores;
  }

  set correctAnswers(val) {
    this.#correctAnswers = val;
  }
}
