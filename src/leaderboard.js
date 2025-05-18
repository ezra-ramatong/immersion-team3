/* Function to select high scores according to category */
function selectByCategory(players, category) {
  if (category === "All Rankings") {
    return players;
  }
  return players.filter(
    (player) =>
      player.category.toLowerCase() === category.toLowerCase() ||
      (category === "Javascript" && player.category === "JS") ||
      (category === "Gaming and computers" && player.category === "Gaming"),
  );
}
/* function to insert the data from local storage to UI of the leaderboard */
function insertsDataOnBoard(players) {
  leaderBoardEl.innerHTML = "";

  players.forEach((player, i) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td>${i + 1}</td>
        <td>${player.name}</td>
        <td>${player.score}</td>`;
    leaderBoardEl.appendChild(tableRow);
  });
}

const sortedPlayers = dbPlayers.sort((x, y) => y.score - x.score);

insertsDataOnBoard(sortedPlayers);
categoryEl.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  const filteredPlayers = selectByCategory(sortedPlayers, selectedCategory);
  insertsDataOnBoard(filteredPlayers);
});
