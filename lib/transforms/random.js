'use strict';

module.exports= function(bmp){
 
  bmp.palette.forEach((color, index)=>{
    bmp.palette[index] = Math.round(Math.random()*255);
  });
};