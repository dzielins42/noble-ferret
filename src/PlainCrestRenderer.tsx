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
import { linear, linearP } from './MathUtils'
import BlankTexture from './model/BlankTexture'
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, Ruste } from './model/VariationTexture'
import Tincture from './model/Tincture'
import { Bend, Cross, Fess, Pale, Saltire } from './model/Ordinary'
import Escutcheon from './model/escutcheon/Escutcheon'
import RectangleEscutcheon from './model/escutcheon/RectangleEscutcheon'

class PlainCrestRenderer extends CrestRenderer {

  private readonly focusArea: Rectangle
  private readonly escutcheon: Escutcheon
  private readonly bounds: Rectangle

  constructor(
    viewportWidth: number,
    viewportHeight: number,
    escutcheon: Escutcheon
  ) {
    super(viewportWidth, viewportHeight)

    const dimen = Math.min(viewportWidth, viewportHeight) * 0.75
    const x = (viewportWidth - dimen) / 2
    const y = (viewportHeight - dimen) / 2
    this.focusArea = new Rectangle(y, x, y + dimen, x + dimen)
    //this.escutcheon = new RectangleEscutcheon(0, 0, viewportWidth, viewportHeight)
    //this.escutcheon = new RectangleEscutcheon(x, y, dimen, dimen)
    this.escutcheon = escutcheon
    this.bounds = this.escutcheon.bounds
  }

  renderCrest(crest: Crest): void {
    const x = this.escutcheon.dexter.x
    const y = this.escutcheon.chief.y
    const w = this.escutcheon.sinister.x - this.escutcheon.dexter.x
    const h = this.escutcheon.base.y - this.escutcheon.chief.y
    this.value = (
      <Layer>
        {this.renderSelf(crest.field)}
        {crest.ordinaries.map((ordinary, index) => {
          return this.renderSelf(ordinary)
        })}
        <Rect
          x={x}
          y={y}
          width={w}
          height={h}
          stroke="black"
        />
        <Rect
          x={x}
          y={y}
          width={w}
          height={w}
          stroke="black"
        />
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(this.bounds.left, this.bounds.top);
            context.lineTo(this.bounds.right, this.bounds.top);
            context.lineTo(this.bounds.right, this.bounds.top + this.bounds.width / 3);
            context.arc(this.bounds.left, this.bounds.top + this.bounds.width / 3, this.bounds.width, 0, 60 * Math.PI / 180, false)
            context.arc(this.bounds.right, this.bounds.top + this.bounds.width / 3, this.bounds.width, 120 * Math.PI / 180, Math.PI, false)
            context.closePath();
            // (!) Konva specific method, it is very important
            context.fillStrokeShape(shape);
          }}
          //fill="#00D2FF55"
          stroke="black"
          strokeWidth={4}
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
    const fessPoint = this.escutcheon.fessPoint
    const bounds = this.escutcheon.bounds
    this.value = (
      <Group>
        <Group
          clipX={bounds.left}
          clipY={bounds.top}
          clipWidth={bounds.width}
          clipHeight={fessPoint.y - bounds.top}
        >
          {this.renderSelf(field.texture1)}
        </Group>
        <Group
          clipX={bounds.left}
          clipY={fessPoint.y}
          clipWidth={bounds.width}
          clipHeight={bounds.bottom - fessPoint.y}
        >
          {this.renderSelf(field.texture2)}
        </Group>
      </Group>
    )
  }

  renderPerPaleDividedField(field: PerPaleDividedField): void {
    const bounds = this.escutcheon.bounds
    this.value = (
      <Group>
        <Group
          clipX={bounds.left}
          clipY={bounds.top}
          clipWidth={bounds.width / 2}
          clipHeight={bounds.height}
        >
          {this.renderSelf(field.texture1)}
        </Group>
        <Group
          clipX={bounds.centerHorizontal}
          clipY={bounds.top}
          clipWidth={bounds.width / 2}
          clipHeight={bounds.height}
        >
          {this.renderSelf(field.texture2)}
        </Group>
      </Group>
    )
  }

  renderPerBendDividedField(field: PerBendDividedField): void {
    const bounds = this.bounds
    const startPoint = field.sinister ? this.escutcheon.sinisterChief : this.escutcheon.dexterChief
    const endPoint = field.sinister ? this.escutcheon.dexterBase : this.escutcheon.sinisterBase
    const fun = linearP(
      startPoint,
      endPoint
    )
    this.value = (
      <Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(bounds.left, fun(bounds.left))
            ctx.lineTo(bounds.right, fun(bounds.right))
            if (field.sinister) {
              ctx.lineTo(bounds.left, bounds.top)
            } else {
              ctx.lineTo(bounds.right, bounds.top)
            }
            ctx.closePath()
          }}>
          {this.renderSelf(field.texture1)}
        </Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(bounds.left, fun(bounds.left))
            ctx.lineTo(bounds.right, fun(bounds.right))
            ctx.lineTo(bounds.right, bounds.bottom)
            ctx.lineTo(bounds.left, bounds.bottom)
            ctx.closePath()
          }}>
          {this.renderSelf(field.texture2)}
        </Group>
      </Group>
    )
  }

  renderPerSaltireDividedField(field: PerSaltireDividedField): void {
    const bounds = this.escutcheon.bounds
    const fun1 = linearP(
      this.escutcheon.dexterChief,
      this.escutcheon.sinisterBase
    )
    const fun2 = linearP(
      this.escutcheon.dexterBase,
      this.escutcheon.sinisterChief
    )
    this.value = (
      <Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(bounds.left, fun1(bounds.left))
            ctx.lineTo(bounds.right, fun1(bounds.right))
            ctx.lineTo(bounds.right, bounds.bottom)
            ctx.lineTo(bounds.left, bounds.bottom)
            ctx.lineTo(bounds.left, fun2(bounds.left))
            ctx.lineTo(bounds.right, fun2(bounds.right))

            ctx.closePath()
          }}
        >
          {this.renderSelf(field.texture1)}
        </Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(bounds.left, fun1(bounds.left))
            ctx.lineTo(bounds.right, fun1(bounds.right))
            ctx.lineTo(bounds.right, fun2(bounds.right))
            ctx.lineTo(bounds.left, fun2(bounds.left))
            ctx.closePath()
          }}
        >
          {this.renderSelf(field.texture2)}
        </Group>
      </Group>
    )
  }

  renderPerCrossDividedField(field: PerCrossDividedField): void {
    const bounds = this.escutcheon.bounds
    const fessPoint = this.escutcheon.fessPoint
    const x = fessPoint.x
    const y = fessPoint.y
    this.value = (
      <Group
        clipX={bounds.left}
        clipY={bounds.top}
        clipWidth={bounds.width}
        clipHeight={bounds.height}
      >
        {this.renderSelf(field.texture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(bounds.left, bounds.top)
            ctx.lineTo(x, bounds.top)
            ctx.lineTo(x, bounds.bottom)
            ctx.lineTo(bounds.right, bounds.bottom)
            ctx.lineTo(bounds.right, y)
            ctx.lineTo(0, y)
            ctx.closePath()
          }}
        >
          {this.renderSelf(field.texture1)}
        </Group>
      </Group>
    )
  }

  renderPerChevronDividedField(field: PerChevronDividedField): void {
    const bounds = this.escutcheon.bounds
    const fessPoint = this.escutcheon.fessPoint
    const fun1 =
      field.inverted ? this.escutcheon.bendFunction : this.escutcheon.bendSinisterFunction
    const fun2 =
      field.inverted ? this.escutcheon.bendSinisterFunction : this.escutcheon.bendFunction
    const fun = function(x: number) {
      if (x < fessPoint.x) {
        return fun1(x)
      } else if (x > fessPoint.x) {
        return fun2(x)
      } else {
        return fessPoint.y
      }
    }

    this.value = (
      <Group
        clipX={bounds.left}
        clipY={bounds.top}
        clipWidth={bounds.width}
        clipHeight={bounds.height}
      >
        {this.renderSelf(field.texture1)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath()
            ctx.moveTo(bounds.left, fun(bounds.left))
            ctx.lineTo(fessPoint.x, fessPoint.y)
            ctx.lineTo(bounds.right, fun(bounds.right))
            ctx.closePath()
          }}
        >
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
    const h = this.bounds.height / (barry.count * 2)
    const w = this.bounds.width
    this.value = (
      <Group>
        {this.renderSelf(barry.tincture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            for (let i = 0; i < barry.count; i++) {
              ctx.rect(
                this.bounds.left, this.bounds.top + 2 * i * h,
                w, h
              )
            }
          }}
        >
          {this.renderSelf(barry.tincture1)}
        </Group>
      </Group>
    )
  }

  renderPaly(paly: Paly): void {
    const w = this.bounds.width / (paly.count * 2)
    const h = this.bounds.height
    this.value = (
      <Group>
        {this.renderSelf(paly.tincture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            for (let i = 0; i < paly.count; i++) {
              ctx.rect(
                this.bounds.left + 2 * i * w, this.bounds.top,
                w, h
              )
            }
          }}
        >
          {this.renderSelf(paly.tincture1)}
        </Group>
      </Group>
    )
  }

  renderBendy(bendy: Bendy): void {
    const w = this.bounds.width
    const h = this.bounds.height
    const dimen = Math.SQRT2 * (w + h) / 2
    const t = dimen / (bendy.count * 2)
    this.value = (
      <Group>
        {this.renderSelf(bendy.tincture2)}
        <Group
          x={this.bounds.centerHorizontal}
          y={this.bounds.centerVertical}
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
    const w = this.bounds.width
    const h = this.bounds.height
    const d = Math.min(w, h) / (chequy.count * 2)
    const hCount = Math.ceil(w / d / 2)
    const vCount = Math.ceil(h / d / 2)
    this.value = (
      <Group>
        {this.renderSelf(chequy.tincture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            for (let row = 0; row < vCount; row++) {
              for (let col = 0; col < hCount; col++) {
                ctx.rect(
                  this.bounds.left + row * 2 * d,
                  this.bounds.top + col * 2 * d,
                  d,
                  d
                )
                ctx.rect(
                  this.bounds.left + (row * 2 + 1) * d,
                  this.bounds.top + (col * 2 + 1) * d,
                  d,
                  d
                )
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
    const w = this.bounds.width
    const h = this.bounds.height
    let p: number, q: number
    if (w <= h) {
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
            ctx.translate(this.bounds.left, this.bounds.top)
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

  // Ordinary
  renderPale(pale: Pale): void {
    const w = this.bounds.width * this.T
    this.value = (
      <Group
        clipX={this.bounds.centerHorizontal - w / 2}
        clipY={this.bounds.top}
        clipWidth={w}
        clipHeight={this.bounds.height}
      >
        {this.renderSelf(pale.texture)}
      </Group >
    )
  }

  renderFess(fess: Fess): void {
    const h = this.bounds.height * this.T
    this.value = (
      <Group
        clipX={this.bounds.left}
        clipY={this.escutcheon.fessPoint.y - h / 2}
        clipWidth={this.bounds.width}
        clipHeight={h}
      >
        {this.renderSelf(fess.texture)}
      </Group >
    )
  }

  renderCross(cross: Cross): void {
    const pale = new Pale(cross.texture)
    const fess = new Fess(cross.texture)
    this.value = (
      <Group>
        {this.renderSelf(pale)}
        {this.renderSelf(fess)}
      </Group>
    )
  }

  renderBend(bend: Bend): void {
    const bounds = this.bounds
    const fessPoint = this.escutcheon.fessPoint
    const w = bounds.width
    const h = bounds.height
    const t = Math.min(w, h * this.T)
    const dimen = Math.SQRT2 * (w + h) / 2

    const f = this.escutcheon.bendFunction
    const b = f(0)
    const a = (f(1) - b) / 1
    const q = Math.atan(a)

    this.value = (
      <Group
        clipFunc={(ctx: Konva.Context) => {
          ctx.translate(
            fessPoint.x,
            fessPoint.y
          )
          ctx.rotate(q * (bend.sinister ? -1 : 1))
          ctx.rect(-dimen / 2, -t / 2, dimen, t)
          ctx.reset()
        }}
      >
        {this.renderSelf(bend.texture)}
      </Group>
    )
  }

  renderSaltire(saltire: Saltire): void {
    const bend = new Bend(saltire.texture, false)
    const bendSinister = new Bend(saltire.texture, true)
    this.value = (
      <Group>
        {this.renderSelf(bend)}
        {this.renderSelf(bendSinister)}
      </Group>
    )
  }

  renderColorTincture(colorTincture: ColorTincture): void {
    const bounds = this.escutcheon.bounds
    const x = bounds.left
    const y = bounds.top
    const w = bounds.width
    const h = bounds.height
    /*this.value = (
      <Rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={colorTincture.colorHex}
      />
    )*/
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
    height: number = this.viewportHeight,
    escutcheon: Escutcheon = this.escutcheon
  ): React.ReactNode {
    let renderer = new PlainCrestRenderer(width, height, escutcheon)
    return renderer.render(visitable)
  }

  private readonly T: number = 0.25
}

enum LozengyType {
  Normal, Mascle, Ruste
}

export default PlainCrestRenderer
