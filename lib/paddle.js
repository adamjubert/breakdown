const Game = require("./game");

// 570 // x: canvasWidth - 30,
// 250 // y: canvasHeight / 2 - (paddleHeight / 2), (starting in the middle)
//  20 // width: 20,
// 100 // height: 100,

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

  move(x) {
    this.x += x;
    if (this.x < 0) {
      this.x = 0; // keeps paddle from going too far up
    }
    if (this.x + this.width > this.canvasWidth) {
      this.x = this.canvasWidth - this.width; //  keeps paddle from going too far down
    }
  }

  render() {
    let block = new Image();
    block.src = "img/green-paddle.png";
    this.context.drawImage(block, this.x, this.y, this.width, this.height);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }



}

module.exports = Paddle;
