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

  get width(): number {
    return this.right - this.left
  }

  get height(): number {
    return this.bottom - this.top
  }

  get centerHorizontal(): number {
    return this.left + this.width / 2
  }

  get centerVertical(): number {
    return this.top + this.height / 2
  }
}

export default Rectangle
