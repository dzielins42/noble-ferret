import Crest from './model/Crest'
import { PerBendDividedField, PerChevronDividedField, PerCrossDividedField, PerFessDividedField, PerPaleDividedField, PerPallDividedField, PerSaltireDividedField } from './model/field/DividedField'
import SolidField from './model/field/SolidField'
import { Billet, Lozenge, Mullet, Roundel } from './model/charge/MobileSubordinary'
import { Bend, Cross, Fess, Pale, Saltire } from './model/ordinary/Ordinary'
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, Ruste } from './model/texture/VariationTexture'
import { ChargeVisitor, CrestVisitor, FieldVisitor, OrdinaryVisitor, TextureVisitor, TinctureVisitor, Visitable } from './util/Visitor'
import { InBend, InFess, InPale } from './model/charge/GroupCharge'
import { StandardTincture } from './model/texture/Tincture'
import CrestPalette from './CrestPalette'

export abstract class CrestRenderer
  implements CrestVisitor, FieldVisitor, TextureVisitor, ChargeVisitor, OrdinaryVisitor {

  protected readonly viewportWidth: number
  protected readonly viewportHeight: number

  constructor(
    viewportWidth: number,
    viewportHeight: number,
    protected readonly crestPalette: CrestPalette
  ) {
    console.log("CrestRenderer", viewportWidth, viewportHeight)
    this.viewportWidth = viewportWidth
    this.viewportHeight = viewportHeight
  }

  protected value: React.ReactNode = null

  render(
    visitable: Visitable<Renderable>
  ): React.ReactNode {
    visitable.accept(this)
    return this.value
  }

  abstract visitCrest(crest: Crest): void

  abstract visitSolidField(field: SolidField): void
  abstract visitPerFessDividedField(field: PerFessDividedField): void
  abstract visitPerPaleDividedField(field: PerPaleDividedField): void
  abstract visitPerBendDividedField(field: PerBendDividedField): void
  abstract visitPerSaltireDividedField(field: PerSaltireDividedField): void
  abstract visitPerCrossDividedField(field: PerCrossDividedField): void
  abstract visitPerChevronDividedField(field: PerChevronDividedField): void
  abstract visitPerPallDividedField(field: PerPallDividedField): void

  abstract visitStandardTincture(standardTincture: StandardTincture): void
  abstract visitBarry(barry: Barry): void
  abstract visitPaly(paly: Paly): void
  abstract visitBendy(bendy: Bendy): void
  abstract visitChequy(chequy: Chequy): void
  abstract visitLozengy(lozengy: Lozengy): void
  abstract visitFusilly(fusilly: Fusilly): void
  abstract visitRuste(ruste: Ruste): void

  abstract visitRoundel(roundel: Roundel): void
  abstract visitBillet(billet: Billet): void
  abstract visitLozenge(lozenge: Lozenge): void
  abstract visitMullet(mullet: Mullet): void
  abstract visitInFess(inFess: InFess): void
  abstract visitInPale(inPale: InPale): void
  abstract visitInBend(inBend: InBend): void

  abstract visitPale(pale: Pale): void
  abstract visitFess(fess: Fess): void
  abstract visitCross(cross: Cross): void
  abstract visitBend(bend: Bend): void
  abstract visitSaltire(saltire: Saltire): void
}

export type Renderable = CrestVisitor | FieldVisitor | TinctureVisitor | TextureVisitor | ChargeVisitor | OrdinaryVisitor
