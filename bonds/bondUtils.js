export function calculateMidpoint(from, to) {
  return {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2,
  };
}
