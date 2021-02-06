import { CrestRenderer } from "../../CrestRenderer";
import Texture from "../Texture";
import Field from "./Field";

abstract class DividedField implements Field {
  abstract accept(visitor: CrestRenderer): void
}

abstract class TwoPartDividedField extends DividedField {
  readonly texture1: Texture
  readonly texture2: Texture

  constructor(texture1: Texture, texture2: Texture) {
    super()
    this.texture1 = texture1
    this.texture2 = texture2
  }
}

abstract class ThreePartDividedField extends DividedField {
  readonly texture1: Texture
  readonly texture2: Texture
  readonly texture3: Texture

  constructor(
    texture1: Texture,
    texture2: Texture,
    texture3: Texture
  ) {
    super()
    this.texture1 = texture1
    this.texture2 = texture2
    this.texture3 = texture3
  }
}

export class PerFessDividedField extends TwoPartDividedField {
  accept(visitor: CrestRenderer): void {
    visitor.renderPerFessDividedField(this)
  }
}

export class PerPaleDividedField extends TwoPartDividedField {
  accept(visitor: CrestRenderer): void {
    visitor.renderPerPaleDividedField(this)
  }
}

export class PerBendDividedField extends TwoPartDividedField {
  readonly sinister: boolean

  constructor(
    texture1: Texture,
    texture2: Texture,
    sinister: boolean = false
  ) {
    super(texture1, texture2)
    this.sinister = sinister
  }

  accept(visitor: CrestRenderer): void {
    visitor.renderPerBendDividedField(this)
  }
}

export class PerSaltireDividedField extends TwoPartDividedField {
  accept(visitor: CrestRenderer): void {
    visitor.renderPerSaltireDividedField(this)
  }
}

export class PerCrossDividedField extends TwoPartDividedField {
  accept(visitor: CrestRenderer): void {
    visitor.renderPerCrossDividedField(this)
  }
}

export class PerChevronDividedField extends TwoPartDividedField {
  readonly inverted: boolean

  constructor(
    texture1: Texture,
    texture2: Texture,
    inverted: boolean = false
  ) {
    super(texture1, texture2)
    this.inverted = inverted
  }

  accept(visitor: CrestRenderer): void {
    visitor.renderPerChevronDividedField(this)
  }
}

export class PerPallDividedField extends ThreePartDividedField {
  readonly inverted: boolean

  constructor(
    texture1: Texture,
    texture2: Texture,
    texture3: Texture,
    inverted: boolean = false
  ) {
    super(texture1, texture2, texture3)
    this.inverted = inverted
  }

  accept(visitor: CrestRenderer): void {
    visitor.renderPerPallDividedField(this)
  }
}
