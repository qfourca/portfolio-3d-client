import GlobalScene from '$/global/scene/Scene';
import SofaView from './SofaView';
import { Mesh } from '@babylonjs/core';
import AbstarctChild from './architecture/AbstarctChild';
import Parentable from './architecture/Parentable';
import ChairView from './ChairView';

export default class RoomView implements Parentable<AbstarctChild> {
  private children: Array<AbstarctChild> = new Array();
  constructor() {
    this.appendChild(
      new SofaView(GlobalScene._.getMeshByName('Sofa') as Mesh, this)
    );
    this.appendChild(
      new ChairView(GlobalScene._.getTransformNodeByName('Chair')!, this)
    );
  }
  appendChild(child: AbstarctChild): void {
    this.children.push(child);
    child.activate();
  }

  clickChild(child: AbstarctChild): void {
    this.children.forEach((child: AbstarctChild) => {
      child.activate();
    });
    child.deactivate();
  }
}
