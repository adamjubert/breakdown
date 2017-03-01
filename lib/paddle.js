class Paddle {
  constructor(x, y, width, height, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
    this.context = context;
  }

  render() {
    this.context.fillStyle = "#000000";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

}

module.exports = Paddle;
