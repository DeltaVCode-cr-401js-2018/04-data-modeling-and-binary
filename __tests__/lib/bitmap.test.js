'use strict';

const fs = require('fs');
const Bitmap = require('../../lib/bitmap');


const filePalette = `${__dirname}/../../assets/palette-bitmap.bmp`;
const fileNonPalette8bit = `${__dirname}/../../assets/house.bmp`;
const fileNonPalette24bit = `${__dirname}/../../assets/non-palette-bitmap.bmp`;

const fileOutput = `${__dirname}/../../output/test-can-write.bmp`;

describe('Bitmap', () => {
  it('can read basic palette header fields', () => {
    var bmp = Bitmap.fromFile(filePalette);

    expect(bmp.type).toBe('BM');
    expect(bmp.size).toBeGreaterThan(0);
    expect(bmp.offset).toBeGreaterThan(0);
    expect(bmp.img.length).toBeGreaterThan(0);
    expect(bmp.size).toBeGreaterThanOrEqual(bmp.img.length);

    expect(bmp.headerSize).toBe(40); // BITMAPINFOHEADER
    expect(bmp.width).toBe(100);
    expect(bmp.height).toBe(100);
    expect(bmp.bitsPerPixel).toBe(8);
    expect(bmp.paletteColorCount).toBe(256);
    expect(bmp.palette.length).toBe(1024);
  });

  it('can read 8-bit palette (without palette count in header) header fields', () => {
    // house.bmp is weird; it has palette count of 0, but still has a palette!
    var bmp = Bitmap.fromFile(fileNonPalette8bit);

    expect(bmp.type).toBe('BM');
    expect(bmp.size).toBeGreaterThan(0);
    expect(bmp.offset).toBeGreaterThan(0);
    expect(bmp.img.length).toBeGreaterThan(0);
    expect(bmp.size).toBeGreaterThanOrEqual(bmp.img.length);

    expect(bmp.headerSize).toBe(40); // BITMAPINFOHEADER
    expect(bmp.width).toBe(256);
    expect(bmp.height).toBe(256);
    expect(bmp.bitsPerPixel).toBe(8);
    expect(bmp.paletteColorCount).toBe(256);
    expect(bmp.palette.length).toBe(1024);
  });

  it('can read 24-bit non-palette header fields', () => {
    var bmp = Bitmap.fromFile(fileNonPalette24bit);

    expect(bmp.type).toBe('BM');
    expect(bmp.size).toBeGreaterThan(0);
    expect(bmp.offset).toBeGreaterThan(0);
    expect(bmp.img.length).toBeGreaterThan(0);
    expect(bmp.size).toBeGreaterThanOrEqual(bmp.img.length);

    expect(bmp.headerSize).toBe(40); // BITMAPINFOHEADER
    expect(bmp.width).toBe(100);
    expect(bmp.height).toBe(100);
    expect(bmp.bitsPerPixel).toBe(24);
    expect(bmp.paletteColorCount).toBe(0);
    expect(bmp.palette.length).toBe(0);
  });

  it('can write a new bmp file', () => {
    var bmp = Bitmap.fromFile(filePalette);
    bmp.writeToFile(fileOutput);

    expect(fs.existsSync(fileOutput)).toBe(true);
  });
});