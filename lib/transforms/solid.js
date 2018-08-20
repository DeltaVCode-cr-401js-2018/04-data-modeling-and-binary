'use strict';

module.exports = function(bmp) {
  console.log('solid');
  bmp.palette.forEach((color, index) => {
  var solidColor = ~color;
    bmp.palette[index] = solidColor;
  });
}

