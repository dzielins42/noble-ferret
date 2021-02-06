import React, { useRef } from 'react'
import Crest from './model/Crest'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva'
import PlainCrestRenderer from './PlainCrestRenderer'

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
    var renderer = new PlainCrestRenderer(canvasWidth, canvasHeight)
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
