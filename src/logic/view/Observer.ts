import GlobalScene from '$/global/scene/Scene';
import BookShelfView from './BookShelfView';
import ObserverView from './ObserverView';

export default class Observer {
  private views: Array<ObserverView> = new Array();

  constructor() {
    this.views.push(
      new BookShelfView(
        GlobalScene._.getTransformNodeByName('BookShelf')!,
        this
      )
    );
  }

  public click(view: ObserverView) {
    for (let i = 0; i < this.views.length; i++) {
      if (this.views[i] != view) {
        this.views[i].activate();
      }
    }
    view.deactivate();
  }
}
