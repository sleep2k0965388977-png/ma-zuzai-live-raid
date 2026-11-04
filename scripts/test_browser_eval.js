const fs = require('fs');
const jsdom = require('vm');

const code = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

// Mock browser environment
const sandbox = {
  window: {},
  document: {
    createElement: () => ({ style: {}, addEventListener: () => {} }),
    head: { appendChild: () => {} },
    body: { appendChild: () => {} },
    addEventListener: () => {}
  },
  navigator: { userAgent: 'node' },
  console: console,
  location: { href: 'http://localhost:3000/' },
  requestAnimationFrame: () => {},
  cancelAnimationFrame: () => {},
  performance: { now: () => Date.now() },
  crypto: { randomUUID: () => '123' },
  URL: { createObjectURL: () => '', revokeObjectURL: () => '' },
  ResizeObserver: class { observe() {} unobserve() {} disconnect() {} }
};
sandbox.window = sandbox;
sandbox.global = sandbox;
sandbox.self = sandbox;

try {
  jsdom.runInNewContext(code, sandbox);
  console.log('Script evaluated without top-level syntax / runtime crash!');
} catch (e) {
  console.error('ERROR during script evaluation:', e);
}
