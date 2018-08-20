'use strict';

module.exports = function(bmp) {
  console.log('invert palette');
  bmp.palette.forEach((color, index) => {
    var invertedColor = ~color; //~ is basically what inverts the color
    bmp.palette[index] = invertedColor;
  });
};