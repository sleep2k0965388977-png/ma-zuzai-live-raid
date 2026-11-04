const https = require('https');

const uuids = [
  '01a09f05-86a0-75cc-90ec-04b43101b9bd',
  '01a0a323-c7a7-740e-8a7d-814031e2c78c',
  '01a09f80-4e64-76df-b50d-23666daf2885',
  '01a0a33f-150f-721d-afd6-4f922d059093',
  '01a0a31d-01b2-71a8-b53d-ee286cb92166',
  '01a0a3a8-a965-7753-90b6-5d8f0ab354fa',
  '01a09eac-89d4-744f-a8df-e05467104baa',
  '01a09f3f-aae0-7247-9866-f864186a3e7c',
  '01a09e93-8310-761e-9343-db865de90206',
  '01925437-98f3-70f4-94fd-cd14bace07fb',
  '01997fc7-ed3b-77f7-82f4-ddf5d1b9c5d1',
  '0199a6dc-67be-74d7-abb7-ad5f0b3d7a06',
  '019a49dd-6b0f-796e-88d6-160885537143',
  '019cdb04-3a9e-7bfd-8399-c1dd967d1e02',
  '019784f5-13a9-7de2-9f3f-31fb1606a68c',
  '019e452f-3681-7752-8687-6fbe70879093',
  '019d1c56-483d-7891-9acf-9e9981394a9c',
  '019e5f8e-931a-770f-8447-3bc3e07eec49',
  '019c20f5-79c8-73e0-b4c8-b8d2fd752c4b',
  '01967cd7-8ba7-7c7a-8fc0-678c53fccf98',
  '019b42da-f8b5-741f-bbc6-a080e2e48e9b',
  '019bc1f8-25f4-7097-ba64-92b36293f749',
  '019a3150-a89c-7fbb-b542-fd32437d3ee0',
  '019af7b7-6eeb-70cf-9abc-cf10341225fa',
  '019d6ab0-7597-78c8-b87a-4d88f9bdd491',
  '019505c2-e045-7e73-9bd3-65ed4166c46f',
  '01961bc3-a02c-7a97-99d6-275ea9357fcb',
  '019d8b86-f27e-7a7a-8a0b-c53b84c7d03c',
  '019cb7ec-f739-71fb-8983-9067a5ecbeb5'
];

async function checkAll() {
  for (const id of uuids) {
    const url = `https://api.meshy.ai/web/public/tasks/${id}`;
    await new Promise((resolve) => {
      https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'x-meshy-viewer-server': 'true'
        }
      }, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              const j = JSON.parse(d);
              console.log('FOUND TASK:', id, j.result?.name, j.result?.mode, j.result?.result?.modelUrl ? 'HAS MODEL_URL' : 'no modelUrl');
            } catch (e) {}
          }
          resolve();
        });
      }).on('error', resolve);
    });
  }
}
checkAll();
