const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let code = fs.readFileSync(f, 'utf8');

  // Let's ensure camera in resize() is tuned for 3:4 ratio
  const oldResizeSnippet = 'if(aspect<0.75){';
  const newResizeSnippet = 'if(aspect<0.68){'; // Only adjust fov if narrower than 3:4!

  if (code.includes(oldResizeSnippet)) {
    code = code.replace(oldResizeSnippet, newResizeSnippet);
    fs.writeFileSync(f, code, 'utf8');
    console.log('Updated resize threshold in', f);
  }
}
