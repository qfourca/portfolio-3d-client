import GlobalScene from '$/global/scene/Scene';
import SofaView from './SofaView';
import { Mesh, ThinEngine } from '@babylonjs/core';
import AbstarctChild from './architecture/AbstarctChild';
import Parentable from './architecture/Parentable';
import ChairView from './chair/ChairView';
import GalleryView from './gallery/GalleryView';
import CloseNotionPage from '$/logic/CloseNotionPage';
import BookshelfView from './bookshelf/BookshelfView';
import Config from '$/global/config/Config';
import DoorView from './DoorView';

export default class RoomView implements Parentable<AbstarctChild> {
  private children: Array<AbstarctChild> = new Array();
  constructor() {
    this.appendChild(
      new SofaView(GlobalScene._.getTransformNodeByName('Sofa')!, this)
    );
    this.appendChild(
      new ChairView(GlobalScene._.getTransformNodeByName('Chair')!, this)
    );

    if (Config._.AWS) {
      this.appendChild(
        new BookshelfView(
          GlobalScene._.getTransformNodeByName('BookShelf')!,
          this
        )
      );
      this.appendChild(
        new GalleryView(
          GlobalScene._.getMeshByName('GalleryWall') as Mesh,
          this
        )
      );
    }
    const doorView = new DoorView(GlobalScene._.getMeshByName('Door')!, this);
    this.appendChild(doorView);
    doorView.click(true);
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
    new CloseNotionPage().close(300);
  }
}
