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

  distance(other: Point): number {
    return Math.sqrt(
      (this.x - other.x) * (this.x - other.x)
      +
      (this.y - other.y) * (this.y - other.y)
    )
  }

  distanceX(other: Point): number {
    return Math.abs(this.x - other.x)
  }

  distanceY(other: Point): number {
    return Math.abs(this.y - other.y)
  }
}

export default Point
