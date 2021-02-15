import Konva from "konva";
import HeaterEscutcheon from "./model/escutcheon/HeaterEscutcheon";
import RectangleEscutcheon from "./model/escutcheon/RectangleEscutcheon";
import { EscutcheonVisitor, Visitable } from "./util/Visitor";
class ContextPathDrawer implements EscutcheonVisitor {

  constructor(
    readonly context: Konva.Context
  ) { }

  draw(visitable: Visitable<EscutcheonVisitor>): void {
    visitable.accept(this)
  }

  visitHeaterEscutcheon(visitable: HeaterEscutcheon): void {
    this.context.beginPath()
    this.context.moveTo(visitable.bounds.left, visitable.bounds.top);
    this.context.lineTo(visitable.bounds.right, visitable.bounds.top);
    this.context.lineTo(visitable.bounds.right, visitable.bounds.top + visitable.bounds.width / 3);
    this.context.arc(visitable.bounds.left, visitable.bounds.top + visitable.bounds.width / 3, visitable.bounds.width, 0, 60 * Math.PI / 180, false)
    this.context.arc(visitable.bounds.right, visitable.bounds.top + visitable.bounds.width / 3, visitable.bounds.width, 120 * Math.PI / 180, Math.PI, false)
    this.context.closePath()
  }

  visitRectangleEscutcheon(visitable: RectangleEscutcheon): void {
    this.context.beginPath()
    this.context.moveTo(visitable.bounds.left, visitable.bounds.top)
    this.context.lineTo(visitable.bounds.right, visitable.bounds.top)
    this.context.lineTo(visitable.bounds.right, visitable.bounds.bottom)
    this.context.lineTo(visitable.bounds.left, visitable.bounds.bottom)
    this.context.closePath()
  }
}

export default ContextPathDrawer
