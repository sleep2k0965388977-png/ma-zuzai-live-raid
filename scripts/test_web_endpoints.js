const https = require('https');

const endpoints = [
  'https://api.meshy.ai/web/community-posts/01a1a16a-ee20-75ad-9a91-05fc400beeb4',
  'https://api.meshy.ai/web/posts/01a1a16a-ee20-75ad-9a91-05fc400beeb4',
  'https://api.meshy.ai/web/community/posts/01a1a16a-ee20-75ad-9a91-05fc400beeb4',
  'https://api.meshy.ai/web/models/01a1a163-d096-7733-8002-6988f0c7139b',
  'https://api.meshy.ai/web/model/01a1a163-d096-7733-8002-6988f0c7139b',
  'https://api.meshy.ai/web/tasks/01a1a163-d096-7733-8002-6988f0c7139b',
  'https://api.meshy.ai/web/animations/01a1a163-d096-7733-8002-6988f0c7139b',
  'https://api.meshy.ai/web/animations/model/01a1a163-d096-7733-8002-6988f0c7139b'
];

async function test() {
  for (const url of endpoints) {
    await new Promise((resolve) => {
      https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.meshy.ai/'
        }
      }, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          console.log(res.statusCode, url, d.substring(0, 200));
          resolve();
        });
      }).on('error', (e) => {
        console.log('Error', url, e.message);
        resolve();
      });
    });
  }
}
test();
