import Crest from "../model/Crest";
import HeaterEscutcheon from "../model/escutcheon/HeaterEscutcheon";
import RectangleEscutcheon from "../model/escutcheon/RectangleEscutcheon";
import { PerBendDividedField, PerChevronDividedField, PerCrossDividedField, PerFessDividedField, PerPaleDividedField, PerPallDividedField, PerSaltireDividedField } from "../model/field/DividedField";
import SolidField from "../model/field/SolidField";
import { Billet, Lozenge, Mullet, Roundel } from "../model/charge/MobileSubordinary";
import { Bend, Cross, Fess, Pale, Saltire } from "../model/ordinary/Ordinary";
import ColorTincture from "../model/texture/ColorTincture";
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, Ruste } from "../model/texture/VariationTexture";
import { InBend, InFess, InPale } from "../model/charge/GroupCharge";

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
  visitRectangleEscutcheon(rescutcheon: RectangleEscutcheon): void
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

export interface TextureVisitor {
  // Tincture
  visitColorTincture(texture: ColorTincture): void
  // Variation
  visitBarry(barry: Barry): void
  visitPaly(paly: Paly): void
  visitBendy(bendy: Bendy): void
  visitChequy(chequy: Chequy): void
  visitLozengy(lozengy: Lozengy): void
  visitFusilly(fusilly: Fusilly): void
  visitRuste(ruste: Ruste): void
}

export abstract class BaseTextureVisitor implements TextureVisitor {
  visitColorTincture(texture: ColorTincture): void { }
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

/*export class BaseVisitor implements Visitor {
  visitCrest(crest: Crest): void { }
  visitSolidField(field: SolidField): void { }
  visitPerFessDividedField(field: PerFessDividedField): void { }
  visitPerPaleDividedField(field: PerPaleDividedField): void { }
  visitPerBendDividedField(field: PerBendDividedField): void { }
  visitPerSaltireDividedField(field: PerSaltireDividedField): void { }
  visitPerCrossDividedField(field: PerCrossDividedField): void { }
  visitPerChevronDividedField(field: PerChevronDividedField): void { }
  visitPerPallDividedField(field: PerPallDividedField): void { }
  visitHeaterEscutcheon(escutcheon: HeaterEscutcheon): void { }
  visitRectangleEscutcheon(rescutcheon: RectangleEscutcheon): void { }
  visitPale(pale: Pale): void { }
  visitFess(fess: Fess): void { }
  visitCross(cross: Cross): void { }
  visitBend(bend: Bend): void { }
  visitSaltire(saltire: Saltire): void { }
  visitRoundel(roundel: Roundel): void { }
  visitBillet(billet: Billet): void { }
  visitLozenge(lozenge: Lozenge): void { }
  visitMullet(mullet: Mullet): void { }
  visitColorTincture(texture: ColorTincture): void { }
  visitBarry(barry: Barry): void { }
  visitPaly(paly: Paly): void { }
  visitBendy(bendy: Bendy): void { }
  visitChequy(chequy: Chequy): void { }
  visitLozengy(lozengy: Lozengy): void { }
  visitFusilly(fusilly: Fusilly): void { }
  visitRuste(ruste: Ruste): void { }

}*/
