const Game = require("./game");

class PowerUp {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.width = 20;
    this.height = 20;
    this.context = options.context;
    this.game = options.game;
    this.x_speed = 0;
    this.y_speed = 6;
    this.canvasHeight = this.context.canvas.height;
    this.canvasWidth = this.context.canvas.width;
    let power = this.chooseRandomPowerUp();
    this.power = power[0];
    this.image = power[1];
  }

  render() {
    this.context.beginPath();
    let block = new Image();
    block.src = this.image;
    this.context.drawImage(block, this.x, this.y, this.width, this.height);
  }

  chooseRandomPowerUp() {
    const powerUps = [
      {"name": "bigPaddle", "image": "img/star_blue.png" },
      {"name": "removeBricks", "image": "img/star.png" },
      {"name": "extraLife", "image": "img/star_green.png" }
      // {"name": "addBall", "image": "img/star_red.png" },
      // {"name": "fastBalls", "image": "img/star_green.png" },
      // {"name": "slowBalls", "image": "img/star_green.png" },
      // {"name": "smallPaddle", "image": "img/star_blue.png" },
    ];

    let randNum = Math.floor(Math.random() * powerUps.length);
    return [ powerUps[randNum]["name"], powerUps[randNum]["image"] ];
  }

  activatePower() {
    this.game.playAudio("audio/Powerup15.m4a");
    switch (this.power) {
      case "addBall":
        return this.game.addBall();
      case "extraLife":
        return this.game.changeLives(1);
      case "slowBalls":
        return this.game.powerSlowBalls();
      case "fastBalls":
        return this.game.powerFastBalls();
      case "bigPaddle":
        return this.game.player.increasePaddleSize();
      case "smallPaddle":
        return this.game.player.decreasePaddleSize();
      case "removeBricks":
        return this.game.powerDeleteBricks();
    }
  }


  update(paddle) {
    this.x += this.x_speed;
    this.y += this.y_speed;

     // right edge - off the screen
    if (this.y >= this.canvasHeight) { this.game.removePowerUp(this); }
    // power up hits the paddle
    if (
      this.y >= paddle.y &&
      this.y <= paddle.y + 10 &&
      this.x >= paddle.x &&
      this.x <= (paddle.x + paddle.width)
    ) {
      this.activatePower();
      this.game.removePowerUp(this);
    }
  }


}

module.exports = PowerUp;
