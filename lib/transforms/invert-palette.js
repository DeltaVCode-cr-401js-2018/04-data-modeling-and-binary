'use strict';

module.exports= function(bmp){
  console.log('transform!');
  console.log(bmp.palette[0]);
  bmp.palette.forEach((color,index)=>{
    var invertedColor = ~color;
    bmp.palette[index] = invertedColor;
  });
  console.log(bmp.offset);
};