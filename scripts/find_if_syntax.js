const fs = require('fs');

const code = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

let pos = 0;
while (true) {
  let idx = code.indexOf('if(', pos);
  if (idx === -1) break;
  let before = code.substring(Math.max(0, idx - 40), idx).trim();
  if (!before.endsWith('else') && !before.endsWith(';') && !before.endsWith('{') && !before.endsWith('}') && !before.endsWith('\n')) {
    console.log('SUSPICIOUS IF at', idx, 'before:', before);
  }
  pos = idx + 3;
}
