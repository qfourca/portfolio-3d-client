import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble2';
import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';
import ObserverView from './ObserverView';
import Observer from './Observer';

export default class ChairView extends ObserverView {
  constructor(private root: TransformNode, observer: Observer<ChairView>) {
    const mesh = root.getChildMeshes();
    super(mesh as Array<Mesh>, observer);
  }
  public click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.root.getAbsolutePosition()) * 2000;

    const { x, y, z } = this.root.getAbsolutePosition();
    camera.smoothMove(new Vector3(x + 0.03, y + 0.18, z), time);
    camera.smoothRotation(new Vector3(0.1, -Math.PI / 2, 0), time);
  }
}
