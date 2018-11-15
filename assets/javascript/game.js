"use strict";

var keysDown = [];


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

function WordPick(word, image) {
  this.word = word;
  this.image = image;
}


var game = {
  currentWord: "",
  currentWordReadout: document.getElementById("current-word"),
  guessesRemaining : 0,
  guessesRemainingReadout: document.getElementById("guesses-remaining"),
  lastWord: "",
  lastWordReadout: document.getElementById("last-word"),
  lettersGuessed: [],
  lettersGuessedReadout: document.getElementById("letters-guessed"),
  losses: 0,
  lossesReadout: document.getElementById("losses"),
  winImage: "",
  winImageDisplay: document.getElementById("win-image"),
  wins: 0,
  winsReadout: document.getElementById("wins"),
  wordIndex: 0,
  words: shuffle([
    new WordPick("kiwi", "assets/images/kiwi.png"),
    new WordPick("apple", "assets/images/apple.jpg"),
    new WordPick("mango", "assets/images/mango.jpg"),
  ]),

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

    const lettersShown = this.determineLettersShown();
    if (lettersShown === this.currentWord) {
      this.win();
      return;
    }

    if (!this.currentWord.includes(letter)) {
      this.guessesRemaining -= 1;
      if (this.guessesRemaining <= 0) {
        this.lose();
        return;
      }
    }

    this.updateReadouts(lettersShown);
  },

  lose: function() {
    this.losses += 1;
    this.winImageDisplay.src = "";
    this.startNewGame();
  },

  pickWord: function() {
    const pick = this.words[this.wordIndex];
    this.wordIndex = (this.wordIndex + 1) % this.words.length;
    this.winImage = pick.image;
    return pick.word;
  },

  startNewGame: function() {
    this.lastWord = this.currentWord;
    this.currentWord = this.pickWord();
    this.lettersGuessed = [];
    this.guessesRemaining = 10;
    let lettersShown = this.determineLettersShown();
    this.updateReadouts(lettersShown);
  },

  updateReadouts: function(lettersShown) {
    const lettersGuessed = this.lettersGuessed.join(", ");
    if (lettersGuessed.length == 0) {
      this.lettersGuessedReadout.textContent = "·";
    } else {
      this.lettersGuessedReadout.textContent = lettersGuessed;
    }

    this.currentWordReadout.textContent = lettersShown;
    this.guessesRemainingReadout.textContent = this.guessesRemaining;
    this.winsReadout.textContent = this.wins;
    this.lossesReadout.textContent = this.losses;
    this.lastWordReadout.textContent = this.lastWord;
  },

  win: function() {
    this.wins += 1;
    this.winImageDisplay.src = this.winImage;
    this.startNewGame();
  },
};


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
