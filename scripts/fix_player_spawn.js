const fs = require('fs');
const acorn = require('acorn');

const files = [
  'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js',
  'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js'
];

for (const filePath of files) {
  if (!fs.existsSync(filePath)) continue;
  let code = fs.readFileSync(filePath, 'utf8');

  const oldTarget = 'const r=curTmpl?p0(curTmpl):SP(n);';
  const newTarget = 'let r=null;if(curTmpl){try{r=curTmpl.clone(!0);}catch(err){r=SP(n);}}if(!r)r=SP(n);';

  if (!code.includes(oldTarget)) {
    console.error(`[-] Could not find oldTarget in ${filePath}`);
    process.exit(1);
  }

  code = code.replace(oldTarget, newTarget);
  console.log(`[+] Replaced oldTarget in ${filePath}`);

  // Also make mixer creation safer
  const oldMixer = 'curTmpl&&(l.mixer=new fp(r),l.clips=ros.length>0?ros[n%ros.length].clips:this.playerClips,this.playClip(l.mixer,l.clips,"idle"));';
  const newMixer = 'const _clips=ros.length>0?ros[n%ros.length].clips:(this.playerClips||[]);if(_clips&&_clips.length>0&&curTmpl){try{l.mixer=new fp(r);l.clips=_clips;this.playClip(l.mixer,_clips,"idle");}catch(e){}}';

  if (code.includes(oldMixer)) {
    code = code.replace(oldMixer, newMixer);
    console.log(`[+] Replaced oldMixer in ${filePath}`);
  }

  // Validate AST
  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`[✓] Acorn AST validation SUCCESS for ${filePath}`);
    fs.writeFileSync(filePath, code, 'utf8');
  } catch (err) {
    console.error(`[X] AST ERROR in ${filePath}:`, err.message);
    process.exit(1);
  }
}

console.log('Player spawn fix completed successfully!');
