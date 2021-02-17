import { Accordion, AccordionDetails, AccordionSummary, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@material-ui/core"
import React from "react"
import AspectRatio from "./AspectRatio"
import CrestPreview from "./CrestPreview"
import { InBend } from "./model/charge/GroupCharge"
import { Roundel } from "./model/charge/MobileSubordinary"
import Crest from "./model/Crest"
import Escutcheon from "./model/escutcheon/Escutcheon"
import HeaterEscutcheon from "./model/escutcheon/HeaterEscutcheon"
import SolidField from "./model/field/SolidField"
import { Saltire } from "./model/ordinary/Ordinary"
import ColorTincture from "./model/texture/ColorTincture"
import { Chequy } from "./model/texture/VariationTexture"
import logo from './logo.svg'
import RectangleEscutcheon from "./model/escutcheon/RectangleEscutcheon"
import { FieldToolsPanel } from "./ui/FieldToolsPanel"
import Field from "./model/field/Field"
import { PerFessDividedField } from "./model/field/DividedField"
import { TinctureToolsPanel } from "./ui/TinctureToolsPanel"
import Tincture from "./model/texture/Tincture"
import { TextureToolsPanel } from "./ui/TextureToolsPanel"
import Texture from "./model/texture/Texture"
import { CrestPaletteContext } from "./CrestPaletteContext"
import { PastelCrestPalette } from "./CrestPalette"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { EscutcheonToolsPanel } from "./ui/EscutcheonToolsPanel"

type CrestEditorProps = {}

type CrestEditorState = {
  escutcheon: Escutcheon,
  crest: Crest
}

type NamedEscutcheon = {
  escutcheon: Escutcheon,
  name: string
}

class CrestEditor
  extends React.Component<CrestEditorProps, CrestEditorState>
{
  constructor(props: CrestEditorProps) {
    super(props)

    const black = "#000000"
    const white = "#ffffff"
    const red = "#ffb3ba"
    const orange = "#ffdfba"
    const yellow = "#ffffba"
    const green = "#baffc9"
    const blue = "#bae1ff"

    this.state = {
      escutcheon: new HeaterEscutcheon(50, 50, 100),
      crest: new Crest(
        new PerFessDividedField(
          new Chequy(
            new ColorTincture(green),
            new ColorTincture(blue),
          ),
          new ColorTincture(red),
        ),
        /*[
          new Saltire(
            new ColorTincture(red),
            [
              new InBend([
                new Roundel(new ColorTincture(black)),
                new Roundel(new ColorTincture(black)),
                new Roundel(new ColorTincture(black))
              ]),
              new Roundel(new ColorTincture(yellow)),
              new Roundel(new ColorTincture(yellow)),
              new Roundel(new ColorTincture(yellow)),
              new Roundel(new ColorTincture(yellow)),
            ]
          )
        ]*/
      )
    }
  }

  render() {
    const handleEscutcheonChange = (escutcheon: Escutcheon) => {
      console.log("Escutcheon changed")
      this.setState({ escutcheon: escutcheon })
    }
    const handleFieldChange = (field: Field) => {
      console.log("Field changed")
      this.setState((state, props) => ({
        crest: new Crest(
          field,
          state.crest.ordinaries
        )
      }))
    }
    const handleTinctureChange = (tincture: Tincture) => {
      this.setState((state, props) => ({
        crest: new Crest(
          new SolidField(tincture),
          state.crest.ordinaries
        )
      }))
    }
    const handleTextureChange = (texture: Texture) => {
      this.setState((state, props) => ({
        crest: new Crest(
          new SolidField(texture),
          state.crest.ordinaries
        )
      }))
    }

    /*
    <Paper>
      <FormControl >
        <InputLabel id="escutcheon-select-label">Escutcheon</InputLabel>
        <Select
          labelId="escutcheon-select-label"
          id="escutcheon-select"
          onChange={handleEscutcheonChange}
        >
          {escutcheons.map((namedEscutcheon: NamedEscutcheon, index: number) =>
            <MenuItem value={index}>{namedEscutcheon.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Paper>
    */

    //<TinctureToolsPanel tincture={new ColorTincture("#ff0000")} onTinctureChange={handleTinctureChange} />
    //<FieldToolsPanel crest={this.state.crest} onFieldChange={handleFieldChange} />
    //<TextureToolsPanel texture={new ColorTincture("#ff0000")} onTextureChange={handleTextureChange} />

    return (
      <Container >
        <CrestPaletteContext.Provider value={new PastelCrestPalette()}>
          <div>
            <CrestPreview crest={this.state.crest} escutcheon={this.state.escutcheon} />
          </div>
          <div>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Escutcheon</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <EscutcheonToolsPanel escutcheon={this.state.escutcheon} onChange={handleEscutcheonChange} />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Field</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FieldToolsPanel field={this.state.crest.field} onChange={handleFieldChange} />
              </AccordionDetails>
            </Accordion>
          </div>
        </CrestPaletteContext.Provider>
      </Container >
    )
  }
}

export default CrestEditor
