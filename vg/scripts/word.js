function pickRandomWord(words) {
  const index = Math.floor(Math.random() * words.length - 1) + 1;
  return words[index];
}

function guessIsEmpty(guess) {
  return guess.length === 0;
}

function guessIsTooLong(guess) {
  return guess.length > 1;
}

function guessIsIncorrect(guess, word) {
  return word.toLowerCase().indexOf(guess) === -1;
}

function findPositionsOfLetter(letter, word) {
  return word.split("").reduce((acc, curr, i) => {
    if (letter === curr.toLowerCase()) {
      acc.push(i);
    }
    return acc;
  }, []);
}

function revealWord(positions, word, unrevealedWord) {
  return unrevealedWord.map((char, i) => {
    if (positions.includes(i)) {
      return word.charAt(i);
    }
    return char;
  });
}

function wordIsCompleted(word, unrevealedWord) {
  return word === unrevealedWord.join("");
}

export {
  pickRandomWord,
  guessIsEmpty,
  guessIsTooLong,
  guessIsIncorrect,
  findPositionsOfLetter,
  revealWord,
  wordIsCompleted,
};
