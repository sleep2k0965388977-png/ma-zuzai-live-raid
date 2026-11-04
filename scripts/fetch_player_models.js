const https = require('https');

function getShare(urlStr) {
  return new Promise((resolve) => {
    const url = new URL(urlStr);
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      console.log('GET', urlStr, '-> Status:', res.statusCode);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) loc = 'https://' + url.hostname + loc;
        console.log('Redirecting to:', loc);
        return resolve(getShare(loc));
      }
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        console.log('Body length:', body.length);
        const uuidMatches = body.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi) || [];
        const uniqueUuids = [...new Set(uuidMatches)];
        console.log('UUIDs found:', uniqueUuids);
        resolve({ urlStr, uniqueUuids, body });
      });
    }).on('error', (e) => {
      console.error(e);
      resolve(null);
    });
  });
}

async function run() {
  console.log('--- Checking o8HbGX ---');
  const r1 = await getShare('https://www.meshy.ai/s/o8HbGX');
  console.log('--- Checking mvqUd8 ---');
  const r2 = await getShare('https://www.meshy.ai/s/mvqUd8');
}
run();
