import React from "react";
import { Ordinary, Pale, Saltire } from "../model/ordinary/Ordinary";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { useNonInitialEffect } from "../util/Hooks";
import { GulesTincture, randomTincture } from "../model/texture/Tincture";
import { OrdinaryToolsPanel } from "./OrdinaryToolsPanel";

type OrdinariesToolsPanelProps = {
  ordinaries: Ordinary[]
  onChange?: (ordinaries: Ordinary[]) => void
}

export const OrdinariesToolsPanel = (props: OrdinariesToolsPanelProps) => {
  const [ordinaries, setOrdinaries] = React.useState(props.ordinaries)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)

  useNonInitialEffect(() => {
    props.onChange ?.(ordinaries)
  }, [ordinaries])

  const handleDelete = (index: number) => {
    const newOrdinaries = [...ordinaries]
    newOrdinaries.splice(index, 1)
    setOrdinaries(newOrdinaries)
  }

  const handleAdd = () => {
    const newOrdinary = new Pale(randomTincture())
    const newOrdinaries = [...ordinaries]
    newOrdinaries.push(newOrdinary)
    setOrdinaries(newOrdinaries)
  }

  const listItems = ordinaries.map((ordinary, index) => {
    const label = "Ordinary" + " " + (index + 1)
    return (
      <ListItem
        button
        selected={selectedIndex === index}
        onClick={() =>
          setSelectedIndex(index)
        }
      >
        <ListItemText primary={label} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => {
              handleDelete(index)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  })

  let content = null
  if (selectedIndex >= 0 && selectedIndex < ordinaries.length) {
    content = (
      <OrdinaryToolsPanel
        key={selectedIndex}
        ordinary={ordinaries[selectedIndex]}
        onChange={(ordinary: Ordinary) => {
          const newOrdinaries = [...ordinaries]
          newOrdinaries[selectedIndex] = ordinary
          setOrdinaries(newOrdinaries)
        }}
      />
    )
  }

  return (
    <>
      <List component="nav" aria-label="secondary mailbox folders">
        {listItems}
        <ListItem button>
          <ListItemIcon
            style={{
              justifyContent: "center",
              flexGrow: 1,
            }}
            onClick={() => {
              handleAdd()
            }}
          >
            <AddIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      {content}
    </>
  )
}
