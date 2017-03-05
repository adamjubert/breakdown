/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Ball = __webpack_require__(2);
const Player = __webpack_require__(5);
const AIPlayer = __webpack_require__(9);
const Brick = __webpack_require__(3);
const Util = __webpack_require__(1);
const PowerUp = __webpack_require__(6);

const animate = window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   function(callback) { window.setTimeout(callback, 1000/60); };

class Game {
  constructor(context) {
    this.width = 900; // screen width
    this.height = 550;
    this.context = context;
    this.start();
    this.ballCount = 0;
    this.powerUpCount = 0;
    this.powerUps = [];
    this.score = 0;
    this.ballYSpeed = 10;
    this.ballYPos = 150;
    this.startingSeconds = 500;
    this.highScore = 0;
    this.muted = false;
    this.pongBall;
    this.breakOutBall;
  }

  playAudio(src) {
    let audio = new Audio(src);
    if (!this.muted) { audio.play(); }
  }

  toggleSound(e) {
    if ( e.keyCode === 81 ) { this.muted = !this.muted; }
  }

  getBallYPos() {
    return this.ballYPos;
  }

  getBallYSpeed() {
    return this.ballYSpeed;
  }

  addBricks() {
    let pongWidth = this.width / 2 - 10;

    let brickWidth = 45;
    let brickHeight = 12;
    let brickSpace = 10; // 5 on each side; 10 total

    // number of bricks based on height of canvas
    let brickStartX = 35;
    let brickStartY = 100;
    let numOfBricks = Math.floor(pongWidth / ( brickWidth + brickSpace )) - 1;

    let brickX = brickStartX;
    let brickY = brickStartY;

    let numRows = 5;
    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numOfBricks; j++) {
        let brick = new Brick({
          x: brickX,
          y: brickY,
          width: brickWidth,
          height: brickHeight,
          context: this.context,
          game: this
        });
        this.bricks.push(brick);
        brickX += (brickWidth + brickSpace);
      }
      brickX = brickStartX;
      brickY += 30;
    }

  }


  addPowerUp(x, y) {
    this.powerUpCount += 1;
    let id = this.powerUpCount;
    let newPU = new PowerUp({
      id,
      x,
      y,
      game: this,
      context: this.context
    });
    this.powerUps.push(newPU);
  }

  addTime(time) {
    // this.seconds += time;
    // this.addPowerUp();
    // //
    // $('.wrapper').append("<div class='extra-time-container'></div>");
    // $('.extra-time-container').append("<p class='extra-time'>+5</p>");
    // $('.extra-time').delay(1000).hide(2000);
    // $('.extra-time').delay(5000).then( function() {  } ) // NB: fix this!
  }

  addPongBall() {
    this.ballCount += 1;
    let id = this.ballCount;
    this.pongBall = new Ball({
      id,
      x: 550,
      y: 300,
      game: this,
      context: this.context,
      x_speed: 4,
      y_speed: 0,
      canvasX: 460,
      canvasY: 50,
      canvasHeight: this.height,
      canvasWidth: this.width
    });
    this.balls.push(this.pongBall);
  }

  addBreakOutBall() {
    this.ballCount += 1;
    let id = this.ballCount;
    this.breakOutBall = new Ball({
      id,
      x: 200,
      y: 350,
      game: this,
      context: this.context,
      x_speed: 0,
      y_speed: 8,
      canvasX: 0,
      canvasY: 50,
      canvasHeight: this.height,
      canvasWidth: this.width / 2 - 10
    });
    this.balls.push(this.breakOutBall);
  }

  addBall() {
    // this.ballCount += 1;
    // let id = this.ballCount;
    // let x = new Ball({
    //   id,
    //   x: this.width / 2,
    //   y: this.ballYPos,
    //   game: this,
    //   context: this.context,
    //   x_speed: 0,
    //   y_speed: 6,
    //   canvasHeight: this.height,
    //   canvasWidth: this.width
    // });
    // this.balls.push(x);
  }

  displayHeaders() {
    // this.displayTime();
    this.displayScore();
  }

  displayScore() {
    this.context.fillStyle = '#000';
    this.context.font = '24px Audiowide';
    this.context.fillText(this.score, 10, 25);
  }

  displayTime() {
    // this.context.fillStyle = '#000';
    // this.context.font = '40px Audiowide';
    // this.context.fillText(this.seconds, 270, 40);
  }

  getHighScore(domClass) {
    firebase.database().ref('/highScore').on('value', function(snapshot) {
      this.highScore = snapshot.val();
      $(domClass).html(snapshot.val());
    }.bind(this));
  }

  getScore() {
    return this.score;
  }

  levelUp() {
    // this.ballYPos >= 350 ? this.ballYPos = 350 : this.ballYPos += 35;
    // this.brickRows >= 10 ? this.brickRows = 10 : this.brickRows += 1;
    // this.ballYSpeed > 16 ? this.ballYSpeed = 16 : this.ballYSpeed += 1;
    // this.balls.forEach((ball) => (ball.addLevelSpeed()));
    this.bricks = [];
    this.addBricks();
  }

  phaseOutBrick(brick) {
    if (brick === undefined) { return; }
    new Promise(() => (
      // brick.setSprite("img/brick-yellow-cracked.png")
      this.context.fillStyle = "#888"
    )).then(setTimeout(() => (
      this.removeBrick(brick)
    ), 500));
  }

  powerDeleteBricks() {
    let numOfBricks = this.bricks.length;
    let bricksToDelete = [];
    if (numOfBricks < 3) {
      bricksToDelete = this.bricks;
    } else {
      let brickIndices = Util.getUniqueRandomNums(numOfBricks);
      brickIndices = brickIndices.sort((a, b) => a - b).reverse();
      brickIndices.forEach((index) => (
        bricksToDelete.push(this.bricks[index])));
    }

    bricksToDelete.forEach((brick) => (this.phaseOutBrick(brick)));
  }

  powerFastBalls() {
    this.balls.forEach((ball) => (ball.increaseBallSpeed()));
  }

  powerSlowBalls() {
    this.balls.forEach((ball) => (ball.decreaseBallSpeed()));
  }

  removeBrick(brick) {
    // 1 in 7 chance of containing a Power Up
    if (Util.oneInNumTrue(8)) {
      this.addPowerUp(brick.x, brick.y);
    }

    this.bricks.splice(this.bricks.indexOf(brick), 1);
    this.addToScore(1);
  }

  addToScore(points) {
    this.score += points;
  }

  removeOneSecond() {
    // this.seconds -= 1;
  }

  removePowerUp(powerUp) {
    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1);
  }

  render() {
    this.context.fillStyle = Util.bgColor("#ddd");
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.fillStyle = "#000";
    this.context.fillRect(0, 30, 900, 20);

    this.context.fillStyle = "#000";
    this.context.fillRect(440, 50, 20, 550);
    // let bg = new Image();
    // bg.src = "img/background.jpg";
    // this.context.drawImage(bg, 0, 0, this.width, this.height);
    this.displayHeaders();
    this.player.render();
    this.aiPlayer.render();
    this.balls.forEach((ball) => (ball.render()));
    this.bricks.forEach((brick) => (brick.render()));
    this.powerUps.forEach((powerUp) => (powerUp.render()));
  }

  renderGameOver(result) {
    // this.ball.stopBall();
    this.balls.forEach((ball) => (ball.stopBall()));
    // this.stopTimer();

    if (this.score > this.highScore) {
      this.setHighScore(this.score);
    }

    $('.alert-screen').append("<div class='game-over'></div>");
    this.renderLoss();
  }

  renderLoss() {
    $('.game-over').append("<h1>You lose</h1>");
    $('.game-over').append(`<p>Your Score: ${this.score}</p>`);
    this.getHighScore('.game-over');
    $('.game-over').append("<div class='btn btn-new'>Play Again<div>");
    $('.btn-play').on('click', this.startGame.bind(this));
  }

  setHighScore(score) {
    firebase.database().ref('/').set({
      highScore: score
    });
  }

  start() {
    $('.alert-screen').append("<div class='new-game'></div>");
    this.getHighScore('.high-score');
    // $('.new-game').append(this.highScores());
    $('.btn-play').on('click', this.startGame.bind(this));
  }

  startGame() {
    $('.alert-screen').html('');
    this.requestId = animate(this.step.bind(this));
    this.player = new Player(this.context);
    this.aiPlayer = new AIPlayer(this.context);

    this.balls = [];
    // this.addBall();
    this.addPongBall();
    this.addBreakOutBall();

    this.bricks = [];
    this.addBricks();

    this.powerUps = [];

    this.score = 0;
    // this.seconds = this.startingSeconds;
    // this.startTimer();
  }

  startTimer() {
    // this.countdown = setInterval(this.timer.bind(this), 1000);
  }

  stopTimer() {
    // clearInterval(this.countdown);
  }

  step() {
    this.update();
    this.render();

    if (this.bricks.length === 0) {
      this.levelUp();
    }

    if (this.seconds <= 0 ) {  //NB: this.lives <= 0
      this.renderGameOver();
    } else {
      animate(this.step.bind(this));
    }


  }

  timer() {
    // if (this.seconds <= 0) { return; }
    // this.seconds -= 1;
  }

  update() {
    // this.ball.update(this.player.paddle);
    this.breakOutBall.update(this.player.breakOutPaddle);
    this.pongBall.update(this.player.pongPaddle);
    this.pongBall.update(this.aiPlayer.paddle);

    // this.balls.forEach((ball) => (ball.update(this.player.breakOutPaddle)));
    // this.balls.forEach((ball) => (ball.update(this.player.pongPaddle)));
    this.player.update();
    this.aiPlayer.update(this.pongBall);
    this.bricks.forEach((brick) => (brick.updateAll(this.balls)));
    this.powerUps.forEach((powerUp) => (powerUp.update(this.player.breakOutPaddle)));
  }


}


module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Util = {

  getUniqueRandomNums(max) {
    let limit = 3;
    let min = 0;
    let nums = [];

    while (nums.length < limit) {
        var random_number = Math.round(Math.random()*(max - min) + min);
        if (nums.indexOf(random_number) == -1) {
            nums.push( random_number );
        }
    }
    return nums;
  },

  bounceAngle(object, ball) {
    let relIntY = (object.x + (object.width / 2)) - ball.x;
    let normRelIntY = (relIntY / (object.width / 2));
    return normRelIntY * 3 * Math.PI / 12;
  },

  oneInNumTrue(x) {
    let randNum = Math.floor(Math.random() * (x - 1) + 1);
    return randNum === 1 ? true : false;
  },

  numRange(min, max) {
    let nums = [];
    for (var i = min; i <= max; i++) {
      nums.push(i);
    }
    return nums;
  },

  bgColor(seconds) {
    switch(seconds) {
      case 5:
        return "#fec5c8";
      case 4:
        return "#fec5c8";
      case 3:
        return "#f4a2a6";
      case 2:
        return "#f78b8b";
      case 1:
        return "#e96565";
      case 0:
        return "#da3131";
      default:
        return "#FFFFFF";
    }
  },



};

module.exports = Util;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const Util = __webpack_require__(1);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const Util = __webpack_require__(1);

class Brick {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.context = options.context;
    this.game = options.game;
    this.sprite = "img/brick-pink.png";
  }

  remove() {
    this.game.playAudio("audio/Blip_Select12.m4a");
    this.game.removeBrick(this);
  }

  render() {
    this.context.beginPath();
    // let block = new Image();
    // block.src = this.sprite;
    // this.context.drawImage(block, this.x, this.y, this.width, this.height);
    this.context.fillStyle = "#00F";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  setSprite(sprite) {
    this.sprite = sprite;
  }

  updateAll(balls) {
    for (var i = 0; i < balls.length; i++) {
      if ( balls[i].x >= this.x &&
        balls[i].x <= this.x + this.width &&
        balls[i].y >= this.y &&
        balls[i].y <= this.y + this.height ) {
          this.remove();
          balls[i].reverseY();
      }
    }
  }

}

module.exports = Brick;

// when only 1 ball
// if ( ball.x >= this.x &&
//   ball.x <= this.x + this.width &&
//   ball.y >= this.y &&
//   ball.y <= this.y + this.height ) {
//     this.remove();
//     ball.reverseX();
// }


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

// 570 // x: canvasWidth - 30,
// 250 // y: canvasHeight / 2 - (paddleHeight / 2), (starting in the middle)
//  20 // width: 20,
// 100 // height: 100,

class Paddle {
  constructor(options) {
    this.id = options.id,
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.context = options.context;
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;
    this.x_speed = 0;
    this.y_speed = 0;
  }

  move(x, y) {
    if (x !== 0) {   // breakout paddle
      this.moveBreakOutPaddle(x);
    } else if (y !== 0) { // pong paddle
      this.movePongPaddle(y)
    }
  }

  movePongPaddle(y) {
    this.y += y;
    if (this.y < 50) {
      this.y = 50; // keeps paddle from going too far up
    }
    if (this.y + this.height > this.canvasHeight) {
      this.y = this.canvasHeight - this.height; //  keeps paddle from going too far down
    }
  }

  moveBreakOutPaddle(x) {
    this.x += x;
    if (this.x < 0) {
      this.x = 0; // keeps paddle from going too far left
    }
    if (this.x + this.width > this.canvasWidth) {
      this.x = this.canvasWidth - this.width; //  keeps paddle from going too far right
    }
  }

  render() {
    // let block = new Image();
    // block.src = "img/paddle_orange.png";
    // this.context.drawImage(block, this.x, this.y, this.width, this.height);
    this.context.fillStyle = "#888";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }



}

module.exports = Paddle;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(4);

class Player {
  constructor(context) {
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;

    let breakOutPaddleWidth = 120;
    let breakOutPaddleHeight = 15;

    let pongPaddleWidth = 15;
    let pongPaddleHeight = 120;

    this.breakOutPaddle = new Paddle({
      id: "breakOutPaddle",
      x: canvasWidth / 2 / 2 - (breakOutPaddleWidth / 2),
      y: canvasHeight - 40,
      width: breakOutPaddleWidth,
      height: breakOutPaddleHeight,
      context,
      canvasWidth: canvasWidth / 2 - 10,
      canvasHeight
    });

    this.pongPaddle = new Paddle({
      id: "pongPlayerPaddle",
      x: canvasWidth / 2 + 40,
      y: canvasHeight / 2 + (pongPaddleHeight / 2),
      width: pongPaddleWidth,
      height: pongPaddleHeight,
      context,
      canvasWidth: canvasWidth / 2,
      canvasHeight
    });

    // this.aiPaddle = new Paddle({
    //   id: "pongAIPaddle",
    //   x: canvasWidth - 40,
    //   y: canvasHeight / 2 + (pongPaddleHeight / 2),
    //   width: pongPaddleWidth,
    //   height: pongPaddleHeight,
    //   context,
    //   canvasWidth: canvasWidth / 2,
    //   canvasHeight
    // });
  }

  render() {
    this.breakOutPaddle.render();
    this.pongPaddle.render();
    // this.aiPaddle.render();
  }

  // Power-Up
  increasePaddleSize() {
    new Promise(() => (
      this.breakOutPaddle.width = Math.round( this.breakOutPaddle.width * 10/7)
    )).then(setTimeout(() => (
      this.breakOutPaddle.width = Math.round( this.breakOutPaddle.width * 7/10 )
    ), 8000));
  }

  // Power-Up
  decreasePaddleSize() {
    new Promise(() => (
      this.breakOutPaddle.width = Math.round( this.breakOutPaddle.width * 7/10)
    )).then(setTimeout(() => (
      this.breakOutPaddle.width = Math.round( this.breakOutPaddle.width * 10/7 )
    ), 8000));
  }

  update() {
    key.getPressedKeyCodes().forEach((key) => {
      if (key === 65) {
        this.breakOutPaddle.move(-5, 0);
      } else if (key === 68) {
        this.breakOutPaddle.move(5, 0);
      } else if (key === 38) {
        this.pongPaddle.move(0, -5);
        // this.aiPaddle.move(0, -5);
      } else if (key === 40) {
        // this.aiPaddle.move(0, 5);
        this.pongPaddle.move(0, 5);
      }
    });
  }

  // reset() {
  //   this.breakOutPaddle.reset(
  //     canvasWidth / 2 - (paddleWidth / 2),
  //     canvasHeight - 20
  //   );
  // }

}

module.exports = Player;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

class PowerUp {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.width = 20;
    this.height = 20;
    this.context = options.context;
    this.game = options.game;
    this.x_speed = 0;
    this.y_speed = 6;
    this.canvasHeight = this.context.canvas.height;
    this.canvasWidth = this.context.canvas.width;
    let power = this.chooseRandomPowerUp();
    this.power = power[0];
    this.image = power[1];
  }

  render() {
    this.context.beginPath();
    let block = new Image();
    block.src = this.image;
    this.context.drawImage(block, this.x, this.y, this.width, this.height);
  }

  chooseRandomPowerUp() {
    const powerUps = [
      // {"name": "addBall", "image": "img/star_red.png" },
      {"name": "slowBalls", "image": "img/star_green.png" },
      // {"name": "fastBalls", "image": "img/star_green.png" },
      {"name": "bigPaddle", "image": "img/star_blue.png" },
      // {"name": "smallPaddle", "image": "img/star_blue.png" },
      {"name": "removeBricks", "image": "img/star.png" }
    ];

    let randNum = Math.floor(Math.random() * powerUps.length);
    return [ powerUps[randNum]["name"], powerUps[randNum]["image"] ];
  }

  activatePower() {
    this.game.playAudio("audio/Powerup15.m4a");
    switch (this.power) {
      case "addBall":
        return this.game.addBall();
      case "slowBalls":
        return this.game.powerSlowBalls();
      case "fastBalls":
        return this.game.powerFastBalls();
      case "bigPaddle":
        return this.game.player.increasePaddleSize();
      case "smallPaddle":
        return this.game.player.decreasePaddleSize();
      case "removeBricks":
        return this.game.powerDeleteBricks();
    }
  }


  update(paddle) {
    this.x += this.x_speed;
    this.y += this.y_speed;

     // right edge - off the screen
    if (this.y >= this.canvasHeight) { this.game.removePowerUp(this); }
    // power up hits the paddle
    if (
      this.y >= paddle.y &&
      this.y <= paddle.y + 10 &&
      this.x >= paddle.x &&
      this.x <= (paddle.x + paddle.width)
    ) {
      this.activatePower();
      this.game.removePowerUp(this);
    }
  }


}

module.exports = PowerUp;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC7aTjQHH9a9p1iQT96Xua837KJ4t2Aboc",
  authDomain: "gong-34d06.firebaseapp.com",
  databaseURL: "https://gong-34d06.firebaseio.com",
  storageBucket: "gong-34d06.appspot.com",
  messagingSenderId: "77466642516"
};
firebase.initializeApp(config);
var database = firebase.database();

const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = 900;
canvas.height = 550;
const context = canvas.getContext('2d');
const game = new Game(context);
window.addEventListener('keydown',game.toggleSound.bind(game),false);


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(4);

class AIPlayer {
  constructor(context) {
    const canvasWidth = 900;
    const canvasHeight = 550;

    let pongPaddleWidth = 15;
    let pongPaddleHeight = 120;
    this.paddle = new Paddle({
      id: "pongAIPaddle",
      x: canvasWidth - 40,
      y: canvasHeight / 2 + (pongPaddleHeight / 2),
      width: pongPaddleWidth,
      height: pongPaddleHeight,
      context,
      canvasWidth: canvasWidth / 2,
      canvasHeight
    });
  }

  render() {
    this.paddle.render();
  }


  update(ball) {
    let yPos = ball.y;

    let diff = -((this.paddle.y + (this.paddle.height / 2)) - yPos);

    if(diff < -4) { // max speed up
      diff = -5;
    } else if(diff > 4) { // max speed down
      diff = 5;
    }
    this.paddle.move(0, diff);
    if(this.paddle.y < 50) {
      this.paddle.y = 50;
    } else if (this.paddle.y + this.paddle.height > 550) {
      this.paddle.y = 550 - this.paddle.height;
      
    }
  }

  // reset() {
  //   this.breakOutPaddle.reset(
  //     canvasWidth / 2 - (paddleWidth / 2),
  //     canvasHeight - 20
  //   );
  // }

}

module.exports = AIPlayer;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map