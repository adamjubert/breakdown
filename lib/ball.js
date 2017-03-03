const Game = require("./game");

let DIM_X = Game.DIM_X;
let DIM_Y = Game.DIM_Y;

class Ball {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.game = options.game;
    this.x_speed = options.x_speed;
    this.y_speed = 0;
    this.radius = 5;
    this.canvasHeight = this.context.canvas.height;
    this.canvasWidth = this.context.canvas.width;
    this.alreadySlow = false;
  }

  increaseBallSpeed() {
    new Promise(() => (
      this.x_speed = Math.round(this.x_speed * 10/8)
    )).then(setTimeout(() => (
      this.x_speed = Math.round(this.x_speed * 8/10)
    ), 8000));
  }

  decreaseBallSpeed() {
    if (this.x_speed <= 3 && this.x_speed >= -3) { return; }
    new Promise(() => (
      this.x_speed = Math.round(this.x_speed * 8/10)
    )).then(setTimeout(() => (
      this.x_speed = Math.round(this.x_speed * 10/8)
    ), 8000));
  }

  reverseX() {
    this.x_speed *= -1;
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
    // left edge
    if (this.x < 0) {
      this.x_speed *= -1;
    }
     // right edge
    if (this.x >= this.canvasWidth) {
      this.reset();
    }
    // top & bottom edge
    if (this.y >= this.canvasHeight || this.y <= 0) {
      this.y_speed *= -1;
    }

    // ball hits the paddle
    if (
      this.x >= paddle.x &&
      this.x <= paddle.x + 10 &&
      this.y >= paddle.y &&
      this.y <= (paddle.y + paddle.height)
    ) {
        this.x_speed *= -1;
        let paddleCenterStart = paddle.y + (paddle.height / 2.5);
        let paddleCenterEnd = paddleCenterStart + 20;
        // ball hits the center part of the paddle (increase score/time)
        if (this.y >= paddleCenterStart && this.y <= paddleCenterEnd) {
          this.y_speed >= 0 ? this.y_speed -= 1 : this.y_speed += 1;
          this.game.addTime(5);
        } else {
          this.y_speed >= 0 ? this.y_speed += 1 : this.y_speed -= 1;
        }
    }
  }

  randYCoord() {
    return Math.floor(Math.random() * (this.canvasHeight));
  }

  randYSpeed() {
    return Math.floor(Math.random() * (15 - -15)) + -15;
  }

  reset() {
    let balls = this.game.balls;
    if (this.game.balls.length > 1) {
      let x;
      for (var i = 0; i < balls.length; i++) {
        if (balls[i].id === this.id) { x = i; }
      }
      this.game.balls.splice(x, 1);
      return;
    }
    this.x = this.game.getBallXPos();
    this.y = this.canvasHeight / 2;
    this.x_speed = this.game.getBallXSpeed();
    this.y_speed = Math.random() < 0.5 ? -6 : 6;
  }

  stopBall() {
    this.x_speed = 0;
    this.y_speed = 0;
  }
}

module.exports = Ball;
