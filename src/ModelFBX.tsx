import React, { useState, useEffect } from 'react';
import { useLoader, useFrame } from 'react-three-fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useModelCentering } from './useModelCentering';
import { TextureLoader, MeshPhongMaterial, AnimationMixer } from 'three';

const ModelFBX: React.FC<{ modelUrl: string, textureUrl: string }> =
  ({ modelUrl, textureUrl }) => {
    const model = useLoader(FBXLoader, modelUrl);
    const texture = useLoader(TextureLoader, textureUrl);

    useModelCentering(model);

    model.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new MeshPhongMaterial({ map: texture, skinning: true });;
      }
    });

    const [mixer] = useState(() => new AnimationMixer(model))
    useEffect(() => {
      const animation = (model as any).animations[0];
      const action = mixer.clipAction(animation);
      
      action.play();
    }, []);

    useFrame((state, delta) => {
      mixer.update(delta)
    })


    return <primitive object={model} position={[0, 0, 0]} />
  }

export { ModelFBX };
