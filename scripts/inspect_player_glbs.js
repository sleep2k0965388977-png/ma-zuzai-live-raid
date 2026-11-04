const fs = require('fs');
const path = require('path');

function inspectGlb(filename) {
  const filePath = path.join(__dirname, '../assets', filename);
  const buf = fs.readFileSync(filePath);
  const magic = buf.readUInt32LE(0);
  const version = buf.readUInt32LE(4);
  const length = buf.readUInt32LE(8);
  const chunkLength = buf.readUInt32LE(12);
  const chunkType = buf.readUInt32LE(16);

  console.log(`=== ${filename} ===`);
  console.log(`Length: ${length} bytes`);
  if (chunkType === 0x4E4F534A) { // JSON
    const jsonStr = buf.toString('utf8', 20, 20 + chunkLength);
    const gltf = JSON.parse(jsonStr);
    console.log('Meshes:', gltf.meshes ? gltf.meshes.length : 0);
    console.log('Nodes:', gltf.nodes ? gltf.nodes.length : 0);
    console.log('Skins:', gltf.skins ? gltf.skins.length : 0);
    console.log('Animations:', gltf.animations ? gltf.animations.length : 0);
    if (gltf.animations) {
      gltf.animations.forEach((a, i) => {
        console.log(`  Anim ${i}: name="${a.name}", channels=${a.channels ? a.channels.length : 0}`);
      });
    }
  }
}

inspectGlb('player_golden_guardian.glb');
inspectGlb('player_scarlet_empress.glb');
