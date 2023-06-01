import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';
import AbstarctChild from './architecture/AbstarctChild';
import GlobalScene from '$/global/scene/Scene';
import Parentable from './architecture/Parentable';

export default class ChairView extends AbstarctChild {
  constructor(private chair: TransformNode, parent: Parentable<AbstarctChild>) {
    super(chair.getChildMeshes(), parent);
  }
  click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.chair.getAbsolutePosition()) *
      2000;

    const { x, y, z } = this.chair.getAbsolutePosition();
    camera.smoothMove(new Vector3(x + 0.03, y + 0.18, z), time);
    camera.smoothRotation(new Vector3(0.1, -Math.PI / 2, 0), time);
    super.click();
  }
}
