'use strict';
const fs = require('fs');
const fileHouse = `${__dirname}/../../assets/palette-bitmap.bmp`;
const fileHouseOutput = `${__dirname}/../../output/palette-bitmap.bmp`;
const Bitmap = require('../../lib/bitmap');
describe('bitmap', ()=>{
  it('can read basic header fields', ()=>{
    var bmp = Bitmap.fromFileSync(fileHouse);
    expect(bmp.type).toBe('BM');
    expect(bmp.size).toBeGreaterThan(0);
    expect(bmp.offset).toBeGreaterThan(0);
    expect(bmp.img.length).toBeGreaterThan(0);
    expect(bmp.size).toBeGreaterThanOrEqual(bmp.img.length);
    expect(bmp.width).toBe(100);
    expect(bmp.height).toBe(100);
    expect(bmp.headerSize).toBe(40);
    expect(bmp.paletteColorCount).toBe(256);
    expect(bmp.palette.length).toBe(1024);
    console.log(bmp);
  });
  afterEach(()=>{
    fs.unlink(fileHouseOutput, err =>{});
  });
  it('can read a bitmap asynchronously', done=>{
    Bitmap.fromFileAsync(fileHouse, (err, bmp)=>{
      if (err) throw err;

      expect(bmp.type).toBe('BM');
      done();
    });
    
  });
  it('can write a new bmp file synchronously', ()=>{
    var bmp = Bitmap.fromFileSync(fileHouse);
    bmp.writeToFileSync(fileHouseOutput);
    expect(fs.existsSync(fileHouseOutput)).toBe(true);
  });
  it('can write a new bmp file asynchronously', done=>{
    var bmp = Bitmap.fromFileSync(fileHouse);
    bmp.writeToFileAsync(fileHouseOutput, (err, result)=>{
      if(err) throw err;

      var written = Bitmap.fromFileSync(fileHouseOutput);
      expect.anything(written);
      done();

      // console.log(result);
      // fs.exists(fileHouseOutput, (testFileExists)=>{
      //   expect(testFileExists).toBe(true);
      //   done();
      // });
      
    });
  });
});