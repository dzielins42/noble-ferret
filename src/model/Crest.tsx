import { CrestVisitor, Visitable } from "../util/Visitor"
import Field from "./field/Field"
import { Ordinary } from "./ordinary/Ordinary"

class Crest implements Visitable<CrestVisitor> {
  readonly field: Field
  readonly ordinaries: Ordinary[]

  constructor(
    field: Field,
    ordinaries: Ordinary[] = []
  ) {
    this.field = field
    this.ordinaries = ordinaries
  }

  accept(visitor: CrestVisitor): void {
    visitor.visitCrest(this)
  }
}

export default Crest
