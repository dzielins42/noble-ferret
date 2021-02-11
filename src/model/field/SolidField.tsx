import { CrestRenderer } from '../../CrestRenderer'
import Texture from '../texture/Texture'
import Field from './Field'

class SolidField implements Field {
  readonly texture: Texture

  constructor(texture: Texture) {
    this.texture = texture
  }

  accept(visitor: CrestRenderer): void {
    visitor.renderSolidField(this)
  }
}


export default SolidField
