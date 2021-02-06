class Rectangle {
  readonly top: number
  readonly left: number
  readonly bottom: number
  readonly right: number

  constructor(
    top: number,
    left: number,
    bottom: number,
    right: number
  ) {
    this.top = top
    this.left = left
    this.bottom = bottom
    this.right = right
  }

  width(): number {
    return this.right - this.left
  }

  height(): number {
    return this.bottom - this.top
  }

  centerHorizontal(): number {
    return this.left + this.width() / 2
  }

  centerVertical(): number {
    return this.top + this.height() / 2
  }
}

export default Rectangle
