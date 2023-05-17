import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh, TransformNode } from '@babylonjs/core';

export default class ChairLogic extends MoveAble {
  constructor(root: TransformNode) {
    const mesh = root
      .getChildMeshes()
      .find((mesh) => mesh.name === 'Chair_primitive0')!;
    //@ts-expect-error
    //TODO: get layer
    super(mesh as Mesh, GlobalScene._.effectLayers[0]);
  }
  protected onClick(): void {}
}
