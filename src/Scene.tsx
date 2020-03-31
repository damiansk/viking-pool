import React, { Suspense } from 'react';
import { useThree } from 'react-three-fiber';
import { ModelFBX } from './ModelFBX';
import { Spinner } from './Spinner';

const cameraSettings = {
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 1000,
};

const modelUrl = process.env.PUBLIC_URL + '/assets/Dance.fbx';
const textureUrl = process.env.PUBLIC_URL + '/assets/texture.png';
// const modelUrl = process.env.PUBLIC_URL + '/assets/untitled.fbx';
// const textureUrl = process.env.PUBLIC_URL + '/assets/texture.png';

const Scene: React.FC<{}> = () => {
  const { camera } = useThree();
  Object.assign(camera, cameraSettings);
  camera.position.set(10, 10, 7);
  camera.lookAt(0, 0, 0);

  return (
    <>
      <ambientLight args={[0xffffff, .25]} />
      {/* <axesHelper args={[20]} position={[-150, 50, 100]}/> */}
      <pointLight args={[0xffffff, 1, 500]} position={[-150, 50, 100]}/>
      <pointLight args={[0xffffff, 1, 500]} position={[50, 50, 50]}/>
      <Suspense fallback={<Spinner />}>
        <ModelFBX modelUrl={modelUrl} textureUrl={textureUrl} />
      </Suspense>
    </>
  );
};

export { Scene };