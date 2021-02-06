import { CrestRenderer } from '../../CrestRenderer'
import Field from './Field'
import Texture from '../Texture'

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
