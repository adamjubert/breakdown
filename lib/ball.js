const Game = require("./game");
const Util = require("./util");

class Ball {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.game = options.game;
    this.color = options.color;
    this.x_speed = options.x_speed;
    this.y_speed = options.y_speed;
    this.startingXSpeed = options.x_speed;
    this.startingYSpeed = options.y_speed;
    this.radius = 6;
    this.canvasX = options.canvasX;
    this.canvasY = options.canvasY;
    this.canvasHeight = options.canvasHeight;
    this.canvasWidth = options.canvasWidth;
  }

  // increaseBallSpeed() {
  //   new Promise(() => (
  //     this.y_speed = Math.round(this.y_speed * 10/8)
  //   )).then(setTimeout(() => (
  //     this.y_speed = Math.round(this.y_speed * 8/10)
  //   ), 8000));
  // }
  //
  // decreaseBallSpeed() {
  //   if (this.id === "pongBall") {
  //     this.decreasePongBallSpeed();
  //   } else if (this.id === "breakOutBall") {
  //     // this.decreaseBreakOutBallSpeed();
  //   }
  // }
  //
  // decreasePongBallSpeed() {
  //   if (this.x_speed <= 3 && this.x_speed >= -3) { return; }
  //
  //   this.x_speed = Math.round(this.x_speed * 7/10);
  //   this.startingXSpeed = Math.round(this.x_speed * 7/10);
  //   setTimeout(() => {
  //     this.x_speed = Math.round(this.x_speed * 10/7)
  //     this.startingXSpeed = Math.round(this.x_speed * 10/7)
  //
  //   }, 8000);
  // }
  //
  // decreaseBreakOutBallSpeed() {
  //   if (this.y_speed <= 3 && this.y_speed >= -3) { return; }
  //   new Promise(() => (
  //     this.y_speed = Math.round(this.y_speed * 7/10)
  //   )).then(setTimeout(() => (
  //     this.y_speed = Math.round(this.y_speed * 10/7)
  //   ), 8000));
  // }

  reverseY() {
    this.y_speed *= -1;
  }

  render() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    this.context.fillStyle =  "#eee";
    this.context.fill();
  }

  checkPongBoundaries() {
    if (this.y < this.canvasY || this.y > this.canvasHeight) { this.y_speed *= -1; }
    if (this.x >= this.canvasWidth) {
      this.game.addToScore(10);
      this.game.playAudio("audio/Pickup_Coin8.m4a");
      this.reset(550, 100, this.startingXSpeed, 2);
    } else if (this.x <= this.canvasX) {
      this.game.changeLives(-1);
      this.reset(550, 100, this.startingXSpeed, 2);
    }
  }

  checkBreakOutBoundaries() {
    if (this.y < this.canvasY) { this.y_speed *= -1; }
    if (this.y >= this.canvasHeight + 5) {
      this.game.changeLives(-1);
      this.reset(200, 250, 0, 8);
    }
    if (this.x >= this.canvasWidth || this.x <= this.canvasX) {
      this.x_speed *= -1;
    }
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

  update(paddle) {
    if (paddle.id === "breakOutPaddle") {
      this.checkBreakOutBoundaries();
    } else {
      this.checkPongBoundaries();
    }


    if ( this.ballHitsPaddle(paddle) ) {
        let bounceAngle = Util.bounceAngle(paddle, this);
        let bounceAnglePong = Util.bounceAnglePong(paddle, this);

        if (paddle.id === "breakOutPaddle") {
          this.x_speed = 8 * -Math.sin(bounceAngle);
          this.y_speed = -8 * Math.cos(bounceAngle);
        } else if (paddle.id === "pongPlayerPaddle") {
          this.x_speed = this.startingXSpeed * Math.cos(bounceAnglePong);
          this.y_speed = this.startingXSpeed * -Math.sin(bounceAnglePong);
        } else if (paddle.id === "pongAIPaddle") {
          this.x_speed = -this.startingXSpeed * Math.cos(bounceAnglePong);
          this.y_speed = this.startingXSpeed * Math.sin(bounceAnglePong);
        }

    }
    this.addSpeed();
  }


  reset(x, y, x_speed, y_speed) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 0;
    setTimeout(() => {
      this.x_speed = x_speed;
      this.y_speed = y_speed;
    }, 500);

  }

  stopBall() {
    this.x_speed = 0;
    this.y_speed = 0;
  }
}

module.exports = Ball;
