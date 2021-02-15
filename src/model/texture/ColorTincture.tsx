import { TextureVisitor } from '../../util/Visitor'
import Tincture from './Tincture'

class ColorTincture implements Tincture {
  readonly colorHex: string

  constructor(colorHex: string) {
    this.colorHex = colorHex
  }

  accept(visitor: TextureVisitor): void {
    visitor.visitColorTincture(this)
  }
}

export default ColorTincture
