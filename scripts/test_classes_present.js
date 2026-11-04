const fs = require('fs');
const js = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

console.log('Checking required classes in JS:');
console.log('Mr (CatmullRomCurve3):', js.indexOf('class Mr') !== -1 || js.indexOf('new Mr') !== -1);
console.log('ws (TubeGeometry):', js.indexOf('class ws') !== -1 || js.indexOf('new ws') !== -1);
console.log('Wn (TorusGeometry):', js.indexOf('class Wn') !== -1 || js.indexOf('new Wn') !== -1);
console.log('dn (MeshStandardMaterial):', js.indexOf('new dn') !== -1);
console.log('mt (Mesh):', js.indexOf('new mt') !== -1);
console.log('cn (Group):', js.indexOf('new cn') !== -1);
console.log('Ft (Vector3 helper):', js.indexOf('Ft(') !== -1);
