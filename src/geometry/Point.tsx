class Point {
  readonly x: number
  readonly y: number

  constructor(
    x: number,
    y: number
  ) {
    this.x = x
    this.y = y
  }

  static between(a: Point, b: Point): Point {
    return new Point(
      (a.x + b.x) / 2,
      (a.y + b.y) / 2
    )
  }
}

export default Point
