import React, { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Crest from './model/Crest'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva'
import PlainCrestRenderer from './PlainCrestRenderer'
import Escutcheon from './model/escutcheon/Escutcheon'
import { useWindowSize } from './util/Hooks'
import { CrestPaletteContext } from './CrestPaletteContext'

type CrestPreviewProps = {
  crest: Crest
  escutcheon: Escutcheon
}

export const CrestPreview = (props: CrestPreviewProps) => {
  const crestPalette = React.useContext(CrestPaletteContext)

  const containerRef = useRef<HTMLDivElement>(null)
  const [windowWidth, windowHeight] = useWindowSize();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const viewportSize = { width: 1000, height: 750 }

  useLayoutEffect(() => {
    if (containerRef.current) {
      const parentWidth = containerRef.current.offsetWidth
      setCanvasSize({
        width: parentWidth,
        height: 0.75 * parentWidth
      })
    }
  }, [containerRef, windowWidth]);

  const renderer = new PlainCrestRenderer(
    viewportSize.width, viewportSize.height, crestPalette, props.escutcheon
  )
  const scale = canvasSize.width / viewportSize.width
  return (
    <div ref={containerRef}>
      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        scale={{ x: scale, y: scale }}>
        {renderer.render(props.crest)}
      </Stage>
    </div >
  )
}
