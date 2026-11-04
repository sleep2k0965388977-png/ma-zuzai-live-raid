const https = require('https');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'meshy_page.html'), 'utf8');

// Find all script tags src in html
const scriptSrcs = html.match(/src="(https:\/\/cdn\.meshy\.ai\/webapp-build-assets\/[^"]+)"/g) || [];
console.log('Total script chunks:', scriptSrcs.length);

async function checkChunks() {
  for (const s of scriptSrcs.slice(0, 15)) {
    const url = s.replace('src="', '').replace('"', '');
    console.log('Checking chunk:', url);
    await new Promise((resolve) => {
      https.get(url, (res) => {
        let code = '';
        res.on('data', c => code += c);
        res.on('end', () => {
          if (code.includes('api.meshy.ai') || code.includes('/models/') || code.includes('model_urls')) {
            console.log('FOUND API in', url);
            const matches = code.match(/https:\/\/api\.meshy\.ai\/[a-zA-Z0-9_\-\/]+/g);
            console.log('Matches:', matches);
          }
          resolve();
        });
      }).on('error', resolve);
    });
  }
}
checkChunks();







