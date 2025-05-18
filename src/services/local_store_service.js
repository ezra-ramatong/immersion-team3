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

  incrementScore(user){
    if(user instanceof User){
      user.score += 1;
    }
  }

  getLeaderboard(category) {
    const players = [];

    for (let i = 0; i < localStorage.length; i++) {
      const { userName, category, score } = JSON.parse(
        localStorage.getItem(localStorage.key(i)),
      );

      players.push({
        userName: userName,
        category: category,
        score: score,
      });
    }

    return players
      .filter((player) => player.category === category)
      .sort(function (player1, player2) {
        return player2.score - player1.score;
      });
  }
}
