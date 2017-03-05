const Paddle = require("./paddle");

class Player {
  constructor(context) {
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;

    let breakOutPaddleWidth = 120;
    let breakOutPaddleHeight = 15;

    let pongPaddleWidth = 15;
    let pongPaddleHeight = 120;

    this.breakOutPaddle = new Paddle({
      id: "breakOutPaddle",
      x: canvasWidth / 2 / 2 - (breakOutPaddleWidth / 2),
      y: canvasHeight - 40,
      width: breakOutPaddleWidth,
      height: breakOutPaddleHeight,
      context,
      canvasWidth: canvasWidth / 2 - 10,
      canvasHeight
    });

    this.pongPaddle = new Paddle({
      id: "pongPlayerPaddle",
      x: canvasWidth / 2 + 40,
      y: canvasHeight / 2 + (pongPaddleHeight / 2),
      width: pongPaddleWidth,
      height: pongPaddleHeight,
      context,
      canvasWidth: canvasWidth / 2,
      canvasHeight
    });

    // this.aiPaddle = new Paddle({
    //   id: "pongAIPaddle",
    //   x: canvasWidth - 40,
    //   y: canvasHeight / 2 + (pongPaddleHeight / 2),
    //   width: pongPaddleWidth,
    //   height: pongPaddleHeight,
    //   context,
    //   canvasWidth: canvasWidth / 2,
    //   canvasHeight
    // });
  }

  render() {
    this.breakOutPaddle.render();
    this.pongPaddle.render();
    // this.aiPaddle.render();
  }

  // Power-Up
  increasePaddleSize() {
    new Promise(() => (
      this.breakOutPaddle.width = Math.round( this.breakOutPaddle.width * 10/7)
    )).then(setTimeout(() => (
      this.breakOutPaddle.width = Math.round( this.breakOutPaddle.width * 7/10 )
    ), 8000));
  }

  // Power-Up
  decreasePaddleSize() {
    new Promise(() => (
      this.breakOutPaddle.width = Math.round( this.breakOutPaddle.width * 7/10)
    )).then(setTimeout(() => (
      this.breakOutPaddle.width = Math.round( this.breakOutPaddle.width * 10/7 )
    ), 8000));
  }

  update() {
    key.getPressedKeyCodes().forEach((key) => {
      if (key === 65) {
        this.breakOutPaddle.move(-5, 0);
      } else if (key === 68) {
        this.breakOutPaddle.move(5, 0);
      } else if (key === 38) {
        this.pongPaddle.move(0, -5);
        // this.aiPaddle.move(0, -5);
      } else if (key === 40) {
        // this.aiPaddle.move(0, 5);
        this.pongPaddle.move(0, 5);
      }
    });
  }

  // reset() {
  //   this.breakOutPaddle.reset(
  //     canvasWidth / 2 - (paddleWidth / 2),
  //     canvasHeight - 20
  //   );
  // }

}

module.exports = Player;
