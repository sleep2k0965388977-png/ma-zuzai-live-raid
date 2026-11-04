const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/2p7ykyhecjxv8.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let p = code.indexOf(',696801,');
    if (p === -1) p = code.indexOf('696801');
    console.log(code.substring(p, p + 1500));
  });
});
