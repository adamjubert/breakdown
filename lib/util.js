const Util = {

  getUniqueRandomNums(max) {
    let limit = 3;
    let min = 0;
    let nums = [];

    while (nums.length < limit) {
        var random_number = Math.round(Math.random()*(max - min) + min);
        if (nums.indexOf(random_number) == -1) {
            nums.push( random_number );
        }
    }
    return nums;
  },

  bounceAngle(object, ball) {
    let relIntY = (object.x + (object.width / 2)) - ball.x;
    let normRelIntY = (relIntY / (object.width / 2));
    return normRelIntY * 3 * Math.PI / 12;
  },

  oneInNumTrue(x) {
    let randNum = Math.floor(Math.random() * (x - 1) + 1);
    return randNum === 1 ? true : false;
  },

  numRange(min, max) {
    let nums = [];
    for (var i = min; i <= max; i++) {
      nums.push(i);
    }
    return nums;
  },

  bgColor(seconds) {
    switch(seconds) {
      case 5:
        return "#fec5c8";
      case 4:
        return "#fec5c8";
      case 3:
        return "#f4a2a6";
      case 2:
        return "#f78b8b";
      case 1:
        return "#e96565";
      case 0:
        return "#da3131";
      default:
        return "#FFFFFF";
    }
  },



};

module.exports = Util;
