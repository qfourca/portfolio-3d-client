import {
  DirectionalLight,
  HemisphericLight,
  PointLight,
  Vector3,
} from '@babylonjs/core';
import GlobalScene from '../Scene';

export default (scene: GlobalScene) => {
  const dirLight = new DirectionalLight(
    'Directional',
    new Vector3(0, -1, 0),
    scene
  );
  const pointLight = new PointLight('Point', new Vector3(0, 35, 0), scene);
  dirLight.intensity = 1;
  pointLight.intensity = 1;
  pointLight.intensityMode = PointLight.INTENSITYMODE_AUTOMATIC;
  scene.addLight(dirLight);
  scene.addLight(pointLight);
};
