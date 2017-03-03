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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Ball = __webpack_require__(1);
const Player = __webpack_require__(4);
const Brick = __webpack_require__(2);
const Util = __webpack_require__(6)


const animate = window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   function(callback) { window.setTimeout(callback, 1000/60); };


class Game {
  constructor(width, height, context) {
    this.width = width;
    this.height = height;
    this.context = context;
    this.start();
    this.ballCount = 0;
  }


  addBricks() {
    let canvasHeight = Game.DIM_Y;

    let brickWidth = 10;
    let brickHeight = 44;
    let brickSpace = 5; // 5 on each side; 10 total

    // number of bricks based on height of canvas
    let numOfBricks = Math.floor(canvasHeight / ( brickHeight + brickSpace ));
    let brickStartX = 30;
    let brickStartY = 5;

    let brickX = brickStartX;
    let brickY = brickStartY;

    let numCols = 4;
    for (var i = 0; i < numCols; i++) {
      for (var j = 0; j < numOfBricks; j++) {
        let brick = new Brick({
          x: brickX,
          y: brickY,
          width: brickWidth,
          height: brickHeight,
          context: this.context,
          game: this,
          containsPowerUp: Util.oneInNumTrue(10)
        });
        this.bricks.push(brick);
        brickY += (brickHeight + brickSpace);
      }
      brickX += 30;
      brickY = brickStartY;
    }

  }



  addTime(time) {
    document.getElementById('gong-hard').play();
    this.seconds += time;
    $('.wrapper').append("<div class='extra-time-container'></div>");
    $('.extra-time-container').append("<p class='extra-time'>+5</p>");
    $('.extra-time').delay(800).hide(3000);
  }

  addBall() {
    this.ballCount += 1;
    let id = this.ballCount;
    let x = new Ball({
      id,
      x: 200,
      y: Game.DIM_Y / 2,
      game: this,
      context: this.context
    });
    this.balls.push(x);
  }

  getScore() {
    return this.score;
  }

  displayTime() {
    this.context.fillStyle = '#000';
    this.context.font = '44px serif';
    this.context.fillText(this.seconds, 400, 40);
  }


  removeBrick(brick) {
    this.bricks.splice(this.bricks.indexOf(brick), 1);
  }

  render() {
    // this.context.fillStyle = "#FFFFFF";
    this.context.fillStyle = Util.bgColor(this.seconds);
    this.context.fillRect(0, 0, this.width, this.height);
    this.displayTime();
    this.player.render();
    // this.ball.render();
    this.balls.forEach((ball) => (ball.render()));
    this.bricks.forEach((brick) => (brick.render()));
  }

  renderGameOver(result) {
    // this.ball.stopBall();
    this.balls.forEach((ball) => (ball.stopBall()));
    this.stopTimer();

    $('.alert-screen').append("<div class='game-over'></div>");
    if (this.seconds <= 0) {
      this.renderLoss();
    } else if (this.bricks.length === 0) {
      this.renderWin();
    }
  }

  renderWin() {
    console.log("You won!");
    $('.game-over').append("<h1>You win!</h1>");
    $('.game-over').append("<div class='btn btn-new'>Play Again<div>");
    $('.btn-new').on('click', this.startGame.bind(this));
  }

  renderLoss() {
    console.log("You lose!");
    $('.game-over').append("<h1>You lose!</h1>");
    $('.game-over').append("<div class='btn btn-new'>Play Again<div>");
    $('.btn-new').on('click', this.startGame.bind(this));
  }

  start() {
    $('.alert-screen').append("<div class='new-game'></div>");
    $('.new-game').append("<h1>GONG</h1>");
    $('.new-game').append("<p>Instructions: just play the game</p>");
    $('.new-game').append("<div class='btn btn-new'>Play Game<div>");
    // $('.new-game').append(this.highScores());
    $('.btn-new').on('click', this.startGame.bind(this));
  }

  highScores() {
    // make with Firebase
  }



  // phaseOutBrick(brick) {
  //   // use javascript toHex
  //   // user setInterval
  //  // iterate through hex colors and set
  //   new Promise(() => (
  //
  //   ))
  // }

  phaseOutBrick(brick) {
    new Promise(() => (
      brick.setColor("#888")
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

  startGame() {
    $('.alert-screen').html('');
    this.requestId = animate(this.step.bind(this));
    this.player = new Player(this.context);

    this.balls = [];
    this.addBall();

    this.bricks = [];
    this.addBricks();

    this.seconds = 6;
    this.startTimer();
  }


  startTimer() {
    this.countdown = setInterval(this.timer.bind(this), 1000);
  }

  stopTimer() {
    clearInterval(this.countdown);
  }

  step() {
    this.update();
    this.render();
    if (this.seconds <= 0 || this.bricks.length === 0) {
      this.renderGameOver();
    } else {
      animate(this.step.bind(this));
    }
  }

  timer() {
    if (this.seconds <= 0) { return; }
    this.seconds -= 1;
  }

  update() {
    // this.ball.update(this.player.paddle);
    this.balls.forEach((ball) => (ball.update(this.player.paddle)));
    this.player.update();
    this.bricks.forEach((brick) => (brick.updateAll(this.balls)));
  }


}

Game.DIM_X = 800;
Game.DIM_Y = 400;

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

let DIM_X = Game.DIM_X;
let DIM_Y = Game.DIM_Y;

class Ball {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.game = options.game;
    this.x_speed = 8;
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
    console.log(this.x_speed);
  }

  decreaseBallSpeed() {
    if (this.x_speed <= 3 && this.x_speed >= -3) { return; }
    new Promise(() => (
      this.x_speed = Math.round(this.x_speed * 8/10)
    )).then(setTimeout(() => (
      this.x_speed = Math.round(this.x_speed * 10/8)
    ), 8000));
    console.log(this.x_speed);

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
    this.x = 200;
    this.y = this.randYCoord();
    this.x_speed = 8;
    this.y_speed = -8;
  }

  stopBall() {
    this.x_speed = 0;
    this.y_speed = 0;
  }
}

module.exports = Ball;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

class Brick {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.context = options.context;
    this.game = options.game;
    this.color = "#000";
    this.containsPowerUp = options.containsPowerUp;
  }

  remove() {
    this.game.removeBrick(this);
  }

  render() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  setColor(color) {
    this.color = color;
  }

  updateAll(balls) {
    for (var i = 0; i < balls.length; i++) {
      if ( balls[i].x >= this.x &&
        balls[i].x <= this.x + this.width &&
        balls[i].y >= this.y &&
        balls[i].y <= this.y + this.height ) {
          this.remove();
          balls[i].reverseX();
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

// 570 // x: canvasWidth - 30,
// 250 // y: canvasHeight / 2 - (paddleHeight / 2), (starting in the middle)
//  20 // width: 20,
// 100 // height: 100,

class Paddle {
  constructor(options) {
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

  move(y) {
    this.y += y;
    if (this.y < 0) {
      this.y = 0; // keeps paddle from going too far up
    }
    if (this.y + this.height > this.canvasHeight) {
      this.y = this.canvasHeight - this.height; //  keeps paddle from going too far down
    }
  }

  render() {
    const outerColor = "#f47a42";
    this.context.fillStyle = outerColor;
    this.context.fillRect(this.x, this.y, this.width, this.height / 2.5 );
    this.context.fillStyle = "#A62A2A";
    this.context.fillRect(this.x, this.y + (this.height / 2.5), this.width, this.height / 5 );
    this.context.fillStyle = outerColor;
    this.context.fillRect(this.x, this.y + (this.height / 1.6666667), this.width, this.height / 2.5 );
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }



}

module.exports = Paddle;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(3);

class Player {
  constructor(context) {
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;
    const paddleHeight = 100;
    this.paddle = new Paddle({
      x: canvasWidth - 20,
      y: canvasHeight / 2 - (paddleHeight / 2),
      width: 10,
      height: paddleHeight,
      context,
      canvasWidth,
      canvasHeight
    });
  }

  render() {
    this.paddle.render();
  }

  // Power-Up
  increasePaddleSize() {
    new Promise(() => (
      this.paddle.height = Math.round( this.paddle.height * 10/7)
    )).then(setTimeout(() => (
      this.paddle.height = Math.round( this.paddle.height * 7/10 )
    ), 8000));
  }

  // Power-Up
  decreasePaddleSize() {
    new Promise(() => (
      this.paddle.height = Math.round( this.paddle.height * 7/10)
    )).then(setTimeout(() => (
      this.paddle.height = Math.round( this.paddle.height * 10/7 )
    ), 8000));
  }

  update() {
    key.getPressedKeyCodes().forEach((key) => {
      if (key === 38) {
        this.paddle.move(-5);
      } else if (key === 40) {
        this.paddle.move(5);
      }
    });
  }

  reset() {
    this.paddle.reset(870, 250);
  }

}

module.exports = Player;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


// document.addEventListener("DOMContentLoaded", function() {
//   const canvas = document.getElementsByTagName("canvas")[0];
//   canvas.width = Game.DIM_X;
//   canvas.height = Game.DIM_Y;
//
//   const context = canvas.getContext("2d");
//   const game = new Game();
//   new GameView(game, context).start();
// });

const Game = __webpack_require__(0);

document.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);
const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = Game.DIM_X;
canvas.height = Game.DIM_Y;
const context = canvas.getContext('2d');
const game = new Game(Game.DIM_X, Game.DIM_Y, context);

// game.renderGameStart();


/***/ }),
/* 6 */
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

  oneInNumTrue(x) {
    let randNum = Math.floor(Math.random() * (x - 1) + 1);
    return randNum === 1 ? true : false;
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
  }

};

module.exports = Util;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map