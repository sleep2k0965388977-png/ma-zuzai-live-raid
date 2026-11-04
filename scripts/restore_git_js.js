const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// Read git objects to find the clean committed index-CT5dfJfs.js
// We can use git cat-file or read the git tree object
// Let's inspect .git/objects
function readGitObject(hash) {
  const dir = hash.substring(0, 2);
  const file = hash.substring(2);
  const objPath = path.join('D:/1-20261103T120058Z-1-001/1/.git/objects', dir, file);
  if (!fs.existsSync(objPath)) return null;
  const compressed = fs.readFileSync(objPath);
  const decompressed = zlib.inflateSync(compressed);
  const nullIdx = decompressed.indexOf(0);
  const header = decompressed.slice(0, nullIdx).toString('utf8');
  const content = decompressed.slice(nullIdx + 1);
  return { header, content };
}

// commit fc784b0c53a8c4eaf90bee86088d8140f6526b40
const commit = readGitObject('fc784b0c53a8c4eaf90bee86088d8140f6526b40');
console.log('Commit header:', commit.header);
const commitText = commit.content.toString('utf8');
console.log('Commit text:\n', commitText);

// Find tree
const treeMatch = commitText.match(/tree ([0-9a-f]{40})/);
if (treeMatch) {
  const treeHash = treeMatch[1];
  console.log('Tree hash:', treeHash);
  const treeObj = readGitObject(treeHash);
  // parse tree
  let buf = treeObj.content;
  while (buf.length > 0) {
    const spaceIdx = buf.indexOf(32);
    const mode = buf.slice(0, spaceIdx).toString('utf8');
    const nullIdx = buf.indexOf(0, spaceIdx);
    const name = buf.slice(spaceIdx + 1, nullIdx).toString('utf8');
    const sha = buf.slice(nullIdx + 1, nullIdx + 21).toString('hex');
    console.log(mode, name, sha);
    if (name === 'assets') {
      const assetsTree = readGitObject(sha);
      let aBuf = assetsTree.content;
      while (aBuf.length > 0) {
        const aSpace = aBuf.indexOf(32);
        const aMode = aBuf.slice(0, aSpace).toString('utf8');
        const aNull = aBuf.indexOf(0, aSpace);
        const aName = aBuf.slice(aSpace + 1, aNull).toString('utf8');
        const aSha = aBuf.slice(aNull + 1, aNull + 21).toString('hex');
        console.log('  ', aMode, aName, aSha);
        if (aName === 'index-CT5dfJfs.js') {
          console.log('FOUND COMMITTED JS SHA:', aSha);
          const jsBlob = readGitObject(aSha);
          fs.writeFileSync('D:/1-20261103T120058Z-1-001/1/scripts/index-CT5dfJfs.committed.js', jsBlob.content);
          console.log('Wrote committed JS to scripts/index-CT5dfJfs.committed.js');
        }
        aBuf = aBuf.slice(aNull + 21);
      }
    }
    buf = buf.slice(nullIdx + 21);
  }
}
