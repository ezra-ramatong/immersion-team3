import { User } from "../models/user_model.js";

export class LocalStorageService {
  saveUser(user) {
    if (user instanceof User) {
      localStorage.setItem(user.userName, JSON.stringify(user.toString()));
    }
  }

  retrieveUser(user) {
    if (user instanceof User) {
      return JSON.parse(localStorage.getItem(user.userName));
    }
  }

  setTheScore(user, score) {
    user.score = score;
    this.saveUser(user);
  }

  getLeaderboard(category) {
    const players = [];

    for (let i = 0; i < localStorage.length; i++) {
      const { userName, category, correctAnswers } = JSON.parse(
        localStorage.getItem(localStorage.key(i)),
      );

      players.push({
        userName: userName,
        category: category,
        correctAnswers: correctAnswers,
      });
    }
  
    return players
      .filter((player) => player.category[0] === category)
      .sort(function (player1, player2) {
        return player2.score - player1.score;
      });
  }
}
