'use strict';

const Bitmap = require('./lib/bitmap');

const requireAll = require('require-all');
const transformLibrary = requireAll(`${__dirname}/lib/transforms`);
console.log('transformLibrary', transformLibrary);

const [/* ignored */, , inFile, outFile, ...transformNames] = process.argv;

console.log({ inFile, outFile, transformNames });

var bmp = Bitmap.fromFileSync(inFile);
console.log(bmp);

// Manual transform
// const invert = require('./lib/transforms/invert-palette');
// invert(bmp);

// For each of the provided transform names...
transformNames.forEach(transformName => {
  // Try to find that transform
  var transform = transformLibrary[transformName];

  // If the transform exists...
  if (transform) {
    console.warn(`Transforming with '${transformName}'`);
    // Call the transform function
    transform(bmp);
  } else {
    // Otherwise warn that the transform does not exist
    console.warn(`Transform '${transformName}' not found`);
  }
});

bmp.writeToFileSync(outFile);
