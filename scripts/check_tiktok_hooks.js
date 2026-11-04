const fs = require('fs');
const code = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

function findOccurrences(term) {
  let pos = 0;
  const results = [];
  while ((pos = code.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1) {
    results.push({ pos, snippet: code.substring(Math.max(0, pos - 50), Math.min(code.length, pos + 120)) });
    pos += term.length + 5;
  }
  return results;
}

['tiktok', 'websocket', 'ws://', 'localhost:', 'api/config', 'events.receive', 'socket'].forEach(t => {
  const occ = findOccurrences(t);
  console.log(`Keyword '${t}' found ${occ.length} times`);
  occ.slice(0, 5).forEach(o => console.log('  ', o.pos, o.snippet.replace(/\n/g, ' ')));
});
