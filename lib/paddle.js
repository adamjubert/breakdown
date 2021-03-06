const Game = require("./game");

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
    if (x !== 0) {
      this.moveBreakOutPaddle(x);
    } else if (y !== 0) {
      this.movePongPaddle(y)
    }
  }

  movePongPaddle(y) {
    this.y += y;
    if (this.y < 50) { this.y = 50; }
    if (this.y + this.height > this.canvasHeight) {
      this.y = this.canvasHeight - this.height;
    }
  }

  moveBreakOutPaddle(x) {
    this.x += x;
    if (this.x < 0) { this.x = 0; }
    if (this.x + this.width > this.canvasWidth) {
      this.x = this.canvasWidth - this.width;
    }
  }

  render() {
    this.context.fillStyle = "#eee";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }



}

module.exports = Paddle;
