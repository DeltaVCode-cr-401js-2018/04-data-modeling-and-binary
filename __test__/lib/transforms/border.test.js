'use strict';

const transform = require('../../../lib/transforms/border');

describe('border',()=>{
  it('adds a border with color 0', ()=>{
    var bmp = {
      height: 4,
      width: 3,
      img: new Buffer([
        1, 2, 3, 4, // col 0
        5, 6, 7, 8, // col 1
        9, 1, 2, 3, //col 2
      ]),
    };
    transform(bmp);
    expect(bmp.img)
      .toEqual(new Buffer([
        0,0,0,0,
        0,6,7,0,
        0,0,0,0,
      ]));
  });
});