import ObserverView from './ObserverView';

export default class Observer<T extends ObserverView> implements Observable<T> {
  protected views: Array<ObserverView> = new Array();

  public clickChild(view: ObserverView) {
    for (let i = 0; i < this.views.length; i++) {
      if (this.views[i] != view) {
        this.views[i].activate();
      }
    }
    view.deactivate();
  }
}

export interface Observable<T extends ObserverView> {
  clickChild(view: T): void;
}
