const fs = require('fs');
const code = fs.readFileSync('assets/index-CT5dfJfs.js', 'utf8');

const pos = code.indexOf('const pr=');
if (pos !== -1) {
  console.log(code.substring(pos, pos + 300));
} else {
  let p = code.indexOf('pr={');
  console.log(code.substring(p - 20, p + 300));
}
