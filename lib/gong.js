
// document.addEventListener("DOMContentLoaded", function() {
//   const canvas = document.getElementsByTagName("canvas")[0];
//   canvas.width = Game.DIM_X;
//   canvas.height = Game.DIM_Y;
//
//   const context = canvas.getContext("2d");
//   const game = new Game();
//   new GameView(game, context).start();
// });

const Game = require("./game");

document.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);
const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = Game.DIM_X;
canvas.height = Game.DIM_Y;
const context = canvas.getContext('2d');
const game = new Game(Game.DIM_X, Game.DIM_Y, context);

// game.renderGameStart();
