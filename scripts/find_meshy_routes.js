const https = require('https');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'meshy_page.html'), 'utf8');

const scriptSrcs = html.match(/https:\/\/cdn\.meshy\.ai\/webapp-build-assets\/production\/_next\/static\/chunks\/[a-zA-Z0-9_\-]+\.js/g) || [];
console.log('Script count:', scriptSrcs.length);

async function findRoutes() {
  const routes = new Set();
  for (const src of scriptSrcs) {
    await new Promise((resolve) => {
      https.get(src, (res) => {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => {
          // Look for strings like "/web/..." or "/community..." or template strings
          const m = body.match(/["'`](\/api\/[a-zA-Z0-9_\-\/]+|\/web\/[a-zA-Z0-9_\-\/]+|\/v[0-9]\/[a-zA-Z0-9_\-\/]+)["'`]/g);
          if (m) {
            for (const item of m) {
              routes.add(item.replace(/["'`]/g, ''));
            }
          }
          resolve();
        });
      }).on('error', resolve);
    });
  }
  console.log('Routes found:');
  for (const r of routes) {
    if (r.includes('model') || r.includes('post') || r.includes('task') || r.includes('asset') || r.includes('download') || r.includes('animate')) {
      console.log('->', r);
    }
  }
}
findRoutes();
