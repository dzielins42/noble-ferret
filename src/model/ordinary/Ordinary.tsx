import { OrdinaryVisitor, Visitable } from "../../util/Visitor"
import { Charge } from "../charge/Charge"
import Texture from "../texture/Texture"

export abstract class Ordinary implements Visitable<OrdinaryVisitor> {
  constructor(
    readonly texture: Texture,
    readonly charges: Charge[] = []
  ) { }

  abstract accept(visitor: OrdinaryVisitor): void
}

export class Pale extends Ordinary {
  accept(visitor: OrdinaryVisitor): void {
    visitor.visitPale(this)
  }
}

export class Fess extends Ordinary {
  accept(visitor: OrdinaryVisitor): void {
    visitor.visitFess(this)
  }
}

export class Cross extends Ordinary {
  accept(visitor: OrdinaryVisitor): void {
    visitor.visitCross(this)
  }
}

export class Bend extends Ordinary {
  readonly sinister: boolean

  constructor(
    texture: Texture,
    charges: Charge[] = [],
    sinister: boolean = false
  ) {
    super(texture, charges)
    this.sinister = sinister
  }

  accept(visitor: OrdinaryVisitor): void {
    visitor.visitBend(this)
  }
}

export class Saltire extends Ordinary {
  accept(visitor: OrdinaryVisitor): void {
    visitor.visitSaltire(this)
  }
}
