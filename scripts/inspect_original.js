const fs = require('fs');
const orig = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/scripts/index-CT5dfJfs.committed.js', 'utf8');
const curr = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

const origIdx = orig.indexOf('const Mf=');
console.log('ORIGINAL around Mf:');
console.log(orig.slice(origIdx, origIdx + 800));

const currIdx = curr.indexOf('const Mf=');
console.log('\nCURRENT around Mf:');
console.log(curr.slice(currIdx, currIdx + 800));
