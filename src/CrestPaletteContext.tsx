import React from "react";
import { PastelCrestPalette } from "./CrestPalette";

export const CrestPaletteContext = React.createContext(
  new PastelCrestPalette()
)
