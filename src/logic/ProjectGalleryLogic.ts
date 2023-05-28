import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';
import RoomLogic from './RoomLogic';

export default class ProjectGalleryLogic extends MoveAble {
  protected onClick(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.root.getAbsolutePosition()) * 2000;

    const { x, y, z } = this.root.getAbsolutePosition();
    camera.smoothMove(new Vector3(0, 0.3, 0), time);
    camera.smoothRotation(new Vector3(0.3, 0, 0), time);
  }
  constructor(private root: TransformNode, private room: RoomLogic) {
    super(root as Mesh, GlobalScene._.highlightLayer);
  }
}
