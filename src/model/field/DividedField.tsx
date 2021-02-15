import { FieldVisitor } from "../../util/Visitor";
import Texture from "../texture/Texture";
import Field from "./Field";

abstract class DividedField implements Field {
  abstract accept(visitor: FieldVisitor): void
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
  accept(visitor: FieldVisitor): void {
    visitor.visitPerFessDividedField(this)
  }
}

export class PerPaleDividedField extends TwoPartDividedField {
  accept(visitor: FieldVisitor): void {
    visitor.visitPerPaleDividedField(this)
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

  accept(visitor: FieldVisitor): void {
    visitor.visitPerBendDividedField(this)
  }
}

export class PerSaltireDividedField extends TwoPartDividedField {
  accept(visitor: FieldVisitor): void {
    visitor.visitPerSaltireDividedField(this)
  }
}

export class PerCrossDividedField extends TwoPartDividedField {
  accept(visitor: FieldVisitor): void {
    visitor.visitPerCrossDividedField(this)
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

  accept(visitor: FieldVisitor): void {
    visitor.visitPerChevronDividedField(this)
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

  accept(visitor: FieldVisitor): void {
    visitor.visitPerPallDividedField(this)
  }
}
