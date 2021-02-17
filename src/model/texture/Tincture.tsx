import CrestPalette from '../../CrestPalette'
import ColorTincture from './ColorTincture'
import Texture from './Texture'

interface Tincture extends Texture { }

export function randomTincture(palette: CrestPalette): Tincture {
  const values: Tincture[] = [
    // Or
    // Argent
    new ColorTincture(palette.gules),
    new ColorTincture(palette.sable),
    new ColorTincture(palette.azure),
    new ColorTincture(palette.vert),
    new ColorTincture(palette.purple),
  ]

  return values[Math.floor(Math.random() * values.length)]
}

export default Tincture
