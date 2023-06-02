import GlobalScene from '$/global/scene/Scene';
import SofaView from './SofaView';
import { Mesh, ThinEngine } from '@babylonjs/core';
import AbstarctChild from './architecture/AbstarctChild';
import Parentable from './architecture/Parentable';
import ChairView from './ChairView';
import GalleryView from './GalleryView';
import CloseNotionPage from '$/logic/CloseNotionPage';

export default class RoomView implements Parentable<AbstarctChild> {
  private children: Array<AbstarctChild> = new Array();
  constructor() {
    this.appendChild(
      new SofaView(GlobalScene._.getMeshByName('Sofa') as Mesh, this)
    );
    this.appendChild(
      new ChairView(GlobalScene._.getTransformNodeByName('Chair')!, this)
    );

    const gallery = new GalleryView(
      GlobalScene._.getMeshByName('Wall3') as Mesh,
      this
    );
    this.appendChild(gallery);

    gallery.click();
    this.clickChild(gallery);
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
