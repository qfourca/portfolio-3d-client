import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';

export default class BookShelfLogic extends MoveAble {
  constructor(private root: TransformNode) {
    const mesh = root.getChildMeshes();
    super(mesh as Array<Mesh>, GlobalScene._.highlightLayer);
  }
  protected onClick(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.root.getAbsolutePosition()) * 20;

    const { x, y, z } = this.root.getAbsolutePosition();
    camera.smoothMove(new Vector3(x - 20, y - 5, z), time);
    camera.smoothRotation(new Vector3(0, Math.PI / 2, 0), time);
  }
}
