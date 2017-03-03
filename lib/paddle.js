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
    const outerColor = "#f47a42";
    this.context.fillStyle = outerColor;
    this.context.fillRect(this.x, this.y, this.width / 2.5, this.height);
    this.context.fillStyle = "#A62A2A";
    this.context.fillRect(this.x + (this.width / 2.5), this.y , this.width / 5, this.height );
    this.context.fillStyle = outerColor;
    this.context.fillRect(this.x + (this.width / 1.6666667), this.y, this.width / 2.5, this.height );
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }



}

module.exports = Paddle;
