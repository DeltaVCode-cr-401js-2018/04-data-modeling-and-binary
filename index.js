'use strict';

const Bitmap = require('./lib/bitmap');

const requireAll = require('require-all');
const transformLibrary = requireAll(`${__dirname}/lib/transforms`);


const [/* ingnored */, , inFile, outFile, ...transformNames] = process.argv;

console.log({ inFile, outFile, transformNames });

var bmp = Bitmap.fromFile(inFile); 
// const invert = require('./lib/transforms/invert-palette');
transformNames.forEach(transformNames => {
  var transform = transformLibrary[transformNames];

  if (transform) {
    console.warn(`Transforming with '${transformNames}'`);
    transform(bmp);
  } else {
    console.warn(`Transform '${transformNames}' not found`);
  }
});
// invert(bmp);
bmp.writeToFile(outFile);