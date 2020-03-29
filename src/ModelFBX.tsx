import React from 'react';
import { useLoader } from 'react-three-fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useModelCentering } from './useModelCentering';
import { TextureLoader, MeshPhongMaterial } from 'three';

const ModelFBX: React.FC<{ modelUrl: string, textureUrl: string }> =
  ({ modelUrl, textureUrl }) => {
    const model = useLoader(FBXLoader, modelUrl);
    const texture = useLoader(TextureLoader, textureUrl);
    const material = new MeshPhongMaterial({map: texture })

    useModelCentering(model);

    model.traverse(child => {
      if ((child as THREE.Mesh).isMesh ) {

        (child as THREE.Mesh).material = material;
      }
    });

    console.log(model, texture);

    return <primitive object={model} position={[0, 0, 0]} />
  }

export { ModelFBX };
