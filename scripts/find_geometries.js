const fs = require('fs');
const code = fs.readFileSync('assets/index-CT5dfJfs.js', 'utf8');

let p = code.indexOf('class BoxGeometry');
console.log('BoxGeometry:', p !== -1 ? code.substring(p - 30, p + 50) : 'not found');

let p2 = code.indexOf('class PlaneGeometry');
console.log('PlaneGeometry:', p2 !== -1 ? code.substring(p2 - 30, p2 + 50) : 'not found');

// Find variable name for BoxGeometry and PlaneGeometry
let p3 = code.indexOf('new BoxGeometry');
console.log('new BoxGeometry:', p3);
let p4 = code.indexOf('extends BoxGeometry');
console.log('extends BoxGeometry:', p4);
