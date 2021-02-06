import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import CrestPreview from './CrestPreview'
import Crest from './model/Crest'
import ColorTincture from './model/ColorTincture'
import SolidField from './model/field/SolidField';
import { PerBendDividedField, PerChevronDividedField, PerCrossDividedField, PerFessDividedField, PerPaleDividedField, PerPallDividedField, PerSaltireDividedField } from './model/field/DividedField';

function App() {
  var crest = new Crest(
    new PerPallDividedField(
      new ColorTincture("#ff0000"),
      new ColorTincture("#0000ff"),
      new ColorTincture("#00ff00"),
    )
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
