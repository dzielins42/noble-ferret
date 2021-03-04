import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from "@material-ui/core"
import React, { useState } from "react"
import { CrestPaletteContext } from "../CrestPaletteContext"
import { ColorTincture, MetalTincture, randomTincture, Tincture } from "../model/texture/Tincture"
import { useNonInitialEffect } from "../util/Hooks"
import { BaseTextureVisitor } from "../util/Visitor"

type TinctureToolsPanelProps = {
  tincture?: Tincture
  onChange?: (tincture: Tincture) => void
}

type MultiTinctureToolsPanelProps = {
  tinctures: Tincture[]
  onChange?: (tinctures: Tincture[]) => void
}

export const TinctureToolsPanel = (props: TinctureToolsPanelProps) => {
  const crestPalette = React.useContext(CrestPaletteContext)

  const [tincture, setTincture] = useState<Tincture>(() => {
    if (props.tincture === null || props.tincture === undefined) {
      return randomTincture(crestPalette)
    } else {
      return props.tincture!
    }
  })

  useNonInitialEffect(() => {
    props.onChange ?.(tincture)
  }, [tincture])

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
      initialValue = colors.find(({ hex }) => texture.colorHex === hex) ?.value
    }
    visitMetalTincture(metalTincture: MetalTincture): void {
      initialValue = metals.find(({ hex }) => metalTincture.colorHex === hex) ?.value
    }
  }()
  tincture.accept(tinctureVisitor)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value
    let hex

    // Metal
    hex = metals.find(({ value, label, hex }) => selectedValue === value) ?.hex
    if (hex !== undefined) {
      setTincture(new MetalTincture(hex))
      return
    }
    // Color
    hex = colors.find(({ value, label, hex }) => selectedValue === value) ?.hex
    if (hex !== undefined) {
      setTincture(new ColorTincture(hex))
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
        onChange={(tincture: Tincture) => {
          const newTinctures = [...props.tinctures]
          newTinctures[i] = tincture
          props.onChange ?.(newTinctures)
        }}
      />
    )
  }

  return (
    <>{tincturePanels}</>
  )
}
