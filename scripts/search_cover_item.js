const https = require('https');

// Search in chunk 3tty-lguqtgfi.js or search for refId across all chunks
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'meshy_page.html'), 'utf8');

const regex = /<script[^>]+src="([^"]+)"/g;
let m;
const scripts = [];
while ((m = regex.exec(html)) !== null) {
  scripts.push(m[1]);
}

async function searchRefId() {
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    await new Promise((resolve) => {
      https.get(s, (res) => {
        let code = '';
        res.on('data', c => code += c);
        res.on('end', () => {
          if (code.includes('coverItem') || code.includes('refId') || code.includes('community-post')) {
            console.log(`FOUND in [${i}] ${s}`);
            let p = code.indexOf('coverItem');
            if (p !== -1) {
              console.log('coverItem context:', code.substring(Math.max(0, p - 100), Math.min(code.length, p + 250)));
            }
          }
          resolve();
        });
      }).on('error', resolve);
    });
  }
}
searchRefId();
