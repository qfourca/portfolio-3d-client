import ObserverView from './ObserverView';

export default class Observer {
  protected views: Array<ObserverView> = new Array();

  public click(view: ObserverView) {
    for (let i = 0; i < this.views.length; i++) {
      if (this.views[i] != view) {
        this.views[i].activate();
      }
    }
    view.deactivate();
  }
}
