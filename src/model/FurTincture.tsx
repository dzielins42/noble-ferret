import { CrestRenderer } from '../CrestRenderer'
import Tincture from './Tincture'

class FurTincture implements Tincture {

  accept(visitor: CrestRenderer): void {
    throw new Error('Method not implemented.')
  }
}

export default FurTincture
