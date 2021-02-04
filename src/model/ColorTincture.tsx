import Tincture from './Tincture'

class ColorTincture implements Tincture {
  readonly colorHex: string

  constructor(colorHex: string) {
    this.colorHex = colorHex
  }
}

export default ColorTincture
