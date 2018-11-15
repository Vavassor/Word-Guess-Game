"use strict";

var keysDown = [];

var game = {
  currentWord: "",
  currentWordReadout: document.getElementById("current-word"),
  guessesRemainingReadout: document.getElementById("guesses-remaining"),
  guessMax: 0,
  lettersGuessed: [],
  lettersGuessedReadout: document.getElementById("letters-guessed"),
  losses: 0,
  lossesReadout: document.getElementById("losses"),
  wins: 0,
  winsReadout: document.getElementById("wins"),
  wordIndex: 0,
  words: shuffle(["secret", "wow", "mangoes"]),

  determineLettersShown: function() {
    let lettersShown = "";
    for (const letter of this.currentWord) {
      if (this.lettersGuessed.includes(letter)) {
        lettersShown += letter;
      } else {
        lettersShown += "_";
      }
    }
    return lettersShown;
  },

  guessLetter: function(letter) {
    if (this.lettersGuessed.includes(letter)) {
      return;
    }

    this.lettersGuessed.push(letter);

    const guessesRemaining = this.guessMax - this.lettersGuessed.length;
    if (guessesRemaining <= 0) {
      this.lose();
      return;
    }

    let lettersShown = this.determineLettersShown();
    if (lettersShown === this.currentWord) {
      this.win();
      return;
    }

    this.updateReadouts(lettersShown);
  },

  lose: function() {
    this.losses += 1;
    this.startNewGame();
  },

  pickWord: function() {
    const word = this.words[this.wordIndex];
    this.wordIndex = (this.wordIndex + 1) % this.words.length;
    return word;
  },

  startNewGame: function() {
    this.currentWord = this.pickWord();
    this.lettersGuessed = [];
    this.guessMax = 10;
    let lettersShown = this.determineLettersShown();
    this.updateReadouts(lettersShown);
  },

  updateReadouts: function(lettersShown) {
    this.currentWordReadout.textContent = lettersShown;
    this.lettersGuessedReadout.textContent = this.lettersGuessed.join(", ");
    this.guessesRemainingReadout.textContent = this.guessMax - this.lettersGuessed.length;
    this.winsReadout.textContent = this.wins;
    this.lossesReadout.textContent = this.losses;
  },

  win: function() {
    this.wins += 1;
    this.startNewGame();
  },
};


function isAlphabetic(string) {
  const value = string.toLowerCase();
  return string.length === 1 && value >= "a" && value <= "z";
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}


game.startNewGame();

document.addEventListener("keydown", function(event) {
  const repeating = keysDown[event.key];
  keysDown[event.key] = true;
  if (!repeating && isAlphabetic(event.key)) {
    game.guessLetter(event.key);
  }
});

document.addEventListener("keyup", function(event) {
  keysDown[event.key] = false;
});
