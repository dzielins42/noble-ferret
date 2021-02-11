import { CrestRenderer } from "../CrestRenderer";
import Visitable from "../Visitable";

export interface Charge extends Visitable<CrestRenderer> { }

export class PositionedCharge implements Charge {
  constructor(
    readonly charge: Charge,
    readonly position: ChargePosition
  ) { }

  accept(visitor: CrestRenderer): void {
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
