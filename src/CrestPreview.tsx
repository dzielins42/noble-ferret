import React, { useRef } from 'react'
import Crest from './model/Crest'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva'
import PlainCrestRenderer from './PlainCrestRenderer'
import RectangleEscutcheon from './model/escutcheon/RectangleEscutcheon'
import HeaterEscutcheon from './model/escutcheon/HeaterEscutcheon'

type CrestPreviewProps = {
  crest: Crest
}

type CrestPreviewState = {}

class CrestPreview
  extends React.Component<CrestPreviewProps, CrestPreviewState>
{

  render() {
    var canvasWidth = 800
    var canvasHeight = 600
    const dimen = Math.min(canvasWidth, canvasHeight) * 0.75
    const x = (canvasWidth - dimen) / 2
    const y = (canvasHeight - dimen) / 2
    //let escutcheon = new RectangleEscutcheon(x, y, dimen, dimen / 1.5)
    let escutcheon = new HeaterEscutcheon(x, y, dimen / 5)
    var renderer = new PlainCrestRenderer(canvasWidth, canvasHeight, escutcheon)
    return (
      <div>
        <Stage width={canvasWidth} height={canvasHeight}>
          {renderer.render(this.props.crest)}
        </Stage>
      </div>
    )
  }
}

export default CrestPreview
