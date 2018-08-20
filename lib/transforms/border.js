'use strict';



module.exports = function(bmp){

  const {width, height, img} = bmp;
  console.log('width', width);
  console.log('height', height);

  // First Column
  for(let row = 0; row< height; row++){
    img[getPixelOffset(row, 0)] = 0;
  }
  for(let col=0; col<width; col++){
    img[getPixelOffset(0,col)] = 0;
  }
  for(let row=0; row<height; row++){
    img[getPixelOffset(row, width-1)] = 0;
  }
  for(let col = 0; col<width; col++){
    img[getPixelOffset(height-1, col)] = 0;
  }
  
  function getPixelOffset(row, col){
    return height*col+row;
  }
};