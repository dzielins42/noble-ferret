import { Accordion, AccordionDetails, AccordionSummary, Container, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Theme, Typography } from "@material-ui/core"
import React, { useState } from "react"
import AspectRatio from "./AspectRatio"
import { InBend } from "./model/charge/GroupCharge"
import { Roundel } from "./model/charge/MobileSubordinary"
import Crest from "./model/Crest"
import Escutcheon from "./model/escutcheon/Escutcheon"
import HeaterEscutcheon from "./model/escutcheon/HeaterEscutcheon"
import SolidField from "./model/field/SolidField"
import { Saltire } from "./model/ordinary/Ordinary"
import { Barry, Bendy, Chequy } from "./model/texture/VariationTexture"
import logo from './logo.svg'
import RectangleEscutcheon from "./model/escutcheon/RectangleEscutcheon"
import { FieldToolsPanel } from "./ui/FieldToolsPanel"
import Field from "./model/field/Field"
import { PerFessDividedField } from "./model/field/DividedField"
import { TinctureToolsPanel } from "./ui/TinctureToolsPanel"
import { TextureToolsPanel } from "./ui/TextureToolsPanel"
import Texture from "./model/texture/Texture"
import { CrestPaletteContext } from "./CrestPaletteContext"
import { PastelCrestPalette } from "./CrestPalette"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { EscutcheonToolsPanel } from "./ui/EscutcheonToolsPanel"
import { ColorTincture, MetalTincture, Tincture } from "./model/texture/Tincture"
import { CrestPreview } from "./CrestPreview"

type CrestEditorProps = {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export const CrestEditor = (props: CrestEditorProps) => {
  const crestPalette = new PastelCrestPalette()
  const classes = useStyles()

  const [escutcheon, setEscutcheon] = useState<Escutcheon>(
    new HeaterEscutcheon(50, 50, 100)
  )
  const [crest, setCrest] = useState<Crest>(
    new Crest(
      new PerFessDividedField(
        new Chequy(
          new ColorTincture(crestPalette.vert),
          new ColorTincture(crestPalette.azure),
          4,
        ),
        new ColorTincture(crestPalette.gules),
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
  )

  const handleEscutcheonChange = (escutcheon: Escutcheon) => {
    console.log("Escutcheon changed")
    setEscutcheon(escutcheon)
  }
  const handleFieldChange = (field: Field) => {
    console.log("Field changed")
    setCrest(new Crest(
      field,
      crest.ordinaries
    ))
  }

  return (
    <Container >
      <CrestPaletteContext.Provider value={new PastelCrestPalette()}>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <CrestPreview crest={crest} escutcheon={escutcheon} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Escutcheon</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <EscutcheonToolsPanel escutcheon={escutcheon} onChange={handleEscutcheonChange} />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Field</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FieldToolsPanel field={crest.field} onChange={handleFieldChange} />
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </CrestPaletteContext.Provider>
    </Container >
  )
}
