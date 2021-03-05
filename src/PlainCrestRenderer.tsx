import { CrestRenderer, Renderable } from './CrestRenderer'
import Konva from 'konva'
import { Shape, KonvaNodeComponent, Stage, Layer, Rect, Text, Circle, Line, Group, Star } from 'react-konva'
import React from 'react'
import { PerBendDividedField, PerChevronDividedField, PerCrossDividedField, PerFessDividedField, PerPaleDividedField, PerPallDividedField, PerSaltireDividedField } from './model/field/DividedField'
import SolidField from './model/field/SolidField'
import Crest from './model/Crest'
import { linear, linearP, slope } from './MathUtils'
import BlankTexture from './model/texture/BlankTexture'
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, Ruste } from './model/texture/VariationTexture'
import { Bend, Cross, Fess, Pale, Saltire } from './model/ordinary/Ordinary'
import Escutcheon from './model/escutcheon/Escutcheon'
import RectangleEscutcheon from './model/escutcheon/RectangleEscutcheon'
import Rectangle from './geometry/Rectangle'
import { Billet, Lozenge, Mullet, Roundel } from './model/charge/MobileSubordinary'
import { Charge } from './model/charge/Charge'
import Point from './geometry/Point'
import LozengeType from './model/LozengeType'
import ContextPathDrawer from './ContextPathDrawer'
import { ChargeVisitor, CrestVisitor, FieldVisitor, TextureVisitor, Visitable } from './util/Visitor'
import { InBend, InFess, InPale } from './model/charge/GroupCharge'
import { ColorTincture, MetalTincture, Tincture } from './model/texture/Tincture'

class PlainCrestRenderer extends CrestRenderer {

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
    this.escutcheon = escutcheon
    this.bounds = this.escutcheon.bounds
  }

  visitCrest(crest: Crest): void {
    const escutcheonBounds = this.escutcheon.bounds

    this.value = (
      <Layer>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            const drawer = new ContextPathDrawer(ctx)
            drawer.draw(this.escutcheon)
          }}>
          {this.renderSelf(crest.field)}
          {crest.ordinaries.map((ordinary, index) => {
            return this.renderSelf(ordinary)
          })}
        </Group>
        <Shape
          sceneFunc={(context, shape) => {
            const drawer = new ContextPathDrawer(context)
            drawer.draw(this.escutcheon)
            // (!) Konva specific method, it is very important
            context.fillStrokeShape(shape);
          }}
          stroke="black"
          strokeWidth={4}
        />
        <Rect
          x={escutcheonBounds.left}
          y={escutcheonBounds.top}
          width={escutcheonBounds.width}
          height={escutcheonBounds.height}
          stroke="black"
          strokeWidth={4}
        />
      </Layer>
    )
  }

  // Field
  visitSolidField(solidField: SolidField): void {
    this.value = (
      <Group>
        {this.renderSelf(solidField.texture)}
      </Group >
    )
  }

  visitPerFessDividedField(field: PerFessDividedField): void {
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

  visitPerPaleDividedField(field: PerPaleDividedField): void {
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

  visitPerBendDividedField(field: PerBendDividedField): void {
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

  visitPerSaltireDividedField(field: PerSaltireDividedField): void {
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

  visitPerCrossDividedField(field: PerCrossDividedField): void {
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

  visitPerChevronDividedField(field: PerChevronDividedField): void {
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
            ctx.lineTo(bounds.right, field.inverted ? bounds.top : bounds.bottom)
            ctx.lineTo(bounds.left, field.inverted ? bounds.top : bounds.bottom)
            ctx.closePath()
          }}
        >
          {this.renderSelf(field.texture2)}
        </Group>
      </Group>
    )
  }

  visitPerPallDividedField(field: PerPallDividedField): void {
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
  visitBarry(barry: Barry): void {
    const h = this.bounds.height / (barry.count)
    const w = this.bounds.width
    this.value = (
      <Group>
        {this.renderSelf(barry.tincture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            for (let i = 0; i < barry.count / 2; i++) {
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

  visitPaly(paly: Paly): void {
    const w = this.bounds.width / (paly.count)
    const h = this.bounds.height
    this.value = (
      <Group>
        {this.renderSelf(paly.tincture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            for (let i = 0; i < paly.count / 2; i++) {
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

  visitBendy(bendy: Bendy): void {
    const w = this.bounds.width
    const h = this.bounds.height
    const dimen = Math.SQRT2 * (w + h) / 2
    const t = dimen / (bendy.count)
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

  visitChequy(chequy: Chequy): void {
    const w = this.bounds.width
    const h = this.bounds.height
    const d = Math.min(w, h) / (chequy.count)
    const rowCount = Math.ceil(h / d / 2)
    const colCount = Math.ceil(w / d / 2)
    this.value = (
      <Group>
        {this.renderSelf(chequy.tincture2)}
        <Group
          clipFunc={(ctx: Konva.Context) => {
            for (let row = 0; row < rowCount; row++) {
              for (let col = 0; col < colCount; col++) {
                ctx.rect(
                  this.bounds.left + col * 2 * d,
                  this.bounds.top + row * 2 * d,
                  d,
                  d
                )
                ctx.rect(
                  this.bounds.left + (col * 2 + 1) * d,
                  this.bounds.top + (row * 2 + 1) * d,
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

  visitLozengy(lozengy: Lozengy): void {
    this.value = this.innerRenderLozengy(
      lozengy.tincture1, lozengy.tincture2,
      lozengy.count, 1
    )
  }

  visitFusilly(fusilly: Fusilly): void {
    this.value = this.innerRenderLozengy(
      fusilly.tincture1, fusilly.tincture2,
      fusilly.count, 1.5
    )
  }

  visitRuste(ruste: Ruste): void {
    this.value = this.innerRenderLozengy(
      ruste.tincture1, ruste.tincture2,
      ruste.count, 1.5, LozengeType.Ruste
    )
  }

  private innerRenderLozengy(
    tincture1: Tincture,
    tincture2: Tincture,
    count: number,
    dRatio: number,
    type: LozengeType = LozengeType.Normal
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
                if (type == LozengeType.Mascle) {
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
                } else if (type == LozengeType.Ruste) {
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
  visitPale(pale: Pale): void {
    const chargesCount = this.assertChargesCount(
      pale.charges, 5
    )

    const bounds = this.bounds
    const escutcheon = this.escutcheon

    const w = escutcheon.paleWidth
    const h = bounds.height

    const totalHeight = escutcheon.middleBase.y - escutcheon.middleChief.y
    const chargeHeight = Math.min(
      w * this.CONTENT_TO_SPACE_RATIO,
      (totalHeight * this.CONTENT_TO_SPACE_RATIO) / chargesCount
    )

    const charges = this.renderInPale(
      pale.charges,
      chargeHeight,
      new Rectangle(
        escutcheon.middleChief.y,
        escutcheon.fessPoint.x - totalHeight / 2,
        escutcheon.middleBase.y,
        escutcheon.fessPoint.x + totalHeight / 2,
      ),
      true,
      true
    )

    this.value = (
      <Group
        clipX={bounds.centerHorizontal - w / 2}
        clipY={bounds.top}
        clipWidth={w}
        clipHeight={h}
      >
        {this.renderSelf(pale.texture)}
        {charges}
      </Group >
    )
  }

  visitFess(fess: Fess): void {
    const chargesCount = this.assertChargesCount(
      fess.charges, 5
    )

    const bounds = this.bounds
    const escutcheon = this.escutcheon

    const w = bounds.width
    const h = escutcheon.fessHeight

    const totalWidth = escutcheon.sinister.x - escutcheon.dexter.x
    const chargeWidth = Math.min(
      h * this.CONTENT_TO_SPACE_RATIO,
      (totalWidth * this.CONTENT_TO_SPACE_RATIO) / chargesCount
    )

    const charges = this.renderInFess(
      fess.charges,
      chargeWidth,
      new Rectangle(
        escutcheon.fessPoint.y - totalWidth / 2,
        escutcheon.dexter.x,
        escutcheon.fessPoint.y + totalWidth / 2,
        escutcheon.sinister.x
      ),
      true,
      true
    )

    this.value = (
      <Group
        clipX={bounds.left}
        clipY={escutcheon.fessPoint.y - h / 2}
        clipWidth={w}
        clipHeight={h}
      >
        {this.renderSelf(fess.texture)}
        {charges}
      </Group >
    )
  }

  visitCross(cross: Cross): void {
    const chargesCount = this.assertChargesCount(
      cross.charges, 5
    )

    const bounds = this.bounds
    const escutcheon = this.escutcheon
    const fessPoint = this.escutcheon.fessPoint
    const dimen = Math.min(
      escutcheon.fessHeight, escutcheon.paleWidth
    )
    const halfDimen = dimen / 2
    const chargeDimen = dimen * this.CONTENT_TO_SPACE_RATIO

    const charges = this.renderInCross(
      cross.charges,
      chargeDimen,
      bounds,
      fessPoint
    )

    this.value = (
      <Group
        clipFunc={(ctx: Konva.Context) => {
          ctx.moveTo(bounds.centerHorizontal - halfDimen, bounds.top)
          ctx.lineTo(bounds.centerHorizontal + halfDimen, bounds.top)
          ctx.lineTo(bounds.centerHorizontal + halfDimen, fessPoint.y - halfDimen)
          ctx.lineTo(bounds.right, fessPoint.y - halfDimen)
          ctx.lineTo(bounds.right, fessPoint.y + halfDimen)
          ctx.lineTo(bounds.centerHorizontal + halfDimen, fessPoint.y + halfDimen)
          ctx.lineTo(bounds.centerHorizontal + halfDimen, bounds.bottom)
          ctx.lineTo(bounds.centerHorizontal - halfDimen, bounds.bottom)
          ctx.lineTo(bounds.centerHorizontal - halfDimen, fessPoint.y + halfDimen)
          ctx.lineTo(bounds.left, fessPoint.y + halfDimen)
          ctx.lineTo(bounds.left, fessPoint.y - halfDimen)
          ctx.lineTo(bounds.centerHorizontal - halfDimen, fessPoint.y - halfDimen)
          ctx.closePath()
        }}>
        {this.renderSelf(cross.texture)}
        {charges}
      </Group>
    )
  }

  visitBend(bend: Bend): void {
    const chargesCount = this.assertChargesCount(
      bend.charges, 5
    )

    const bounds = this.bounds
    const escutcheon = this.escutcheon
    const fessPoint = escutcheon.fessPoint

    const w = bounds.width
    const h = bounds.height
    const t = Math.min(w, h * this.T)
    const dimen = Math.SQRT2 * (w + h) / 2

    const f = bend.sinister ? escutcheon.bendSinisterFunction : escutcheon.bendFunction
    const b = f(0)
    const a = (f(1) - b) / 1
    const q = Math.atan(a)

    // Initial line calculations
    let startPoint = bend.sinister ? escutcheon.dexterBase : escutcheon.dexterChief
    let endPoint = bend.sinister ? escutcheon.sinisterChief : escutcheon.sinisterBase
    const hor = Math.min(
      Math.abs(fessPoint.x - startPoint.x),
      Math.abs(fessPoint.x - endPoint.x)
    )
    const vert = Math.min(
      Math.abs(fessPoint.y - startPoint.y),
      Math.abs(fessPoint.y - endPoint.y)
    )

    const chargesRect = new Rectangle(fessPoint.y - vert, fessPoint.x - hor, fessPoint.y + vert, fessPoint.x + hor)
    const chargeSize = Math.min(
      t * this.CONTENT_TO_SPACE_RATIO,
      (chargesRect.diagonal * this.CONTENT_TO_SPACE_RATIO) / chargesCount
    )
    const charges = this.renderInBend(
      bend.charges,
      chargeSize * Math.SQRT2 / 2,
      chargesRect,
      bend.sinister,
      true,
      true,
    )

    this.value = (
      <Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.translate(
              fessPoint.x,
              fessPoint.y
            )
            ctx.rotate(q)
            ctx.rect(-dimen / 2, -t / 2, dimen, t)
            ctx.reset()
          }}
        >
          {this.renderSelf(bend.texture)}
        </Group>
        {charges}
      </Group>
    )
  }

  visitSaltire(saltire: Saltire): void {
    const bounds = this.bounds
    const escutcheon = this.escutcheon
    const fessPoint = escutcheon.fessPoint

    const w = bounds.width
    const h = bounds.height
    const t = Math.min(w, h * this.T)
    const dimen = Math.SQRT2 * (w + h) / 2

    const q1 = slope(escutcheon.bendFunction)
    const q2 = slope(escutcheon.bendSinisterFunction)

    const chargesCount = this.assertChargesCount(
      saltire.charges, 5
    )
    const chargeSize = 0.5 * Math.SQRT2 * t * this.CONTENT_TO_SPACE_RATIO

    const hor = Math.min(
      fessPoint.distanceX(escutcheon.dexterChief),
      fessPoint.distanceX(escutcheon.dexterBase),
      fessPoint.distanceX(escutcheon.sinisterChief),
      fessPoint.distanceX(escutcheon.sinisterBase),
    )
    const vert = Math.min(
      fessPoint.distanceY(escutcheon.dexterChief),
      fessPoint.distanceY(escutcheon.dexterBase),
      fessPoint.distanceY(escutcheon.sinisterChief),
      fessPoint.distanceY(escutcheon.sinisterBase),
    )
    const charges = this.renderInSaltire(
      saltire.charges,
      chargeSize,
      new Rectangle(
        fessPoint.y - vert, fessPoint.x - hor, fessPoint.y + vert, fessPoint.x + hor
      )
    )

    this.value = (
      <Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.translate(
              fessPoint.x,
              fessPoint.y
            )
            ctx.rotate(q1)
            ctx.rect(-dimen / 2, -t / 2, dimen, t)
            ctx.reset()
            ctx.translate(
              fessPoint.x,
              fessPoint.y
            )
            ctx.rotate(q2)
            ctx.rect(-dimen / 2, -t / 2, dimen, t)
            ctx.reset()
          }}
        >
          {this.renderSelf(saltire.texture)}
        </Group>
        {charges}
      </Group>
    )
  }

  // Charge group
  private renderInPale(
    charges: Charge[],
    chargeSize: number,
    rect: Rectangle,
    startPadding: boolean,
    endPadding: boolean
  ) {
    const chargesCount = charges.length
    const height = rect.height
    if (height / chargesCount < chargeSize) {
      console.error("Cannot render " + chargesCount + " charges of size " + chargeSize + " on " + height + " pale")
      return
    }
    let spacersCount = chargesCount - 1
    if (startPadding) {
      spacersCount++
    }
    if (endPadding) {
      spacersCount++
    }
    const spacerHeight = (height - chargeSize * chargesCount) / spacersCount

    const result = []
    for (let i = 0; i < chargesCount; i++) {
      const x = rect.centerHorizontal - chargeSize / 2//rect.left + (startPadding ? spacerWidth : 0) + chargeSize / 2 + i * (spacerWidth + chargeSize) - chargeSize / 2
      const y = rect.top + + (startPadding ? spacerHeight : 0) + chargeSize / 2 + i * (spacerHeight + chargeSize) - chargeSize / 2
      result.push(
        <Group
          x={x}
          y={y}>
          {this.renderSelf(charges[i], chargeSize, chargeSize)}
        </Group>
      )
    }

    return result
  }

  private renderInFess(
    charges: Charge[],
    chargeSize: number,
    rect: Rectangle,
    startPadding: boolean,
    endPadding: boolean
  ) {
    const chargesCount = charges.length
    const width = rect.width
    if (width / chargesCount < chargeSize) {
      console.error("Cannot render " + chargesCount + " charges of size " + chargeSize + " on " + width + " fess")
      return
    }
    let spacersCount = chargesCount - 1
    if (startPadding) {
      spacersCount++
    }
    if (endPadding) {
      spacersCount++
    }
    const spacerWidth = (width - chargeSize * chargesCount) / spacersCount

    const result = []
    for (let i = 0; i < chargesCount; i++) {
      const x = rect.left + (startPadding ? spacerWidth : 0) + chargeSize / 2 + i * (spacerWidth + chargeSize) - chargeSize / 2
      const y = rect.centerVertical - chargeSize / 2
      result.push(
        <Group
          x={x}
          y={y}>
          {this.renderSelf(charges[i], chargeSize, chargeSize)}
        </Group>
      )
    }

    return result
  }

  private renderInCross(
    charges: Charge[],
    chargeSize: number,
    rect: Rectangle,
    center: Point
  ) {
    const chargesCount = charges.length
    const dexter = new Point(
      (center.x + rect.left) / 2, center.y
    )
    const sinister = new Point(
      (center.x + rect.right) / 2, center.y
    )
    const chief = new Point(
      center.x, (center.y + rect.top) / 2
    )
    const base = new Point(
      center.x, (center.y + rect.bottom) / 2
    )

    let points: Point[] = []
    if (chargesCount === 1) {
      points = [center]
    } else if (chargesCount === 2) {
      points = [dexter, sinister]
    } else if (chargesCount === 3) {
      points = [dexter, sinister, chief]
    } else if (chargesCount === 4) {
      points = [dexter, sinister, chief, base]
    } else if (chargesCount === 5) {
      points = [center, dexter, sinister, chief, base]
    }

    return points.map((point, index) => {
      return (
        < Group
          x={point.x - chargeSize / 2}
          y={point.y - chargeSize / 2} >
          {this.renderSelf(charges[index], chargeSize, chargeSize)}
        </Group >
      )
    })
  }

  private renderInBend(
    charges: Charge[],
    chargeSize: number,
    rect: Rectangle,
    sinister: boolean,
    startPadding: boolean,
    endPadding: boolean
  ) {
    const chargesCount = charges.length
    const diagonal = rect.diagonal
    const chargeDiagonal = chargeSize * Math.SQRT2
    if (diagonal / chargesCount < chargeDiagonal) {
      console.error("Cannot render " + chargesCount + " charges of size " + chargeSize + " on " + diagonal + " bend")
      return
    }
    const dX = (rect.right - rect.left) / diagonal
    const dY = (sinister ? -1 : 1) * (rect.bottom - rect.top) / diagonal
    let spacersCount = chargesCount - 1
    if (startPadding) {
      spacersCount++
    }
    if (endPadding) {
      spacersCount++
    }
    const spacerDiagonal = (diagonal - (chargeDiagonal * chargesCount)) / spacersCount

    const result = []
    for (let i = 0; i < chargesCount; i++) {
      const d = i * (spacerDiagonal + chargeDiagonal) + (startPadding ? spacerDiagonal : 0) + chargeDiagonal / 2
      const x = rect.left + d * dX - chargeSize / 2
      const y = (sinister ? rect.bottom : rect.top) + d * dY - chargeSize / 2
      result.push(
        <Group
          x={x}
          y={y}>
          {this.renderSelf(charges[i], chargeSize, chargeSize)}
        </Group>
      )
    }

    return result
  }

  private renderInSaltire(
    charges: Charge[],
    chargeSize: number,
    rect: Rectangle
  ) {
    const chargesCount = charges.length
    const center = rect.center
    const dexterChief = new Point(
      (center.x + rect.left) / 2, (center.y + rect.top) / 2
    )
    const dexterBase = new Point(
      (center.x + rect.left) / 2, (center.y + rect.bottom) / 2
    )
    const sinisterChief = new Point(
      (center.x + rect.right) / 2, (center.y + rect.top) / 2
    )
    const sinisterBase = new Point(
      (center.x + rect.right) / 2, (center.y + rect.bottom) / 2
    )

    let points: Point[] = []
    if (chargesCount === 1) {
      points = [center]
    } else if (chargesCount === 2) {
      points = [dexterChief, sinisterChief]
    } else if (chargesCount === 3) {
      points = [center, dexterChief, sinisterChief]
    } else if (chargesCount === 4) {
      points = [dexterChief, sinisterChief, dexterBase, sinisterBase]
    } else if (chargesCount === 5) {
      points = [center, dexterChief, sinisterChief, dexterBase, sinisterBase]
    }

    return points.map((point, index) => {
      return (
        < Group
          x={point.x - chargeSize / 2}
          y={point.y - chargeSize / 2} >
          {this.renderSelf(charges[index], chargeSize, chargeSize)}
        </Group >
      )
    })
  }

  visitInFess(inFess: InFess): void {
    const w = this.viewportWidth
    const h = this.viewportHeight
    const dimen = Math.min(w, h)
    const rect = new Rectangle(
      (h - dimen) / 2, (w - dimen) / 2,
      (h + dimen) / 2, (w + dimen) / 2
    )
    const chargeSize = (w * this.CONTENT_TO_SPACE_RATIO) / inFess.charges.length

    this.value = this.renderInFess(
      inFess.charges,
      chargeSize,
      rect,
      false,
      false
    )
  }

  visitInPale(inPale: InPale): void {
    const w = this.viewportWidth
    const h = this.viewportHeight
    const dimen = Math.min(w, h)
    const rect = new Rectangle(
      (h - dimen) / 2, (w - dimen) / 2,
      (h + dimen) / 2, (w + dimen) / 2
    )
    const chargeSize = (h * this.CONTENT_TO_SPACE_RATIO) / inPale.charges.length

    this.value = this.renderInPale(
      inPale.charges,
      chargeSize,
      rect,
      false,
      false
    )
  }

  visitInBend(inBend: InBend): void {
    const w = this.viewportWidth
    const h = this.viewportHeight
    const dimen = Math.min(w, h)
    const rect = new Rectangle(
      (h - dimen) / 2, (w - dimen) / 2,
      (h + dimen) / 2, (w + dimen) / 2
    )
    const chargeSize = (rect.diagonal * this.CONTENT_TO_SPACE_RATIO) / inBend.charges.length

    this.value = this.renderInBend(
      inBend.charges,
      chargeSize,
      rect,
      inBend.sinister,
      false,
      false
    )
  }

  // Mobile Subordinary
  visitRoundel(roundel: Roundel): void {
    const w = this.viewportWidth
    const h = this.viewportHeight
    const dimen = Math.min(w, h)

    this.value = (
      <Group
        clipFunc={(ctx: Konva.Context) => {
          ctx.arc(
            w / 2, h / 2,
            dimen / 2,
            0, Math.PI * 2,
            false
          )
        }}>
        {this.renderSelf(roundel.tincture)}
      </Group>
    )
  }

  visitBillet(billet: Billet): void {
    const w = this.viewportWidth
    const h = this.viewportHeight
    const dimen = Math.min(w, h)

    this.value = (
      <Group
        clipFunc={(ctx: Konva.Context) => {
          ctx.rect(
            (w - dimen * 0.5) / 2,
            (h - dimen) / 2,
            0.5 * dimen,
            dimen
          )
        }}>
        {this.renderSelf(billet.tincture)}
      </Group>
    )
  }

  visitLozenge(lozenge: Lozenge): void {
    const w = this.viewportWidth
    const h = this.viewportHeight
    const dimen = Math.min(w, h) / 2
    const dimen1 = lozenge.ratio > 1 ? dimen / lozenge.ratio : dimen
    const dimen2 = lozenge.ratio > 1 ? dimen : dimen * lozenge.ratio
    const x = w / 2
    const y = h / 2
    const v = 0.5

    this.value = (
      <Group
        clipFunc={(ctx: Konva.Context) => {
          ctx.moveTo(x, y - dimen2)
          ctx.lineTo(x + dimen1, y)
          ctx.lineTo(x, y + dimen2)
          ctx.lineTo(x - dimen1, y)
          ctx.closePath()
          if (lozenge.type === LozengeType.Mascle) {
            ctx.moveTo(x, y - dimen2 * v)
            ctx.lineTo(x - dimen1 * v, y)
            ctx.lineTo(x, y + dimen2 * v)
            ctx.lineTo(x + dimen1 * v, y)
            ctx.closePath()
          } else if (lozenge.type === LozengeType.Ruste) {
            ctx.arc(x, y, Math.min(dimen1, dimen2) * v, 0, Math.PI * 2, true)
          }
        }}>
        {this.renderSelf(lozenge.tincture)}
      </Group>
    )
  }

  visitMullet(mullet: Mullet): void {
    const w = this.viewportWidth
    const h = this.viewportHeight
    const dimen = Math.min(w, h) / 2

    this.value = (
      <Group
        clipFunc={(ctx: Konva.Context) => {
          let x, y
          let r = Math.PI / 2 * 3
          const step = Math.PI / mullet.points
          ctx.beginPath()
          for (let i = 0; i < mullet.points; i++) {
            x = w / 2 + Math.cos(r) * dimen
            y = h / 2 + Math.sin(r) * dimen
            ctx.lineTo(x, y)
            r += step
            x = w / 2 + Math.cos(r) * dimen / 2
            y = h / 2 + Math.sin(r) * dimen / 2
            ctx.lineTo(x, y)
            r += step
          }
          if (mullet.pierced) {
            ctx.moveTo(w / 2, h / 2)
            ctx.arc(w / 2, h / 2, dimen / 4, 0, Math.PI * 2, true)
          }
        }}>
        {this.renderSelf(mullet.tincture)}
      </Group>
    )
  }

  visitColorTincture(colorTincture: ColorTincture): void {
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

  visitMetalTincture(metalTincture: MetalTincture): void {
    this.value = (
      <Rect
        x={0}
        y={0}
        width={this.viewportWidth}
        height={this.viewportHeight}
        fill={metalTincture.colorHex}
      />
    )
  }

  private assertChargesCount(charges: Charge[], max: number): number {
    if (charges.length > max) {
      console.warn("Only up to " + max + " charges is supported!")
      console.warn("From " + charges.length + " only " + max + " will be used")
    }
    return Math.min(charges.length, max)
  }

  private renderSelf(
    visitable: Visitable<Renderable>,
    width: number = this.viewportWidth,
    height: number = this.viewportHeight,
    escutcheon: Escutcheon = this.escutcheon
  ): React.ReactNode {
    let renderer = new PlainCrestRenderer(width, height, escutcheon)
    return renderer.render(visitable)
  }

  private readonly T: number = 0.25
  private readonly CONTENT_TO_SPACE_RATIO = 0.666
}

export default PlainCrestRenderer
