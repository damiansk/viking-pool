import { useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import { Box3, Vector3 } from 'three';



const useModelCentering = (object3d: THREE.Object3D) => {
  const { camera } = useThree();
  
  useEffect(() => {
    const boundingBox = new Box3().setFromObject(object3d);
    const boundingBoxCenter = new Vector3();
    boundingBox.getCenter(boundingBoxCenter);

    const cameraDistance = (boundingBox.max.z - boundingBox.min.z) / 2 / Math.tan((camera as THREE.PerspectiveCamera).fov / 2);

    camera.position.copy(boundingBoxCenter);
    camera.position.x += (cameraDistance * 1.8);
    const centerV = new Vector3(0, 0, 0);
    camera.lookAt(centerV);
    object3d.position.copy(boundingBoxCenter.negate());
  }, [object3d]);
}

export { useModelCentering };


