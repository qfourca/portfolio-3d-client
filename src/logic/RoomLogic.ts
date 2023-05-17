import GlobalScene from '$/global/scene/Scene';
import BookShelfLogic from './BookShelfLogic';
import ChairLogic from './ChairLogic';
import SofaLogic from './SofaLogic';

export default class RoomLogic {
  constructor() {
    new BookShelfLogic(GlobalScene._.getTransformNodeByName('BookShelf')!);
    new ChairLogic(GlobalScene._.getTransformNodeByName('Chair')!);
    new SofaLogic(GlobalScene._.getMeshByName('Sofa')!);
  }
}
