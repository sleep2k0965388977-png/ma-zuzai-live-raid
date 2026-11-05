const fs = require('fs');
const vm = require('vm');

const targetFiles = ['1/assets/index-CT5dfJfs.js', '1/public/assets/index-CT5dfJfs.js'];

targetFiles.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');

  const oldCode = 'this.renderer.setPixelRatio(dpr);\n    this.renderer.setSize(e,t);\n    this.composer.setSize(e,t);';
  const oldCodeCRLF = 'this.renderer.setPixelRatio(dpr);\r\n    this.renderer.setSize(e,t);\r\n    this.composer.setSize(e,t);';

  const newCode = 'this.renderer.setPixelRatio(dpr);\n    this.renderer.setSize(e,t);\n    this.composer.setPixelRatio(dpr);\n    this.composer.setSize(e,t);';
  const newCodeCRLF = 'this.renderer.setPixelRatio(dpr);\r\n    this.renderer.setSize(e,t);\r\n    this.composer.setPixelRatio(dpr);\r\n    this.composer.setSize(e,t);';

  if (code.includes(oldCodeCRLF)) {
    code = code.replace(oldCodeCRLF, newCodeCRLF);
    console.log('Updated composer setPixelRatio (CRLF) in', file);
  } else if (code.includes(oldCode)) {
    code = code.replace(oldCode, newCode);
    console.log('Updated composer setPixelRatio (LF) in', file);
  } else {
    console.error('Target not found in', file);
    process.exit(1);
  }

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
