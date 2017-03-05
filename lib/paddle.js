const Game = require("./game");

// 570 // x: canvasWidth - 30,
// 250 // y: canvasHeight / 2 - (paddleHeight / 2), (starting in the middle)
//  20 // width: 20,
// 100 // height: 100,

class Paddle {
  constructor(options) {
    this.id = options.id,
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

  move(x, y) {
    if (x !== 0) {   // breakout paddle
      this.moveBreakOutPaddle(x);
    } else if (y !== 0) { // pong paddle
      this.movePongPaddle(y)
    }
  }

  movePongPaddle(y) {
    this.y += y;
    if (this.y < 50) {
      this.y = 50; // keeps paddle from going too far up
    }
    if (this.y + this.height > this.canvasHeight) {
      this.y = this.canvasHeight - this.height; //  keeps paddle from going too far down
    }
  }

  moveBreakOutPaddle(x) {
    this.x += x;
    if (this.x < 0) {
      this.x = 0; // keeps paddle from going too far left
    }
    if (this.x + this.width > this.canvasWidth) {
      this.x = this.canvasWidth - this.width; //  keeps paddle from going too far right
    }
  }

  render() {
    // let block = new Image();
    // block.src = "img/paddle_orange.png";
    // this.context.drawImage(block, this.x, this.y, this.width, this.height);
    this.context.fillStyle = "#888";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }



}

module.exports = Paddle;
