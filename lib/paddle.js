const Game = require("./game");


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
      this.y = 0; // top
    } else if (this.y + this.height > this.canvasHeight) {
      this.y = this.canvasHeight - this.height; //bottom
    }
  }

  render() {
    this.context.fillStyle = "#000";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }

}

module.exports = Paddle;
