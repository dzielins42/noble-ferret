import { FormControl, InputLabel, Paper, Select } from "@material-ui/core"
import _ from "lodash"
import React from "react"
import CircleEscutcheon from "../model/escutcheon/CircleEscutcheon"
import Escutcheon from "../model/escutcheon/Escutcheon"
import HeaterEscutcheon from "../model/escutcheon/HeaterEscutcheon"
import RectangleEscutcheon from "../model/escutcheon/RectangleEscutcheon"
import { useNonInitialEffect } from "../util/Hooks"

type EscutcheonToolsPanelProps = {
  escutcheon: Escutcheon,
  onChange?: (escutcheon: Escutcheon) => void
}

export const EscutcheonToolsPanel = (props: EscutcheonToolsPanelProps) => {
  const [escutcheon, setEscutcheon] = React.useState(props.escutcheon)

  useNonInitialEffect(() => {
    props.onChange ?.(escutcheon)
  }, [escutcheon])

  const options = getOptions()

  let selectedValue = -1
  for (let i = 0; i < options.length; i++) {
    if (_.isEqual(escutcheon, options[i].factoryFunc())) {
      selectedValue = i
      break
    }
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as number
    setEscutcheon(options[selectedValue].factoryFunc())
  }

  return (
    <FormControl>
      <InputLabel htmlFor="escutcheon-type-select">Type</InputLabel>
      <Select
        native
        value={selectedValue}
        onChange={handleChange}
        inputProps={{
          id: 'escutcheon-type-select',
        }}
      >
        {selectedValue < 0 &&
          <option aria-label="None" value="-1" />
        }
        {options.map(({ label }, index) => {
          return (<option value={index}>{label}</option>)
        })}
      </Select>
    </FormControl>
  )
}

type EscutcheonOption = {
  label: string,
  factoryFunc: () => Escutcheon,
}

function getOptions(): EscutcheonOption[] {
  return [
    {
      label: "Heater",
      factoryFunc: () => {
        return new HeaterEscutcheon(100)
      }
    },
    {
      label: "Square",
      factoryFunc: () => {
        return new RectangleEscutcheon(400, 400)
      }

    },
    {
      label: "Flag (2:3)",
      factoryFunc: () => {
        return new RectangleEscutcheon(300, 200)
      }
    },
    {
      label: "Flag (1:2)",
      factoryFunc: () => {
        return new RectangleEscutcheon(400, 200)
      }
    },
    {
      label: "Circle",
      factoryFunc: () => {
        return new CircleEscutcheon(200)
      }
    },
  ]
}
