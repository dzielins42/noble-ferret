import { TextureVisitor } from "../../util/Visitor";
import Texture from "./Texture";

class BlankTexture implements Texture {
  accept(visitor: TextureVisitor): void {
    // Do nothing
  }
}

export default BlankTexture
