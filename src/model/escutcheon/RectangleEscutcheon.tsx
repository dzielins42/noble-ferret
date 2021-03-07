import Point from "../../geometry/Point"
import { EscutcheonVisitor } from "../../util/Visitor"
import Escutcheon from "./Escutcheon"

class RectangleEscutcheon extends Escutcheon {

  constructor(
    private readonly w: number,
    private readonly h: number
  ) {
    super()
  }

  get chief(): Point {
    return new Point(
      0.5 * this.w, 0
    )
  }
  get dexter(): Point {
    return new Point(
      0, 0.5 * this.h
    )
  }
  get sinister(): Point {
    return new Point(
      this.w, 0.5 * this.h
    )
  }
  get base(): Point {
    return new Point(
      0.5 * this.w, this.h
    )
  }

  accept(visitor: EscutcheonVisitor): void {
    visitor.visitRectangleEscutcheon(this)
  }
}

export default RectangleEscutcheon
