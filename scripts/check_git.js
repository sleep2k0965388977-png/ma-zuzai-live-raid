const fs = require('fs');
const path = require('path');

// Let's check what commits or files changed recently
const gitHead = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/.git/logs/HEAD', 'utf8');
const lines = gitHead.trim().split('\n');
console.log('Last commits in git log:');
lines.slice(-5).forEach(l => console.log(l));
