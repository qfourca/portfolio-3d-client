import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';

export default class SofaLogic extends MoveAble {
  constructor(private root: TransformNode) {
    const mesh = root as TransformNode;
    super(mesh as Mesh, GlobalScene._.highlightLayer);
  }
  protected onClick(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.root.getAbsolutePosition()) * 2000;

    const { x, y, z } = this.root.getAbsolutePosition();
    camera.smoothMove(new Vector3(x, y + 0.1, z), time);
    camera.smoothRotation(new Vector3(0, Math.PI, 0), time);
  }
}
