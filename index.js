'use strict';

const requireAll = require('require-all');
const Bitmap = require('./lib/bitmap');
const transformLibrary = requireAll(`${__dirname}/lib/transforms`);
const [, , inFile, outFile, ...transformNames] = process.argv;
console.log({inFile, outFile, transformNames});

var bmp = Bitmap.fromFile(inFile);

//this is the manual way of doing this
// const invert = require('./lib/transforms/invert-palette');
// invert(bmp);

transformNames.forEach(transformName => {
  var transform = transformLibrary[transformName];

  if(transform) {
    transform(bmp);
  } else {
    console.warn(`Transform '${transformName}' not found`);
  }
});

bmp.writeToFile(outFile);