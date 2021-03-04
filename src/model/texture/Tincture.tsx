import CrestPalette from '../../CrestPalette'
import { TextureVisitor } from '../../util/Visitor'
import Texture from './Texture'

export interface Tincture extends Texture { }

abstract class HexTincture implements Tincture {
  constructor(readonly colorHex: string) { }

  abstract accept(visitor: TextureVisitor): void
}

export class ColorTincture extends HexTincture {
  accept(visitor: TextureVisitor): void {
    visitor.visitColorTincture(this)
  }
}

export class MetalTincture extends HexTincture {
  accept(visitor: TextureVisitor): void {
    visitor.visitMetalTincture(this)
  }
}

export class FurTincture implements Tincture {

  accept(visitor: TextureVisitor): void {
    throw new Error('Method not implemented.')
  }
}

export function randomTincture(palette: CrestPalette): Tincture {
  const values: Tincture[] = [
    new MetalTincture(palette.or),
    new MetalTincture(palette.azure),
    new ColorTincture(palette.gules),
    new ColorTincture(palette.sable),
    new ColorTincture(palette.azure),
    new ColorTincture(palette.vert),
    new ColorTincture(palette.purple),
  ]

  return values[Math.floor(Math.random() * values.length)]
}
