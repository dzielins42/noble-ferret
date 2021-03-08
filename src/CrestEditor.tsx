import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Container, createStyles, FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Paper, Select, Theme, Typography } from "@material-ui/core"
import React, { useState } from "react"
import AspectRatio from "./AspectRatio"
import { InBend } from "./model/charge/GroupCharge"
import { Roundel } from "./model/charge/MobileSubordinary"
import Crest from "./model/Crest"
import Escutcheon from "./model/escutcheon/Escutcheon"
import HeaterEscutcheon from "./model/escutcheon/HeaterEscutcheon"
import SolidField from "./model/field/SolidField"
import { Ordinary, Saltire } from "./model/ordinary/Ordinary"
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
import SaveIcon from '@material-ui/icons/Save'
import GetAppIcon from '@material-ui/icons/GetApp'
import { EscutcheonToolsPanel } from "./ui/EscutcheonToolsPanel"
import { AzureTincture, GulesTincture, OrTincture, SableTincture, Tincture, VertTincture } from "./model/texture/Tincture"
import { CrestPreview } from "./CrestPreview"
import Konva from "konva"
import { OrdinariesToolsPanel } from "./ui/OrdinariesToolsPanel"

type CrestEditorProps = {}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    toolsPanel: {
      flexDirection: "column",
      // Direct children
      '& > *': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      }
    },
    tinctureItem: {
      width: "30%",
      minWidth: 100,
      margin: theme.spacing(0.5),
      '& div': {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    },
  }),
);

export const CrestEditor = (props: CrestEditorProps) => {
  const crestPalette = new PastelCrestPalette()
  const classes = useStyles()

  const [escutcheon, setEscutcheon] = useState<Escutcheon>(
    new HeaterEscutcheon(200)
  )
  const [crest, setCrest] = useState<Crest>(
    new Crest(
      new PerFessDividedField(
        new Chequy(
          VertTincture,
          AzureTincture,
          4,
        ),
        OrTincture,
      ),
      [
        new Saltire(
          GulesTincture,
        )
      ]
    )
  )
  const stageRef = React.createRef<Konva.Stage>()

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
  const handleOrdinariesChange = (ordinaries: Ordinary[]) => {
    console.log("Ordinaries changed")
    setCrest(new Crest(
      crest.field,
      ordinaries
    ))
  }

  const handleExport = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL()
      var link = document.createElement('a')
      link.download = "crest.png"
      link.href = uri
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Container >
      <CrestPaletteContext.Provider value={new PastelCrestPalette()}>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <CrestPreview ref={stageRef} crest={crest} escutcheon={escutcheon} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <ButtonGroup color="primary">
                  <Button
                    disabled
                  >
                    <SaveIcon />
                  </Button>
                  <Button
                    onClick={() => { handleExport() }}
                  >
                    <GetAppIcon />
                  </Button>
                </ButtonGroup>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Escutcheon</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.toolsPanel}>
                    <EscutcheonToolsPanel escutcheon={escutcheon} onChange={handleEscutcheonChange} />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Field</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.toolsPanel}>
                    <FieldToolsPanel field={crest.field} onChange={handleFieldChange} />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Ordinaries</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.toolsPanel}>
                    <OrdinariesToolsPanel ordinaries={crest.ordinaries} onChange={handleOrdinariesChange} />
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
