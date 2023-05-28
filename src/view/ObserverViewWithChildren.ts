import { Mesh } from '@babylonjs/core';
import ObserverView from './ObserverView';
import Observer from './Observer';

export default abstract class ObserverViewWithChildren<
  T extends ObserverView
> extends ObserverView {
  protected children: Array<T>;
  constructor(
    mesh: Mesh | Array<Mesh>,
    observer: Observer,
    children?: Array<T>
  ) {
    super(mesh, observer);
    this.children = children ?? new Array();
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
