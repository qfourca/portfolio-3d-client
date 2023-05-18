import {
  Color3,
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
  const pointLight = new PointLight('Point', new Vector3(0, 0.3, 0), scene);
  dirLight.intensity = 0.25;
  pointLight.intensity = 0.45;
  dirLight.diffuse = new Color3(0.75, 0.75, 0.75);
  pointLight.diffuse = new Color3(0.75, 0.75, 0.75);
  scene.addLight(dirLight);
  scene.addLight(pointLight);
};
