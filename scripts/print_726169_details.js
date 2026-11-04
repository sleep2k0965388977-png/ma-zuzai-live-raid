const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/2p7ykyhecjxv8.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let p = code.indexOf(',726169,');
    let end = code.indexOf(',726169)}', p);
    if (end === -1) end = p + 4000;
    console.log(code.substring(p, end + 100));
  });
});
