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

  renderSolidField(solidField: SolidField): void {
    var width = this.viewportWidth / 5
    var height = width
    //this.value = renderer.render(solidField.texture)
    /*this.value = (
      <Group
        clipFunc={(ctx: Konva.Context) => {
          ctx.arc(250, 120, 50, 0, Math.PI * 2, false)
        }}>
        {this.renderSelf(solidField.texture)}
      </Group >
    )*/
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
            ctx.beginPath();
            ctx.moveTo(0, fun(0))
            ctx.lineTo(this.viewportWidth, fun(this.viewportWidth))
            ctx.lineTo(this.viewportWidth - q, 0);
            ctx.closePath();
          }}
        >
          {this.renderSelf(field.texture1)}
        </Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath();
            ctx.moveTo(0, fun(0))
            ctx.lineTo(this.viewportWidth, fun(this.viewportWidth))
            ctx.lineTo(q, this.viewportHeight);
            ctx.closePath();
          }}
        >
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
            ctx.beginPath();
            ctx.moveTo(0, fun1(0))
            ctx.lineTo(this.viewportWidth, fun1(this.viewportWidth))
            ctx.lineTo(0, fun2(0))
            ctx.lineTo(this.viewportWidth, fun2(this.viewportWidth))
            ctx.closePath();
          }}
        >
          {this.renderSelf(field.texture1)}
        </Group>
        <Group
          clipFunc={(ctx: Konva.Context) => {
            ctx.beginPath();
            ctx.moveTo(0, fun1(0))
            ctx.lineTo(this.viewportWidth, fun1(this.viewportWidth))
            ctx.lineTo(this.viewportWidth, fun2(this.viewportWidth))
            ctx.lineTo(0, fun2(0))
            ctx.closePath();
          }}
        >
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
            ctx.beginPath();
            ctx.moveTo(0, 0)
            ctx.lineTo(x, 0)
            ctx.lineTo(x, this.viewportHeight)
            ctx.lineTo(this.viewportWidth, this.viewportHeight)
            ctx.lineTo(this.viewportWidth, y)
            ctx.lineTo(0, y)
            ctx.closePath();
          }}
        >
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
            ctx.beginPath();
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
            ctx.closePath();
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

export default PlainCrestRenderer
