const Ball = require("./ball");
const Player = require("./player");
const AIPlayer = require("./ai_player");
const Brick = require("./brick");
const Util = require("./util");
const PowerUp = require("./power_up");
const GameView = require("./game_view");

const animate = window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   function(callback) { window.setTimeout(callback, 1000/60); };

class Game {
  constructor(context) {
    this.width = 900; // screen width
    this.height = 550;
    this.database();
    this.context = context;
    this.start();
    this.score = 0;
    this.ballYSpeed = 10;
    this.ballYPos = 150;
    this.highScore = 0;
    this.muted = false;
    this.roundPowerUpCount = 0;
    this.powerUpKey = 1;

  }

  database() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC7aTjQHH9a9p1iQT96Xua837KJ4t2Aboc",
      authDomain: "gong-34d06.firebaseapp.com",
      databaseURL: "https://gong-34d06.firebaseio.com",
      storageBucket: "gong-34d06.appspot.com",
      messagingSenderId: "77466642516"
    };
    firebase.initializeApp(config);
    this.database = firebase.database();
  }

  addToPowerUpCount() {
    this.roundPowerUpCount += 1;
  }

  changeLives(num) {
    num < 0 ? this.playAudio("audio/Explosion10.m4a") :
      $("<p class='plus-lives'>+1</p>").appendTo(".wrapper").fadeOut(3000);
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
    this.bricksHash = {};
    this.bricksKey = 0;
    // this.powerUps = [];
    this.powerUpsHash = {};

    let pongWidth = this.width / 2 - 10;

    let brickWidth = 45;
    let brickHeight = 12;
    let brickSpace = 10;

    // number of bricks based on width of canvas
    let numOfBricks = Math.floor(pongWidth / ( brickWidth + brickSpace )) - 1;

    let brickStartX = 35;
    let brickStartY = 100;

    let brickX = brickStartX;
    let brickY = brickStartY;

    let colors = ["#cae7f6", "#8cd2f5", "#52C3FB", "#0aa9f7", "#0b7cb4"];



    let numRows = 5;
    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numOfBricks; j++) {
        this.bricksKey += 1;
        let brick = new Brick({
          id: this.bricksKey,
          x: brickX,
          y: brickY,
          width: brickWidth,
          height: brickHeight,
          context: this.context,
          game: this,
          color: colors[i]
        });
        this.bricksHash[this.bricksKey] = brick;
        brickX += (brickWidth + brickSpace);
      }
      brickX = brickStartX;
      brickY += 30;
    }

  }


  addPowerUp(x, y) {
    this.roundPowerUpCount += 1;
    this.powerUpKey += 1
    let id = this.powerUpKey;
    let newPU = new PowerUp({
      id,
      x,
      y,
      game: this,
      context: this.context
    });
    this.powerUpsHash[id] = newPU;
  }


  addPongBall() {
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
    this.roundPowerUpCount = 0;
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
    let numOfBricks = Object.keys(this.bricksHash).length;
    let brickKeys = Object.keys(this.bricksHash);
    let brickKeysToDelete = [];
    if (brickKeys.length < 3) {
      brickKeysToDelete = brickKeys;
    } else {
      brickKeysToDelete = Util.getNRandomElements(brickKeys, 3);
    }
    brickKeysToDelete.forEach(
      (key) => (this.phaseOutBrick(this.bricksHash[key])));
  }

  powerFastBalls() {
    this.balls.forEach((ball) => (ball.increaseBallSpeed()));
  }

  powerSlowBalls() {
    this.balls.forEach((ball) => (ball.decreaseBallSpeed()));
  }

  removeBrick(brick) {
    // 1 in x chance of containing a Power Up
    if (Util.oneInNumTrue(12) && this.roundPowerUpCount < 3) {
      this.addPowerUp(brick.x, brick.y);
    }
    delete this.bricksHash[brick.id];
    this.addToScore(1);
  }

  addToScore(points) {
    this.score += points;
  }

  removePowerUp(powerUp) {
    delete this.powerUpsHash[powerUp.id];
  }

  render() {
    this.gameView.displayScreen();
    this.gameView.displayHeaders(this.score, this.lives);
    this.player.render();
    this.aiPlayer.render();
    this.balls.forEach((ball) => (ball.render()));
    for (var key in this.bricksHash) {
      this.bricksHash[key].render();
    }
    for (var key in this.powerUpsHash) {
      this.powerUpsHash[key].render();
    }
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
    this.gameView = new GameView({game: this});
    this.gameView.addMainMenu(score);

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

    if (Object.keys(this.bricksHash).length === 0) { this.levelUp(); }
    this.lives <= 0 ? this.renderGameOver() : animate(this.step.bind(this));

  }

  update() {
    this.breakOutBall.update(this.player.breakOutPaddle);
    this.pongBall.update(this.player.pongPaddle);
    this.pongBall.update(this.aiPlayer.paddle);
    this.player.update();
    this.aiPlayer.update(this.pongBall);
    for (var key in this.bricksHash) {
      this.bricksHash[key].updateAll(this.balls);
    }
    for (var key in this.powerUpsHash) {
      this.powerUpsHash[key].update(this.player.breakOutPaddle);
    }
  }


}


module.exports = Game;
