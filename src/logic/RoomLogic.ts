import GlobalScene from '$/global/scene/Scene';
import BookShelfLogic from './BookShelfLogic';
import ChairLogic from './ChairLogic';
import ProjectGalleryLogic from './ProjectGalleryLogic';
import SofaLogic from './SofaLogic';

export default class RoomLogic {
  public bookShelfLogic: BookShelfLogic;
  public chairLogic: ChairLogic;
  public sofaLogic: SofaLogic;
  constructor() {
    this.bookShelfLogic = new BookShelfLogic(
      GlobalScene._.getTransformNodeByName('BookShelf')!,
      this
    );
    this.chairLogic = new ChairLogic(
      GlobalScene._.getTransformNodeByName('Chair')!
    );
    this.sofaLogic = new SofaLogic(GlobalScene._.getMeshByName('Sofa')!);
    new ProjectGalleryLogic(GlobalScene._.getMeshByName('Wall3')!, this);
  }

  public activateAll() {
    this.bookShelfLogic.activate();
  }
}
