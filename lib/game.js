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
    this.player = new Player(context);
    this.ball = new Ball({
      x: 200,
      y: Game.DIM_Y / 2,
      game: this,
      context
    });
    this.bricks = [];
    this.addBricks();
    this.seconds = 50;
    this.startTimer();
  }


  addBricks() {
    let canvasHeight = Game.DIM_Y;

    let brickWidth = 10;
    let brickHeight = 40;
    let brickSpace = 10; // 5 on each side; 10 total
    // number of bricks based on height of canvas
    let numOfBricks = Math.floor(canvasHeight / ( brickHeight + brickSpace ));
    let brickStartX = 30;
    let brickStartY = 5;

    let brickX = brickStartX;
    let brickY = brickStartY;

    let numCols = 1;
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
    this.context.fillText(this.seconds, 400, 10);
  }

  removeBrick(brick) {
    this.bricks.splice(this.bricks.indexOf(brick), 1);
  }

  render() {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.width, this.height);
    this.displayTime();
    this.player.render();
    this.ball.render();
    this.bricks.forEach((brick) => (brick.render()));
  }

  renderGameOver(result) {
    this.ball.stopBall();
    this.stopTimer();
    if (this.seconds <= 0) {
      this.renderLoss();
    } else if (this.bricks.length === 0) {
      this.renderWin();
    }
  }

  renderWin() {
    console.log("You won!");
  }

  renderLoss() {
    console.log("You lose!");

  }

  start() {
    this.requestId = animate(this.step.bind(this));
  }


  startTimer() {
    setInterval(this.timer.bind(this), 1000);
  }

  stopTimer() {
    console.log('stopping timer....')
    clearInterval(this.timer.bind(this));
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
