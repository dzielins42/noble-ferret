import { CrestRenderer } from "../CrestRenderer"
import Visitable from "../Visitable"
import Field from "./field/Field"
import { Ordinary } from "./Ordinary"

class Crest implements Visitable<CrestRenderer> {
  readonly field: Field
  readonly ordinaries: Ordinary[]

  constructor(
    field: Field,
    ordinaries: Ordinary[] = []
  ) {
    this.field = field
    this.ordinaries = ordinaries
  }

  accept(visitor: CrestRenderer): void {
    visitor.renderCrest(this)
  }
}

export default Crest
