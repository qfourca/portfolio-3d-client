import GlobalScene from '$/global/scene/Scene';
import { Mesh, Scene } from '@babylonjs/core';
import BookShelfView from './BookShelfView';
import Observer from './Observer';
import SofaView from './SofaView';
import ChairView from './ChairView';
import GalleryView from './GalleryView';
import ObserverView from './ObserverView';

export default class RoomObserver extends Observer<ObserverView> {
  constructor() {
    super();
    this.views.push(
      new BookShelfView(
        GlobalScene._.getTransformNodeByName('BookShelf')!,
        this
      )
    );

    this.views.push(
      new SofaView(GlobalScene._.getMeshByName('Sofa') as Mesh, this)
    );

    this.views.push(
      new ChairView(GlobalScene._.getTransformNodeByName('Chair')!, this)
    );

    const galleryView = new GalleryView(
      GlobalScene._.getMeshByName('Wall3')!,
      this
    );

    galleryView.deactivate();

    this.views.push(galleryView);
  }

  public clickChild(view: ObserverView): void {
    super.clickChild(view);
    // GlobalScene._.elements.notion.style.width = '0%';
    // GlobalScene._.elements.notion.style.padding = '0px';
    GlobalScene._.elements.app.style.width = '100%';
  }
}
