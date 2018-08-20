'use strict';

module.exports = function(bmp) {
  const { width, height, img } = bmp;

  let borderWidth = 1;

  for (let column = 0; column < width; column++) {
    img[getPixelOffset(0, column)] = 0;
  }

  for (let col = 0; col < width; col++) {
    img[getPixelOffset(height - 1, col)] = 0;
  }

  for (let row = 0; row < height; row++) {
    for (let i = 0; i < borderWidth; i++) {
      img[getPixelOffset(row, i)] = 0;
    }
  }

  for (let row = 0; row < height; row++) {
    img[getPixelOffset(row, width - 1)] = 0;
  }

  function getPixelOffset(row, col) {
    return width * row + col;
  }
};





