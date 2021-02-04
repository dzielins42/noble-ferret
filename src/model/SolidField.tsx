import Field from './Field'
import Texture from './Texture'

class SolidField implements Field {
  readonly texture: Texture

  constructor(texture: Texture) {
    this.texture = texture
  }
}


export default SolidField
