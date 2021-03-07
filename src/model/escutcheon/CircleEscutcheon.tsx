import Point from "../../geometry/Point"
import { EscutcheonVisitor } from "../../util/Visitor"
import Escutcheon from "./Escutcheon"

class CircleEscutcheon extends Escutcheon {

  constructor(
    private readonly r: number
  ) {
    super()
  }

  get chief(): Point {
    return new Point(
      this.r, 0
    )
  }
  get dexter(): Point {
    return new Point(
      0, this.r
    )
  }
  get sinister(): Point {
    return new Point(
      2 * this.r, this.r
    )
  }
  get base(): Point {
    return new Point(
      this.r, 2 * this.r
    )
  }

  accept(visitor: EscutcheonVisitor): void {
    visitor.visitCircleEscutcheon(this)
  }
}

export default CircleEscutcheon
