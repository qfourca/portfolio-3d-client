import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';
import AbstarctChild from './architecture/AbstarctChild';
import GlobalScene from '$/global/scene/Scene';
import Parentable from './architecture/Parentable';

export default class DoorView extends AbstarctChild {
  constructor(private door: TransformNode, parent: Parentable<AbstarctChild>) {
    super(door, parent);
  }
  click(force?: boolean): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.door.getAbsolutePosition()) *
      (force ? 1 : 300);

    const { x, y, z } = this.door.getAbsolutePosition();
    camera.smoothMove(new Vector3(x, y + 1, z - 0.2), time);
    camera.smoothRotation(new Vector3(0.3, Math.PI * (3 / 4) - 0.1), time);

    super.click();
  }
}
