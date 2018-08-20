'use strict';

module.exports = function(bmp) {
  console.log('solid');
  bmp.palette.forEach((color, index) => {
  var solidColor = 75;
  console.log(solidColor);
    bmp.palette[index] = solidColor;
  });
}

