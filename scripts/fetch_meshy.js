const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  console.log('Fetching:', url);
  const u = new URL(url);
  const options = {
    hostname: u.hostname,
    path: u.pathname + u.search,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  };

  const req = https.request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      let nextUrl = res.headers.location;
      if (!nextUrl.startsWith('http')) {
        nextUrl = 'https://' + u.hostname + nextUrl;
      }
      return fetchUrl(nextUrl);
    }

    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log('Body length:', body.length);
      const outHtml = path.join(__dirname, 'meshy_page.html');
      fs.writeFileSync(outHtml, body);

      const matches = body.match(/https?:\/\/[^\s"'<>]+\.(glb|gltf|fbx|usdz|obj)[^\s"'<>]*/gi);
      console.log('Model links found:', matches);

      const allUrls = body.match(/https?:\/\/[^\s"'<>]+/gi) || [];
      const assetUrls = allUrls.filter(x => x.includes('cdn.meshy.ai') || x.includes('01a1a163-d096-7733-8002-6988f0c7139b'));
      console.log('Relevant asset urls:', [...new Set(assetUrls)]);
    });
  });

  req.on('error', (e) => {
    console.error('Request error:', e);
  });
  req.end();
}

fetchUrl('https://www.meshy.ai/s/PTBEUz');

