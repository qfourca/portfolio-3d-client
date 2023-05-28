import { Mesh, SceneLoader, Vector3 } from '@babylonjs/core';
import room_model from '$static/room2.glb';
import GlobalScene from '$/global/scene/Scene';

export default async () => {
  const load = await SceneLoader.AppendAsync('', room_model, GlobalScene._);
  (load.rootNodes[load.rootNodes.length - 1] as Mesh).scaling = new Vector3(
    0.01,
    0.01,
    0.01
  );

  return load;
};
