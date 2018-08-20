'use strict';

const transform = require('../../../lib/transforms/border');

describe('transforms the border around an image', ()=> {
  it('adds a border with color 3', ()=> {
    var bmp = {
      height: 4,
      width: 5,
      img: new Buffer([
        1, 2, 3, 4, 7,
        5, 6, 7, 8, 3,
        9, 1, 2, 3, 1,
        5, 6, 7, 8, 4,
      ]),
    };
    transform(bmp);
    expect(bmp.img).toEqual(new Buffer([
      0, 0, 0, 0, 0,
      0, 6, 7, 8, 0,
      0, 1, 2, 3, 0,
      0, 0, 0, 0, 0,
    ]));
  });
});