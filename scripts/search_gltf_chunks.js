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

async function search() {
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    await new Promise((resolve) => {
      https.get(s, (res) => {
        let code = '';
        res.on('data', c => code += c);
        res.on('end', () => {
          if (code.includes('GLTFLoader') || code.includes('.glb') || code.includes('modelUrl')) {
            console.log(`FOUND in [${i}] ${s}`);
            // Find occurrences of glb
            const glbMatches = code.match(/["'`][^"'`]*?\.glb[^"'`]*?["'`]/g);
            if (glbMatches) console.log('glb matches:', glbMatches);
            const modelUrlMatches = code.match(/modelUrl[a-zA-Z0-9_]*|model_url[a-zA-Z0-9_]*/g);
            if (modelUrlMatches) console.log('modelUrl matches:', [...new Set(modelUrlMatches)]);
          }
          resolve();
        });
      }).on('error', resolve);
    });
  }
}
search();
