import CrestPalette from '../../CrestPalette'
import { TinctureVisitor, Visitable } from '../../util/Visitor'
import Texture from './Texture'

export interface Tincture extends Texture { }

export function randomTincture(): Tincture {
  const values: Tincture[] = [
    OrTincture,
    ArgentTincture,
    GulesTincture,
    SableTincture,
    AzureTincture,
    VertTincture,
    PurpleTincture,
  ]

  return values[Math.floor(Math.random() * values.length)]
}

export class StandardTincture implements Tincture {
  constructor(readonly type: StandardTinctureType) { }

  accept(visitor: TinctureVisitor): void {
    visitor.visitStandardTincture(this)
  }

  getColorHex(palette: CrestPalette): string {
    switch (this.type) {
      case StandardTinctureType.OR:
        return palette.or
      case StandardTinctureType.ARGENT:
        return palette.argent
      case StandardTinctureType.GULES:
        return palette.gules
      case StandardTinctureType.SABLE:
        return palette.sable
      case StandardTinctureType.AZURE:
        return palette.azure
      case StandardTinctureType.VERT:
        return palette.vert
      case StandardTinctureType.PURPLE:
        return palette.purple
    }
  }
}

enum StandardTinctureType {
  // Metals
  OR, ARGENT,
  // Colors
  GULES, SABLE, AZURE, VERT, PURPLE
}

export const OrTincture =
  new StandardTincture(StandardTinctureType.OR)
export const ArgentTincture =
  new StandardTincture(StandardTinctureType.ARGENT)
export const GulesTincture =
  new StandardTincture(StandardTinctureType.GULES)
export const SableTincture =
  new StandardTincture(StandardTinctureType.SABLE)
export const AzureTincture =
  new StandardTincture(StandardTinctureType.AZURE)
export const VertTincture =
  new StandardTincture(StandardTinctureType.VERT)
export const PurpleTincture =
  new StandardTincture(StandardTinctureType.PURPLE)
