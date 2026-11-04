// Test in Node with Three.js
const fs = require('fs');
const path = require('path');

// Let's inspect index-CT5dfJfs.js to find any errors in the modified code
const code = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

// Check all brackets / parentheses balance
let stack = [];
for (let i = 0; i < code.length; i++) {
  let c = code[i];
  if (c === '{' || c === '(' || c === '[') stack.push({ c, i });
  else if (c === '}' || c === ')' || c === ']') {
    let top = stack.pop();
    if (!top) {
      console.log('Unmatched closing at', i, c);
      break;
    }
    if ((c === '}' && top.c !== '{') || (c === ')' && top.c !== '(') || (c === ']' && top.c !== '[')) {
      console.log('Mismatched bracket at', i, 'expected', top.c, 'got', c);
      break;
    }
  }
}
console.log('Bracket check done, remaining stack:', stack.length);
