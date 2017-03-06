const Game = require("./game");
const Util = require("./util");

class Brick {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.context = options.context;
    this.game = options.game;
    this.sprite = "img/brick-pink.png";
    this.color = options.color;
  }

  remove() {
    this.game.playAudio("audio/Blip_Select12.m4a");
    this.game.removeBrick(this);
  }

  render() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  setSprite(sprite) {
    this.sprite = sprite;
  }

  setColor(color) {
    this.color = color;
  }

  collision(ball) {
    return ball.x >= this.x &&
      ball.x <= this.x + this.width &&
      ball.y >= this.y &&
      ball.y <= this.y + this.height;
  }

  updateAll(balls) {
    balls.forEach((ball) => {
      if ( this.collision(ball) ) {
          this.remove();
          ball.reverseY();
      }
    });
  }

}

module.exports = Brick;
