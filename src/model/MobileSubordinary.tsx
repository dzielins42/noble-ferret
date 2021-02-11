import { CrestRenderer } from "../CrestRenderer";
import { Charge } from "./Charge";
import LozengeType from "./LozengeType";
import Tincture from "./texture/Tincture";

abstract class MobileSubordinary implements Charge {
  constructor(
    readonly tincture: Tincture
  ) { }

  abstract accept(visitor: CrestRenderer): void
}

export class Roundel extends MobileSubordinary {
  accept(visitor: CrestRenderer): void {
    visitor.renderRoundel(this)
  }
}

export class Billet extends MobileSubordinary {
  accept(visitor: CrestRenderer): void {
    visitor.renderBillet(this)
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

  accept(visitor: CrestRenderer): void {
    visitor.renderLozenge(this)
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

  accept(visitor: CrestRenderer): void {
    visitor.renderMullet(this)
  }
}
