const GameView = require("./game_view");
const Game = require("./game");

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const context = canvas.getContext("2d");
  const game = new Game();
  new GameView(game, context).start();
});
