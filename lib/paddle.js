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

  move(y) {
    this.y += y;
    if (this.y < 0) {
      this.y = 0; // keeps paddle from going too far up
    }
    if (this.y + this.height > this.canvasHeight) {
      this.y = this.canvasHeight - this.height; //  keeps paddle from going too far down
    }
  }

  render() {
    const outerColor = "#f47a42";
    this.context.fillStyle = outerColor;
    this.context.fillRect(this.x, this.y, this.width, this.height / 2.5 );
    this.context.fillStyle = "#A62A2A";
    this.context.fillRect(this.x, this.y + (this.height / 2.5), this.width, this.height / 5 );
    this.context.fillStyle = outerColor;
    this.context.fillRect(this.x, this.y + (this.height / 1.6666667), this.width, this.height / 2.5 );
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }



}

module.exports = Paddle;
