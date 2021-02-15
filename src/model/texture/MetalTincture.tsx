import { TextureVisitor } from '../../util/Visitor'
import Tincture from './Tincture'

class MetalTincture implements Tincture {
  readonly colorHex: string

  constructor(colorHex: string) {
    this.colorHex = colorHex
  }

  accept(visitor: TextureVisitor): void {
    throw new Error('Method not implemented.')
  }
}

export default MetalTincture
