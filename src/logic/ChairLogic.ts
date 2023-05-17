import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh, TransformNode } from '@babylonjs/core';

export default class ChairLogic extends MoveAble {
  constructor(root: TransformNode) {
    const mesh = root
      .getChildMeshes()
      .find((mesh) => mesh.name === 'Chair_primitive0')!;
    super(mesh as Mesh, GlobalScene._.highlightLayer);
  }
  protected onClick(): void {}
}
