import { TextureVisitor, TinctureVisitor, Visitable } from "../../util/Visitor";

interface Texture extends Visitable<TextureVisitor | TinctureVisitor> { }

export default Texture
