const fs = require('fs');
const code = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

const idx = code.indexOf('type==="sword_rain"');
console.log('sword_rain update at:', idx);
if (idx !== -1) {
  console.log(code.substring(idx - 50, idx + 1000));
}
