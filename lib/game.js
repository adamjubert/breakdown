const Ball = require("./ball");
const Player = require("./player");
const Brick = require("./brick");
const Util = require("./util");
const PowerUp = require("./power_up");

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
    this.powerUpCount = 0;
    this.powerUps = [];
    this.score = 0;
    this.brickCols = 3;
    this.ballXSpeed = 10;
    this.ballXPos = 150;
    this.startingSeconds = 5;
    this.highScore = 0;
  }

  getBallXPos() {
    return this.ballXPos;
  }

  getBallXSpeed() {
    return this.ballXSpeed;
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

    let numCols = this.brickCols;
    for (var i = 0; i < numCols; i++) {
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
        brickY += (brickHeight + brickSpace);
      }
      brickX += 30;
      brickY = brickStartY;
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
    document.getElementById('gong-hard').play();
    this.seconds += time;
    this.addPowerUp();

    $('.wrapper').append("<div class='extra-time-container'></div>");
    $('.extra-time-container').append("<p class='extra-time'>+5</p>");
    $('.extra-time').delay(800).hide(3000);
  }

  addBall() {
    this.ballCount += 1;
    let id = this.ballCount;
    let x = new Ball({
      id,
      x: this.ballXPos,
      y: Game.DIM_Y / 2,
      game: this,
      context: this.context,
      x_speed: this.ballXSpeed
    });
    this.balls.push(x);
  }

  displayHeaders() {
    this.displayTime();
    this.displayScore();
  }

  displayScore() {
    this.context.fillStyle = '#000';
    this.context.font = '24px Audiowide';
    this.context.fillText(this.score, 750, 35);
  }

  displayTime() {
    this.context.fillStyle = '#000';
    this.context.font = '44px Audiowide';
    this.context.fillText(this.seconds, 400, 40);
  }

  getScore() {
    return this.score;
  }

  removeBrick(brick) {
    // 1 in 7 chance of containing a Power Up
    if (Util.oneInNumTrue(2)) {
      this.addPowerUp(brick.x, brick.y);
    }
    this.bricks.splice(this.bricks.indexOf(brick), 1);
    this.score += 1;
  }

  removeOneSecond() {
    this.seconds -= 1;
  }

  removePowerUp(powerUp) {
    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1);
  }

  render() {
    this.context.fillStyle = Util.bgColor(this.seconds);
    this.context.fillRect(0, 0, this.width, this.height);
    this.displayHeaders();
    this.player.render();
    this.balls.forEach((ball) => (ball.render()));
    this.bricks.forEach((brick) => (brick.render()));
    this.powerUps.forEach((powerUp) => (powerUp.render()));
  }

  writeHighScore(score) {
    firebase.database().ref('/').set({
      highScore: score
    });
  }

  renderGameOver(result) {
    // this.ball.stopBall();
    this.balls.forEach((ball) => (ball.stopBall()));
    this.stopTimer();

    if (this.score > this.highScore) {
      this.writeHighScore(this.score);
    }


    $('.alert-screen').append("<div class='game-over'></div>");
    if (this.seconds <= 0) {
      this.renderLoss();
    } else if (this.bricks.length === 0) {
      this.renderWin();
    }
  }

  getHighScore(domClass) {
    firebase.database().ref('/highScore').on('value', function(snapshot) {
      this.highScore = snapshot.val();
      $(domClass).append(`<p>High score: ${snapshot.val()}</p>`);
    }.bind(this));

  }

  renderLoss() {
    console.log("You lose!");
    $('.game-over').append("<h1>You lose!</h1>");
    $('.game-over').append(`<p>Your score: ${this.score}</p>`);
    this.getHighScore('.game-over');
    $('.game-over').append("<div class='btn btn-new'>Play Again<div>");
    $('.btn-new').on('click', this.startGame.bind(this));
  }

  renderWin() {
    console.log("You won!");
    $('.game-over').append("<h1>You win!</h1>");
    $('.game-over').append("<div class='btn btn-new'>Play Again<div>");

    $('.btn-new').on('click', this.startGame.bind(this));
  }

  start() {
    $('.alert-screen').append("<div class='new-game'></div>");
    $('.new-game').append("<p>Instructions: just play the game</p>");
    this.getHighScore('.new-game');
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

  levelUp() {
    this.ballXPos >= 350 ? this.ballXPos = 350 : this.ballXPos += 35;
    this.brickCols >= 10 ? this.brickCols = 10 : this.brickCols += 1;
    this.ballXSpeed > 16 ? this.ballXSpeed = 16 : this.ballXSpeed += 1;
    this.bricks = [];
    this.addBricks();
  }

  phaseOutBrick(brick) {
    if (brick === undefined) { return; }
    new Promise(() => (
      brick.setColor("#888")
    )).then(setTimeout(() => (
      this.removeBrick(brick)
    ), 500));
  }

  powerSlowBalls() {
    this.balls.forEach((ball) => (ball.decreaseBallSpeed()));
  }
  powerFastBalls() {
    this.balls.forEach((ball) => (ball.increaseBallSpeed()));
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

    this.powerUps = [];

    this.score = 0;
    this.seconds = this.startingSeconds;
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

    if (this.bricks.length === 0) {
      this.levelUp();
    }

    if (this.seconds <= 0 ) {
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
    this.powerUps.forEach((powerUp) => (powerUp.update(this.player.paddle)));
  }


}

Game.DIM_X = 800;
Game.DIM_Y = 400;

module.exports = Game;
