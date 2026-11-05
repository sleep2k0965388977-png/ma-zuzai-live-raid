const fs = require('fs');
const vm = require('vm');

const targetFiles = ['1/assets/index-CT5dfJfs.js', '1/public/assets/index-CT5dfJfs.js'];

const streamerLogic = `
    // Streamer sleepchillk2 auto-attack every 30 seconds (nhay len danh skill binh luan hoac 1 xu)
    this._streamerAttackTimer = (this._streamerAttackTimer || 0) + e;
    if(this._streamerAttackTimer >= 30){
      this._streamerAttackTimer = 0;
      const _stName = (this.state.tiktokStreamer || (new URLSearchParams(window.location.search)).get("user") || "sleepchillk2").replace(/^@/,"").trim() || "sleepchillk2";
      const _isSmallGift = Math.random() < 0.6;
      if(this.events){
        if(_isSmallGift){
          this.events.receive({
            id: crypto.randomUUID(),
            type: "gift",
            username: _stName,
            skill: "small",
            value: 1,
            giftName: "Hoa Hồng",
            timestamp: Date.now()
          });
        }else{
          this.events.receive({
            id: crypto.randomUUID(),
            type: "comment",
            username: _stName,
            comment: "⚔️ Xuất trảm Ma Zuzai!",
            value: 1,
            timestamp: Date.now()
          });
        }
      }
    }
`;

targetFiles.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');

  const targetAnchor = 'this.skill3MinTimer=0,this.trigger3MinBeam();\r\n    }';
  const targetAnchorLF = 'this.skill3MinTimer=0,this.trigger3MinBeam();\n    }';

  if (code.includes(targetAnchor)) {
    code = code.replace(targetAnchor, targetAnchor + streamerLogic);
    console.log('Patched (CRLF):', file);
  } else if (code.includes(targetAnchorLF)) {
    code = code.replace(targetAnchorLF, targetAnchorLF + streamerLogic);
    console.log('Patched (LF):', file);
  } else {
    console.error('Target anchor not found in', file);
    process.exit(1);
  }

  // Validate syntax
  try {
    new vm.SourceTextModule(code);
    console.log('VM Parse check: SUCCESS for', file);
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
