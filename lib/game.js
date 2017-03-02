const Ball = require("./ball");
const Player = require("./player");
const Brick = require("./brick");


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
          game: this
        });
        this.bricks.push(brick);
        brickY += (brickHeight + brickSpace);
      }
      brickX += 30;
      brickY = brickStartY;
    }

  }

  addTime(time) {
    this.seconds += time;
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

  bgColor() {
    switch(this.seconds) {
      case 3:
        return "#fec5c8";
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

  render() {
    // this.context.fillStyle = "#FFFFFF";
    this.context.fillStyle = this.bgColor();
    this.context.fillRect(0, 0, this.width, this.height);
    this.displayTime();
    this.player.render();
    this.ball.render();
    this.bricks.forEach((brick) => (brick.render()));
  }

  renderGameOver(result) {
    this.ball.stopBall();
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
    $('.btn-new').on('click', this.startGame.bind(this));
  }

  startGame() {
    $('.alert-screen').html('');
    this.requestId = animate(this.step.bind(this));
    this.player = new Player(this.context);
    this.ball = new Ball({
      x: 200,
      y: Game.DIM_Y / 2,
      game: this,
      context: this.context
    });
    this.bricks = [];
    this.addBricks();
    this.seconds = 40;
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
    this.ball.update(this.player.paddle);
    this.player.update();
    this.bricks.forEach((brick) => (brick.update(this.ball)));
  }


}

Game.DIM_X = 800;
Game.DIM_Y = 400;

module.exports = Game;
