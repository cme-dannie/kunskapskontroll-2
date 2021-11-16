function createPlayer(number) {
  return {
    name: `Player ${number}`,
    lives: 3,
    hasWon: false,
    get alive() {
      return this.lives > 0;
    },
    loseLife() {
      this.lives--;
    },
    win() {
      this.hasWon = true;
    },
  };
}

function createPlayers() {
  const input = prompt("How many players are you?");
  const number = parseInt(input);
  return [...Array(number).keys()].map((_, i) => createPlayer(i + 1));
}

function getLivingPlayers(players) {
  return players.filter(({ alive }) => alive);
}

function allPlayersAreDead(players) {
  return getLivingPlayers(players).length === 0;
}

function getWinningPlayer(players) {
  return players.find(({ hasWon }) => hasWon);
}

export { createPlayers, getLivingPlayers, allPlayersAreDead, getWinningPlayer };
