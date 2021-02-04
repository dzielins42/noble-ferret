import Tincture from './Tincture'

class MetalTincture implements Tincture {
  readonly colorHex: string

  constructor(colorHex: string) {
    this.colorHex = colorHex
  }
}

export default MetalTincture
