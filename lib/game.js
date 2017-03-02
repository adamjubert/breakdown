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
    this.seconds = 10;
    this.startTimer();
  }

  startTimer() {
    setInterval(this.timer.bind(this), 1000);
  }

  timer() {
    console.log(this.seconds);
    this.seconds -= 1;
    if (this.seconds <= 0) {
      console.log('Time is up!');
      return;
    }
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

    let numCols = 5;
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

  getScore() {
    return this.score;
  }

  renderGameOver() {
    let message = `Your final score: ${this.score}`;
  }

  displayTime() {
    this.context.fillStyle = '#000';
    this.context.fillText(this.seconds, 400, 10);
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
    this.ball.update(this.player.paddle);
    this.player.update();
    this.bricks.forEach((brick) => (brick.update(this.ball)));
  }

  updateScore(points) {
    this.score += points;
  }

  removeBrick(brick) {
    this.bricks.splice(this.bricks.indexOf(brick), 1);
  }

  render() {
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.width, this.height);
    this.displayScore();
    this.displayTime();
    this.player.render();
    this.ball.render();
    this.bricks.forEach((brick) => (brick.render()));
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 400;

module.exports = Game;
