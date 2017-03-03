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

  // Power-Up
  increasePaddleSize() {
    new Promise(() => (
      this.paddle.height = Math.round( this.paddle.height * 10/7)
    )).then(setTimeout(() => (
      this.paddle.height = Math.round( this.paddle.height * 7/10 )
    ), 8000));
  }

  // Power-Up
  decreasePaddleSize() {
    new Promise(() => (
      this.paddle.height = Math.round( this.paddle.height * 7/10)
    )).then(setTimeout(() => (
      this.paddle.height = Math.round( this.paddle.height * 10/7 )
    ), 8000));
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
