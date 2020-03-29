import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Scene } from './Scene';
import { Controls } from './Controls';

const App = () => {

  return (
    <Canvas camera={{
      fov: 75,
      near: 0.1,
      far: 10000,
    }}>
      <Controls />
      <Scene />
    </Canvas>
  );
}

export default App;
