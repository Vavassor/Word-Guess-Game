"use strict";

var keyDisplay = document.getElementById("fella");
var keysDown = [];


function handleKeyDown(key) {
  keyDisplay.textContent = key;
}


document.addEventListener("keydown", function(event) {
  const repeating = keysDown[event.key];
  keysDown[event.key] = true;
  if (!repeating) {
    handleKeyDown(event.key);
  }
});

document.addEventListener("keyup", function(event) {
  keysDown[event.key] = false;
});
