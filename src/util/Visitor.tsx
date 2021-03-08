import Crest from "../model/Crest";
import HeaterEscutcheon from "../model/escutcheon/HeaterEscutcheon";
import RectangleEscutcheon from "../model/escutcheon/RectangleEscutcheon";
import { PerBendDividedField, PerChevronDividedField, PerCrossDividedField, PerFessDividedField, PerPaleDividedField, PerPallDividedField, PerSaltireDividedField } from "../model/field/DividedField";
import SolidField from "../model/field/SolidField";
import { Billet, Lozenge, Mullet, Roundel } from "../model/charge/MobileSubordinary";
import { Bend, Cross, Fess, Ordinary, Pale, Saltire } from "../model/ordinary/Ordinary";
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, Ruste } from "../model/texture/VariationTexture";
import { InBend, InFess, InPale } from "../model/charge/GroupCharge";
import { StandardTincture } from "../model/texture/Tincture";
import CircleEscutcheon from "../model/escutcheon/CircleEscutcheon";
import Texture from "../model/texture/Texture";
import { Charge } from "../model/charge/Charge";

/*export interface Visitor extends
  CrestVisitor, ChargeVisitor, FieldVisitor, EscutcheonVisitor, TextureVisitor, OrdinaryVisitor {

}*/

export interface CrestVisitor {
  visitCrest(crest: Crest): void
}

export interface FieldVisitor {
  visitSolidField(field: SolidField): void
  visitPerFessDividedField(field: PerFessDividedField): void
  visitPerPaleDividedField(field: PerPaleDividedField): void
  visitPerBendDividedField(field: PerBendDividedField): void
  visitPerSaltireDividedField(field: PerSaltireDividedField): void
  visitPerCrossDividedField(field: PerCrossDividedField): void
  visitPerChevronDividedField(field: PerChevronDividedField): void
  visitPerPallDividedField(field: PerPallDividedField): void
}

export interface EscutcheonVisitor {
  visitHeaterEscutcheon(escutcheon: HeaterEscutcheon): void
  visitRectangleEscutcheon(escutcheon: RectangleEscutcheon): void
  visitCircleEscutcheon(escutcheon: CircleEscutcheon): void
}

export interface OrdinaryVisitor {
  visitPale(pale: Pale): void
  visitFess(fess: Fess): void
  visitCross(cross: Cross): void
  visitBend(bend: Bend): void
  visitSaltire(saltire: Saltire): void
}

export interface ChargeVisitor {
  // Mobile subordinary
  visitRoundel(roundel: Roundel): void
  visitBillet(billet: Billet): void
  visitLozenge(lozenge: Lozenge): void
  visitMullet(mullet: Mullet): void
  // Group
  visitInFess(inFess: InFess): void
  visitInPale(inPale: InPale): void
  visitInBend(inBend: InBend): void
}

export interface TinctureVisitor {
  visitStandardTincture(standardTincture: StandardTincture): void
}

export interface TextureVisitor extends TinctureVisitor {
  visitBarry(barry: Barry): void
  visitPaly(paly: Paly): void
  visitBendy(bendy: Bendy): void
  visitChequy(chequy: Chequy): void
  visitLozengy(lozengy: Lozengy): void
  visitFusilly(fusilly: Fusilly): void
  visitRuste(ruste: Ruste): void
}

export abstract class BaseTextureVisitor implements TextureVisitor {
  visitStandardTincture(standardTincture: StandardTincture): void { }
  visitBarry(barry: Barry): void { }
  visitPaly(paly: Paly): void { }
  visitBendy(bendy: Bendy): void { }
  visitChequy(chequy: Chequy): void { }
  visitLozengy(lozengy: Lozengy): void { }
  visitFusilly(fusilly: Fusilly): void { }
  visitRuste(ruste: Ruste): void { }
}

export interface Visitable<VISITOR_TYPE> {
  accept(visitor: VISITOR_TYPE): void;
}

export class CloneOrdinaryVisitor implements OrdinaryVisitor {

  private result!: Ordinary

  private texture!: Texture;
  private charges!: Charge[];

  clone(
    ordinary: Ordinary,
    texture: Texture = ordinary.texture,
    charges: Charge[] = ordinary.charges
  ): Ordinary {
    this.texture = texture
    this.charges = charges

    ordinary.accept(this)

    return this.result
  }

  visitPale(pale: Pale): void {
    this.result = new Pale(this.texture, this.charges)
  }
  visitFess(fess: Fess): void {
    this.result = new Fess(this.texture, this.charges)
  }
  visitCross(cross: Cross): void {
    this.result = new Cross(this.texture, this.charges)
  }
  visitBend(bend: Bend): void {
    this.result = new Bend(this.texture, this.charges, bend.sinister)
  }
  visitSaltire(saltire: Saltire): void {
    this.result = new Saltire(this.texture, this.charges)
  }

}
