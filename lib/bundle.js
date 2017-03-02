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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

const Game = __webpack_require__(4);

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
game.start();
// game.renderGameStart();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);

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
    } else if (this.y + this.height > this.canvasHeight) {
      this.y = this.canvasHeight - this.height; //  keeps paddle from going too far down
    }
  }

  render() {
    const outerColor = "#f47a42";
    this.context.fillStyle = outerColor;
    this.context.fillRect(this.x, this.y, this.width, this.height / 2.5 );
    this.context.fillStyle = "#A62A2A";
    this.context.fillRect(this.x, this.y + 40, this.width, this.height / 5 );
    this.context.fillStyle = outerColor;
    this.context.fillRect(this.x, this.y + 60, this.width, this.height / 2.5 );
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }

}

module.exports = Paddle;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Paddle = __webpack_require__(1);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Mallet = __webpack_require__(3);
const Player = __webpack_require__(2);



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
    this.mallet = new Mallet({
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
    this.mallet.update(this.player.paddle);
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
    this.mallet.render();
  }
}

Game.DIM_X = 600;
Game.DIM_Y = 400;

module.exports = Game;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map