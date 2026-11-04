const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/2p7ykyhecjxv8.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let idx = code.indexOf('model.glb');
    while (idx !== -1) {
      console.log('--- model.glb match ---');
      console.log(code.substring(Math.max(0, idx - 150), Math.min(code.length, idx + 350)));
      idx = code.indexOf('model.glb', idx + 10);
    }
  });
});
