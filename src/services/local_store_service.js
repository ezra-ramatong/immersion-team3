import { User } from "../models/user_model.js";

class LocalStorageService {
  saveUser(user) {
    if (user instanceof User) {
      localStorage.setItem(user.userName.toString(), JSON.stringify(user));
    }
  }

  retrieveUser(user) {
    if (user instanceof User) {
      return localStorage.getItem(user.userName.toString());
    }
  }

  get_leaderboard() {
    const leaderBoard = [];

    for (let i = 0; i < localStorage.length; i++) {
      const userName = localStorage.getItem(localStorage.key(i)).userName;
      const score = localStorage.getItem(localStorage.key(i)).score;
      leaderBoard.push({ userName: userName, score: score });
    }

    return leaderBoard.sort(function (userOne, userTwo) {
      return userTwo.score - userOne.score;
    });
  }
}
