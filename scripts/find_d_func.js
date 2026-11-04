const fs = require('fs');
const code = fs.readFileSync('assets/index-CT5dfJfs.js', 'utf8');

const pos = code.indexOf('const D=(O,z,te=1)=>{');
console.log(code.substring(pos, pos + 400));
