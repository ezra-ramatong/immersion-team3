//import "./styles/style.css";
/** Populating leaderboard with data */
const leaderBoardEl = document.getElementById("leaderboard-body");
const categoryEl = document.querySelector("select");

 /*const playerRes = [
    {name: "Jonh Doe",
    score: 5,
    category: "CSS"},
    {name: "Me Myself",
    score: 12,
    category: "HTML"},
    {name: "Justin Tye",
    score: 8,
    category: "Gaming"},
    {name: "Me Doe",
    score: 6,
    category: "JS"}
 ];*/

 localStorage.setItem("Results", JSON.stringify(playerRes));
 let dbPlayers = JSON.parse(localStorage.getItem("Results")) || [];

 function selectByCategory(players, category) {
    if (category === "All Rankings") {
        return players;
    }
    return players.filter(
        (player) => player.category.toLowerCase() === category.toLowerCase()
        || (category === "Javascript" && player.category === "JS") ||
         (category === "Gaming and computers" && player.category === "Gaming")
    );
 } 

function getRandomImgs() {
    return Math.floor(Math.random() * 4) + 1;
}
 
 function insertsDataOnBoard(players) {
    leaderBoardEl.innerHTML = "";

    players.forEach((player, i) => {
        const randomAvatar = getRandomImgs();
        const tableRow = document.createElement("tr");
        tableRow.innerHTML =`
        <td>${i + 1}</td>
        <td><img src="./src/imgs/avatar${randomAvatar}.jpg" alt="profile">${player.name}</td>
        <td>${player.score}</td>`;
        leaderBoardEl.appendChild(tableRow);
    });
 }

const sortedPlayers = dbPlayers.sort((x,y) => y.score - x.score);


insertsDataOnBoard(sortedPlayers);

categoryEl.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  const filteredPlayers = selectByCategory(sortedPlayers, selectedCategory);
  insertsDataOnBoard(filteredPlayers);
});