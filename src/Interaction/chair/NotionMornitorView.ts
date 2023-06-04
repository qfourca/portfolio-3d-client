import { TransformNode } from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import ChairView from './ChairView';

export default class NotionMornitorView extends AbstarctChild {
  constructor(mornitor: TransformNode, parent: ChairView) {
    super(mornitor, parent);
  }

  public click(): void {
    this.deactivate();
    setTimeout(() => {
      this.activate();
    }, 10);
    window.open('https://qfourca.notion.site/8a2586569f15472a99d4ddf652a4f38b');
  }
}
