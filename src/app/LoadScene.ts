import { Mesh, SceneLoader, SpotLight, Vector3 } from '@babylonjs/core';
import room_model from '$static/room3.glb';
import GlobalScene from '$/global/scene/Scene';

export default async () => {
  const load = await SceneLoader.AppendAsync('', room_model, GlobalScene._);
  load.lights.forEach((l) => {
    l.intensity = l.intensity / 200;
  });
  const mainLight = load
    .getTransformNodeByName('main')!
    .getChildren()[0] as SpotLight;

  mainLight.angle = Math.PI;
  mainLight.innerAngle = Math.PI;
  return load;
};
