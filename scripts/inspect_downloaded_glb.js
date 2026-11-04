const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '../assets/boss_chained_radiance.glb');
const buf = fs.readFileSync(glbPath);

// GLB header is 12 bytes: magic (0x46546C67 "glTF"), version (uint32), length (uint32)
const magic = buf.toString('utf8', 0, 4);
const version = buf.readUInt32LE(4);
const length = buf.readUInt32LE(8);

console.log('GLB Magic:', magic);
console.log('GLB Version:', version);
console.log('GLB Total Length:', length);

// Chunk 0 is JSON: chunkLength (uint32), chunkType (0x4E4F534A "JSON")
const chunk0Length = buf.readUInt32LE(12);
const chunk0Type = buf.toString('utf8', 16, 20);
console.log('Chunk 0 Type:', chunk0Type, 'Length:', chunk0Length);

const jsonStr = buf.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonStr);

console.log('Meshes count:', (gltf.meshes || []).length);
console.log('Nodes count:', (gltf.nodes || []).length);
console.log('Animations count:', (gltf.animations || []).length);
if (gltf.animations) {
  console.log('Animation names:', gltf.animations.map(a => a.name));
}
if (gltf.skins) {
  console.log('Skins count:', gltf.skins.length);
}
console.log('Materials count:', (gltf.materials || []).length);
