import { CrestRenderer } from '../../CrestRenderer'
import Tincture from './Tincture'

class ColorTincture implements Tincture {
  readonly colorHex: string

  constructor(colorHex: string) {
    this.colorHex = colorHex
  }

  accept(visitor: CrestRenderer): void {
    visitor.renderColorTincture(this)
  }
}

export default ColorTincture
