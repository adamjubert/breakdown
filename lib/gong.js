// var animate = window.requestAnimateFrame || function(callback) {
//   window.setTimeout(callback, 1000/60 );
// };
//
// var canvas = document.createElement('canvas');
// var width = 600;
// var height = 500;
// canvas.width = width;
// canvas.height = height;
// var context = canvas.getContext('2d');
//
// window.onload = function() {
//   document.body.appendChild(canvas);
//   animate(step);
// };
//
// var step = function() {
//   update();
//   render();
//   animate(step);
// };
//
// var update = function() {
//
// };
//
// var render = function() {
//   context.fillStyle = "#000000";
//   context.fillRect(0, 0, width, height);
// };

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const width = 600;
  const height = 400;
  canvasEl.width = width;
  canvasEl.height = height;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);
});