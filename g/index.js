const words = [
  "Programmering",
  "Stockholm",
  "Studenter",
  "Javascript",
  "Afterwork",
];

let word;
let revealedWord;
let lives;

function pickRandomWord() {
  const index = Math.floor(Math.random() * words.length - 1) + 1;
  return words[index];
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
  return revealedWord.map((char, i) => {
    if (positions.includes(i)) {
      return word.charAt(i);
    }
    return char;
  });
}

function livesAreDepleted() {
  return lives === 0;
}

function wordIsCompleted() {
  return word === revealedWord.join("");
}

function processGuess(guess) {
  if (guessIsIncorrect(guess)) {
    lives--;
    return;
  }

  const letterPositions = findPositionsOfLetter(guess);

  revealedWord = revealWord(letterPositions);
}

function init() {
  word = pickRandomWord();
  revealedWord = word.split("").map(() => "_");
  lives = 5;
}

function playGame() {
  init();

  let playing = true;

  while (playing) {
    const text = `
        ${revealedWord.join(" ")}

        Lives left: ${lives}
        `;
    const guess = prompt(text);
    processGuess(guess.toLowerCase());

    playing = !(livesAreDepleted() || wordIsCompleted());

    if (!playing) {
      const endMessage = livesAreDepleted()
        ? `You have lost! The correct word was ${word}`
        : "You have won, congratulations!";
      alert(endMessage);
    }
  }
}

playGame();
