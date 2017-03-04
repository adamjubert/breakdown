const Game = require("./game");
const Util = require("./util");

class Ball {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.game = options.game;
    this.x_speed = 0;
    this.y_speed = options.y_speed;
    this.levelSpeed = 10;
    this.radius = 5;
    this.canvasHeight = this.context.canvas.height;
    this.canvasWidth = this.context.canvas.width;
    this.alreadySlow = false;
  }

  addLevelSpeed() {
    this.levelSpeed += 1;
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

  checkBoundaries() {
    if (this.y < 0) { this.y_speed *= -1; }
    if (this.y >= this.canvasHeight + 5) { this.reset(); }
    if (this.x >= this.canvasWidth || this.x <= 0) { this.x_speed *= -1; }
  }

  addSpeed() {
    this.x += this.x_speed;
    this.y += this.y_speed;
  }

  ballHitsPaddle(paddle) {
    return this.y >= paddle.y &&
    this.y <= paddle.y + paddle.height &&
    this.x >= paddle.x &&
    this.x <= (paddle.x + paddle.width);
  }

  ballHitsPaddleSides(paddle) {
    let paddleLeftSideStart = paddle.x;
    let paddleLeftSideEnd = paddle.x + (Math.floor(paddle.width / 5));
    let paddleRightSideStart = paddleLeftSideEnd + Math.floor(paddle.width * 0.6);
    let paddleRightSideEnd = paddle.x + paddle.width;
    return ( this.x >= paddleLeftSideStart &&
    this.x <= paddleLeftSideEnd ||
    this.x >= paddleRightSideStart &&
    this.x <= paddleRightSideEnd );
  }

  addTimeIfHitsSides(paddle) {
    if ( this.ballHitsPaddleSides(paddle) ) {
        Util.playAudio('audio/Blip_Select3.m4a');
        this.game.addTime(3);
    } else {
      Util.playAudio('audio/Blip_Select2.m4a');
    }
  }

  update(paddle) {
    this.addSpeed();
    this.checkBoundaries();

    if ( this.ballHitsPaddle(paddle) ) {
        let bounceAngle = Util.bounceAngle(paddle, this);
        this.x_speed = 10 * -Math.sin(bounceAngle);
        this.y_speed =  -(this.levelSpeed) * Math.cos(bounceAngle);

        this.addTimeIfHitsSides(paddle);
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
