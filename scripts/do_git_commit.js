const git = require('D:/1-20261103T120058Z-1-001/1/node_modules/isomorphic-git');
const fs = require('fs');
const path = require('path');

const dir = 'D:/1-20261103T120058Z-1-001/1';

async function main() {
  console.log('--- 1. Reading Git Status Matrix ---');
  const matrix = await git.statusMatrix({ fs, dir });

  // Filter files that need adding or removing
  const toAdd = [];
  const toRemove = [];

  for (const [filepath, head, work, stage] of matrix) {
    if (filepath.startsWith('node_modules/')) continue;
    if (filepath.endsWith('.log')) continue;

    // Modified, newly created/untracked
    if (work === 2) {
      toAdd.push(filepath);
    } else if (work === 0 && head === 1) {
      toRemove.push(filepath);
    }
  }

  console.log(`Files to add: ${toAdd.length}`);
  console.log(`Files to remove: ${toRemove.length}`);

  for (const f of toAdd) {
    console.log(`Staging: ${f}`);
    await git.add({ fs, dir, filepath: f });
  }

  for (const f of toRemove) {
    console.log(`Removing: ${f}`);
    await git.remove({ fs, dir, filepath: f });
  }

  console.log('--- 2. Creating Commit ---');
  const commitMessage = `feat: cap nhat toan dien Live Raid Boss 3D MA ZUZAI

- Tối ưu hóa 60 FPS siêu mượt (MeshBasicMaterial cho 10.000 tu sĩ, tắt shadow map vô ích, downscale Bloom)
- Nạp 2 mô hình 3D người chơi Meshy AI (Golden Crest Guardian & Scarlet Empress)
- Đồng bộ quân đoàn 10.000 lính tu sĩ theo ngoại hình người chơi
- Cơ chế tự động hồi máu thêm cọc mới (2/4, 3/4, 4/4) khi Boss chạm chấm vàng cuối cùng 25%
- Quân đoàn tu sĩ bắn phi kiếm tự do liên tục (0 sát thương, 1 draw call)
- Tự động khai trận đãi ngộ Top 1 - 5, tạm hoãn quà/bình luận cho đến khi khai ngộ xong
- Phân bố vị trí người chơi ngẫu nhiên tự do trên chiến trường, tự quay mặt về phía Boss
- Hệ thống âm thanh đa tầng Web Audio (tiếng gió rít, tiếng gầm Boss, nhạc nền Taiko BGM, tiếng chém kiếm, tiếng skill)`;

  const sha = await git.commit({
    fs,
    dir,
    message: commitMessage,
    author: {
      name: 'Developer',
      email: 'dev@local.workspace'
    }
  });

  console.log('✅ COMMIT SUCCESSFUL!');
  console.log('Commit SHA:', sha);

  // Print latest commit from log
  const commits = await git.log({ fs, dir, depth: 3 });
  console.log('\n--- Recent Commits ---');
  commits.forEach(c => {
    console.log(`- ${c.oid.substring(0, 7)}: ${c.commit.message.split('\n')[0]}`);
  });
}

main().catch(err => {
  console.error('Commit failed:', err);
  process.exit(1);
});
