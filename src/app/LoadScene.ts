import { Mesh, SceneLoader, ShadowGenerator, SpotLight } from '@babylonjs/core';
import GlobalScene from '$/global/scene/Scene';
import room_model from '../../static/room.glb';

export default async () => {
  const load = await SceneLoader.AppendAsync('', room_model, GlobalScene._);
  let spot: SpotLight;
  (load.rootNodes[load.rootNodes.length - 1] as Mesh).lightSources.forEach(
    (l) => {
      console.log(l.name);
      if (l instanceof SpotLight) {
        // l.angle *= 2;
        if (l.name == '스폿.001') {
          spot = l;
          spot.angle = (200 / 180) * Math.PI;
          spot.innerAngle = 2 * Math.PI;
        }
      }
      l.intensity /= 10;
    }
  );
  //@ts-expect-error
  const light: SpotLight = spot;
  const shadowGenerator = new ShadowGenerator(2048, light);
  shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.blurScale = 4;
  shadowGenerator.filter = ShadowGenerator.FILTER_PCF;
  shadowGenerator.bias = 0.0001;
  //@ts-expect-error
  load.meshes.forEach((mesh: Mesh) => {
    mesh.receiveShadows = true;
    shadowGenerator.addShadowCaster(mesh, false);
  });
  shadowGenerator.removeShadowCaster(load.getMeshByName('평면')!);
  return load;
};
