const Paddle = require("./paddle");

class Player {
  constructor(context) {
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;
    const paddleWidth = 180;
    this.paddle = new Paddle({
      x: canvasWidth / 2 - (paddleWidth / 2),
      y: canvasHeight - 20,
      width: paddleWidth,
      height: 25,
      context,
      canvasWidth,
      canvasHeight
    });
  }

  render() {
    this.paddle.render();
  }

  // Power-Up
  increasePaddleSize() {
    new Promise(() => (
      this.paddle.width = Math.round( this.paddle.width * 10/7)
    )).then(setTimeout(() => (
      this.paddle.width = Math.round( this.paddle.width * 7/10 )
    ), 8000));
  }

  // Power-Up
  decreasePaddleSize() {
    new Promise(() => (
      this.paddle.width = Math.round( this.paddle.width * 7/10)
    )).then(setTimeout(() => (
      this.paddle.width = Math.round( this.paddle.width * 10/7 )
    ), 8000));
  }

  update() {
    key.getPressedKeyCodes().forEach((key) => {
      if (key === 37) {
        this.paddle.move(-5);
      } else if (key === 39) {
        this.paddle.move(5);
      }
    });
  }

  reset() {
    this.paddle.reset(
      canvasWidth / 2 - (paddleWidth / 2),
      canvasHeight - 20
    );
  }

}

module.exports = Player;
