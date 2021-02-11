import { CrestRenderer } from "../CrestRenderer";
import Visitable from "../Visitable";
import { Charge } from "./Charge";
import Texture from "./texture/Texture";

export abstract class Ordinary implements Visitable<CrestRenderer>  {
  constructor(
    readonly texture: Texture,
    readonly charges: Charge[] = []
  ) { }

  abstract accept(visitor: CrestRenderer): void
}

export class Pale extends Ordinary {
  accept(visitor: CrestRenderer): void {
    visitor.renderPale(this)
  }
}

export class Fess extends Ordinary {
  accept(visitor: CrestRenderer): void {
    visitor.renderFess(this)
  }
}

export class Cross extends Ordinary {
  accept(visitor: CrestRenderer): void {
    visitor.renderCross(this)
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

  accept(visitor: CrestRenderer): void {
    visitor.renderBend(this)
  }
}

export class Saltire extends Ordinary {
  accept(visitor: CrestRenderer): void {
    visitor.renderSaltire(this)
  }
}
