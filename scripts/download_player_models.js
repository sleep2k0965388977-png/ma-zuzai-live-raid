const https = require('https');
const fs = require('fs');
const path = require('path');

const models = [
  {
    name: 'player_golden_guardian.glb',
    url: 'https://assets.meshy.ai/869b190d-e944-49d5-9e6b-2b850b0cf963/tasks/01a1a17a-e8e0-77be-a1df-106669e7a18f/output/model.glb?Expires=1793836800&Signature=odPH12KZTcC8mE1WnIhbazy6Ukdcx42ls3WaHKT0NTwsBl5TxPWdFKwIRKkJ07DD0A~~WjNx~9NfVrAC7jmhR6NBTxcKZ85DUcVd6SjMAy5hDWP6jfrIjtTbbbiiVJ03ACiZOjIdxOtHxGfOe9gE8Xf7pxbl~Fu3nvNj3mKZZWHHhPhdZ7U18uDwz8iQbYxyl6BENrz7witLmb-kDG5MavDkUKPk7oQNZJTwMowA7eRLtsNImp-56ABw9zstpq4CcjafN0dLPdYz7pvwU0~AtaIG-c-~bCWLWTfu7suCunP1jeawp1iTGkvhZjZKsKOmTDNe03fohFPEJXaNEjLcnA__&Key-Pair-Id=K1VGYTHIYLM9UM'
  },
  {
    name: 'player_scarlet_empress.glb',
    url: 'https://assets.meshy.ai/869b190d-e944-49d5-9e6b-2b850b0cf963/tasks/01a1a1bc-ed01-710c-bc6d-a5e9ce3da037/output/model.glb?Expires=1793836800&Signature=OoGP2tZVBBf-ZBrWv4YGEKeISc4k5~sQcESpPULAZ3dbqBivpVyAppT3BaFHt0Aj13gtq1WmX2rbpykKwR1yyU2XWKoIfihWMfJl6MUmS5WEC1-96aU6kJvxcNvfPrzNnnVOpLhK3wdjgUZBt8C7uT7APWcuZXj9PEBnqlYfyzJHOOH1stcYE9aeXgPF0kUtRExO6fIwJqFghOlP-U-GyodOIV7xaTpUYiVLz5x8V6hfbf-bgHGGnXLYL~W-xLhTrSzUI-UJ7Cilbp3~o80pOPdNlcciOaK9wLg-05dM4Hoq~OBpIofBbUVaurzEam12S8bntyfT5LxRwpaLyFi0~Q__&Key-Pair-Id=K1VGYTHIYLM9UM'
  }
];

function download(item) {
  return new Promise((resolve, reject) => {
    console.log(`Starting download ${item.name}...`);
    const destAssets = path.join(__dirname, '../assets', item.name);
    const destPublic = path.join(__dirname, '../public/assets', item.name);

    const file = fs.createWriteStream(destAssets);
    https.get(item.url, (res) => {
      console.log(`${item.name} Response:`, res.statusCode);
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${res.statusCode}`));
      }
      const total = parseInt(res.headers['content-length'] || '0', 10);
      let downloaded = 0;
      res.on('data', (c) => {
        downloaded += c.length;
        if (total > 0 && downloaded % (1024 * 1024 * 5) < c.length) {
          console.log(`${item.name}: ${(downloaded / 1024 / 1024).toFixed(1)} MB / ${(total / 1024 / 1024).toFixed(1)} MB`);
        }
      });
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Finished ${item.name} (${downloaded} bytes)!`);
          try {
            fs.mkdirSync(path.dirname(destPublic), { recursive: true });
            fs.copyFileSync(destAssets, destPublic);
            console.log(`Copied to ${destPublic}`);
          } catch (e) {
            console.log('Copy notice:', e.message);
          }
          resolve();
        });
      });
    }).on('error', (e) => {
      fs.unlinkSync(destAssets);
      reject(e);
    });
  });
}

async function run() {
  for (const m of models) {
    await download(m);
  }
  console.log('ALL DOWNLOADS COMPLETED!');
}
run();
