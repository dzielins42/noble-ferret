import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import CrestPreview from './CrestPreview'
import Crest from './model/Crest'
import SolidField from './model/field/SolidField';
import { PerBendDividedField, PerChevronDividedField, PerCrossDividedField, PerFessDividedField, PerPaleDividedField, PerPallDividedField, PerSaltireDividedField } from './model/field/DividedField';
import { Barry, Bendy, Chequy, Fusilly, Lozengy, Paly, Ruste } from './model/texture/VariationTexture';
import { Saltire, Bend, Cross, Fess, Pale } from './model/ordinary/Ordinary';
import ColorTincture from './model/texture/ColorTincture';
import LozengeType from './model/LozengeType';
import { Roundel } from './model/charge/MobileSubordinary';
import { InBend, InFess, InPale } from './model/charge/GroupCharge';

function App() {
  const black = "#000000"
  const white = "#ffffff"
  const red = "#ffb3ba"
  const orange = "#ffdfba"
  const yellow = "#ffffba"
  const green = "#baffc9"
  const blue = "#bae1ff"

  var crest = new Crest(
    new SolidField(
      new Chequy(
        new ColorTincture(green),
        new ColorTincture(blue),
      ),
    ),
    [
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
