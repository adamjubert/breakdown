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
    this.powerUpCount = 0;
    this.powerUps = [];
    this.score = 0;
    this.ballYSpeed = 10;
    this.ballYPos = 150;
    this.highScore = 0;
    this.muted = false;
    // this.pongBall;
    // this.breakOutBall;
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

  displayHeaders() {
    this.displayScore();
    this.displayLives();
  }

  displayScore() {
    this.context.fillStyle = '#000';
    this.context.font = '24px Audiowide';
    this.context.fillText(`Score: ${this.score}`, 10, 25);
  }

  displayLives() {
    this.context.fillStyle = '#000';
    this.context.font = '24px Audiowide';
    this.context.fillText(`Lives: ${this.lives}`, 770, 25);
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
    if (Util.oneInNumTrue(8)) {
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
    this.context.fillStyle = Util.bgColor("#ddd"); //NB: can do this.lives
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
    let startScreen = `
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

    $('.wrapper').append(startScreen);
    $('.alert-screen').css('background', '#111');

    if (score !== undefined) {
      $('.player-score').append(`<h2>Your Score</h2><p class="score">${score}</p>`);
    }

    this.getHighScore('.high-score');

    $('.btn-play').on('click', this.startGame.bind(this));

    $(document).keypress((e) => {
      if (e.keyCode === 13) {
        this.startGame();
      }
    });
  }

  startGame() {
    $(document).off("keypress");
    $('.alert-screen').html('');
    $('.alert-screen').css('background', 'none');

    this.requestId = animate(this.step.bind(this));
    this.player = new Player(this.context);
    this.aiPlayer = new AIPlayer(this.context);

    this.balls = [];
    this.addPongBall();
    this.addBreakOutBall();

    this.bricks = [];
    this.addBricks();

    this.powerUps = [];

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
