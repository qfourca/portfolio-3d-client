import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';
import AbstarctChild from './architecture/AbstarctChild';
import GlobalScene from '$/global/scene/Scene';
import Parentable from './architecture/Parentable';

export default class SofaView extends AbstarctChild {
  constructor(private sofa: TransformNode, parent: Parentable<AbstarctChild>) {
    super(sofa, parent);
  }
  click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.sofa.getAbsolutePosition()) * 200;

    const { x, y, z } = this.sofa.getAbsolutePosition();
    camera.smoothMove(new Vector3(x, y + 1.2, z), time);
    camera.smoothRotation(new Vector3(0, Math.PI / 2, 0), time);

    super.click();
  }
}
