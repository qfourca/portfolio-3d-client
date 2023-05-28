import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh } from '@babylonjs/core';
import Observer from './Observer';

export default abstract class ObserverView extends MoveAble {
  constructor(mesh: Mesh | Array<Mesh>, protected observer?: Observer) {
    super(mesh, GlobalScene._.highlightLayer);
  }

  public activate() {
    this.isActivate = true;
  }

  public deactivate() {
    this.isActivate = false;
  }

  public abstract click(): void;

  protected onClick(): void {
    if (this.isActivate) {
      this.observer?.click(this);
      this.click();
    }
  }
}