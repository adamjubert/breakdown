const Paddle = require("./paddle");

class Player {
  constructor(context) {
    this.canvasWidth = context.canvas.width;
    this.canvasHeight = context.canvas.height;
    this.context = context,
    this.createPaddles();
    this.alreadyBig = false;
    this.originalPaddleWidth = 120;
    this.bigPaddleWidth = 170;
  }

  createPaddles() {
    this.createBreakOutPaddle(120, 15);
    this.createPongPaddle(15, 120);
  }

  createBreakOutPaddle(paddleWidth, paddleHeight) {
    this.breakOutPaddle = new Paddle({
      id: "breakOutPaddle",
      x: this.canvasWidth / 2 / 2 - (paddleWidth / 2),
      y: this.canvasHeight - 40,
      width: paddleWidth,
      height: paddleHeight,
      context: this.context,
      canvasWidth: this.canvasWidth / 2 - 10,
      canvasHeight: this.canvasHeight
    });
  }

  createPongPaddle(paddleWidth, paddleHeight) {
    this.pongPaddle = new Paddle({
      id: "pongPlayerPaddle",
      x: this.canvasWidth / 2 + 40,
      y: this.canvasHeight / 2 + (paddleHeight / 2),
      width: paddleWidth,
      height: paddleHeight,
      context: this.context,
      canvasWidth: this.canvasWidth / 2,
      canvasHeight: this.canvasHeight
    });
  }

  render() {
    this.breakOutPaddle.render();
    this.pongPaddle.render();
    // this.aiPaddle.render();
  }

  // Power-Up
  increasePaddleSize() {
    let boPaddle = this.breakOutPaddle;
    let pongPaddle = this.pongPaddle;
    if (boPaddle.width > 230 || pongPaddle.height > 230) { return; }

    // new Promise((resolve, reject) => {
    //   this.paddleInterval = setInterval(() => {
    //     boPaddle.width *= 1.003;
    //   }, 20);
    //   this.paddleTimeout = setTimeout(() => {
    //     clearInterval(this.paddleInterval);
    //     resolve();
    //   }, 1000);
    // }).then(() => {
    //   this.paddleTimeout = setTimeout(() => {
    //     this.paddleInterval = setInterval(() => {
    //       boPaddle.width /= 1.003;
    //     }, 20);
    //
    //     this.paddleTimeout = setTimeout(() => {
    //       clearInterval(this.paddleInterval);
    //     }, 1000);
    //   }, 6000);
    // });



    // }




    // boPaddle.width = Math.round( boPaddle.width * 10/7);
    // setTimeout(() => (
    //   boPaddle.width = Math.round( boPaddle.width * 7/10 )
    // ), 8000)

    // new Promise(() => (
    //   boPaddle.width = Math.round( boPaddle.width * 10/7)
    // )).then(setTimeout(() => (
    //   boPaddle.width = Math.round( boPaddle.width * 7/10 )
    // ), 8000));

    boPaddle.width = Math.round( boPaddle.width * 10/8);
    setTimeout(() => (
      boPaddle.width = Math.round( boPaddle.width * 8/10 )
    ), 8000);

    pongPaddle.height = Math.round( pongPaddle.height * 10/8);
    setTimeout(() => (
      pongPaddle.height = Math.round( pongPaddle.height * 8/10 )
    ), 8000);
  }

  increaseTime() {
    let boPaddle = this.breakOutPaddle;
    this.paddleTimeout = setTimeout(() => {
      this.paddleInterval = setInterval(() => {
        boPaddle.width /= 1.007;
      }, 20);

      this.paddleTimeout = setTimeout(() => {
        clearInterval(this.paddleInterval);
        console.log('clear interval');
      }, 1000);
    }, 6000);
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
