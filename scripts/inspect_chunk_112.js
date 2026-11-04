const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/02selghcpg4yw.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let idx = code.indexOf('modelUrl');
    if (idx === -1) idx = code.indexOf('post');
    while (idx !== -1) {
      console.log('--- match ---');
      console.log(code.substring(Math.max(0, idx - 100), Math.min(code.length, idx + 300)));
      idx = code.indexOf('modelUrl', idx + 10);
    }
  });
});
