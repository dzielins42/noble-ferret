import { TextureVisitor } from "../../util/Visitor";
import Texture from "./Texture";
import Tincture from "./Tincture";

abstract class VariationTexture implements Texture {
  abstract accept(visitor: TextureVisitor): void
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

export abstract class ParameterizedTwoPartVariationTexture extends TwoPartVariationTexture {
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
  accept(visitor: TextureVisitor): void {
    visitor.visitBarry(this)
  }
}

export class Paly extends ParameterizedTwoPartVariationTexture {
  accept(visitor: TextureVisitor): void {
    visitor.visitPaly(this)
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

  accept(visitor: TextureVisitor): void {
    visitor.visitBendy(this)
  }
}


export class Chequy extends ParameterizedTwoPartVariationTexture {
  accept(visitor: TextureVisitor): void {
    visitor.visitChequy(this)
  }
}

export class Lozengy extends ParameterizedTwoPartVariationTexture {
  accept(visitor: TextureVisitor): void {
    visitor.visitLozengy(this)
  }
}

export class Fusilly extends ParameterizedTwoPartVariationTexture {
  accept(visitor: TextureVisitor): void {
    visitor.visitFusilly(this)
  }
}

export class Ruste extends ParameterizedTwoPartVariationTexture {
  accept(visitor: TextureVisitor): void {
    visitor.visitRuste(this)
  }
}
