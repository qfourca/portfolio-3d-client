import { Mesh } from '@babylonjs/core';
import ObserverView from './ObserverView';
import Observer from './Observer';

export default abstract class ObserverViewWithChildren<
  T extends ObserverView
> extends ObserverView {
  constructor(
    mesh: Mesh | Array<Mesh>,
    observer: Observer,
    protected children: Array<T>
  ) {
    super(mesh, observer);
  }

  public activate(): void {
    super.activate();
    this.children.forEach((child) => child.deactivate());
  }

  public deactivate(): void {
    super.deactivate();
    this.children.forEach((child) => child.activate());
  }
}
