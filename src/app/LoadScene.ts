import {
  Mesh,
  SceneLoader,
  ShadowGenerator,
  SpotLight,
  Vector3,
} from '@babylonjs/core';
import GlobalScene from '$/global/scene/Scene';
import room_model from '../../static/ybh.glb';

export default async () => {
  const load = await SceneLoader.AppendAsync('', room_model, GlobalScene._);
  let spot: SpotLight;
  (load.rootNodes[load.rootNodes.length - 1] as Mesh).lightSources.forEach(
    (l) => {
      if (l instanceof SpotLight) {
        l.angle *= 2;
        if (l.name == '스폿') {
          spot = l;
        }
      }
      l.intensity /= 5;
    }
  );
  //@ts-expect-error
  spot.shadowEnabled = true;
  //@ts-expect-error
  spot.shadowMinZ = 10;
  //@ts-expect-error
  spot.shadowMaxZ = 70;
  //@ts-expect-error
  const shadowGenerator = new ShadowGenerator(1024, spot);
  shadowGenerator.useBlurCloseExponentialShadowMap = true;
  shadowGenerator.forceBackFacesOnly = true;
  shadowGenerator.blurKernel = 32;
  shadowGenerator.useKernelBlur = true;
  load.meshes.forEach((m) => {
    // console.log(m);
    m.receiveShadows = true;
    shadowGenerator.addShadowCaster(m);
    // shadowGenerator!.getShadowMap()!.renderList?.push(m);
  });
  return load;
};
