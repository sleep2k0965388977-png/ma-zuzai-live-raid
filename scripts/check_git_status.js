const git = require('D:/1-20261103T120058Z-1-001/1/node_modules/isomorphic-git');
const fs = require('fs');

const dir = 'D:/1-20261103T120058Z-1-001/1';

async function main() {
  const matrix = await git.statusMatrix({ fs, dir });
  const changed = matrix.filter(([file, head, work, stage]) => !(head === 1 && work === 1 && stage === 1));
  console.log('Total files differing from HEAD:', changed.length);
  changed.forEach(([file, head, work, stage]) => {
    let status = 'unknown';
    if (head === 0 && work === 2 && stage === 0) status = 'untracked';
    else if (head === 1 && work === 2 && stage === 1) status = 'modified';
    else if (head === 1 && work === 0 && stage === 1) status = 'deleted';
    else if (head === 0 && work === 2 && stage === 2) status = 'added';
    console.log(`[${status}] ${file}`);
  });
}

main().catch(console.error);
