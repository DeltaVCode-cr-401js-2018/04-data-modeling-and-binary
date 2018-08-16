'use strict';
const fs = require('fs');

const Bitmap = require('../../lib/bitmap');
const filePalette = `${__dirname}/../../assets/palette-bitmap.bmp`;
const fileOutput = `${__dirname}/../../output/palette-bitmap.bmp`;

describe('Bitmap', ()=> {
  it('can read basic header fields', ()=> {
    var bmp = Bitmap.fromFile(filePalette);

    expect(bmp.type).toBe('BM');
    expect(bmp.size).toBeGreaterThan(0);
    expect(bmp.offset).toBeGreaterThan(0);
    expect(bmp.img.length).toBeGreaterThan(0);
    expect(bmp.size).toBeGreaterThanOrEqual(bmp.img.length);

    expect(bmp.headerSize).toBe(40);
    expect(bmp.width).toBe(100);
    expect(bmp.height).toBe(100);

    expect(bmp.paletteColorCount).toBe(256);
    expect(bmp.palette.length).toBe(1024);

  });

  it('can write a new bmp file', ()=> {
    var bmp = Bitmap.fromFile(filePalette);

    bmp.writeToFile(fileOutput);

    expect(fs.existsSync(fileOutput)).toBe(true);
  });

});