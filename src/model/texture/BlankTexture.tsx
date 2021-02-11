import { CrestRenderer } from "../../CrestRenderer";
import Texture from "./Texture";

class BlankTexture implements Texture {
  accept(visitor: CrestRenderer): void {
    // Do nothing
  }
}

export default BlankTexture
