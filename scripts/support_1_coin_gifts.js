const fs = require('fs');
const path = require('path');

// 1. Update tiktok_bridge.js
const bridgeFile = path.join(__dirname, '..', 'tiktok_bridge.js');
let bridgeCode = fs.readFileSync(bridgeFile, 'utf8');
bridgeCode = bridgeCode.replace(
  "else if (diamonds >= 5) skill = 'small';",
  "else if (diamonds >= 1) skill = 'small'; // Kích hoạt ngay từ 1 Xu (Hoa hồng, v.v.)"
);
fs.writeFileSync(bridgeFile, bridgeCode, 'utf8');
console.log('[✓] Updated tiktok_bridge.js to support 1 Xu gifts');

// 2. Update server.js
const serverFile = path.join(__dirname, '..', 'server.js');
let serverCode = fs.readFileSync(serverFile, 'utf8');
serverCode = serverCode.replace(
  "else if (diamonds >= 5) skill = 'small';",
  "else if (diamonds >= 1) skill = 'small'; // Kích hoạt ngay từ 1 Xu (Hoa hồng, v.v.)"
);
fs.writeFileSync(serverFile, serverCode, 'utf8');
console.log('[✓] Updated server.js to support 1 Xu gifts');

// 3. Update assets/index-CT5dfJfs.js & public/assets/index-CT5dfJfs.js
const jsFiles = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

for (const jsFile of jsFiles) {
  let code = fs.readFileSync(jsFile, 'utf8');
  code = code.replace('small:{label:"5 Xu (Kiếm Vàng)"', 'small:{label:"1 - 10 Xu (Kiếm Vàng)"');
  code = code.replace('" 5 Xu (Kiếm Vàng)"]', '" 1 - 10 Xu (Kiếm Vàng)"]');
  code = code.replace('"✨ Kiếm Vàng (5 Xu)"', '"✨ Kiếm Vàng (1-10 Xu)"');
  fs.writeFileSync(jsFile, code, 'utf8');
  console.log(`[✓] Updated ${jsFile}`);
}

// 4. Update cache bust in index.html
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const now = Date.now();
indexHtml = indexHtml.replace(/index-CT5dfJfs\.js\?v=\d+/, `index-CT5dfJfs.js?v=${now}`);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log(`[✓] Updated index.html cache bust to v=${now}`);
