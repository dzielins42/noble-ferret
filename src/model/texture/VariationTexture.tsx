import { CrestRenderer } from "../../CrestRenderer";
import Texture from "./Texture";
import Tincture from "./Tincture";

abstract class VariationTexture implements Texture {
  abstract accept(visitor: CrestRenderer): void
}

abstract class TwoPartVariationTexture extends VariationTexture {
  readonly tincture1: Tincture
  readonly tincture2: Tincture

  constructor(
    tincture1: Tincture,
    tincture2: Tincture
  ) {
    super()
    this.tincture1 = tincture1
    this.tincture2 = tincture2
  }
}

abstract class ParameterizedTwoPartVariationTexture extends TwoPartVariationTexture {
  readonly count: number

  constructor(
    tincture1: Tincture,
    tincture2: Tincture,
    count: number = 6
  ) {
    super(tincture1, tincture2)
    this.count = count
  }
}

export class Barry extends ParameterizedTwoPartVariationTexture {
  accept(visitor: CrestRenderer): void {
    visitor.renderBarry(this)
  }
}

export class Paly extends ParameterizedTwoPartVariationTexture {
  accept(visitor: CrestRenderer): void {
    visitor.renderPaly(this)
  }
}

export class Bendy extends ParameterizedTwoPartVariationTexture {
  readonly sinister: boolean

  constructor(
    tincture1: Tincture,
    tincture2: Tincture,
    count: number = 3,
    sinister: boolean = false
  ) {
    super(tincture1, tincture2, count)
    this.sinister = sinister
  }

  accept(visitor: CrestRenderer): void {
    visitor.renderBendy(this)
  }
}


export class Chequy extends ParameterizedTwoPartVariationTexture {
  accept(visitor: CrestRenderer): void {
    visitor.renderChequy(this)
  }
}

export class Lozengy extends ParameterizedTwoPartVariationTexture {
  accept(visitor: CrestRenderer): void {
    visitor.renderLozengy(this)
  }
}

export class Fusilly extends ParameterizedTwoPartVariationTexture {
  accept(visitor: CrestRenderer): void {
    visitor.renderFusilly(this)
  }
}

export class Ruste extends ParameterizedTwoPartVariationTexture {
  accept(visitor: CrestRenderer): void {
    visitor.renderRuste(this)
  }
}