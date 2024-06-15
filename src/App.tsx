import React from 'react';

import { ImageContextProvider } from './context/ImageContext';
import { PatternContextProvider } from './context/PatternContext';

import Stepper from './component/Stepper';

import ImageResult from './step/ImageResult';
import ImageSelect from './step/ImageSelect';
import PatternSelect from './step/PatternSelect';

import './App.css';

function App() {
  return (
    <div className="App">
      <PatternContextProvider>
        <ImageContextProvider>
          <Stepper>
            <ImageSelect />
            <PatternSelect />
            <ImageResult />
          </Stepper>
        </ImageContextProvider>
      </PatternContextProvider>
    </div>
  );
}

export default App;
