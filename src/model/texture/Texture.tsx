import { TextureVisitor, Visitable } from "../../util/Visitor";

interface Texture extends Visitable<TextureVisitor> { }

export default Texture
