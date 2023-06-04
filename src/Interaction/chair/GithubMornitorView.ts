import { TransformNode } from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import ChairView from './ChairView';

export default class GithubMornitorView extends AbstarctChild {
  constructor(mornitor: TransformNode, parent: ChairView) {
    super(mornitor, parent);
  }

  public click(): void {
    this.deactivate();
    setTimeout(() => {
      this.activate();
    }, 10);
    window.open('https://github.com/qfourca');
  }
}
