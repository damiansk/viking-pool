import React, { useRef, useState, useMemo } from 'react';
import { BoxGeometry, LineBasicMaterial, EdgesGeometry } from 'three';
import { useFrame } from 'react-three-fiber';

const boxSize = 5;
const geometry = new BoxGeometry(boxSize, boxSize, boxSize);
const spinnerGeometry = new EdgesGeometry(geometry);
const spinnerMaterial = new LineBasicMaterial({color: 0x6e6e6e, linewidth: 100});

const Spinner = () => {
  const [target, setTarget] = useState('up');
  const spinnerRef = useRef<THREE.Mesh>();
  const useFrameCallback = useMemo(() => () => {
    spinnerRef.current!.rotation.z += 0.02;

    if(target === 'up') {
      spinnerRef.current!.position.z += 0.015;
    }
    if(target === 'down') {
      spinnerRef.current!.position.z -= 0.015;
    }

    if(spinnerRef.current!.position.z > 1) {
      setTarget('down');
    }

    if(spinnerRef.current!.position.z < -1) {
      setTarget('up');
    }
  }, [target]);

  useFrame(useFrameCallback);

  return (
    <lineSegments
      ref={spinnerRef}
      geometry={spinnerGeometry}
      material={spinnerMaterial}
    />
  )
}

export { Spinner };