import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh, TransformNode } from '@babylonjs/core';

export default class SofaLogic extends MoveAble {
  constructor(root: TransformNode) {
    const mesh = root as TransformNode;
    super(mesh as Mesh, GlobalScene._.highlightLayer);
  }
  protected onClick(): void {}
}
