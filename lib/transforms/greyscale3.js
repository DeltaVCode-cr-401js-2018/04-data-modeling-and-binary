'use strict';

module.exports= function(bmp){
  for(let i=0; i < bmp.palette.length; i+=4){
    let grayValue = ((bmp.palette[i]*.21)+ (bmp.palette[i+1]*.72)+ (bmp.palette[i+2]*.07));
    bmp.palette[i] = grayValue;
    bmp.palette[i+1] = grayValue;
    bmp.palette[i+2] = grayValue;
  }
  
};