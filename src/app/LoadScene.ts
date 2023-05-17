import { SceneLoader } from '@babylonjs/core';
import room_model from '$static/room.babylon';
import GlobalScene from '$/global/scene/Scene';

export default async () => {
  return await SceneLoader.AppendAsync('', './' + room_model, GlobalScene._);
};
