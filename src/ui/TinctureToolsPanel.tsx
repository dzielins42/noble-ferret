import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from "@material-ui/core"
import React from "react"
import { CrestPaletteContext } from "../CrestPaletteContext"
import ColorTincture from "../model/texture/ColorTincture"
import MetalTincture from "../model/texture/MetalTincture"
import Tincture from "../model/texture/Tincture"
import { BaseTextureVisitor, TextureVisitor } from "../util/Visitor"

type TinctureToolsPanelProps = {
  tincture?: Tincture
  onTinctureChange?: (tincture: Tincture) => void
}

type MultiTinctureToolsPanelProps = {
  tinctures: Tincture[]
  onTincturesChange?: (tinctures: Tincture[]) => void
}


export const TinctureToolsPanel = (props: TinctureToolsPanelProps) => {
  const crestPalette = React.useContext(CrestPaletteContext)

  const metals: { value: string, label: string, hex: string }[] = [
    { value: "or", label: "Or", hex: crestPalette.or },
    { value: "argent", label: "Argent", hex: crestPalette.argent },
  ]
  const colors: { value: string, label: string, hex: string }[] = [
    { value: "gules", label: "Gules", hex: crestPalette.gules },
    { value: "sable", label: "Sable", hex: crestPalette.sable },
    { value: "azure", label: "Azure", hex: crestPalette.azure },
    { value: "vert", label: "Vert", hex: crestPalette.vert },
    { value: "purple", label: "Purple", hex: crestPalette.purple },
  ]

  let initialValue
  const tinctureVisitor = new class extends BaseTextureVisitor {
    visitColorTincture(texture: ColorTincture): void {
      initialValue = colors.find(({ value, label, hex }) => texture.colorHex === hex) ?.value
    }
  }()

  if (props.tincture === null) {
    new ColorTincture(crestPalette.randomColor()).accept(tinctureVisitor)
  } else {
    props.tincture ?.accept(tinctureVisitor)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value
    let hex

    // Metal
    hex = metals.find(({ value, label, hex }) => selectedValue === value) ?.hex
    if (hex !== undefined) {
      // TODO: Change to MetalTincture
      props.onTinctureChange ?.(new ColorTincture(hex))
      return
    }
    // Color
    hex = colors.find(({ value, label, hex }) => selectedValue === value) ?.hex
    if (hex !== undefined) {
      props.onTinctureChange ?.(new ColorTincture(hex))
      return
    }
  }

  return (
    <Paper>
      <FormControl component="fieldset">
        <RadioGroup value={initialValue} onChange={handleChange}>
          <FormLabel component="legend">Metal</FormLabel>
          {metals.map(({ value, label, hex }) => {
            return (
              <FormControlLabel value={value} control={<Radio />} label={label} />
            )
          })}
          <FormLabel component="legend">Colour</FormLabel>
          {colors.map(({ value, label, hex }) => {
            return (
              <FormControlLabel value={value} control={<Radio />} label={label} />
            )
          })}
        </RadioGroup>
      </FormControl>
    </Paper >
  )
}

export const MultiTinctureToolsPanel = (props: MultiTinctureToolsPanelProps) => {
  const count = props.tinctures.length
  const tincturePanels = []
  for (let i = 0; i < count; i++) {
    tincturePanels.push(
      <TinctureToolsPanel
        tincture={props.tinctures[i]}
        onTinctureChange={(tincture: Tincture) => {
          const newTinctures = [...props.tinctures]
          newTinctures[i] = tincture
          props.onTincturesChange ?.(newTinctures)
        }}
      />
    )
  }

  return (
    <>{tincturePanels}</>
  )
}
