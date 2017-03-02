

class Mallet {
  constructor(x, y, context, game) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.x_speed = 10;
    this.y_speed = 0;
    this.radius = 15;
    this.game = game;
  }

  render() {
    this.context.beginPath;
    this.context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    this.context.fillStyle = "#000";
    this.context.fill();
  }

  update() {
    
  }
}

module.exports = Mallet;
