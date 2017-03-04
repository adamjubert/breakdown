const Game = require("./game");

class Brick {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.context = options.context;
    this.game = options.game;
    this.sprite = "img/brick-pink.png";
  }

  remove() {
    this.game.removeBrick(this);
  }

  render() {
    this.context.beginPath();
    // this.context.fillStyle = this.color;
    // this.context.fillRect(this.x, this.y, this.width, this.height);
    let block = new Image();
    block.src = this.sprite;
    this.context.drawImage(block, this.x, this.y, this.width, this.height);

  }

  setSprite(sprite) {
    this.sprite = sprite;
  }

  updateAll(balls) {
    for (var i = 0; i < balls.length; i++) {
      if ( balls[i].x >= this.x &&
        balls[i].x <= this.x + this.width &&
        balls[i].y >= this.y &&
        balls[i].y <= this.y + this.height ) {
          this.remove();
          balls[i].reverseY();
      }
    }
  }

}

module.exports = Brick;

// when only 1 ball
// if ( ball.x >= this.x &&
//   ball.x <= this.x + this.width &&
//   ball.y >= this.y &&
//   ball.y <= this.y + this.height ) {
//     this.remove();
//     ball.reverseX();
// }
