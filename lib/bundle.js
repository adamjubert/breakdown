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
      this.y = 0; // top
    } else if (this.y + this.height > this.canvasHeight) {
      this.y = this.canvasHeight - this.height; //bottom
    }
  }

  render() {
    this.context.fillStyle = "#000";
    this.context.fillRect(this.x, this.y, this.width, this.height);
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
      x: canvasWidth - 30,
      y: canvasHeight / 2 - (paddleHeight / 2),
      width: 20,
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
/***/ (function(module, exports) {



class Mallet {
  constructor(x, y, context, game) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.x_speed = 10;
    this.y_speed = 0;
    this.radius = 15;
    this.game = game;
  }

  render() {
    this.context.beginPath;
    this.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    this.context.fillStyle = "#000";
    this.context.fill();
  }

  update() {
    
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
    this.mallet = new Mallet(10, Game.DIM_Y / 2, context, this);
    this.timer = 0;
    this.score = 0;
  }

  renderGameOver() {
    let message = `Your final score: ${this.score}`;
  }

  score() {
    this.context.font = '60px';
    this.context.fillStyle = '#000';
    this.context.fillText(this.score, 410, 90);
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

  render() {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.width, this.height);
    this.score;
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