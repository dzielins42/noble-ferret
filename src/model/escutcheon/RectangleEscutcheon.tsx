import Point from "../../geometry/Point"
import Escutcheon from "./Escutcheon"

class RectangleEscutcheon extends Escutcheon {

  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly w: number,
    private readonly h: number
  ) {
    super()
  }

  get chief(): Point {
    return new Point(
      this.x + 0.5 * this.w, this.y
    )
  }
  get dexter(): Point {
    return new Point(
      this.x, this.y + 0.5 * this.h
    )
  }
  get sinister(): Point {
    return new Point(
      this.x + this.w, this.y + 0.5 * this.h
    )
  }
  get base(): Point {
    return new Point(
      this.x + 0.5 * this.w, this.y + this.h
    )
  }
}

export default RectangleEscutcheon
