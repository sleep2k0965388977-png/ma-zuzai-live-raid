const fs = require('fs');
const code = fs.readFileSync('assets/index-CT5dfJfs.js', 'utf8');

const pos = code.indexOf('events.test');
console.log('events.test at:', pos);
const testMethodPos = code.indexOf('test(e,t,n,r=1){');
if (testMethodPos !== -1) {
  console.log(code.substring(testMethodPos - 20, testMethodPos + 400));
} else {
  let p = code.indexOf('.events=');
  console.log(code.substring(p, p + 500));
}
