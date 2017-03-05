const Game = require("./game");
const Util = require("./util");

class Ball {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.game = options.game;
    this.x_speed = options.x_speed;
    this.y_speed = options.y_speed;
    this.startingXSpeed = options.x_speed;
    this.startingYSpeed = options.y_speed;
    // this.startingSpeed = (options.x_speed > 0 ? options.x_speed : options.y_speed);
    // this.levelSpeed = 10;
    this.radius = 6;
    this.canvasX = options.canvasX;
    this.canvasY = options.canvasY;
    this.canvasHeight = options.canvasHeight;
    this.canvasWidth = options.canvasWidth;
    // this.alreadySlow = false;
    // this.stuckToPaddle = false;
  }

  addLevelSpeed() {
    // this.levelSpeed += 1;
  }

  increaseBallSpeed() {
    new Promise(() => (
      this.y_speed = Math.round(this.y_speed * 10/8)
    )).then(setTimeout(() => (
      this.y_speed = Math.round(this.y_speed * 8/10)
    ), 8000));
  }

  // new PowerUp :)
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


    // let ball = new Image();
    // ball.src = "img/ball_red_f.png";
    // // this.context.drawImage(ball, this.x, this.y, this.radius, 2 * Math.PI);
    //
    // this.context.beginPath();
    // this.context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    //
    // this.context.drawImage(ball, this.x, this.y, this.radius / 2, this.radius / 2);
    //
    // // this.context.arc(this.x, this.y, this.radius, Math.PI * 2, true);
    // this.context.closePath();


  }

  // checkBoundaries() {
  //   if (this.y < this.canvasY) { this.y_speed *= -1; }
  //   if (this.y >= this.canvasHeight + 5) { this.reset(); }
  //   if (this.x >= this.canvasWidth || this.x <= this.canvasX) { this.x_speed *= -1; }
  // }

  checkPongBoundaries() {
    if (this.y < this.canvasY || this.y > this.canvasHeight) { this.y_speed *= -1; }
    if (this.x >= this.canvasWidth) {
      this.game.addToScore(5);
      this.reset(550, 300, this.startingXSpeed, 0)
    } else if (this.x <= this.canvasX) {
      // NB: add player loses life
      // reset ball
      this.reset(550, 300, this.startingXSpeed, 0)
    }
  }

  checkBreakOutBoundaries() {
    if (this.y < this.canvasY) { this.y_speed *= -1; }
    if (this.y >= this.canvasHeight + 5) {
      this.reset(200, 250, 3, 8);
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

  ballHitsPaddleSides(paddle) {
    // let paddleLeftSideStart = paddle.x;
    // let paddleLeftSideEnd = paddle.x + (Math.floor(paddle.width / 5));
    // let paddleRightSideStart = paddleLeftSideEnd + Math.floor(paddle.width * 0.6);
    // let paddleRightSideEnd = paddle.x + paddle.width;
    // return ( this.x >= paddleLeftSideStart &&
    // this.x <= paddleLeftSideEnd ||
    // this.x >= paddleRightSideStart &&
    // this.x <= paddleRightSideEnd );
  }

  addTimeIfHitsSides(paddle) {
    // if ( this.ballHitsPaddleSides(paddle) ) {
    //     this.game.playAudio('audio/Blip_Select3.m4a');
    //     this.game.addTime(3);
    // } else {
    //   this.game.playAudio('audio/Blip_Select2.m4a');
    // }
  }

  launchBall() {
    // let speeds = Util.numRange(-10, 10);
    // let randXSpeed = speeds[Math.floor(Math.random() * speeds.length)];
    // this.x_speed = randXSpeed;
    // this.y_speed =  -(this.levelSpeed);
  }

  update(paddle) {
    if (paddle.id === "breakOutPaddle") {
      this.checkBreakOutBoundaries();
    } else {
      this.checkPongBoundaries();
    }

    // if ( this.stuckToPaddle ) {
    //   this.x = paddle.x + ( paddle.width / 2 );
    //   this.y = paddle.y - this.radius / 2;
    //   key.getPressedKeyCodes().forEach((key) => {
    //     if (key === 32) {
    //       this.stuckToPaddle = false;
    //       this.launchBall();
    //   }});
    //   return;
    // }

    if ( this.ballHitsPaddle(paddle) ) {
        let bounceAngle = Util.bounceAngle(paddle, this);

        if (paddle.id === "breakOutPaddle") {
          this.x_speed = 8 * -Math.sin(bounceAngle);
          this.y_speed = -8 * Math.cos(bounceAngle);
        } else if (paddle.id === "pongPlayerPaddle") {
          this.x_speed = this.startingXSpeed * Math.cos(bounceAngle);
          this.y_speed = this.startingXSpeed * -Math.sin(bounceAngle);
        } else if (paddle.id === "pongAIPaddle") {
          this.x_speed = -this.startingXSpeed * Math.cos(bounceAngle);
          this.y_speed = -this.startingXSpeed * Math.sin(bounceAngle);
        } else {
          console.log('hey ya screwed up in ball.js, maybe you changed paddle IDs?');
          debugger
        }

    }
    this.addSpeed();
  }

  // randXCoord() {
  //   return Math.floor(Math.random() * (this.canvasWidth));
  // }

  // randXSpeed() {
  //   return Math.floor(Math.random() * (15 - -15)) + -15;
  // }

  reset(x, y, x_speed, y_speed) {
    // let balls = this.game.balls;
    // if (this.game.balls.length > 1) {
    //   let x;
    //   for (var i = 0; i < balls.length; i++) {
    //     if (balls[i].id === this.id) { x = i; }
    //   }
    //   this.game.balls.splice(x, 1);
    //   return;
    // }

    this.x = x;
    this.y = y;
    this.x_speed = x_speed;
    this.y_speed = y_speed;

    // this.stuckToPaddle = true;


    // this.y = this.game.getBallYPos();
    // this.x = this.canvasHeight / 2;
    // this.y_speed = this.game.getBallYSpeed();
    // this.x_speed = Math.random() < 0.5 ? -6 : 6;
    //
    // this.x_speed = 0;
    // this.y_speed = 0;
  }

  stopBall() {
    this.x_speed = 0;
    this.y_speed = 0;
  }
}

module.exports = Ball;
