// Test chain builder logic
function testChain() {
  const chains = [
    // Left Top Pillar: [-18, 6.2, -10]
    [[-2.1, 4.6, -1.8], [-9.8, 3.8, -5.8], [-18, 6.2, -10]],
    // Left Bottom Pillar: [-18, 6.2, 7]
    [[-2.2, 4.2, -1.5], [-9.8, 3.2, 2.8], [-18, 6.2, 7]],
    // Right Top Pillar: [18, 6.2, -10]
    [[2.1, 4.6, -1.8], [9.8, 3.8, -5.8], [18, 6.2, -10]],
    // Right Bottom Pillar: [18, 6.2, 7]
    [[2.2, 4.2, -1.5], [9.8, 3.2, 2.8], [18, 6.2, 7]]
  ];

  console.log('4 Chains configured:');
  chains.forEach((pts, idx) => {
    console.log(`Chain ${idx + 1}: Start (${pts[0]}), Mid (${pts[1]}), End (${pts[2]})`);
  });
}
testChain();
