'use strict';

const transform = require('../../../lib/transforms/border');

describe('transforms/border', () => {
  it('adds a border with color 0', () => {
    var bmp = {
      height: 4,
      width: 5,
      img: new Buffer([
        1, 2, 3, 4, // col 0
        5, 6, 7, 8, // col 1
        9, 1, 2, 3, // col 2
        5, 6, 7, 8, // col 3
        9, 1, 2, 3, // col 4
      ]),
    };

    transform(bmp);

    expect(bmp.img)
      .toEqual(new Buffer([
        0, 0, 0, 0, // col 0
        0, 6, 7, 0, // col 1
        0, 1, 2, 0, // col 2
        0, 6, 7, 0, // col 3
        0, 0, 0, 0, // col 4
      ]));
  });
});