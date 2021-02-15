import { TextureVisitor } from '../../util/Visitor'
import Tincture from './Tincture'

class FurTincture implements Tincture {

  accept(visitor: TextureVisitor): void {
    throw new Error('Method not implemented.')
  }
}

export default FurTincture
