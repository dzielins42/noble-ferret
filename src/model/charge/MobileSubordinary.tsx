import { ChargeVisitor } from "../../util/Visitor";
import LozengeType from "../LozengeType";
import { Tincture } from "../texture/Tincture";
import { Charge } from "./Charge";

abstract class MobileSubordinary implements Charge {
  constructor(
    readonly tincture: Tincture
  ) { }

  abstract accept(visitor: ChargeVisitor): void
}

export class Roundel extends MobileSubordinary {
  accept(visitor: ChargeVisitor): void {
    visitor.visitRoundel(this)
  }
}

export class Billet extends MobileSubordinary {
  accept(visitor: ChargeVisitor): void {
    visitor.visitBillet(this)
  }
}

export class Lozenge extends MobileSubordinary {
  constructor(
    tincture: Tincture,
    readonly type: LozengeType = LozengeType.Normal,
    readonly ratio: number = 1
  ) {
    super(tincture)
  }

  accept(visitor: ChargeVisitor): void {
    visitor.visitLozenge(this)
  }
}

export class Mullet extends MobileSubordinary {
  constructor(
    tincture: Tincture,
    readonly points: number = 5,
    readonly pierced: boolean = false
  ) {
    super(tincture)
  }

  accept(visitor: ChargeVisitor): void {
    visitor.visitMullet(this)
  }
}
