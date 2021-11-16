const words = [
  "Programmering",
  "Stockholm",
  "Studenter",
  "Javascript",
  "Afterwork",
];

let word;
let revealedWord;

let players = [];

function pickRandomWord() {
  const index = Math.floor(Math.random() * words.length - 1) + 1;
  return words[index];
}

function guessIsEmpty(guess) {
  return guess.length === 0;
}

function guessIsTooLong(guess) {
  return guess.length > 1;
}

function guessIsIncorrect(guess) {
  return word.toLowerCase().indexOf(guess) === -1;
}

function findPositionsOfLetter(letter) {
  return word.split("").reduce((acc, curr, i) => {
    if (letter === curr.toLowerCase()) {
      acc.push(i);
    }
    return acc;
  }, []);
}

function revealWord(positions) {
  revealedWord = revealedWord.map((char, i) => {
    if (positions.includes(i)) {
      return word.charAt(i);
    }
    return char;
  });
}

function livesAreDepleted() {
  return players.filter();
}

function wordIsCompleted() {
  return word === revealedWord.join("");
}

function processGuess(guess, player) {
  if (guessIsEmpty(guess) || guessIsTooLong(guess)) {
    return;
  }

  if (guessIsIncorrect(guess)) {
    player.loseLife();
    return;
  }

  const letterPositions = findPositionsOfLetter(guess);

  revealWord(letterPositions);
}

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

function getLivingPlayers() {
  return players.filter(({ alive }) => alive);
}

function allPlayersAreDead() {
  return getLivingPlayers().length === 0;
}

function getWinningPlayer() {
  return players.find(({ hasWon }) => hasWon);
}

function letPlayersGuess() {
  for (const player of getLivingPlayers()) {
    const text = `
            ${player.name}

            Guess a character

            ${revealedWord.join(" ")}

            Lives left: ${player.lives}
            `;

    const guess = prompt(text);
    processGuess(guess.toLowerCase(), player);

    if (wordIsCompleted()) {
      player.win();
      break;
    }
  }
}

function playGame() {
  word = pickRandomWord();
  revealedWord = word.split("").map(() => "_");
  players = createPlayers();

  let playing = true;

  while (playing) {
    letPlayersGuess();

    playing = !(allPlayersAreDead() || wordIsCompleted());

    if (!playing) {
      const endMessage = allPlayersAreDead()
        ? `Everyone has lost! The correct word was ${word}`
        : `${getWinningPlayer().name} has won, congratulations!`;
      alert(endMessage);
    }
  }
}

playGame();
