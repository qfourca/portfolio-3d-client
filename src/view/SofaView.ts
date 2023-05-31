import GlobalScene from '$/global/scene/Scene';
import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';
import ObserverView from './ObserverView';
import Observer from './Observer';

export default class SofaView extends ObserverView {
  constructor(private root: Mesh, observer: Observer<SofaView>) {
    super(root, observer);
  }
  public click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.root.getAbsolutePosition()) * 2000;

    const { x, y, z } = this.root.getAbsolutePosition();
    camera.smoothMove(new Vector3(x, y + 0.1, z), time);
    camera.smoothRotation(new Vector3(0, Math.PI, 0), time);
  }
}
