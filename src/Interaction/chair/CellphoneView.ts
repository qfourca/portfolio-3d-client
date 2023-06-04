import { TransformNode } from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import ChairView from './ChairView';

export default class CellphoneView extends AbstarctChild {
  constructor(cellphone: TransformNode, parent: ChairView) {
    super(cellphone, parent);
  }

  public click(): void {
    this.deactivate();
    setTimeout(() => {
      this.activate();
    }, 10);

    window.open(
      'tel:+' + navigator.language.substring(0, 2) == 'ko'
        ? '01035449400'
        : `821035449400`
    );
  }
}
