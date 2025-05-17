import { User } from "../models/user_model.js";

export class LocalStorageService {
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

  getLeaderboard() {
    const leaderBoard = [];

    for (let i = 0; i < localStorage.length; i++) {
      const userName = localStorage.getItem(localStorage.key(i));
      const score = localStorage.getItem(localStorage.key(i));

      leaderBoard.push(userName);
      leaderBoard.push(score);
    }

    return leaderBoard;
    /*return leaderBoard.sort(function (userOne, userTwo) {
      return userTwo.score - userOne.score;
    });*/
  }
}
