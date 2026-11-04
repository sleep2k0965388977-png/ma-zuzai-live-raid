const fs = require('fs');

console.log('Testing Three.js classes in bundle...');
const code = fs.readFileSync('assets/index-CT5dfJfs.js', 'utf8');

// Check geometry classes:
// fr = CylinderGeometry
// yl = SphereGeometry
// Wn = TorusGeometry
// mt = Mesh
// cn = Group
// dn = MeshStandardMaterial
// ii = MeshBasicMaterial
// br = AdditiveBlending
// Ft = Vector3 creator (Ft(x, y, z) => new B(x, y, z))
// B = Vector3

console.log('fr in code:', code.includes('new fr('));
console.log('yl in code:', code.includes('new yl('));
console.log('Wn in code:', code.includes('new Wn('));
console.log('br in code:', code.includes('blending:br'));
