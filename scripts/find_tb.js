const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/3ocjgpx0uv4bm.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let p = code.indexOf('(0,tB.f)(');
    console.log(code.substring(Math.max(0, p - 300), Math.min(code.length, p + 100)));
    let p2 = code.lastIndexOf('tB=', p);
    if (p2 === -1) p2 = code.lastIndexOf('tB =', p);
    console.log('tB definition:', code.substring(Math.max(0, p2 - 50), Math.min(code.length, p2 + 100)));
  });
});
