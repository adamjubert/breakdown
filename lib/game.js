const Ball = require("./ball");
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
    this.ball = new Ball({
      x: 10,
      y: Game.DIM_Y / 2,
      context,
      game: this
    });
    this.timer = 0;
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  renderGameOver() {
    let message = `Your final score: ${this.score}`;
  }

  displayScore() {
    // this.context.font = '80px';
    this.context.fillStyle = '#000';
    this.context.fillText(this.score, 300, 10);
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
    this.ball.update(this.player.paddle);
    this.player.update();
  }

  updateScore(points) {
    this.score += points;
  }

  render() {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.width, this.height);
    this.displayScore();
    this.player.render();
    this.ball.render();
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 400;

module.exports = Game;
