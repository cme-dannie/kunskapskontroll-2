import { words } from "./config.js";

import {
  pickRandomWord,
  guessIsEmpty,
  guessIsTooLong,
  guessIsIncorrect,
  findPositionsOfLetter,
  revealWord,
  wordIsCompleted,
} from "./word.js";

import {
  createPlayers,
  getLivingPlayers,
  allPlayersAreDead,
  getWinningPlayer,
} from "./player.js";

let word;
let unrevealedWord;
let players;

function processGuess(guess, player) {
  if (guessIsEmpty(guess) || guessIsTooLong(guess)) {
    return;
  }

  if (guessIsIncorrect(guess, word)) {
    player.loseLife();
    return;
  }

  const letterPositions = findPositionsOfLetter(guess, word);

  unrevealedWord = revealWord(letterPositions, word, unrevealedWord);
}

function letPlayersGuess() {
  for (const player of getLivingPlayers(players)) {
    const text = `
              ${player.name}
  
              Guess a character
  
              ${unrevealedWord.join(" ")}
  
              Lives left: ${player.lives}
              `;

    const guess = prompt(text);
    processGuess(guess.toLowerCase(), player);

    if (wordIsCompleted(word, unrevealedWord)) {
      player.win();
      break;
    }
  }
}

function init() {
  word = pickRandomWord(words);
  unrevealedWord = word.split("").map(() => "_");
  players = createPlayers();
}

function playGame() {
  init();

  let playing = true;

  while (playing) {
    letPlayersGuess();

    playing = !(
      allPlayersAreDead(players) || wordIsCompleted(word, unrevealedWord)
    );

    if (!playing) {
      const endMessage = allPlayersAreDead(players)
        ? `Everyone has lost! The correct word was ${word}`
        : `${getWinningPlayer(players).name} has won, congratulations!`;
      alert(endMessage);
    }
  }
}

export { playGame };
