import { FormControl, InputLabel, Paper, Select, TextField } from "@material-ui/core"
import React from "react"
import CrestPalette from "../CrestPalette"
import { CrestPaletteContext } from "../CrestPaletteContext"
import ColorTincture from "../model/texture/ColorTincture"
import Texture from "../model/texture/Texture"
import Tincture from "../model/texture/Tincture"
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, ParameterizedTwoPartVariationTexture, Ruste } from "../model/texture/VariationTexture"
import { TextureVisitor } from "../util/Visitor"
import { MultiTinctureToolsPanel, TinctureToolsPanel } from "./TinctureToolsPanel"

type TextureToolsPanelProps = {
  texture: Texture
  onTextureChange?: (texture: Texture) => void
}

type TextureOption = {
  label: string,
  factoryFunc: () => Texture,
}

export const TextureToolsPanel = (props: TextureToolsPanelProps) => {
  const crestPalette = React.useContext(CrestPaletteContext)

  const [texture, setTexture] = React.useState<Texture>(props.texture)

  React.useEffect(() => {
    props.onTextureChange ?.(texture)
  }, [texture])

  const tinctures = getTinctures(
    texture,
    2,
    crestPalette
  )

  const options = getOptions(
    tinctures
  )

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
          onTinctureChange={(tincture: Tincture) => {
            func(tincture)
          }}
        />
      )
    },
    // Variation
    visitBarry: (barry: Barry) => {
      content = (
        <ParameterizedTwoPartVariationTextureToolsPanel
          texture={barry}
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
          texture={paly}
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
          texture={bendy}
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
          texture={chequy}
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
          texture={lozengy}
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
          texture={fusilly}
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
          texture={ruste}
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

function getOptions(tinctures: Tincture[]): TextureOption[] {
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
        )
      }
    },
    {
      label: "Paly",
      factoryFunc: () => {
        return new Paly(
          tinctures[0],
          tinctures[1],
        )
      }
    },
    {
      label: "Bendy",
      factoryFunc: () => {
        return new Bendy(
          tinctures[0],
          tinctures[1],
          3,
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
          3,
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
        )
      }
    },
    {
      label: "Lozengy",
      factoryFunc: () => {
        return new Lozengy(
          tinctures[0],
          tinctures[1],
        )
      }
    },
    {
      label: "Fusilly",
      factoryFunc: () => {
        return new Fusilly(
          tinctures[0],
          tinctures[1],
        )
      }
    },
    {
      label: "Ruste",
      factoryFunc: () => {
        return new Ruste(
          tinctures[0],
          tinctures[1],
        )
      }
    },
  ]
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
    tinctures.push(new ColorTincture(crestPalette.randomColor()))
  }

  return tinctures
}

type ParameterizedTwoPartVariationTextureToolsPanelProps = {
  texture: ParameterizedTwoPartVariationTexture
  onTincturesChange: (tinctures: Tincture[]) => void
  onParameterChange: (parameter: number) => void
}

const ParameterizedTwoPartVariationTextureToolsPanel = (props: ParameterizedTwoPartVariationTextureToolsPanelProps) => {
  return (
    <>
      <MultiTinctureToolsPanel
        tinctures={
          [props.texture.tincture1, props.texture.tincture2]
        }
        onTincturesChange={(tinctures: Tincture[]) => {
          props.onTincturesChange(tinctures)
        }}
      />
      <TextField
        label="Number"
        type="number"
        value={props.texture.count}
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
