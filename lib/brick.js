const Game = require("./game");

class Brick {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.context = options.context;
    this.game = options.game;
  }

  remove() {
    this.game.removeBrick(this);
  }

  render() {
    this.context.beginPath();
    this.context.fillStyle = "#000";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  update(ball) {
    if ( ball.x >= this.x &&
      ball.x <= this.x + this.width &&
      ball.y >= this.y &&
      ball.y <= this.y + this.height ) {
        this.remove();
        ball.reverseX();
    }
  }

}

module.exports = Brick;
