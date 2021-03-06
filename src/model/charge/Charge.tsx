import { ChargeVisitor, Visitable } from "../../util/Visitor";

export interface Charge extends Visitable<ChargeVisitor> { }

export class PositionedCharge implements Charge {
  constructor(
    readonly charge: Charge,
    readonly position: ChargePosition
  ) { }

  accept(visitor: ChargeVisitor): void {
    this.charge.accept(visitor)
  }
}

export enum ChargePosition {
  FIRST_QUARTER, SECOND_QUARTER, THIRD_QUARTER, FOURTH_QUARTER,
  DEXTER_CHIEF, DEXTER_FLANK, DEXTER_BASE,
  SINISTER_CHIEF, SINISTER_FLANK, SINISTER_BASE,
  MIDDLE_CHIEF, MIDDLE_BASE,
  FESS_POINT, HONOUR_POINT, NOMBRIL_POINT
}

export class EmptyCharge {
  accept(visitor: ChargeVisitor): void {
    // Do nothing
  }
}
