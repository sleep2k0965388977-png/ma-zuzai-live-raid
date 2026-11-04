const https = require('https');

const endpoints = [
  'https://api.meshy.ai/internal/community/posts/01a1a16a-ee20-75ad-9a91-05fc400beeb4',
  'https://api.meshy.ai/internal/posts/01a1a16a-ee20-75ad-9a91-05fc400beeb4',
  'https://api.meshy.ai/internal/models/01a1a163-d096-7733-8002-6988f0c7139b',
  'https://api.meshy.ai/internal/tasks/01a1a163-d096-7733-8002-6988f0c7139b',
  'https://api.meshy.ai/v1/models/01a1a163-d096-7733-8002-6988f0c7139b',
  'https://api.meshy.ai/v2/text-to-3d/01a1a163-d096-7733-8002-6988f0c7139b',
  'https://api.meshy.ai/v1/animations/01a1a163-d096-7733-8002-6988f0c7139b',
  'https://www.meshy.ai/api/posts/01a1a16a-ee20-75ad-9a91-05fc400beeb4',
  'https://www.meshy.ai/api/models/01a1a163-d096-7733-8002-6988f0c7139b'
];

async function test() {
  for (const url of endpoints) {
    await new Promise((resolve) => {
      https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          console.log(res.statusCode, url, d.substring(0, 150));
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
