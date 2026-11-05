const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let code = fs.readFileSync(f, 'utf8');

  // Replace comma + try with IIFE: (()=>{try{...}})()
  const target = 'e.appendChild(this.labels),try{const PFX=window.PixelFXLib?window.PixelFXLib.PixelFXManager:window.PixelFXManager;if(PFX)this.pixelFX=new PFX(e);}catch(err){console.error(err);},';
  const replacement = 'e.appendChild(this.labels);try{const PFX=window.PixelFXLib?window.PixelFXLib.PixelFXManager:window.PixelFXManager;if(PFX)this.pixelFX=new PFX(e);}catch(err){console.error(err);};';

  if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync(f, code, 'utf8');
    console.log('Fixed syntax error in', f);
  } else {
    console.log('Target string not exact in', f);
  }
}
