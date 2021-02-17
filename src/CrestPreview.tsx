import React, { createRef, useRef } from 'react'
import Crest from './model/Crest'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva'
import PlainCrestRenderer from './PlainCrestRenderer'
import Escutcheon from './model/escutcheon/Escutcheon'

type CrestPreviewProps = {
  crest: Crest
  escutcheon: Escutcheon
}

type CrestPreviewState = {
  viewportWidth: number
  viewportHeight: number
}

class CrestPreview
  extends React.Component<CrestPreviewProps, CrestPreviewState>
{
  private viewportRef = createRef<HTMLDivElement>()

  state = {
    viewportWidth: 800,
    viewportHeight: 600
  }

  componentDidMount() {
    /*const width: number = this.viewportRef.current ?.clientWidth || 0
    const height: number = this.viewportRef.current ?.clientHeight || 0
    this.setState({
      viewportWidth: width,
      viewportHeight: height
    })*/
  }

  render() {
    var canvasWidth = this.state.viewportWidth//200
    var canvasHeight = this.state.viewportHeight//200
    const dimen = Math.min(canvasWidth, canvasHeight) * 0.75
    const x = (canvasWidth - dimen) / 2
    const y = (canvasHeight - dimen) / 2
    var renderer = new PlainCrestRenderer(canvasWidth, canvasHeight, this.props.escutcheon)
    return (
      <div ref={this.viewportRef}>
        <Stage width={canvasWidth} height={canvasHeight} fill="green">
          {renderer.render(this.props.crest)}
        </Stage>
      </div >
    )
  }
}

export default CrestPreview
