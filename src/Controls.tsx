import React, { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ReactThreeFiber, extend, useThree, useFrame } from 'react-three-fiber';
extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
    }
  }
}

const Controls = () => {
  const ref = useRef<OrbitControls>();
  const { camera, gl } = useThree();
  useFrame(() => ref?.current?.update());

  return (
    <><orbitControls ref={ref} args={[camera, gl.domElement]} /></>
  );
}

export { Controls };