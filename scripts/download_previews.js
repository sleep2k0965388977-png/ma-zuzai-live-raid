const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchWithRedirect(url, dest, destPub) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirecting to:', res.headers.location);
        return resolve(fetchWithRedirect(res.headers.location, dest, destPub));
      }
      console.log('Final Status:', res.statusCode);
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          fs.copyFileSync(dest, destPub);
          console.log('Saved to', dest, fs.statSync(dest).size, 'bytes');
          resolve();
        });
      });
    }).on('error', reject);
  });
}

async function run() {
  await fetchWithRedirect(
    'https://api.meshy.ai/misc/cdn-images/869b190d-e944-49d5-9e6b-2b850b0cf963/tasks/01a1a17a-e8e0-77be-a1df-106669e7a18f/output/preview.png?sign=1793836800-da9bd2189310002dce145073dc6be9fa',
    path.join(__dirname, '../assets/preview_golden_guardian.png'),
    path.join(__dirname, '../public/assets/preview_golden_guardian.png')
  );
  await fetchWithRedirect(
    'https://api.meshy.ai/misc/cdn-images/869b190d-e944-49d5-9e6b-2b850b0cf963/tasks/01a1a1bc-ed01-710c-bc6d-a5e9ce3da037/output/preview.png?sign=1793836800-e10774102ae08d3d917a1b28f99c4069',
    path.join(__dirname, '../assets/preview_scarlet_empress.png'),
    path.join(__dirname, '../public/assets/preview_scarlet_empress.png')
  );
}
run();
