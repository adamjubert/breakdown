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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Ball = __webpack_require__(3);
const Player = __webpack_require__(6);
const AIPlayer = __webpack_require__(2);
const Brick = __webpack_require__(4);
const Util = __webpack_require__(1);
const PowerUp = __webpack_require__(7);
const GameView = __webpack_require__(9);

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
    this.powerUps = [];
    this.score = 0;
    this.ballYSpeed = 10;
    this.ballYPos = 150;
    this.highScore = 0;
    this.muted = false;
    this.powerUpCount = 0;
    // this.pongBall;
    // this.breakOutBall;
  }

  addToPowerUpCount() {
    this.powerUpCount += 1;
  }

  changeLives(num) {
    this.lives += num;
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
    this.bricks = [];
    this.powerUps = [];

    let pongWidth = this.width / 2 - 10;

    let brickWidth = 45;
    let brickHeight = 12;
    let brickSpace = 10; // 5 on each side; 10 total

    // number of bricks based on width of canvas
    let brickStartX = 35;
    let brickStartY = 100;
    let numOfBricks = Math.floor(pongWidth / ( brickWidth + brickSpace )) - 1;

    let brickX = brickStartX;
    let brickY = brickStartY;

    let colors = ["#FF0000", "#f0f008", "#008000", "#FFA500", "#0000FF"];



    let numRows = 5;
    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numOfBricks; j++) {
        let brick = new Brick({
          x: brickX,
          y: brickY,
          width: brickWidth,
          height: brickHeight,
          context: this.context,
          game: this,
          color: colors[i]
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


  addPongBall() {
    // this.ballCount += 1;
    // let id = this.ballCount;
    this.pongBall = new Ball({
      id: "pongBall",
      x: 550,
      y: 200,
      game: this,
      context: this.context,
      x_speed: 4,
      y_speed: 3,
      canvasX: 460,
      canvasY: 50,
      canvasHeight: this.height,
      canvasWidth: this.width
    });
    this.balls.push(this.pongBall);
  }

  addBreakOutBall() {
    // this.ballCount += 1;
    // let id = this.ballCount;
    this.breakOutBall = new Ball({
      id: "breakOutBall",
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

  addBalls() {
    this.balls = [];
    this.addPongBall();
    this.addBreakOutBall();
  }


  getHighScore(domClass) {
    firebase.database().ref('/highScore').on('value', function(snapshot) {
      this.highScore = snapshot.val();
      $(domClass).append(snapshot.val());
    }.bind(this));
  }

  getScore() {
    return this.score;
  }

  levelUp() {
    this.powerUpCount = 0;
    this.bricks = [];
    this.addBricks();
  }


  phaseOutBrick(brick) {
    if (brick === undefined) { return; }
    brick.setColor("#888");
    setTimeout(() => (
      this.removeBrick(brick)
    ), 300);
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
    if (Util.oneInNumTrue(12) && this.powerUpCount < 3) {
      this.addPowerUp(brick.x, brick.y);
    }

    this.bricks.splice(this.bricks.indexOf(brick), 1);
    this.addToScore(1);
  }

  addToScore(points) {
    this.score += points;
  }

  removePowerUp(powerUp) {
    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1);
  }

  render() {
    this.gameView.displayScreen();
    this.gameView.displayHeaders(this.score, this.lives);
    this.player.render();
    this.aiPlayer.render();
    this.balls.forEach((ball) => (ball.render()));
    this.bricks.forEach((brick) => (brick.render()));
    this.powerUps.forEach((powerUp) => (powerUp.render()));
  }

  renderGameOver(result) {
    this.balls.forEach((ball) => (ball.stopBall()));
    if (this.score > this.highScore) { this.setHighScore(this.score); }
    this.start(this.score);
  }


  setHighScore(score) {
    firebase.database().ref('/').set({
      highScore: score
    });
  }

  start(score) {
    // $('.alert-screen').append("<div class='new-game'></div>");
    this.gameView = new GameView({game: this});
    this.gameView.addMainMenu(score);

    // let startScreen = `
    //   <div class="alert-screen">
    //     <div class="player-score"></div>
    //     <div class="high-score-container">
    //       <h2>High Score</h2>
    //       <p class="score high-score"></p>
    //     </div>
    //     <div class="flex-center">
    //       <div>
    //         <h2>Controls</h2>
    //         <ul>
    //           <li><p>left screen:</p> <div class="controls"> <span>A</span> & <span>D</span> </div> </li>
    //           <li><p>right screen:</p> <div class="controls"> <span class="arrow">▲</span> & <span class="arrow">▼</span> </div> </li>
    //           <li><p>sound on/off:</p> <div class="controls"> <span>Q</span> </div> </li>
    //         </ul>
    //       </div>
    //       <div class="power-ups">
    //         <h2>Power Ups</h2>
    //         <ul>
    //           <li><img src="img/star_blue.png" />bigger paddles</li>
    //           <li><img src="img/star.png" /> removes bricks</li>
    //           <li><img src="img/star_green.png" /> extra life</li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div class="btn btn-play">Press Enter</div>
    //   </div>
    // `;
    //
    // $('.wrapper').append(startScreen);
    // $('.alert-screen').css('background', '#111');
    //
    // if (score !== undefined) {
    //   $('.player-score').append(`<h2>Your Score</h2><p class="score">${score}</p>`);
    // }

    // this.game.getHighScore('.high-score');

    $('.btn-play').on('click', this.startGame.bind(this));

    $(document).keypress((e) => {
      if (e.keyCode === 13) {
        this.startGame();
      }
    });
  }

  startGame() {
    this.gameView.clearScreen();
    this.requestId = animate(this.step.bind(this));

    this.player = new Player(this.context);
    this.aiPlayer = new AIPlayer(this.context);

    this.addBalls();
    this.addBricks();

    this.lives = 10;
    this.score = 0;
  }



  step() {
    this.update();
    this.render();

    if (this.bricks.length === 0) { this.levelUp(); }
    this.lives <= 0 ? this.renderGameOver() : animate(this.step.bind(this));

  }

  update() {
    this.breakOutBall.update(this.player.breakOutPaddle);
    this.pongBall.update(this.player.pongPaddle);
    this.pongBall.update(this.aiPlayer.paddle);
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

  bounceAnglePong(object, ball) {
    let relIntX = (object.y + (object.height / 2)) - ball.y;
    let normRelIntX = (relIntX / (object.height / 2));
    return normRelIntX * 3 * Math.PI / 12;
  },

  oneInNumTrue(x) {
    let randNum = Math.floor(Math.random() * (x - 1) + 1);
    return randNum === 1 ? true : false;
  },

  numRange(min, max) {
    // let nums = [];
    // for (var i = min; i <= max; i++) {
    //   nums.push(i);
    // }
    // return nums;
  },

  bgColor(lives) {
    switch(lives) {
      case 5:
        return "#fec5c8";
      case 3:
        return "#fec5c8";
      case 2:
        return "#f4a2a6";
      case 1:
        return "#f78b8b";
      case 0:
        return "#e96565";
      default:
        return "#FFFFFF";
    }
  },



};

module.exports = Util;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(5);

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
      diff = -4;
    } else if(diff > 4) { // max speed down
      diff = 4;
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


/***/ }),
/* 3 */
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
    this.context.fillStyle = "#000";
    this.context.fill();
  }

  checkPongBoundaries() {
    if (this.y < this.canvasY || this.y > this.canvasHeight) { this.y_speed *= -1; }
    if (this.x >= this.canvasWidth) {
      this.game.addToScore(10);
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


/***/ }),
/* 4 */
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
    this.color = options.color;
  }

  remove() {
    this.game.playAudio("audio/Blip_Select12.m4a");
    this.game.removeBrick(this);
  }

  render() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  setSprite(sprite) {
    this.sprite = sprite;
  }

  setColor(color) {
    this.color = color;
  }

  collision(ball) {
    return ball.x >= this.x &&
      ball.x <= this.x + this.width &&
      ball.y >= this.y &&
      ball.y <= this.y + this.height;
  }

  updateAll(balls) {
    balls.forEach((ball) => {
      if ( this.collision(ball) ) {
          this.remove();
          ball.reverseY();
      }
    });
  }

}

module.exports = Brick;


/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(5);

class Player {
  constructor(context) {
    this.canvasWidth = context.canvas.width;
    this.canvasHeight = context.canvas.height;
    this.context = context,
    this.createPaddles();
    this.alreadyBig = false;
    this.originalPaddleWidth = 120;
    this.bigPaddleWidth = 170;
  }

  createPaddles() {
    this.createBreakOutPaddle(120, 15);
    this.createPongPaddle(15, 120);
  }

  createBreakOutPaddle(paddleWidth, paddleHeight) {
    this.breakOutPaddle = new Paddle({
      id: "breakOutPaddle",
      x: this.canvasWidth / 2 / 2 - (paddleWidth / 2),
      y: this.canvasHeight - 40,
      width: paddleWidth,
      height: paddleHeight,
      context: this.context,
      canvasWidth: this.canvasWidth / 2 - 10,
      canvasHeight: this.canvasHeight
    });
  }

  createPongPaddle(paddleWidth, paddleHeight) {
    this.pongPaddle = new Paddle({
      id: "pongPlayerPaddle",
      x: this.canvasWidth / 2 + 40,
      y: this.canvasHeight / 2 + (paddleHeight / 2),
      width: paddleWidth,
      height: paddleHeight,
      context: this.context,
      canvasWidth: this.canvasWidth / 2,
      canvasHeight: this.canvasHeight
    });
  }

  render() {
    this.breakOutPaddle.render();
    this.pongPaddle.render();
    // this.aiPaddle.render();
  }

  // Power-Up
  increasePaddleSize() {
    let boPaddle = this.breakOutPaddle;
    let pongPaddle = this.pongPaddle;
    if (boPaddle.width > 230 || pongPaddle.height > 230) { return; }

    // new Promise((resolve, reject) => {
    //   this.paddleInterval = setInterval(() => {
    //     boPaddle.width *= 1.003;
    //   }, 20);
    //   this.paddleTimeout = setTimeout(() => {
    //     clearInterval(this.paddleInterval);
    //     resolve();
    //   }, 1000);
    // }).then(() => {
    //   this.paddleTimeout = setTimeout(() => {
    //     this.paddleInterval = setInterval(() => {
    //       boPaddle.width /= 1.003;
    //     }, 20);
    //
    //     this.paddleTimeout = setTimeout(() => {
    //       clearInterval(this.paddleInterval);
    //     }, 1000);
    //   }, 6000);
    // });



    // }




    // boPaddle.width = Math.round( boPaddle.width * 10/7);
    // setTimeout(() => (
    //   boPaddle.width = Math.round( boPaddle.width * 7/10 )
    // ), 8000)

    // new Promise(() => (
    //   boPaddle.width = Math.round( boPaddle.width * 10/7)
    // )).then(setTimeout(() => (
    //   boPaddle.width = Math.round( boPaddle.width * 7/10 )
    // ), 8000));

    boPaddle.width = Math.round( boPaddle.width * 10/8);
    setTimeout(() => (
      boPaddle.width = Math.round( boPaddle.width * 8/10 )
    ), 8000);

    pongPaddle.height = Math.round( pongPaddle.height * 10/8);
    setTimeout(() => (
      pongPaddle.height = Math.round( pongPaddle.height * 8/10 )
    ), 8000);
  }

  increaseTime() {
    let boPaddle = this.breakOutPaddle;
    this.paddleTimeout = setTimeout(() => {
      this.paddleInterval = setInterval(() => {
        boPaddle.width /= 1.007;
      }, 20);

      this.paddleTimeout = setTimeout(() => {
        clearInterval(this.paddleInterval);
        console.log('clear interval');
      }, 1000);
    }, 6000);
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
/* 7 */
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
      {"name": "bigPaddle", "image": "img/star_blue.png" },
      {"name": "removeBricks", "image": "img/star.png" },
      {"name": "extraLife", "image": "img/star_green.png" }
      // {"name": "addBall", "image": "img/star_red.png" },
      // {"name": "fastBalls", "image": "img/star_green.png" },
      // {"name": "slowBalls", "image": "img/star_green.png" },
      // {"name": "smallPaddle", "image": "img/star_blue.png" },
    ];

    let randNum = Math.floor(Math.random() * powerUps.length);
    return [ powerUps[randNum]["name"], powerUps[randNum]["image"] ];
  }

  activatePower() {
    this.game.playAudio("audio/Powerup15.m4a");
    switch (this.power) {
      case "addBall":
        return this.game.addBall();
      case "extraLife":
        return this.game.changeLives(1);
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
/* 8 */
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
window.addEventListener("keydown", function(e) {
  if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(1);

class GameView {
  constructor(options) {
    this.game = options.game;
  }

  addMainMenu(score) {
    $('.wrapper').append(this.startScreen());
    $('.alert-screen').css('background', '#111');

    if (score !== undefined) {
      $('.player-score').append(`<h2>Your Score</h2><p class="score">${score}</p>`);
    }

    this.game.getHighScore('.high-score');

  }

  clearScreen() {
    $(document).off("keypress");
    $('.alert-screen').html('');
    $('.alert-screen').css('background', 'none');
  }

  displayScreen() {
    let ctx = this.game.context;
    ctx.fillStyle = Util.bgColor("#ccc");
    ctx.fillRect(0, 0, 900, 550);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 30, 900, 20);

    ctx.fillStyle = "#000";
    ctx.fillRect(440, 50, 20, 550);
  }

  displayHeaders(score, lives) {
    this.displayScore(score);
    this.displayLives(lives);
  }

  displayScore(score) {
    this.game.context.fillStyle = '#000';
    this.game.context.font = '24px Audiowide';
    this.game.context.fillText(`Score: ${score}`, 10, 25);
  }

  displayLives(lives) {
    this.game.context.fillStyle = '#000';
    this.game.context.font = '24px Audiowide';
    this.game.context.fillText(`Lives: ${lives}`, 770, 25);
  }




  startScreen() {
    return `
      <div class="alert-screen">
        <div class="player-score"></div>
        <div class="high-score-container">
          <h2>High Score</h2>
          <p class="score high-score"></p>
        </div>
        <div class="flex-center">
          <div>
            <h2>Controls</h2>
            <ul>
              <li><p>left screen:</p> <div class="controls"> <span>A</span> & <span>D</span> </div> </li>
              <li><p>right screen:</p> <div class="controls"> <span class="arrow">▲</span> & <span class="arrow">▼</span> </div> </li>
              <li><p>sound on/off:</p> <div class="controls"> <span>Q</span> </div> </li>
            </ul>
          </div>
          <div class="power-ups">
            <h2>Power Ups</h2>
            <ul>
              <li><img src="img/star_blue.png" />bigger paddles</li>
              <li><img src="img/star.png" /> removes bricks</li>
              <li><img src="img/star_green.png" /> extra life</li>
            </ul>
          </div>
        </div>
        <div class="btn btn-play">Press Enter</div>
      </div>
    `;

  }


}


module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map