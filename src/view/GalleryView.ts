import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';

import Observer from './Observer';
import ObserverViewWithChildren from './ObserverViewWithChildren';

export default class GalleryView extends ObserverViewWithChildren<any> {
  public click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.root.getAbsolutePosition()) * 2000;

    camera.smoothMove(new Vector3(0, 0.3, 0), time);
    camera.smoothRotation(new Vector3(0.3, 0, 0), time);
  }
  constructor(private root: TransformNode, observer: Observer) {
    super(root as Mesh, observer);
  }
}
