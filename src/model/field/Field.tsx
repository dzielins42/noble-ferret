import { FieldVisitor, Visitable } from "../../util/Visitor";

interface Field extends Visitable<FieldVisitor> { }

export default Field
