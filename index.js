'use strict';
const requireAll = require('require-all');
const Bitmap = require('./lib/bitmap');
const transformLibrary = requireAll(`${__dirname}/lib/transforms`);

console.log(process.argv);

const [/*ignored*/, /*ignored*/, inFile, outFile, ...transforms] = process.argv;

console.log({inFile, outFile, transforms});

var bmp = Bitmap.fromFile(inFile);

transforms.forEach(transformName =>{
  var transform = transformLibrary[transformName];

  if(transform){
    transform(bmp);
  } else {
    console.warn(`Transform '${transformName}' not found`);
  }
});
// const invert = require('./lib/transforms/invert-palette');
// invert(bmp);

bmp.writeToFile(outFile);