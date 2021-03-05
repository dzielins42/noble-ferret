import Point from "../../geometry/Point"
import { EscutcheonVisitor } from "../../util/Visitor"
import Escutcheon from "./Escutcheon"

class CircleEscutcheon extends Escutcheon {

  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly r: number
  ) {
    super()
  }

  get chief(): Point {
    return new Point(
      this.x + this.r, this.y
    )
  }
  get dexter(): Point {
    return new Point(
      this.x, this.y + this.r
    )
  }
  get sinister(): Point {
    return new Point(
      this.x + 2 * this.r, this.y + this.r
    )
  }
  get base(): Point {
    return new Point(
      this.x + this.r, this.y + 2 * this.r
    )
  }

  accept(visitor: EscutcheonVisitor): void {
    visitor.visitCircleEscutcheon(this)
  }
}

export default CircleEscutcheon
