'use strict';

const transform = require('../../../lib/transforms/solid');
describe('solid', () => {
  it('can change the image\'s colors to  solid color', () => {
    var bmp = {
      palette: new Buffer([0, 200, 150, 100]),
    };

    transform(bmp);
    expect(bmp.palette).toEqual(new Buffer ([75, 75, 75, 75]));
  });
});