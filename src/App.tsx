import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import CrestPreview from './CrestPreview'
import Crest from './model/Crest'
import ColorTincture from './model/ColorTincture'
import SolidField from './model/field/SolidField';
import { PerBendDividedField, PerChevronDividedField, PerCrossDividedField, PerFessDividedField, PerPaleDividedField, PerPallDividedField, PerSaltireDividedField } from './model/field/DividedField';
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, Ruste } from './model/VariationTexture';
import { Saltire, Bend, Cross, Fess, Pale } from './model/Ordinary';

function App() {
  const black = "#000000"
  const white = "#ffffff"
  const red = "#ffb3ba"
  const orange = "#ffdfba"
  const yellow = "#ffffba"
  const green = "#baffc9"
  const blue = "#bae1ff"

  var crest = new Crest(
    new PerBendDividedField(
      //new Ruste(
      new ColorTincture(green),
      //  new ColorTincture(orange),
      //),
      new ColorTincture(red),
      //new ColorTincture(blue),
    ),
    [
      new Saltire(
        new ColorTincture(blue),
      )
    ]
  )
  return (
    <div className="App">
      <CrestPreview crest={crest} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
