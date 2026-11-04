const fs = require('fs');
const acorn = require('acorn');

const code = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

try {
  acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('✅ CONGRATULATIONS! The entire 1.4MB bundle parsed with ZERO syntax errors!');
} catch (err) {
  console.error('❌ SYNTAX ERROR DETECTED:');
  console.error('Message:', err.message);
  console.error('Position:', err.pos, 'Line:', err.loc ? err.loc.line : '?', 'Col:', err.loc ? err.loc.column : '?');
  const start = Math.max(0, err.pos - 80);
  const end = Math.min(code.length, err.pos + 80);
  console.error('\n--- CODE SNIPPET AROUND ERROR ---');
  console.error(code.slice(start, err.pos) + ' >>> ' + code.slice(err.pos, end));
  console.error('--------------------------------');
}
