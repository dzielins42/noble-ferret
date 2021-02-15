import { ChargeVisitor } from "../../util/Visitor";
import { Charge } from "./Charge";

abstract class GroupCharge implements Charge {
  constructor(
    readonly charges: Charge[]
  ) { }

  abstract accept(visitor: ChargeVisitor): void
}

export class InFess extends GroupCharge {
  accept(visitor: ChargeVisitor): void {
    visitor.visitInFess(this)
  }
}

export class InPale extends GroupCharge {
  accept(visitor: ChargeVisitor): void {
    visitor.visitInPale(this)
  }
}

export class InBend extends GroupCharge {
  constructor(
    charges: Charge[],
    readonly sinister: boolean = false
  ) {
    super(charges)
  }

  accept(visitor: ChargeVisitor): void {
    visitor.visitInBend(this)
  }
}
