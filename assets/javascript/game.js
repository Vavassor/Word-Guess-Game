"use strict";

var keysDown = [];


function isAlphabetic(string) {
  const value = string.toLowerCase();
  return string.length === 1 && value >= "a" && value <= "z";
}


class Game {
  constructor() {
    this.currentWord = "";
    this.currentWordReadout = document.getElementById("current-word");
    this.lettersGuessedReadout = document.getElementById("letters-guessed");
    this.lettersGuessed = [];
  }

  begin() {
    this.currentWord = "secret";
    this.lettersGuessed = [];
    this.updateCurrentWordReadout();
    this.updateLettersGuessedReadout();
  }

  guessLetter(letter) {
    if (!this.lettersGuessed.includes(letter)) {
      this.lettersGuessed.push(letter);
      this.updateCurrentWordReadout();
      this.updateLettersGuessedReadout();
    }
  }

  updateCurrentWordReadout() {
    let lettersShown = "";
    for (const letter of this.currentWord) {
      if (this.lettersGuessed.includes(letter)) {
        lettersShown += letter;
      } else {
        lettersShown += "_";
      }
    }
    this.currentWordReadout.textContent = lettersShown;
  }

  updateLettersGuessedReadout() {
    this.lettersGuessedReadout.textContent = this.lettersGuessed.join(", ");
  }
}


var game = new Game();
game.begin();

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
