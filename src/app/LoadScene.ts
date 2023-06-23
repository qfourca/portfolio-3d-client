import {
  Mesh,
  SceneLoader,
  ShadowGenerator,
  SpotLight,
  Vector3,
} from '@babylonjs/core';
import room_model from '$static/room4.glb';
import GlobalScene from '$/global/scene/Scene';

export default async () => {
  const load = await SceneLoader.AppendAsync('', room_model, GlobalScene._);
  load.lights.forEach((l) => {
    l.intensity = l.intensity / 10;
  });
  const mainLight = load
    .getTransformNodeByName('main')!
    .getChildren()[0] as SpotLight;

  mainLight.angle = (210 / 180) * Math.PI;
  mainLight.innerAngle = (210 / 180) * Math.PI;

  const shadowGenerator = new ShadowGenerator(2048, mainLight);
  shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.blurScale = 4;
  shadowGenerator.filter = ShadowGenerator.FILTER_PCF;
  shadowGenerator.bias = 0.0001;
  //@ts-expect-error
  load.meshes.forEach((mesh: Mesh) => {
    mesh.receiveShadows = true;
    shadowGenerator.addShadowCaster(mesh, false);
  });
  return load;
};
