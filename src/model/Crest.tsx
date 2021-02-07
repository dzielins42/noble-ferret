import { CrestRenderer } from "../CrestRenderer"
import Visitable from "../Visitable"
import Field from "./field/Field"

class Crest implements Visitable<CrestRenderer> {
  readonly field: Field

  constructor(
    field: Field
  ) {
    this.field = field
  }

  accept(visitor: CrestRenderer): void {
    visitor.renderCrest(this)
  }
}

export default Crest
