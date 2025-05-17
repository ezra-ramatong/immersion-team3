import "./styles/style.css";
import { User } from "./models/user_model.js";
import { LocalStorageService } from "./services/local_store_service.js";
import { UserService } from "./services/user_service.js";

const localStorageService = new LocalStorageService();
const userService = new UserService();
const submit = document.querySelector(".submit-user-info");
const introSection = document.querySelector(".welcome-intro");
const takeQuiz = document.querySelector(".start-quiz");
const submitInfo = document.querySelector(".user-information");

takeQuiz.onclick = () => {
  introSection.classList.toggle("welcome-intro-inactive");
  submitInfo.classList.toggle("user-information-active");
};

submit.onclick = () => {
  const user1 = new User("wanda", "test", "guy", "random");
  const user2 = new User("wan", "test", "g", "green");
  const user3 = new User("da", "test", "oes", "random");

  user1.score = 8;
  user2.score = 9;
  user3.score = 10;

  //localStorage.clear();
  console.log(localStorage.length);

  localStorageService.saveUser(user1);
  localStorageService.saveUser(user2);
  localStorageService.saveUser(user3);
  console.log(JSON.stringify({ user1 }));
  localStorage.length; /*
  console.log(localStorageService.getLeaderboard());*/
};
