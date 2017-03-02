const Mallet = require("./mallet");
const Player = require("./player");



const animate = window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   function(callback) { window.setTimeout(callback, 1000/60); };


class Game {
  constructor(width, height, context) {
    this.width = width;
    this.height = height;
    this.context = context;
    this.player = new Player(context);
    this.mallet = new Mallet(10, Game.DIM_Y / 2, context, this);
    this.timer = 0;
    this.score = 0;
  }

  renderGameOver() {
    let message = `Your final score: ${this.score}`;
  }

  score() {
    this.context.font = '60px';
    this.context.fillStyle = '#000';
    this.context.fillText(this.score, 410, 90);
  }

  start() {
    this.requestId = animate(this.step.bind(this));
  }

  step() {
    this.update();
    this.render();
    if (this.timer > 3000) {
      this.renderGameOver();
    } else {
      animate(this.step.bind(this));
    }
  }

  update() {
    this.mallet.update(this.player.paddle);
    this.player.update();
  }

  render() {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.width, this.height);
    this.score;
    this.player.render();
    this.mallet.render();
  }
}

Game.DIM_X = 600;
Game.DIM_Y = 400;

module.exports = Game;
