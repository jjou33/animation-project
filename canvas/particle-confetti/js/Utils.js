const randomNumBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

const hypotenuse = (x, y) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

export function hexToRgb(hex) {
  // #FF0000 or #ff0000
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16), // FF -> 255
        g: parseInt(result[2], 16), // 00 -> 0
        b: parseInt(result[3], 16), // 00 -> 0
      }
    : null;
}

export { randomNumBetween, hypotenuse };
