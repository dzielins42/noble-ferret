import Point from "../../geometry/Point";
import { EscutcheonVisitor } from "../../util/Visitor";
import Escutcheon from "./Escutcheon";

class HeaterEscutcheon extends Escutcheon {
  constructor(
    private readonly unitSize: number
  ) {
    super()
  }

  get chief(): Point {
    return new Point(
      1.5 * this.unitSize,
      0
    )
  }
  get dexter(): Point {
    return new Point(
      0,
      2 * this.unitSize
    )
  }
  get sinister(): Point {
    return new Point(
      3 * this.unitSize,
      2 * this.unitSize
    )
  }
  get base(): Point {
    return new Point(
      1.5 * this.unitSize,
      (1 + Math.sqrt(6.75)) * this.unitSize
    )
  }
  get dexterBase(): Point {
    return new Point(
      // Exact point
      (3 - this.P) * this.unitSize,
      (this.P) * this.unitSize
      // Simple point
      //this.x,
      //this.y + 3 * this.unitSize
    )
  }
  get sinisterBase(): Point {
    return new Point(
      // Exact point
      (this.P) * this.unitSize,
      (this.P) * this.unitSize
      // Simple point
      //this.x + 3 * this.unitSize,
      //this.y + 3 * this.unitSize
    )
  }
  get fessPoint(): Point {
    return new Point(
      1.5 * this.unitSize,
      1.5 * this.unitSize,
    )
  }

  private readonly P = (2 + Math.sqrt(68)) / 4

  accept(visitor: EscutcheonVisitor): void {
    visitor.visitHeaterEscutcheon(this)
  }
}

export default HeaterEscutcheon
