const fs = require('fs');
const code = fs.readFileSync('assets/index-CT5dfJfs.js', 'utf8');

let pos = 0;
while ((pos = code.indexOf('D("gift"', pos)) !== -1) {
  console.log(code.substring(pos - 40, pos + 100));
  pos += 8;
}
