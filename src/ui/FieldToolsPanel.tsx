import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select } from "@material-ui/core"
import React, { useRef, useState } from "react"
import { CrestPaletteContext } from "../CrestPaletteContext"
import Crest from "../model/Crest"
import { PerBendDividedField, PerChevronDividedField, PerCrossDividedField, PerFessDividedField, PerPaleDividedField, PerPallDividedField, PerSaltireDividedField } from "../model/field/DividedField"
import Field from "../model/field/Field"
import SolidField from "../model/field/SolidField"
import Texture from "../model/texture/Texture"
import { ColorTincture } from "../model/texture/Tincture"
import { Chequy } from "../model/texture/VariationTexture"
import { FieldVisitor } from "../util/Visitor"
import { TextureToolsPanel } from "./TextureToolsPanel"

type FieldToolsPanelProps = {
  field: Field
  onChange?: (field: Field) => void
}

export const FieldToolsPanel = (props: FieldToolsPanelProps) => {
  const crestPalette = React.useContext(CrestPaletteContext)

  const [field, setField] = useState<Field>(props.field)

  React.useEffect(() => {
    props.onChange ?.(field)
  }, [field])

  const options = getOptions(
    [
      new ColorTincture(crestPalette.gules),
      new ColorTincture(crestPalette.vert),
      new ColorTincture(crestPalette.azure)
    ]
  )

  const content = getContent(
    field,
    (field: Field) => { setField(field) }
  )

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as number
    setField(options[selectedValue].factoryFunc())
  }

  /*return (
    <Paper>
      {content}
    </Paper>
  )*/
  /*return (
    <Paper>
      <FormGroup row>
        <FormControl >
          <InputLabel id="field-type-select-label">Field type</InputLabel>
          <Select
            labelId="field-type-select-label"
            id="field-type-select"
            value={baseData.type}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setBaseData({
                type: event.target.value as FieldType
              })
            }}
          >
            {Array.from(fieldDivisionTypes).map(([key, value]) => {
              return (< MenuItem value={key} >{value}</MenuItem>)
            })}
          </Select>
        </FormControl>
      </FormGroup>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
      bbbccc
    </Paper >
  )*/
  return (
    <Paper>
      <FormControl>
        <InputLabel htmlFor="field-type-select">Type</InputLabel>
        <Select
          native
          onChange={handleChange}
          inputProps={{
            id: 'field-type-select',
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
  field: Field,
  onChange: (field: Field) => void
): React.ReactNode {
  let content = null

  const contentVisitor: FieldVisitor = {
    visitSolidField: (field: SolidField) => {
      content = (
        <TextureToolsPanel
          texture={field.texture}
          onTextureChange={(texture: Texture) => {
            onChange(new SolidField(texture))
          }}
        />
      )
    },
    visitPerFessDividedField: (field: PerFessDividedField) => {
      content = (
        <MultiTextureToolsPanel
          textures={[field.texture1, field.texture2]}
          onChange={(textures: Texture[]) => {
            onChange(new PerFessDividedField(
              textures[0], textures[1]
            ))
          }}
        />
      )
    },
    visitPerPaleDividedField: (field: PerPaleDividedField) => {
      content = (
        <MultiTextureToolsPanel
          textures={[field.texture1, field.texture2]}
          onChange={(textures: Texture[]) => {
            onChange(new PerPaleDividedField(
              textures[0], textures[1]
            ))
          }}
        />
      )
    },
    visitPerBendDividedField: (field: PerBendDividedField) => {
      content = (
        <MultiTextureToolsPanel
          textures={[field.texture1, field.texture2]}
          onChange={(textures: Texture[]) => {
            onChange(new PerBendDividedField(
              textures[0], textures[1], field.sinister
            ))
          }}
        />
      )
    },
    visitPerSaltireDividedField: (field: PerSaltireDividedField) => {
      content = (
        <MultiTextureToolsPanel
          textures={[field.texture1, field.texture2]}
          onChange={(textures: Texture[]) => {
            onChange(new PerSaltireDividedField(
              textures[0], textures[1]
            ))
          }}
        />
      )
    },
    visitPerCrossDividedField: (field: PerCrossDividedField) => {
      content = (
        <MultiTextureToolsPanel
          textures={[field.texture1, field.texture2]}
          onChange={(textures: Texture[]) => {
            onChange(new PerCrossDividedField(
              textures[0], textures[1]
            ))
          }}
        />
      )
    },
    visitPerChevronDividedField: (field: PerChevronDividedField) => {
      content = (
        <MultiTextureToolsPanel
          textures={[field.texture1, field.texture2]}
          onChange={(textures: Texture[]) => {
            onChange(new PerChevronDividedField(
              textures[0], textures[1], field.inverted
            ))
          }}
        />
      )
    },
    visitPerPallDividedField: (field: PerPallDividedField) => {
      content = (
        <MultiTextureToolsPanel
          textures={[field.texture1, field.texture2, field.texture3]}
          onChange={(textures: Texture[]) => {
            onChange(new PerPallDividedField(
              textures[0], textures[1], textures[2], field.inverted
            ))
          }}
        />
      )
    }
  }

  field.accept(contentVisitor)

  return content
}

type MultiTextureToolsPanel = {
  textures: Texture[],
  onChange: (textures: Texture[]) => void
}

const MultiTextureToolsPanel = (props: MultiTextureToolsPanel) => {
  const count = props.textures.length
  const panels = []
  for (let i = 0; i < count; i++) {
    panels.push(
      <TextureToolsPanel
        texture={props.textures[0]}
        onTextureChange={(texture: Texture) => {
          const newTextures = [...props.textures]
          newTextures[i] = texture
          props.onChange(newTextures)
        }}
      />
    )
  }

  return (
    <>{panels}</>
  )
}

type FieldOption = {
  label: string,
  factoryFunc: () => Field,
}

function getOptions(textures: Texture[]): FieldOption[] {
  return [
    {
      label: "Solid",
      factoryFunc: () => {
        return new SolidField(textures[0])
      }
    },
    {
      label: "Per fess",
      factoryFunc: () => {
        return new PerFessDividedField(
          textures[0],
          textures[1]
        )
      }
    },
    {
      label: "Per pale",
      factoryFunc: () => {
        return new PerPaleDividedField(
          textures[0],
          textures[1]
        )
      }
    },
    {
      label: "Per bend",
      factoryFunc: () => {
        return new PerBendDividedField(
          textures[0],
          textures[1],
          false
        )
      }
    },
    {
      label: "Per bend sinister",
      factoryFunc: () => {
        return new PerBendDividedField(
          textures[0],
          textures[1],
          true
        )
      }
    },
    {
      label: "Per saltire",
      factoryFunc: () => {
        return new PerSaltireDividedField(
          textures[0],
          textures[1]
        )
      }
    },
    {
      label: "Per cross",
      factoryFunc: () => {
        return new PerCrossDividedField(
          textures[0],
          textures[1]
        )
      }
    },
    {
      label: "Per chevron",
      factoryFunc: () => {
        return new PerChevronDividedField(
          textures[0],
          textures[1],
          false
        )
      }
    },
    {
      label: "Per chevron inverted",
      factoryFunc: () => {
        return new PerChevronDividedField(
          textures[0],
          textures[1],
          true
        )
      }
    },
    {
      label: "Per pall",
      factoryFunc: () => {
        return new PerPallDividedField(
          textures[0],
          textures[1],
          textures[2],
          false
        )
      }
    },
    {
      label: "Per pall inverted",
      factoryFunc: () => {
        return new PerPallDividedField(
          textures[0],
          textures[1],
          textures[2],
          true
        )
      }
    },
  ]
}
