const Game = require("./game");

// document.addEventListener("keydown", function(e) {
//   // space and arrow keys
//   if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
//       e.preventDefault();
//   }
// }, false);
const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = 600;
canvas.height = 600;
const context = canvas.getContext('2d');
const game = new Game(context);
window.addEventListener('keydown',game.toggleSound.bind(game),false);
