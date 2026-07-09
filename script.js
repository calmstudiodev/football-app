const teamInput = document.getElementById("teamInput");
const searchBtn = document.getElementById("searchBtn");
const teamCard = document.getElementById("teamCard");

const playerInput = document.getElementById("playerInput");
const playerBtn = document.getElementById("playerBtn");
const playerCard = document.getElementById("playerCard");

async function searchTeam() {
  const teamName = teamInput.value.trim();

  if (teamName === "") {
    teamCard.innerHTML = "<p>Please enter a team name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(teamName)}`
    );

    const data = await response.json();

    if (!data.teams) {
      teamCard.innerHTML = "<p>Team not found.</p>";
      return;
    }

    const team = data.teams[0];

    teamCard.innerHTML = `
      <img class="team-banner" src="${team.strFanart1}" alt="${team.strTeam}">
      <img class="team-logo" src="${team.strBadge}" alt="${team.strTeam}">

      <h2>${team.strTeam}</h2>

      <p><strong>League:</strong> ${team.strLeague}</p>
      <p><strong>Country:</strong> ${team.strCountry}</p>
      <p><strong>Stadium:</strong> ${team.strStadium}</p>
      <p><strong>Founded:</strong> ${team.intFormedYear}</p>
      <p><strong>Capacity:</strong> ${team.intStadiumCapacity}</p>
      <p><strong>Sport:</strong> ${team.strSport}</p>
      <p><strong>Gender:</strong> ${team.strGender}</p>
    `;
  } catch (error) {
    console.error(error);
    teamCard.innerHTML = "<p>Something went wrong.</p>";
  }
}

async function searchPlayer() {
  const playerName = playerInput.value.trim();

  if (playerName === "") {
    playerCard.innerHTML = "<p>Please enter a player name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`
    );

    const data = await response.json();

    if (!data.player) {
      playerCard.innerHTML = "<p>Player not found.</p>";
      return;
    }

    const player = data.player[0];

    playerCard.innerHTML = `
      <img class="player-photo" src="${player.strCutout || player.strThumb}" alt="${player.strPlayer}">
     
      <h2>${player.strPlayer}</h2>

      <p><strong>Team:</strong> ${player.strTeam}</p>
      <p><strong>Nationality:</strong> ${player.strNationality}</p>
      <p><strong>Position:</strong> ${player.strPosition}</p>
      <p><strong>Born:</strong> ${player.dateBorn}</p>
      <p><strong>Height:</strong> ${player.strHeight}</p>
      <p><strong>Weight:</strong> ${player.strWeight}</p>
      <p class= "description">
        ${player.strDescriptionEN?.slice(0.250) || "No description avaiable."}...</p>
    `;
  } catch (error) {
    console.error(error);
    playerCard.innerHTML = "<p>Something went wrong.</p>";
  }
}

searchBtn.addEventListener("click", searchTeam);
playerBtn.addEventListener("click", searchPlayer);

teamInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchTeam();
  }
});

playerInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchPlayer();
  }
});