const fs = require('fs');
const vm = require('vm');

const targetFiles = ['1/assets/index-CT5dfJfs.js', '1/public/assets/index-CT5dfJfs.js'];

targetFiles.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');

  // Replace dpr calculation with fast native 1:1 60fps logic
  const oldDprBlock = /const dpr = Math\.min\(Math\.max\(window\.devicePixelRatio\|\|1, 2\.0\), 2\.5\);[\s\S]*?this\.composer\.setSize\(e,t\);/;

  const newDprBlock = `const dpr = (e >= 1000) ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(e, t);
    this.composer.setPixelRatio(1.0);
    this.composer.setSize(e, t);`;

  if (!oldDprBlock.test(code)) {
    console.error('Target DPR block not found in', file);
    process.exit(1);
  }

  code = code.replace(oldDprBlock, newDprBlock);
  console.log('Optimized DPR for 60 FPS in', file);

  // Optimize bloom pass resolution to lightweight 256
  code = code.replace(/const bw=Math\.min\(Math\.round\(e\*\.4\),480\),bh=Math\.min\(Math\.round\(t\*\.4\),480\);/, 'const bw=256,bh=256;');

  // Validate syntax
  try {
    new vm.SourceTextModule(code);
    console.log('Syntax check: SUCCESS for', file);
    fs.writeFileSync(file, code, 'utf8');
  } catch (err) {
    console.error('Syntax error:', file, err);
    process.exit(1);
  }
});

// Bump cachebuster in index.html
let html = fs.readFileSync('1/index.html', 'utf8');
const now = Date.now();
html = html.replace(/\?v=\d+/g, '?v=' + now);
fs.writeFileSync('1/index.html', html, 'utf8');
console.log('Updated index.html cachebuster to', now);
