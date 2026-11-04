const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/1ssd5d90yjdwv.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let idx = 0;
    while ((idx = code.indexOf('modelUrl', idx)) !== -1) {
      console.log('--- match ---');
      console.log(code.substring(Math.max(0, idx - 150), Math.min(code.length, idx + 250)));
      idx += 8;
    }
  });
});
