import { FormControl, InputLabel, Paper, Select, TextField } from "@material-ui/core"
import _ from "lodash"
import React from "react"
import CrestPalette from "../CrestPalette"
import { CrestPaletteContext } from "../CrestPaletteContext"
import Texture from "../model/texture/Texture"
import { ColorTincture, MetalTincture, randomTincture, Tincture } from "../model/texture/Tincture"
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, Ruste } from "../model/texture/VariationTexture"
import { useNonInitialEffect } from "../util/Hooks"
import { TextureVisitor } from "../util/Visitor"
import { MultiTinctureToolsPanel, TinctureToolsPanel } from "./TinctureToolsPanel"

type TextureToolsPanelProps = {
  texture: Texture
  onChange?: (texture: Texture) => void
}

type TextureOption = {
  label: string,
  factoryFunc: () => Texture,
}

export const TextureToolsPanel = (props: TextureToolsPanelProps) => {
  const crestPalette = React.useContext(CrestPaletteContext)

  const [texture, setTexture] = React.useState<Texture>(props.texture)

  useNonInitialEffect(() => {
    props.onChange ?.(texture)
  }, [texture])

  const tinctures = getTinctures(
    texture,
    2,
    crestPalette
  )
  const parameter = getParameter(
    texture
  )

  const options = getOptions(
    tinctures, parameter
  )

  const selectedValue = options.findIndex((option: TextureOption) => {
    return _.isEqual(texture, option.factoryFunc())
  })

  const content = getContent(
    texture,
    (texture: Texture) => {
      setTexture(texture)
    }
  )

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as number
    setTexture(options[selectedValue].factoryFunc())
  }

  return (
    <Paper>
      <FormControl>
        <InputLabel htmlFor="texture-type-select">Type</InputLabel>
        <Select
          native
          value={selectedValue}
          onChange={handleChange}
          inputProps={{
            id: 'texture-type-select',
          }}
        >
          {options.map(({ label }, index) => {
            return (<option value={index}>{label}</option>)
          })}
        </Select>
      </FormControl>
      {content}
    </Paper>
  )
}

function getContent(
  texture: Texture,
  func: (texture: Texture) => void
): React.ReactNode {
  let content = null

  const contentVisitor: TextureVisitor = {
    // Tincture
    visitColorTincture: (colorTincture: ColorTincture) => {
      content = (
        <TinctureToolsPanel
          tincture={colorTincture}
          onChange={(tincture: Tincture) => {
            func(tincture)
          }}
        />
      )
    },
    visitMetalTincture: (metalTincture: MetalTincture) => {
      content = (
        <TinctureToolsPanel
          tincture={metalTincture}
          onChange={(tincture: Tincture) => {
            func(tincture)
          }}
        />
      )
    },
    // Variation
    visitBarry: (barry: Barry) => {
      content = (
        <ParameterizedTwoPartVariationTextureToolsPanel
          tinctures={[barry.tincture1, barry.tincture2]}
          parameter={barry.count}
          onTincturesChange={(tinctures: Tincture[]) => {
            func(new Barry(
              tinctures[0],
              tinctures[1],
              barry.count
            ))
          }}
          onParameterChange={(parameter: number) => {
            func(new Barry(
              barry.tincture1,
              barry.tincture2,
              parameter
            ))
          }}
        />
      )
    },
    visitPaly: (paly: Paly) => {
      content = (
        <ParameterizedTwoPartVariationTextureToolsPanel
          tinctures={[paly.tincture1, paly.tincture2]}
          parameter={paly.count}
          onTincturesChange={(tinctures: Tincture[]) => {
            func(new Paly(
              tinctures[0],
              tinctures[1],
              paly.count
            ))
          }}
          onParameterChange={(parameter: number) => {
            func(new Paly(
              paly.tincture1,
              paly.tincture2,
              parameter
            ))
          }}
        />
      )
    },
    visitBendy: (bendy: Bendy) => {
      content = (
        <ParameterizedTwoPartVariationTextureToolsPanel
          tinctures={[bendy.tincture1, bendy.tincture2]}
          parameter={bendy.count}
          onTincturesChange={(tinctures: Tincture[]) => {
            func(new Bendy(
              tinctures[0],
              tinctures[1],
              bendy.count,
              bendy.sinister
            ))
          }}
          onParameterChange={(parameter: number) => {
            func(new Bendy(
              bendy.tincture1,
              bendy.tincture2,
              parameter,
              bendy.sinister
            ))
          }}
        />
      )
    },
    visitChequy: (chequy: Chequy) => {
      content = (
        <ParameterizedTwoPartVariationTextureToolsPanel
          tinctures={[chequy.tincture1, chequy.tincture2]}
          parameter={chequy.count}
          onTincturesChange={(tinctures: Tincture[]) => {
            func(new Chequy(
              tinctures[0],
              tinctures[1],
              chequy.count
            ))
          }}
          onParameterChange={(parameter: number) => {
            func(new Chequy(
              chequy.tincture1,
              chequy.tincture2,
              parameter
            ))
          }}
        />
      )
    },
    visitLozengy: (lozengy: Lozengy) => {
      content = (
        <ParameterizedTwoPartVariationTextureToolsPanel
          tinctures={[lozengy.tincture1, lozengy.tincture2]}
          parameter={lozengy.count}
          onTincturesChange={(tinctures: Tincture[]) => {
            func(new Lozengy(
              tinctures[0],
              tinctures[1],
              lozengy.count
            ))
          }}
          onParameterChange={(parameter: number) => {
            func(new Lozengy(
              lozengy.tincture1,
              lozengy.tincture2,
              parameter
            ))
          }}
        />
      )
    },
    visitFusilly: (fusilly: Fusilly) => {
      content = (
        <ParameterizedTwoPartVariationTextureToolsPanel
          tinctures={[fusilly.tincture1, fusilly.tincture2]}
          parameter={fusilly.count}
          onTincturesChange={(tinctures: Tincture[]) => {
            func(new Fusilly(
              tinctures[0],
              tinctures[1],
              fusilly.count
            ))
          }}
          onParameterChange={(parameter: number) => {
            func(new Fusilly(
              fusilly.tincture1,
              fusilly.tincture2,
              parameter
            ))
          }}
        />
      )
    },
    visitRuste: (ruste: Ruste) => {
      content = (
        <ParameterizedTwoPartVariationTextureToolsPanel
          tinctures={[ruste.tincture1, ruste.tincture2]}
          parameter={ruste.count}
          onTincturesChange={(tinctures: Tincture[]) => {
            func(new Ruste(
              tinctures[0],
              tinctures[1],
              ruste.count
            ))
          }}
          onParameterChange={(parameter: number) => {
            func(new Ruste(
              ruste.tincture1,
              ruste.tincture2,
              parameter
            ))
          }}
        />
      )
    },
  }

  texture.accept(contentVisitor)

  return content
}

function getOptions(
  tinctures: Tincture[],
  parameter: number | undefined
): TextureOption[] {
  return [
    {
      label: "Solid",
      factoryFunc: () => {
        return tinctures[0]
      }
    },
    {
      label: "Barry",
      factoryFunc: () => {
        return new Barry(
          tinctures[0],
          tinctures[1],
          parameter,
        )
      }
    },
    {
      label: "Paly",
      factoryFunc: () => {
        return new Paly(
          tinctures[0],
          tinctures[1],
          parameter,
        )
      }
    },
    {
      label: "Bendy",
      factoryFunc: () => {
        return new Bendy(
          tinctures[0],
          tinctures[1],
          parameter,
          false
        )
      }
    },
    {
      label: "Bendy sinister",
      factoryFunc: () => {
        return new Bendy(
          tinctures[0],
          tinctures[1],
          parameter,
          true
        )
      }
    },
    {
      label: "Chequy",
      factoryFunc: () => {
        return new Chequy(
          tinctures[0],
          tinctures[1],
          parameter,
        )
      }
    },
    {
      label: "Lozengy",
      factoryFunc: () => {
        return new Lozengy(
          tinctures[0],
          tinctures[1],
          parameter,
        )
      }
    },
    {
      label: "Fusilly",
      factoryFunc: () => {
        return new Fusilly(
          tinctures[0],
          tinctures[1],
          parameter,
        )
      }
    },
    {
      label: "Ruste",
      factoryFunc: () => {
        return new Ruste(
          tinctures[0],
          tinctures[1],
          parameter,
        )
      }
    },
  ]
}

function getParameter(
  texture: Texture
): number | undefined {
  let result = undefined

  const visitor: TextureVisitor = {
    // Tincture
    visitColorTincture: () => { },
    visitMetalTincture: () => { },
    // Variation
    visitBarry: (barry: Barry) => {
      result = barry.count
    },
    visitPaly: (paly: Paly) => {
      result = paly.count
    },
    visitBendy: (bendy: Bendy) => {
      result = bendy.count
    },
    visitChequy: (chequy: Chequy) => {
      result = chequy.count
    },
    visitLozengy: (lozengy: Lozengy) => {
      result = lozengy.count
    },
    visitFusilly: (fusilly: Fusilly) => {
      result = fusilly.count
    },
    visitRuste: (ruste: Ruste) => {
      result = ruste.count
    },
  }

  texture.accept(visitor)

  return result
}

function getTinctures(
  texture: Texture,
  minCount: number,
  crestPalette: CrestPalette
): Tincture[] {
  const tinctures: Tincture[] = []

  const visitor: TextureVisitor = {
    // Tincture
    visitColorTincture: (colorTincture: ColorTincture) => {
      tinctures.push(colorTincture)
    },
    visitMetalTincture: (metalTincture: MetalTincture) => {
      tinctures.push(metalTincture)
    },
    // Variation
    visitBarry: (barry: Barry) => {
      tinctures.push(barry.tincture1)
      tinctures.push(barry.tincture2)
    },
    visitPaly: (paly: Paly) => {
      tinctures.push(paly.tincture1)
      tinctures.push(paly.tincture2)
    },
    visitBendy: (bendy: Bendy) => {
      tinctures.push(bendy.tincture1)
      tinctures.push(bendy.tincture2)
    },
    visitChequy: (chequy: Chequy) => {
      tinctures.push(chequy.tincture1)
      tinctures.push(chequy.tincture2)
    },
    visitLozengy: (lozengy: Lozengy) => {
      tinctures.push(lozengy.tincture1)
      tinctures.push(lozengy.tincture2)
    },
    visitFusilly: (fusilly: Fusilly) => {
      tinctures.push(fusilly.tincture1)
      tinctures.push(fusilly.tincture2)
    },
    visitRuste: (ruste: Ruste) => {
      tinctures.push(ruste.tincture1)
      tinctures.push(ruste.tincture2)
    },
  }

  texture.accept(visitor)

  while (tinctures.length < minCount) {
    tinctures.push(randomTincture(crestPalette))
  }

  return tinctures
}

type ParameterizedTwoPartVariationTextureToolsPanelProps = {
  tinctures: Tincture[]
  parameter: number
  onTincturesChange: (tinctures: Tincture[]) => void
  onParameterChange: (parameter: number) => void
}

const ParameterizedTwoPartVariationTextureToolsPanel = (props: ParameterizedTwoPartVariationTextureToolsPanelProps) => {
  return (
    <>
      <MultiTinctureToolsPanel
        tinctures={
          [props.tinctures[0], props.tinctures[1]]
        }
        onChange={(tinctures: Tincture[]) => {
          props.onTincturesChange(tinctures)
        }}
      />
      <TextField
        label="Number"
        type="number"
        value={props.parameter}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const parameter = parseInt(event.target.value)
          props.onParameterChange(parameter)
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  )
}
