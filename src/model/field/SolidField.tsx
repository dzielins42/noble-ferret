import { FieldVisitor } from '../../util/Visitor'
import Texture from '../texture/Texture'
import Field from './Field'

class SolidField implements Field {
  readonly texture: Texture

  constructor(texture: Texture) {
    this.texture = texture
  }

  accept(visitor: FieldVisitor): void {
    visitor.visitSolidField(this)
  }
}


export default SolidField
