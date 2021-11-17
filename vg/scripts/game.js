import { words } from "./config.js";

import {
  pickRandomWord,
  guessIsInvalid,
  guessDoesMatch,
  findPositionsOfLetter,
  revealWord,
  wordIsCompleted,
} from "./word.js";

import { createPlayer } from "./player.js";

let word;
let unrevealedWord;
let guesses;
let player;

function promptGuess() {
  const text = `
              ${unrevealedWord.join(" ")}
  
              Lives left: ${player.lives}
              Guesses made: ${guesses.join(", ")}
              `;
  return prompt(text);
}

function processGuess(guess) {
  if (guessIsInvalid(guess)) {
    return;
  }

  if (!guessDoesMatch(guess, word)) {
    player.loseLife();
    guesses.push(guess);
    return;
  }

  const letterPositions = findPositionsOfLetter(guess, word);
  unrevealedWord = revealWord(letterPositions, word, unrevealedWord);
}

function init() {
  word = pickRandomWord(words);
  unrevealedWord = word.split("").map(() => "_");
  guesses = [];
  player = createPlayer();
}

function playGame() {
  init();

  let playing = true;

  while (playing) {
    const guess = promptGuess();

    if (guess === null) {
      alert("You have canceled the game");
      break;
    }

    processGuess(guess.toLowerCase());

    playing = player.alive && !wordIsCompleted(word, unrevealedWord);

    if (!playing) {
      const endMessage = !player.alive
        ? `You have lost! The correct word was ${word}`
        : "You have won, congratulations!";
      alert(endMessage);
    }
  }
}

export { playGame };
