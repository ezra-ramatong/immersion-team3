const state = {
  user: { firstName: "", lastName: "", userName: "", score: 0 },
  settings: {
    numQuestions: 0,
    timePerQuestion: 0,
    categories: [],
  },
  currentQuestionIndex: 0,
  questions: [],
  highScores: [],
};

const landingPageSection = document.querySelector(".welcome-intro");
const takeQuizzButton = document.querySelector(".start-quiz");
const userInformationSection = document.querySelector(".user-information");
const submitUserInfo = document.querySelector(".submit-user-info");

takeQuizzButton.onclick = () => {
  landingPageSection.classList.toggle("welcome-intro-inactive");
  userInformationSection.classList.toggle("user-information-active");
};

submitUserInfo.onclick = () => {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const userName = document.getElementById("userName").value;
  const category = document.getElementById("tech-category").value;

  state.user.firstName = firstName;
  state.user.lastName = lastName;
  state.user.userName = userName;
  state.settings.categories.push(category);

  localStorage.setItem(userName.toString(), JSON.stringify(state));
};
