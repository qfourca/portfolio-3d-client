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
  dirLight.intensity = 0.3;
  dirLight.diffuse = new Color3(0.75, 0.75, 0.75);

  const SunLight = new PointLight('SunLight', new Vector3(0, 0.5, 0), scene);
  SunLight.intensity = 1.1;
  SunLight.diffuse = new Color3(0.75, 0.75, 0.75);

  const BulbLight = new PointLight('BulbLight', new Vector3(0, 0.35, 0), scene);
  BulbLight.intensity = 0.1;
  BulbLight.diffuse = new Color3(1, 1, 0.8);
};
