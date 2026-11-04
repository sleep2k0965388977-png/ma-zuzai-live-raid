const fs = require('fs');

const f1 = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/scripts/index-CT5dfJfs.committed.js', 'utf8');
const f2 = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

console.log('Committed length:', f1.length);
console.log('Current length:', f2.length);

// Find first difference
let diffStart = 0;
while (diffStart < f1.length && diffStart < f2.length && f1[diffStart] === f2[diffStart]) {
  diffStart++;
}
console.log('First diff at index:', diffStart);
console.log('Committed around diff:');
console.log(f1.substring(Math.max(0, diffStart - 50), diffStart + 100));
console.log('Current around diff:');
console.log(f2.substring(Math.max(0, diffStart - 50), diffStart + 100));
