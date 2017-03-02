const Game = require("./game");

let DIM_X = Game.DIM_X;
let DIM_Y = Game.DIM_Y;

class Mallet {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.game = options.game;
    this.x_speed = 8;
    this.y_speed = -8;
    this.radius = 8;
    this.canvasHeight = this.context.canvas.height;
    this.canvasWidth = this.context.canvas.width;
  }

  render() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    this.context.fillStyle = "#000";
    this.context.fill();
  }

  update(paddle) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    if (this.x < 0) {
      this.x_speed *= -1;
    }
    if (this.x >= this.canvasWidth) {

      this.x_speed *= -1;
    }
    if (this.y >= this.canvasHeight || this.y <= 0) {
      this.y_speed *= -1;
    }

    // mallet hits the paddle (score)
    if (this.x >= paddle.x &&
      this.x <= paddle.x + 10 &&
      this.x_speed > 0 &&
      this.y >= paddle.y &&
      this.y <= (paddle.y + paddle.height)) {
        this.reset();
        this.game.updateScore(1);
    }
  }

  randYCoord() {
    return Math.floor(Math.random() * (this.canvasHeight));
  }

  randYSpeed() {
    return Math.floor(Math.random() * (15 - -15)) + -15;
  }

  reset() {
    this.x = 0;
    this.y = this.randYCoord();
    this.x_speed = 8;
    this.y_speed = this.randYSpeed();
  }
}

module.exports = Mallet;
