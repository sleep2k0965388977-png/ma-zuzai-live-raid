const https = require('https');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'meshy_page.html'), 'utf8');

const regex = /<script[^>]+src="([^"]+)"/g;
let m;
const scripts = [];
while ((m = regex.exec(html)) !== null) {
  scripts.push(m[1]);
}

async function searchModule() {
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    await new Promise((resolve) => {
      https.get(s, (res) => {
        let code = '';
        res.on('data', c => code += c);
        res.on('end', () => {
          if (code.includes('917573')) {
            console.log(`FOUND in [${i}] ${s}`);
            let p = code.indexOf('917573');
            console.log(code.substring(Math.max(0, p - 50), Math.min(code.length, p + 400)));
          }
          resolve();
        });
      }).on('error', resolve);
    });
  }
}
searchModule();
