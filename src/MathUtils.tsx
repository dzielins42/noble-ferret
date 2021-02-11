import Point from "./geometry/Point"

export const linear = (x1: number, y1: number, x2: number, y2: number) => {
  const a = (y2 - y1) / (x2 - x1)
  const b = y1 - x1 * a
  return function(x: number) {
    return x * a + b
  }
}

export const linearP = (p1: Point, p2: Point) => {
  const a = (p2.y - p1.y) / (p2.x - p1.x)
  const b = p1.y - p1.x * a
  return function(x: number) {
    return x * a + b
  }
}

export const slope = (f: (arg: number) => number) => {
  const b = f(0)
  const a = (f(1) - b) / 1
  return Math.atan(a)
}
