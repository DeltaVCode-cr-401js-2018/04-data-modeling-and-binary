'use strict';

const transform = require('../../../lib/transforms/boarder');
 describe('transforms/boarder', () => {
  it('adds a border with color 0', () => {
    var bmp = {
      height: 6,
      width: 6,
      img: new Buffer([
        1,2,3,4,5,6, // row 0
        7,8,9,1,2,3, // row 1
        4,5,6,7,8,9, // row 2
        1,2,3,4,5,6,// row 3
        7,8,9,1,2,3,// row 4
        4,5,6,7,8,9, //row 5
      ]),
    };

     transform(bmp);
     expect(bmp.img)
      .toEqual(new Buffer([
        0,0,0,0,0,0, // row 0
        0,8,9,1,2,0, // row 1
        0,5,6,7,8,0, // row 2
        0,2,3,4,5,0,// row 3
        0,8,9,1,2,0,// row 4
        0,0,0,0,0,0, //row 5
      ]));
  });
});