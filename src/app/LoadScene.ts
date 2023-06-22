import { Mesh, SceneLoader, Vector3 } from '@babylonjs/core';
import room_model from '$static/room3.glb';
import GlobalScene from '$/global/scene/Scene';

export default async () => {
  const load = await SceneLoader.AppendAsync('', room_model, GlobalScene._);
  // (load.rootNodes[load.rootNodes.length - 1] as Mesh).scaling = new Vector3(
  //   0.01,
  //   0.01,
  //   0.01
  // );

  load.lights.forEach((l) => {
    console.log(l);
    l.intensity = l.intensity / 100;
  });
  return load;
};
