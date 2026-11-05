const fs = require('fs');
let code = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/server.js', 'utf8');

const oldCache = `} else if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }`;

const newCache = `} else if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }`;

if (code.includes(oldCache)) {
  code = code.replace(oldCache, newCache);
  fs.writeFileSync('D:/1-20261103T120058Z-1-001/1/server.js', code, 'utf8');
  console.log('Updated server.js caching to prevent stale browser cache');
} else {
  console.log('oldCache block not found, searching pattern...');
  code = code.replace(/res\.setHeader\('Cache-Control',\s*'public,\s*max-age=86400'\);/, "res.setHeader('Cache-Control', 'no-cache, must-revalidate');");
  fs.writeFileSync('D:/1-20261103T120058Z-1-001/1/server.js', code, 'utf8');
  console.log('Replaced via regex in server.js');
}
