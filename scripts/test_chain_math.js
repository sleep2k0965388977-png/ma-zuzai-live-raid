// Test chain curve points
function createChainPoints(start, end, sag = 1.2) {
  const mid = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2 - sag,
    (start[2] + end[2]) / 2
  ];
  return [start, mid, end];
}

const c1 = createChainPoints([-2.1, 4.6, -1.8], [-18, 6.2, -10], 1.4);
const c2 = createChainPoints([-2.2, 4.2, -1.5], [-18, 6.2, 7], 1.6);
const c3 = createChainPoints([2.1, 4.6, -1.8], [18, 6.2, -10], 1.4);
const c4 = createChainPoints([2.2, 4.2, -1.5], [18, 6.2, 7], 1.6);

console.log('Chain 1 (Left Top):', c1);
console.log('Chain 2 (Left Bottom):', c2);
console.log('Chain 3 (Right Top):', c3);
console.log('Chain 4 (Right Bottom):', c4);
