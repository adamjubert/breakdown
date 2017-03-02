const Paddle = require("./paddle");

class Player {
  constructor(context) {
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;
    const paddleHeight = 100;
    this.paddle = new Paddle({
      x: canvasWidth - 20,
      y: canvasHeight / 2 - (paddleHeight / 2),
      width: 10,
      height: paddleHeight,
      context,
      canvasWidth,
      canvasHeight
    });
  }

  render() {
    this.paddle.render();
  }

  update() {
    key.getPressedKeyCodes().forEach((key) => {
      if (key === 38) {
        this.paddle.move(-5);
      } else if (key === 40) {
        this.paddle.move(5);
      }
    });
  }

  reset() {
    this.paddle.reset(870, 250);
  }

}

module.exports = Player;
