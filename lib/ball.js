const Game = require("./game");

class Ball {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.game = options.game;
    this.x_speed = 0;
    this.y_speed = options.y_speed;
    this.radius = 5;
    this.canvasHeight = this.context.canvas.height;
    this.canvasWidth = this.context.canvas.width;
    this.alreadySlow = false;
  }

  increaseBallSpeed() {
    new Promise(() => (
      this.y_speed = Math.round(this.y_speed * 10/8)
    )).then(setTimeout(() => (
      this.y_speed = Math.round(this.y_speed * 8/10)
    ), 8000));
  }

  decreaseBallSpeed() {
    if (this.y_speed <= 3 && this.y_speed >= -3) { return; }
    new Promise(() => (
      this.y_speed = Math.round(this.y_speed * 8/10)
    )).then(setTimeout(() => (
      this.y_speed = Math.round(this.y_speed * 10/8)
    ), 8000));
  }

  reverseY() {
    this.y_speed *= -1;
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
    if (this.y < 0) {
      this.y_speed *= -1;
    }
     // right edge
    if (this.y >= this.canvasHeight) {
      this.reset();
    }
    // left & right edge
    if (this.x >= this.canvasWidth || this.x <= 0) {
      this.x_speed *= -1;
    }

    // ball hits the paddle
    if (
      this.y >= paddle.y &&
      this.y <= paddle.y + paddle.height &&
      this.x >= paddle.x &&
      this.x <= (paddle.x + paddle.width)
    ) {
        // this.y_speed *= -1;

        var relativeIntersectY = (paddle.x + (paddle.width/2)) - this.x;
        var normalizedRelativeIntersectionY = (relativeIntersectY/(paddle.width/2));
        var bounceAngle = normalizedRelativeIntersectionY * 3*Math.PI/12;
        this.x_speed = 10*-Math.sin(bounceAngle);
        this.y_speed =  -10*Math.cos(bounceAngle);

        let paddleCenterStart = paddle.x + (Math.floor(paddle.width / 5));
        let paddleCenterEnd = paddleCenterStart + Math.floor(paddle.width * 0.6);
        // ball hits the center part of the paddle (increase score/time)
        if (this.x >= paddleCenterStart && this.x <= paddleCenterEnd) {
          this.game.addTime(5);
        }
    }
  }

  randXCoord() {
    return Math.floor(Math.random() * (this.canvasWidth));
  }

  randXSpeed() {
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
    this.y = this.game.getBallYPos();
    this.x = this.canvasHeight / 2;
    this.y_speed = this.game.getBallYSpeed();
    this.x_speed = Math.random() < 0.5 ? -6 : 6;
  }

  stopBall() {
    this.x_speed = 0;
    this.y_speed = 0;
  }
}

module.exports = Ball;
