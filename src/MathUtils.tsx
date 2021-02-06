export const linear = (x1: number, y1: number, x2: number, y2: number) => {
  const a = (y2 - y1) / (x2 - x1)
  const b = y1 - x1 * a
  return function(x: number) {
    return x * a + b
  }
}
