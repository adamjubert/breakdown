const Paddle = require("./paddle");

class AIPlayer {
  constructor(context) {
    const canvasWidth = 900;
    const canvasHeight = 550;

    let pongPaddleWidth = 15;
    let pongPaddleHeight = 120;
    this.paddle = new Paddle({
      id: "pongAIPaddle",
      x: canvasWidth - 40,
      y: canvasHeight / 2 + (pongPaddleHeight / 2),
      width: pongPaddleWidth,
      height: pongPaddleHeight,
      context,
      canvasWidth: canvasWidth / 2,
      canvasHeight
    });
  }

  render() {
    this.paddle.render();
  }


  update(ball) {
    let yPos = ball.y;

    let diff = -((this.paddle.y + (this.paddle.height / 2)) - yPos);

    if(diff < -4) { // max speed up
      diff = -3.8;
    } else if(diff > 4) { // max speed down
      diff = 3.8;
    }
    this.paddle.move(0, diff);
    if(this.paddle.y < 50) {
      this.paddle.y = 50;
    } else if (this.paddle.y + this.paddle.height > 550) {
      this.paddle.y = 550 - this.paddle.height;

    }
  }


}

module.exports = AIPlayer;
