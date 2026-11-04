const fs = require('fs');
const acorn = require('acorn');

const filePath = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(filePath, 'utf8');

// Fix resize() method
const badResize = code.slice(code.indexOf('resize(){'), code.indexOf(')}buildArena()') + 2);
console.log('Found badResize:\n', badResize);

const cleanResize = `resize(){const e=this.host.clientWidth,t=this.host.clientHeight;if(!e||!t)return;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.composer.setSize(e,t);const bw=Math.min(Math.round(e*.35),320),bh=Math.min(Math.round(t*.35),320);if(this.bloomPass)this.bloomPass.setSize(bw,bh);}`;

code = code.replace(badResize, cleanResize);

let maxIterations = 20;
let fixedCount = 0;

while (maxIterations-- > 0) {
  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`\n🎉 SUCCESS! All syntax errors have been resolved! (Total fixes: ${fixedCount})`);
    break;
  } catch (err) {
    fixedCount++;
    console.log(`\n[Fix #${fixedCount}] Error at line ${err.loc.line}, col ${err.loc.column} (pos: ${err.pos}): ${err.message}`);
    const before = code.slice(Math.max(0, err.pos - 50), err.pos);
    const after = code.slice(err.pos, Math.min(code.length, err.pos + 50));
    console.log('Snippet before:', JSON.stringify(before));
    console.log('Snippet after :', JSON.stringify(after));

    let replaced = false;

    // Pattern 1: comma before "if"
    if (before.endsWith(',') && after.startsWith('if')) {
      code = code.slice(0, err.pos - 1) + ';' + code.slice(err.pos);
      console.log('-> Replaced "," with ";" before "if"');
      replaced = true;
    }
    // Pattern 2: comma and newline before "if"
    else if (before.endsWith(',\n') && after.startsWith('if')) {
      code = code.slice(0, err.pos - 2) + ';\n' + code.slice(err.pos);
      console.log('-> Replaced ",\\n" with ";\\n" before "if"');
      replaced = true;
    }
    // Pattern 3: comma right after "}"
    else if (before.endsWith('}') && after.startsWith(',')) {
      code = code.slice(0, err.pos) + ';' + code.slice(err.pos + 1);
      console.log('-> Replaced "," with ";" after "}"');
      replaced = true;
    }
    // Pattern 4: unexpected ";" in class body or method
    else if (after.startsWith(';')) {
      code = code.slice(0, err.pos) + code.slice(err.pos + 1);
      console.log('-> Removed unexpected ";"');
      replaced = true;
    }

    if (!replaced) {
      console.error('Unknown pattern to auto-fix. Exiting for manual review.');
      break;
    }
  }
}

fs.writeFileSync(filePath, code, 'utf8');
const pubPath = 'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js';
if (fs.existsSync(pubPath)) {
  fs.writeFileSync(pubPath, code, 'utf8');
}
console.log('Updated index-CT5dfJfs.js and public/assets/index-CT5dfJfs.js');
