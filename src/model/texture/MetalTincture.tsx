import { CrestRenderer } from '../../CrestRenderer'
import Tincture from './Tincture'

class MetalTincture implements Tincture {
  readonly colorHex: string

  constructor(colorHex: string) {
    this.colorHex = colorHex
  }

  accept(visitor: CrestRenderer): void {
    throw new Error('Method not implemented.')
  }
}

export default MetalTincture
