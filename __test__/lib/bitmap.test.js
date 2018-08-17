'use strict';

const fs = require('fs');
const Bitmap = require('../../lib/bitmap');
const filePalette = `${__dirname}/../../assets/palette-bitmap.bmp`;
const fileNonPalette8Bit = `${__dirname}/../../assets/house.bmp`;
const fileNonPalette24Bit = `${__dirname}/../../assets/non-palette-bitmap.bmp`;
const fileOutput = `${__dirname}/../../output/test-can-write.bmp`;

describe('Bitmap', () => {
  it('can read basic palette header fields', () => {
    var bmp = Bitmap.fromFile(filePalette);

    expect(bmp.type).toBe('BM');
    expect(bmp.size).toBeGreaterThan(0);
    expect(bmp.offset).toBeGreaterThan(0);
    expect(bmp.img.length).toBeGreaterThan(0);
    expect(bmp.size).toBeGreaterThanOrEqual(bmp.img.length);

    expect(bmp.headerSize).toBe(40); //info header//
    expect(bmp.width).toBe(100);
    expect(bmp.height).toBe(100);
    expect(bmp.bitsPerPixel).toBe(8);
    expect(bmp.paletteColorCount).toBe(256);
    expect(bmp.palette.length).toBe(1024);
  });

  it('can read 8-bit palette (without palette count in header) header fields', () => {
    var bmp = Bitmap.fromFile(fileNonPalette8Bit);

    expect(bmp.type).toBe('BM');
    expect(bmp.size).toBeGreaterThan(0);
    expect(bmp.offset).toBeGreaterThan(0);
    expect(bmp.img.length).toBeGreaterThan(0);
    expect(bmp.size).toBeGreaterThanOrEqual(bmp.img.length);

    expect(bmp.headerSize).toBe(40);
    expect(bmp.width).toBe(256);
    expect(bmp.height).toBe(256);
    expect(bmp.bitsPerPixel).toBe(8);
    expect(bmp.paletteColorCount).toBe(256);
    expect(bmp.palette.length).toBe(1024);
  });

  afterEach(() => {
    fs.unlink(fileOutput, err => {});
  });

  it('can read 24-bit palette header fields', () => {
    var bmp = Bitmap.fromFile(fileNonPalette24Bit);
    
    expect(bmp.type).toBe('BM');
    expect(bmp.size).toBeGreaterThan(0);
    expect(bmp.offset).toBeGreaterThan(0);
    expect(bmp.img.length).toBeGreaterThan(0);
    expect(bmp.size).toBeGreaterThanOrEqual(bmp.img.length);

    expect(bmp.headerSize).toBe(40);
    expect(bmp.width).toBe(100);
    expect(bmp.height).toBe(100);
    expect(bmp.bitsPerPixel).toBe(24);
    expect(bmp.paletteColorCount).toBe(0);
    expect(bmp.palette.length).toBe(0);
  });

  it('can write a new bitmap file', () => {
    var bmp = Bitmap.fromFile(filePalette);
    bmp.writeToFile(fileOutput);

    expect(fs.existsSync(fileOutput)).toBe(true);
  });
  it('can write a new bitmap file asyncronously', done => {
    var bmp = Bitmap.fromFile(filePalette);
    bmp.writeToFileAsync(fileOutput, (err) =>{
      if (err) throw err;

      fs.exists(fileOutput, (testFileExists) => {
        if(err) throw err;
        expect(testFileExists).toBe(true);

        done();
      });
    });
  });
});