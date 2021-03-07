import { Divider, Paper, useTheme } from "@material-ui/core"
import { ToggleButton } from "@material-ui/lab"
import React, { useState } from "react"
import { useStyles } from "../CrestEditor"
import { CrestPaletteContext } from "../CrestPaletteContext"
import { ArgentTincture, AzureTincture, GulesTincture, OrTincture, PurpleTincture, randomTincture, SableTincture, StandardTincture, Tincture, VertTincture } from "../model/texture/Tincture"
import { useNonInitialEffect } from "../util/Hooks"
import { TinctureVisitor } from "../util/Visitor"

type TinctureToolsPanelProps = {
  tincture?: Tincture
  onChange?: (tincture: Tincture) => void
}

type MultiTinctureToolsPanelProps = {
  tinctures: Tincture[]
  onChange?: (tinctures: Tincture[]) => void
}

type TinctureOption = {
  label: string,
  tincture: Tincture,
}

export const TinctureToolsPanel = (props: TinctureToolsPanelProps) => {
  const crestPalette = React.useContext(CrestPaletteContext)
  const classes = useStyles()

  const [tincture, setTincture] = useState<Tincture>(() => {
    if (props.tincture === null || props.tincture === undefined) {
      return randomTincture()
    } else {
      return props.tincture!
    }
  })

  useNonInitialEffect(() => {
    props.onChange ?.(tincture)
  }, [tincture])

  const options: TinctureOption[] = [
    { label: "Or", tincture: OrTincture },
    { label: "Argent", tincture: ArgentTincture },
    { label: "Gules", tincture: GulesTincture },
    { label: "Sable", tincture: SableTincture },
    { label: "Azure", tincture: AzureTincture },
    { label: "Vert", tincture: VertTincture },
    { label: "Purple", tincture: PurpleTincture },
  ]

  return (
    <>
      <div>
        {options.map((option) => {
          return (
            <ToggleButton
              size="small"
              selected={option.tincture === tincture}
              className={classes.tinctureItem}
              onChange={() => {
                setTincture(option.tincture)
              }}
            >
              <div>
                <TinctureSample tincture={option.tincture} />
                {option.label}
              </div>
            </ToggleButton>
          )
        })}
      </div>
    </>
  )
}

type TinctureSampleProps = {
  tincture: Tincture
}

export const TinctureSample = (props: TinctureSampleProps) => {
  const crestPalette = React.useContext(CrestPaletteContext)
  const theme = useTheme();

  let hex = "#000000"
  const tinctureVisitor: TinctureVisitor = {
    visitStandardTincture: (standardTincture: StandardTincture) => {
      hex = standardTincture.getColorHex(crestPalette)
    },
  }
  props.tincture.accept(tinctureVisitor)

  return (
    <Paper
      variant="outlined"
      elevation={0}
      style={{
        width: theme.spacing(3),
        height: theme.spacing(3),
        backgroundColor: hex
      }}
    />
  )
}

export const MultiTinctureToolsPanel = (props: MultiTinctureToolsPanelProps) => {
  const count = props.tinctures.length
  const tincturePanels = []
  for (let i = 0; i < count; i++) {
    tincturePanels.push(
      <>
        <TinctureToolsPanel
          tincture={props.tinctures[i]}
          onChange={(tincture: Tincture) => {
            const newTinctures = [...props.tinctures]
            newTinctures[i] = tincture
            props.onChange ?.(newTinctures)
        }}
        />
        {i < count - 1 && <Divider />}
      </>
    )
  }

  return (
    <>{tincturePanels}</>
  )
}
