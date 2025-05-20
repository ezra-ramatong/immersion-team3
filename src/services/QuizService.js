export default class QuizService {
  getAllQuestions() {
    return fetch("http://localhost:3000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getQuestionsByCategories(categories) {
    return fetch("http://localhost:3000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        return data.filter((question) =>
          categories.includes(question.category),
        );
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getSettings() {
    return fetch("http://localhost:3000/api/quiz-settings")
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
