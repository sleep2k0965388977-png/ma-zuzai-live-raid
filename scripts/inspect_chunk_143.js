const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/3ocjgpx0uv4bm.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    // Find modelUrl or 3D viewer usage
    const terms = ['modelUrl', 'Viewer', 'Three', 'Mesh', 'refId', 'download'];
    for (const t of terms) {
      let idx = 0;
      while ((idx = code.indexOf(t, idx)) !== -1) {
        console.log(`--- ${t} in chunk 143 ---`);
        console.log(code.substring(Math.max(0, idx - 80), Math.min(code.length, idx + 200)));
        idx += t.length + 10;
        if (idx > 100000) break;
      }
    }
  });
});
