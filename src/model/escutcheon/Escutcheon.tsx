import Point from "../../geometry/Point"
import Rectangle from "../../geometry/Rectangle"
import { linearP } from "../../MathUtils"

abstract class Escutcheon {

  abstract get chief(): Point
  abstract get dexter(): Point
  abstract get sinister(): Point
  abstract get base(): Point

  get dexterChief(): Point {
    return new Point(
      this.dexter.x,
      this.chief.y
    )
  }

  get middleChief(): Point {
    return new Point(
      Point.between(this.dexter, this.sinister).x,
      this.chief.y
    )
  }

  get middleBase(): Point {
    return new Point(
      Point.between(this.dexter, this.sinister).x,
      this.base.y
    )
  }

  get sinisterChief(): Point {
    return new Point(this.sinister.x, this.chief.y)
  }

  get honourPoint(): Point {
    return Point.between(
      this.middleChief,
      this.fessPoint
    )
  }

  get fessPoint(): Point {
    return new Point(
      Point.between(this.dexter, this.sinister).x,
      Point.between(this.chief, this.base).y
    )
  }

  get nombrilPoint(): Point {
    return new Point(
      Point.between(this.dexter, this.sinister).x,
      Point.between(this.honourPoint, this.base).y
    )
  }

  get dexterBase(): Point {
    return new Point(
      this.dexter.x,
      this.base.y
    )
  }

  get sinisterBase(): Point {
    return new Point(
      this.sinister.x,
      this.base.y
    )
  }

  get bounds(): Rectangle {
    return new Rectangle(
      this.chief.y,
      this.dexter.x,
      this.base.y,
      this.sinister.x
    )
  }

  get bendFunction() {
    return linearP(
      this.dexterChief, this.sinisterBase
    )
  }

  get bendSinisterFunction() {
    return linearP(
      this.sinisterChief, this.dexterBase
    )
  }

  get fessHeight(): number {
    return this.bounds.height * this.T
  }

  get paleWidth(): number {
    return this.bounds.width * this.T
  }

  private readonly T: number = 0.25
}

export default Escutcheon
