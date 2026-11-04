const fs = require('fs');
const js = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');
const p = js.indexOf('loadPrebuiltGeminiBoss');
console.log(js.substring(p, p + 1200));
