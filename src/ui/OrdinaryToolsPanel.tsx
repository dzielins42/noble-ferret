import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, GridList, GridListTile, GridListTileBar, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { Bend, Cross, Fess, Ordinary, Pale, Saltire } from "../model/ordinary/Ordinary";
import Texture from "../model/texture/Texture";
import { SableTincture } from "../model/texture/Tincture";
import { useNonInitialEffect } from "../util/Hooks";
import { CloneOrdinaryVisitor, OrdinaryVisitor } from "../util/Visitor";
import { TextureToolsPanel } from "./TextureToolsPanel";

type OrdinaryToolsPanelProps = {
  ordinary: Ordinary
  onChange?: (ordinary: Ordinary) => void
}

export const OrdinaryToolsPanel = (props: OrdinaryToolsPanelProps) => {
  const theme = useTheme()

  const [ordinary, setOrdinary] = React.useState(props.ordinary)
  const [galleryOpen, setGalleryOpen] = React.useState(false)

  const handleCloseGallery = () => {
    setGalleryOpen(false);
  };

  useNonInitialEffect(() => {
    props.onChange ?.(ordinary)
  }, [ordinary])

  const options = getOptions()

  return (
    <>
      <Button
        onClick={() => {
          setGalleryOpen(true)
        }}
      >
        Open
      </Button>
      <TextureToolsPanel
        texture={ordinary.texture}
        onChange={(texture: Texture) => {
          let clonedOrdinary = new CloneOrdinaryVisitor()
            .clone(ordinary, texture)

          setOrdinary(clonedOrdinary)
        }}
      />
      <Dialog
        open={galleryOpen}
        onClose={handleCloseGallery}
        scroll="paper"
      >
        <DialogTitle>Ordinary</DialogTitle>
        <DialogContent dividers>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
            }}
          >
            {options.map((option, index) => {
              return (
                <GalleryItem
                  label={option.label}
                  onClick={() => {
                    setOrdinary(option.factoryFunc(ordinary.texture))
                    handleCloseGallery()
                  }}
                />
              )
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGallery} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

type OrdinaryOption = {
  label: string,
  factoryFunc: (texture: Texture) => Ordinary,
}

function getOptions(): OrdinaryOption[] {
  return [
    {
      label: "Pale",
      factoryFunc: (texture: Texture) => {
        return new Pale(
          texture, []
        )
      },
    },
    {
      label: "Fess",
      factoryFunc: (texture: Texture) => {
        return new Fess(
          texture, []
        )
      },
    },
    {
      label: "Cross",
      factoryFunc: (texture: Texture) => {
        return new Cross(
          texture, []
        )
      },
    },
    {
      label: "Bend",
      factoryFunc: (texture: Texture) => {
        return new Bend(
          texture, [], false
        )
      },
    },
    {
      label: "Bend sinister",
      factoryFunc: (texture: Texture) => {
        return new Bend(
          texture, [], true
        )
      },
    },
    {
      label: "Saltire",
      factoryFunc: (texture: Texture) => {
        return new Saltire(
          texture, []
        )
      },
    },
  ]
}

type GalleryItemProps = {
  label: string,
  size?: number
  onClick?: () => void
}

const GalleryItem = (props: GalleryItemProps) => {
  const theme = useTheme()

  const size = props.size || theme.spacing(16)

  return (
    <GridListTile
      style={{
        width: size,
        height: size,
        margin: theme.spacing(0.5),
      }}
      component="div"
      onClick={() => {
        props.onClick ?.()
      }}>
      <img src={`https://via.placeholder.com/${size}x${size}.png?text=${props.label}`} />
      <GridListTileBar
        title={props.label}
      />
    </GridListTile>
  )
}
