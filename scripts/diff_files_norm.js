const fs = require('fs');

const f1 = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/scripts/index-CT5dfJfs.committed.js', 'utf8').replace(/\r\n/g, '\n');
const f2 = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8').replace(/\r\n/g, '\n');

console.log('Normalized Committed length:', f1.length);
console.log('Normalized Current length:', f2.length);

// Find all differences
let p1 = 0, p2 = 0;
let diffCount = 0;

while (p1 < f1.length && p2 < f2.length) {
  if (f1[p1] !== f2[p2]) {
    diffCount++;
    console.log(`\n=== DIFF #${diffCount} ===`);
    console.log(`f1 index ${p1}, f2 index ${p2}`);
    console.log('Context before: ...' + f1.substring(p1 - 40, p1));
    
    // Look ahead to find where they realign
    let bestAlign = null;
    for (let len = 50; len <= 500; len += 50) {
      const target = f1.substring(p1, p1 + len);
      const foundInF2 = f2.indexOf(target, p2);
      if (foundInF2 !== -1 && foundInF2 - p2 < 50000) {
        bestAlign = { f1Next: p1, f2Next: foundInF2 };
        break;
      }
    }
    if (!bestAlign) {
      for (let len = 50; len <= 500; len += 50) {
        const target = f2.substring(p2, p2 + len);
        const foundInF1 = f1.indexOf(target, p1);
        if (foundInF1 !== -1 && foundInF1 - p1 < 50000) {
          bestAlign = { f1Next: foundInF1, f2Next: p2 };
          break;
        }
      }
    }
    
    if (bestAlign) {
      console.log('F1 chunk removed/changed:\n', f1.substring(p1, bestAlign.f1Next));
      console.log('F2 chunk added/changed:\n', f2.substring(p2, bestAlign.f2Next));
      p1 = bestAlign.f1Next;
      p2 = bestAlign.f2Next;
    } else {
      console.log('Could not realign within window!');
      break;
    }
    if (diffCount > 10) break;
  } else {
    p1++;
    p2++;
  }
}
