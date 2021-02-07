import ColorTincture from './model/ColorTincture'
import Crest from './model/Crest'
import { PerBendDividedField, PerChevronDividedField, PerCrossDividedField, PerFessDividedField, PerPaleDividedField, PerPallDividedField, PerSaltireDividedField } from './model/field/DividedField'
import SolidField from './model/field/SolidField'
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, Ruste } from './model/VariationTexture'
import Visitable from './Visitable'

export abstract class CrestRenderer {

  protected readonly viewportWidth: number
  protected readonly viewportHeight: number

  constructor(viewportWidth: number, viewportHeight: number) {
    this.viewportWidth = viewportWidth
    this.viewportHeight = viewportHeight
  }

  protected value: React.ReactNode = null

  render(visitable: Visitable<CrestRenderer>): React.ReactNode {
    visitable.accept(this)
    return this.value
  }

  abstract renderCrest(crest: Crest): void
  // Field
  abstract renderSolidField(solidField: SolidField): void
  abstract renderPerFessDividedField(field: PerFessDividedField): void
  abstract renderPerPaleDividedField(field: PerPaleDividedField): void
  abstract renderPerBendDividedField(field: PerBendDividedField): void
  abstract renderPerSaltireDividedField(field: PerSaltireDividedField): void
  abstract renderPerCrossDividedField(field: PerCrossDividedField): void
  abstract renderPerChevronDividedField(field: PerChevronDividedField): void
  abstract renderPerPallDividedField(field: PerPallDividedField): void
  // Variation
  abstract renderBarry(barry: Barry): void
  abstract renderPaly(paly: Paly): void
  abstract renderBendy(bendy: Bendy): void
  abstract renderChequy(chequy: Chequy): void
  abstract renderLozengy(lozengy: Lozengy): void
  abstract renderFusilly(fusilly: Fusilly): void
  abstract renderRuste(ruste: Ruste): void

  abstract renderColorTincture(colorTincture: ColorTincture): void
}
