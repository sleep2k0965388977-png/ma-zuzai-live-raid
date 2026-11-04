const fs = require('fs');
const code = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

const idx = code.indexOf('damage(e,t="Đội hình"){');
console.log('damage at:', idx);
if (idx !== -1) {
  console.log(code.substring(idx, idx + 1000));
}

const epIdx = code.indexOf('class EP{');
console.log('EP at:', epIdx);
if (epIdx !== -1) {
  console.log(code.substring(epIdx, epIdx + 200));
}
