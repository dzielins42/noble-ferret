import ContextPathDrawer from "../../ContextPathDrawer";
import Point from "../../geometry/Point";
import Escutcheon from "./Escutcheon";

class HeaterEscutcheon extends Escutcheon {
  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly unitSize: number
  ) {
    super()
  }

  get chief(): Point {
    return new Point(
      this.x + 1.5 * this.unitSize,
      this.y
    )
  }
  get dexter(): Point {
    return new Point(
      this.x,
      this.y + 2 * this.unitSize
    )
  }
  get sinister(): Point {
    return new Point(
      this.x + 3 * this.unitSize,
      this.y + 2 * this.unitSize
    )
  }
  get base(): Point {
    return new Point(
      this.x + 1.5 * this.unitSize,
      this.y + (1 + Math.sqrt(6.75)) * this.unitSize
    )
  }
  get dexterBase(): Point {
    return new Point(
      // Exact point
      this.x + (3 - this.P) * this.unitSize,
      this.y + (this.P) * this.unitSize
      // Simple point
      //this.x,
      //this.y + 3 * this.unitSize
    )
  }
  get sinisterBase(): Point {
    return new Point(
      // Exact point
      this.x + (this.P) * this.unitSize,
      this.y + (this.P) * this.unitSize
      // Simple point
      //this.x + 3 * this.unitSize,
      //this.y + 3 * this.unitSize
    )
  }
  get fessPoint(): Point {
    return new Point(
      this.x + 1.5 * this.unitSize,
      this.y + 1.5 * this.unitSize,
    )
  }

  private readonly P = (2 + Math.sqrt(68)) / 4

  accept(visitor: ContextPathDrawer): void {
    visitor.visitHeaterEscutcheon(this)
  }
}

export default HeaterEscutcheon
