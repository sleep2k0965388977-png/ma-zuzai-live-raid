const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/24ddcv0y85ltw.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let idx = code.indexOf('modelUrl');
    while (idx !== -1) {
      console.log('--- modelUrl match ---');
      console.log(code.substring(Math.max(0, idx - 150), Math.min(code.length, idx + 350)));
      idx = code.indexOf('modelUrl', idx + 10);
    }
  });
});
