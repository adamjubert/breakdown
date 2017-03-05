const Ball = require("./ball");
const Player = require("./player");
const AIPlayer = require("./ai_player");
const Brick = require("./brick");
const Util = require("./util");
const PowerUp = require("./power_up");

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
