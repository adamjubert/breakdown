const Paddle = require("./paddle");

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementsByTagName("canvas")[0];
  const width = 600;
  const height = 500;
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  context.fillStyle = "#ADD8E6";
  context.fillRect(0, 0, width, height);

  const paddle = new Paddle(270, 475, 60, 10, context);
  paddle.render();
});
