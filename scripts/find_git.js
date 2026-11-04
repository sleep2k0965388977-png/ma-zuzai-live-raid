const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' });
  } catch (e) {
    return null;
  }
}

console.log('--- 1. Check registry ---');
console.log(run('reg query "HKLM\\Software\\GitForWindows"') || 'No HKLM GitForWindows');
console.log(run('reg query "HKCU\\Software\\GitForWindows"') || 'No HKCU GitForWindows');

console.log('--- 2. Check AppData GitHub / Git ---');
const appData = process.env.LOCALAPPDATA;
if (fs.existsSync(appData + '\\GitHubDesktop')) {
  console.log('Found GitHubDesktop in LocalAppData');
  const items = fs.readdirSync(appData + '\\GitHubDesktop');
  console.log('GitHubDesktop items:', items);
}

console.log('--- 3. Check Program Files ---');
['C:\\Program Files', 'C:\\Program Files (x86)', 'D:\\'].forEach(dir => {
  if (fs.existsSync(dir)) {
    try {
      const sub = fs.readdirSync(dir).filter(f => f.toLowerCase().includes('git'));
      console.log(dir, 'has git-related:', sub);
    } catch(e) {}
  }
});
