import { CrestRenderer } from './CrestRenderer'
import Konva from 'konva'
import { Shape, KonvaNodeComponent, Stage, Layer, Rect, Text, Circle, Line, Group } from 'react-konva'
import React from 'react'
import ColorTincture from './model/ColorTincture'
import { PerBendDividedField, PerChevronDividedField, PerCrossDividedField, PerFessDividedField, PerPaleDividedField, PerPallDividedField, PerSaltireDividedField } from './model/field/DividedField'
import SolidField from './model/field/SolidField'
import Visitable from './Visitable'
import Rectangle from './Rectangle'
import Crest from './model/Crest'
import { linear } from './MathUtils'
import BlankTexture from './model/BlankTexture'
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, Ruste } from './model/VariationTexture'
import Tincture from './model/Tincture'

class PlainCrestRenderer extends CrestRenderer {

  private readonly focusArea: Rectangle

  constructor(viewportWidth: number, viewportHeight: number) {
    super(viewportWidth, viewportHeight)

    const dimen = Math.min(viewportWidth, viewportHeight) * 0.75
    const x = (viewportWidth - dimen) / 2
    const y = (viewportHeight - dimen) / 2
    this.focusArea = new Rectangle(y, x, y + dimen, x + dimen)
  }

  renderCrest(crest: Crest): void {
    this.value = (
      <Layer>
        {this.renderSelf(crest.field)}
        <Rect
          x={this.focusArea.left}
          y={this.focusArea.top}
          width={this.focusArea.width()}
          height={this.focusArea.height()}
          stroke="black"
        />
      </Layer>
    )
  }

  // Field
  renderSolidField(solidField: SolidField): void {
    this.value = (
      <Group>
        {this.renderSelf(solidField.texture)}
      </Group >
    )
  }

  renderPerFessDividedField(field: PerFessDividedField): void {
    this.value = (
      <Group>
        <Group>
          {this.renderSelf(field.texture1)}
        </Group>
        <Group
          y={this.viewportHeight / 2}>
          {this.renderSelf(field.texture2)}
        </Group>
      </Group>
    )
  }

  renderPerPaleDividedField(field: PerPaleDividedField): void {
    this.value = (
      <Group>
        <Group>
          {this.renderSelf(field.texture1)}
        </Group>
        <Group
          x={this.viewportWidth / 2}>
          {this.renderSelf(field.texture2)}
        </Group>
      </Group>
    )
  }

  renderPerBendDividedField(field: PerBendDividedField): void {
    const fun = linear(
      this.focusArea.left,
      field.sinister ? this.focusArea.bottom : this.focusArea.top,
      this.focusArea.right,
      field.sinister ? this.focusArea.top : this.focusArea.bottom
    )
    const q = field.sinister ? this.viewportWidth : 0
    this.value = (
      <Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(0, fun(0))
            ctx.lineTo(this.viewportWidth, fun(this.viewportWidth))
            ctx.lineTo(this.viewportWidth - q, 0)
            ctx.closePath()
          }}>
          {this.renderSelf(field.texture1)}
        </Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(0, fun(0))
            ctx.lineTo(this.viewportWidth, fun(this.viewportWidth))
            ctx.lineTo(q, this.viewportHeight)
            ctx.closePath()
          }}>
          {this.renderSelf(field.texture2)}
        </Group>
      </Group>
    )
  }

  renderPerSaltireDividedField(field: PerSaltireDividedField): void {
    const fun1 = linear(
      this.focusArea.left,
      this.focusArea.top,
      this.focusArea.right,
      this.focusArea.bottom
    )
    const fun2 = linear(
      this.focusArea.left,
      this.focusArea.bottom,
      this.focusArea.right,
      this.focusArea.top
    )
    this.value = (
      <Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(0, fun1(0))
            ctx.lineTo(this.viewportWidth, fun1(this.viewportWidth))
            ctx.lineTo(0, fun2(0))
            ctx.lineTo(this.viewportWidth, fun2(this.viewportWidth))
            ctx.closePath()
          }}>
          {this.renderSelf(field.texture1)}
        </Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(0, fun1(0))
            ctx.lineTo(this.viewportWidth, fun1(this.viewportWidth))
            ctx.lineTo(this.viewportWidth, fun2(this.viewportWidth))
            ctx.lineTo(0, fun2(0))
            ctx.closePath()
          }}>
          {this.renderSelf(field.texture2)}
        </Group>
      </Group>
    )
  }

  renderPerCrossDividedField(field: PerCrossDividedField): void {
    const x = this.focusArea.centerHorizontal()
    const y = this.focusArea.centerVertical()
    this.value = (
      <Group>
        {this.renderSelf(field.texture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(x, 0)
            ctx.lineTo(x, this.viewportHeight)
            ctx.lineTo(this.viewportWidth, this.viewportHeight)
            ctx.lineTo(this.viewportWidth, y)
            ctx.lineTo(0, y)
            ctx.closePath()
          }}>
          {this.renderSelf(field.texture1)}
        </Group>
      </Group>
    )
  }

  renderPerChevronDividedField(field: PerChevronDividedField): void {
    const centerX = this.focusArea.centerHorizontal()
    const centerY = this.focusArea.centerVertical()
    const fun1 = linear(
      this.focusArea.left,
      !field.inverted ? this.focusArea.bottom : this.focusArea.top,
      this.focusArea.right,
      !field.inverted ? this.focusArea.top : this.focusArea.bottom
    )
    const fun2 = linear(
      this.focusArea.left,
      field.inverted ? this.focusArea.bottom : this.focusArea.top,
      this.focusArea.right,
      field.inverted ? this.focusArea.top : this.focusArea.bottom
    )
    const fun = function(x: number) {
      if (x < centerX) {
        return fun1(x)
      } else if (x > centerX) {
        return fun2(x)
      } else {
        return centerY
      }
    }

    this.value = (
      <Group>
        {this.renderSelf(field.texture1)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(
              0,
              fun(0)
            )
            ctx.lineTo(
              this.focusArea.centerHorizontal(),
              this.focusArea.centerVertical()
            )
            ctx.lineTo(
              this.viewportWidth,
              fun(this.viewportWidth)
            )
            ctx.closePath()
          }}>
          {this.renderSelf(field.texture2)}
        </Group>
      </Group>
    )
  }

  renderPerPallDividedField(field: PerPallDividedField): void {
    const perPale = new PerPaleDividedField(
      field.texture2,
      field.texture3
    )
    const perChevron = new PerChevronDividedField(
      new BlankTexture(),
      field.texture1,
      !field.inverted
    )
    this.value = (
      <Group>
        {this.renderSelf(perPale)}
        {this.renderSelf(perChevron)}
      </Group>
    )
  }

  // Variation
  renderBarry(barry: Barry): void {
    const h = this.viewportHeight / (barry.count * 2)
    const w = this.viewportWidth
    this.value = (
      <Group>
        {this.renderSelf(barry.tincture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            for (let i = 0; i < barry.count; i++) {
              ctx.rect(0, 2 * i * h, w, h)
            }
          }}>
          {this.renderSelf(barry.tincture1)}
        </Group>
      </Group>
    )
  }

  renderPaly(paly: Paly): void {
    const w = this.viewportWidth / (paly.count * 2)
    const h = this.viewportHeight
    this.value = (
      <Group>
        {this.renderSelf(paly.tincture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            for (let i = 0; i < paly.count; i++) {
              ctx.rect(2 * i * w, 0, w, h)
            }
          }}>
          {this.renderSelf(paly.tincture1)}
        </Group>
      </Group>
    )
  }

  renderBendy(bendy: Bendy): void {
    const w = this.viewportWidth
    const h = this.viewportHeight
    const dimen = Math.SQRT2 * (w + h) / 2
    const t = dimen / (bendy.count * 2)
    this.value = (
      <Group>
        {this.renderSelf(bendy.tincture2)}
        <Group
          x={w / 2}
          y={h / 2}
          offsetX={dimen / 2}
          offsetY={dimen / 2}
          rotation={bendy.sinister ? 45 : -45}
          clipFunc={(ctx: Konva.Context) => {
            for (let i = 0; i < bendy.count; i++) {
              ctx.rect(0, 2 * i * t, dimen, t)
            }
          }}>
          {this.renderSelf(bendy.tincture1, dimen, dimen)}
        </Group>
      </Group>
    )
  }

  renderChequy(chequy: Chequy): void {
    const w = this.viewportWidth
    const h = this.viewportHeight
    const d = Math.min(w, h) / (chequy.count * 2)
    const hCount = Math.ceil(w / d)
    const vCount = Math.ceil(h / d)
    this.value = (
      <Group>
        {this.renderSelf(chequy.tincture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            for (let row = 0; row < vCount; row++) {
              for (let col = 0; col < hCount; col++) {
                ctx.rect(row * 2 * d, col * 2 * d, d, d)
                ctx.rect((row * 2 + 1) * d, (col * 2 + 1) * d, d, d)
              }
            }
          }}>
          {this.renderSelf(chequy.tincture1)}
        </Group>
      </Group>
    )
  }

  renderLozengy(lozengy: Lozengy): void {
    this.value = this.innerRenderLozengy(
      lozengy.tincture1, lozengy.tincture2,
      lozengy.count, 1
    )
  }

  renderFusilly(fusilly: Fusilly): void {
    this.value = this.innerRenderLozengy(
      fusilly.tincture1, fusilly.tincture2,
      fusilly.count, 1.5
    )
  }

  renderRuste(ruste: Ruste): void {
    this.value = this.innerRenderLozengy(
      ruste.tincture1, ruste.tincture2,
      ruste.count, 1.5, LozengyType.Ruste
    )
  }

  private innerRenderLozengy(
    tincture1: Tincture,
    tincture2: Tincture,
    count: number,
    dRatio: number,
    type: LozengyType = LozengyType.Normal
  ): React.ReactNode {
    const w = this.viewportWidth
    const h = this.viewportHeight
    let p: number, q: number
    if (w < h) {
      q = w / (count - 1)
      p = q * dRatio
    } else {
      p = h / (count - 1)
      q = p / dRatio
    }
    const hCount = Math.ceil(w / q) + 1
    const vCount = Math.ceil(h / p) + 1
    const v = 0.5
    return (
      <Group>
        {this.renderSelf(tincture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            for (let row = 0; row < vCount; row++) {
              for (let col = 0; col < hCount; col++) {
                const x = col * q
                const y = row * p
                ctx.moveTo(x - (q / 2), y)
                ctx.lineTo(x, y - (p / 2))
                ctx.lineTo(x + (q / 2), y)
                ctx.lineTo(x, y + (p / 2))
                ctx.lineTo(x - (q / 2), y)
                ctx.closePath()
                if (type == LozengyType.Mascle) {
                  ctx.moveTo(x - v * (q / 2), y)
                  ctx.lineTo(x - v * (q / 2), y)
                  ctx.lineTo(x, y + v * (p / 2))
                  ctx.lineTo(x + v * (q / 2), y)
                  ctx.lineTo(x, y - v * (p / 2))
                  ctx.closePath()

                  ctx.moveTo(x + q / 2 - v * (q / 2), y + p / 2)
                  ctx.lineTo(x + q / 2 - v * (q / 2), y + p / 2)
                  ctx.lineTo(x + q / 2, y + p / 2 + v * (p / 2))
                  ctx.lineTo(x + q / 2 + v * (q / 2), y + p / 2)
                  ctx.lineTo(x + q / 2, y + p / 2 - v * (p / 2))
                  ctx.closePath()
                } else if (type == LozengyType.Ruste) {
                  ctx.moveTo(x, y)
                  ctx.arc(x, y, v * q / 2, 0, Math.PI * 2, true)

                  ctx.moveTo(x + q / 2, y + p / 2)
                  ctx.arc(x + q / 2, y + p / 2, v * q / 2, 0, Math.PI * 2, false)
                }
              }
            }
          }}>
          {this.renderSelf(tincture1)}
        </Group>
      </Group>
    )
  }

  renderColorTincture(colorTincture: ColorTincture): void {
    this.value = (
      <Rect
        x={0}
        y={0}
        width={this.viewportWidth}
        height={this.viewportHeight}
        fill={colorTincture.colorHex}
      />
    )
  }

  private renderSelf(
    visitable: Visitable<CrestRenderer>,
    width: number = this.viewportWidth,
    height: number = this.viewportHeight
  ): React.ReactNode {
    let renderer = new PlainCrestRenderer(width, height)
    return renderer.render(visitable)
  }
}

enum LozengyType {
  Normal, Mascle, Ruste
}

export default PlainCrestRenderer
