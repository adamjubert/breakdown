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
  constructor(context) {
    this.width = 600;
    this.height = 600;
    this.context = context;
    this.start();
    this.ballCount = 0;
    this.powerUpCount = 0;
    this.powerUps = [];
    this.score = 0;
    this.brickRows = 3;
    this.ballYSpeed = 10;
    this.ballYPos = 150;
    this.startingSeconds = 10;
    this.highScore = 0;
    this.muted = false;
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
    let canvasWidth = this.width;

    let brickWidth = 60;
    let brickHeight = 20;
    let brickSpace = 5; // 5 on each side; 10 total

    // number of bricks based on height of canvas
    let numOfBricks = Math.floor(canvasWidth / ( brickWidth + brickSpace ));
    let brickStartX = 5;
    let brickStartY = 50;

    let brickX = brickStartX;
    let brickY = brickStartY;

    let numRows = this.brickRows;
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
    this.seconds += time;
    this.addPowerUp();

    $('.wrapper').append("<div class='extra-time-container'></div>");
    $('.extra-time-container').append("<p class='extra-time'>+5</p>");
    $('.extra-time').delay(1000).hide(2000);
    // $('.extra-time').delay(5000).then( function() {  } ) // NB: fix this!
  }

  addBall() {
    this.ballCount += 1;
    let id = this.ballCount;
    let x = new Ball({
      id,
      x: this.width / 2,
      y: this.ballYPos,
      game: this,
      context: this.context,
      y_speed: this.ballYSpeed
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

  levelUp() {
    this.ballYPos >= 350 ? this.ballYPos = 350 : this.ballYPos += 35;
    this.brickRows >= 10 ? this.brickRows = 10 : this.brickRows += 1;
    this.ballYSpeed > 16 ? this.ballYSpeed = 16 : this.ballYSpeed += 1;
    this.balls.forEach((ball) => (ball.addLevelSpeed()));
    this.bricks = [];
    this.addBricks();
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
    if (brick === undefined) { return; }
    new Promise(() => (
      brick.setSprite("img/brick-yellow-cracked.png")
    )).then(setTimeout(() => (
      this.removeBrick(brick, true)
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


  removeBrick(brick, fromPowerUp = false ) {
    // 1 in 7 chance of containing a Power Up
    if (Util.oneInNumTrue(2)) {
      this.addPowerUp(brick.x, brick.y);
    }

    if ( fromPowerUp === false ) {
      new Promise(() => (
        brick.setSprite("img/brick_pink_cracked.png")
      )).then(setTimeout(() => (
        this.bricks.splice(this.bricks.indexOf(brick), 1)
      ), 200));
    }

    this.score += 1;
  }

  removeOneSecond() {
    this.seconds -= 1;
  }

  removePowerUp(powerUp) {
    this.powerUps.splice(this.powerUps.indexOf(powerUp), 1);
  }

  render() {
    // this.context.fillStyle = Util.bgColor(this.seconds);
    // this.context.fillRect(0, 0, this.width, this.height);
    let bg = new Image();
    bg.src = "img/background.jpg";
    this.context.drawImage(bg, 0, 0, this.width, this.height);
    this.displayHeaders();
    this.player.render();
    this.balls.forEach((ball) => (ball.render()));
    this.bricks.forEach((brick) => (brick.render()));
    this.powerUps.forEach((powerUp) => (powerUp.render()));
  }



  renderGameOver(result) {
    // this.ball.stopBall();
    this.balls.forEach((ball) => (ball.stopBall()));
    this.stopTimer();

    if (this.score > this.highScore) {
      this.setHighScore(this.score);
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

  setHighScore(score) {
    firebase.database().ref('/').set({
      highScore: score
    });
  }

  start() {
    $('.alert-screen').append("<div class='new-game'></div>");
    $('.new-game').append("<p>Instructions: just play the game</p>");
    this.getHighScore('.new-game');
    $('.new-game').append("<div class='btn btn-new'>Play Game<div>");
    // $('.new-game').append(this.highScores());
    $('.btn-new').on('click', this.startGame.bind(this));
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


module.exports = Game;
