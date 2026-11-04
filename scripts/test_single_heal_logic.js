const fs = require('fs');
const path = require('path');

// Simulate the damage logic directly
function createTestGame() {
  const state = {
    hp: 100000,
    maxHp: 100000,
    phase: 1,
    bossHealed: false,
    defeated: false,
    failed: false,
    combo: 0,
    players: [],
    logs: []
  };

  function log(msg, type) {
    state.logs.push({ msg, type });
  }

  function damage(e, t = "Đội hình") {
    if (state.defeated || state.failed) return;
    const n = Math.min(e, state.hp);
    state.hp -= n;
    state.lastDamage = n;
    state.lastAttacker = t;
    state.combo++;

    const threshold = state.maxHp * 0.25; // Chấm vàng cuối cùng khoanh đỏ (25% = 25.000 HP)
    const midPoint = state.maxHp * 0.5;   // Ô vàng ở giữa khung xanh (50% = 50.000 HP)

    // 1 TRẬN ĐẤU 1 TIẾNG CHỈ HỒI MÁU ĐÚNG 1 LẦN: Khi chạm chấm vàng cuối cùng (<= 25%), boss tự hồi máu chạm ô vàng ở giữa (50%)
    if (state.hp <= threshold && !state.bossHealed) {
      state.bossHealed = true;
      state.phase = 2;
      state.hp = midPoint;
      log("🛡️ MA TÔN XUỐNG CHẤM VÀNG CUỐI CÙNG: TỰ ĐỘNG HỒI MÁU LÊN Ô VÀNG Ở GIỮA (50%) - DUY NHẤT 1 LẦN TRONG TRẬN!", "boss");
    } else if (state.bossHealed && state.hp <= 0) {
      state.hp = 0;
      state.defeated = true;
      log("🎉 MA TÔN ĐÃ BỊ ĐÁNH BẠI HOÀN TOÀN! CHIẾN THẮNG!", "win");
    } else if (!state.bossHealed && state.hp <= 0) {
      state.bossHealed = true;
      state.phase = 2;
      state.hp = midPoint;
      log("🛡️ MA TÔN CHỊU ĐÒN CỰC ĐẠI: KÍCH HOẠT HỒI THỂ DUY NHẤT LÊN Ô VÀNG Ở GIỮA (50%)!", "boss");
    }
  }

  function reset() {
    state.hp = 100000;
    state.maxHp = 100000;
    state.phase = 1;
    state.bossHealed = false;
    state.defeated = false;
    state.failed = false;
    state.combo = 0;
    state.logs = [];
  }

  return { state, damage, reset };
}

const game = createTestGame();
console.log('--- TEST 1: Initial State ---');
console.log('HP:', game.state.hp, 'Phase:', game.state.phase, 'BossHealed:', game.state.bossHealed);
if (game.state.hp !== 100000 || game.state.bossHealed !== false) throw new Error('Test 1 failed');

console.log('--- TEST 2: Deal damage down to 30.000 (above 25% threshold) ---');
game.damage(70000);
console.log('HP:', game.state.hp, 'Phase:', game.state.phase, 'BossHealed:', game.state.bossHealed);
if (game.state.hp !== 30000 || game.state.bossHealed !== false) throw new Error('Test 2 failed');

console.log('--- TEST 3: Deal 10.000 damage to drop to 20.000 (triggers threshold <= 25.000) ---');
game.damage(10000);
console.log('HP:', game.state.hp, 'Phase:', game.state.phase, 'BossHealed:', game.state.bossHealed);
if (game.state.hp !== 50000 || game.state.bossHealed !== true || game.state.phase !== 2) {
  throw new Error('Test 3 failed: HP should be 50.000 (midPoint) and bossHealed true');
}
console.log('Log message:', game.state.logs[game.state.logs.length - 1].msg);

console.log('--- TEST 4: Deal damage from 50.000 down through 25.000 to 10.000 (should NOT heal again) ---');
game.damage(30000);
console.log('HP:', game.state.hp, 'Phase:', game.state.phase, 'BossHealed:', game.state.bossHealed);
if (game.state.hp !== 20000 || game.state.bossHealed !== true) {
  throw new Error('Test 4 failed: HP should be 20.000 and should not heal again');
}

console.log('--- TEST 5: Finish boss with 25.000 damage ---');
game.damage(25000);
console.log('HP:', game.state.hp, 'Defeated:', game.state.defeated);
if (game.state.hp !== 0 || game.state.defeated !== true) throw new Error('Test 5 failed');

console.log('--- TEST 6: Reset for new match ---');
game.reset();
console.log('HP:', game.state.hp, 'Phase:', game.state.phase, 'BossHealed:', game.state.bossHealed);
if (game.state.hp !== 100000 || game.state.bossHealed !== false) throw new Error('Test 6 failed');

console.log('\nAll test cases PASSED perfectly!');
