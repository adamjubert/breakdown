const Util = {

  getNRandomElements(array, num) {
    let elements = [];
    for (var i = 0; i < num; i++) {
      elements.push( array[Math.floor(Math.random() * array.length)] );
    }
    return elements;
  },

  bounceAngle(object, ball) {
    let relIntY = (object.x + (object.width / 2)) - ball.x;
    let normRelIntY = (relIntY / (object.width / 2));
    return normRelIntY * 3 * Math.PI / 12;
  },

  bounceAnglePong(object, ball) {
    let relIntX = (object.y + (object.height / 2)) - ball.y;
    let normRelIntX = (relIntX / (object.height / 2));
    return normRelIntX * 3 * Math.PI / 12;
  },

  oneInNumTrue(num) {
    let randNum = Math.floor(Math.random() * (num - 1) + 1);
    return randNum === 1 ? true : false;
  }



};

module.exports = Util;
