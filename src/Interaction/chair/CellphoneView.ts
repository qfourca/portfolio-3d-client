import { TransformNode } from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import ChairView from './ChairView';
import axios from 'axios';

export default class CellphoneView extends AbstarctChild {
  private phoneNumber: string = '+821035449400';
  constructor(cellphone: TransformNode, parent: ChairView) {
    super(cellphone, parent);
    axios
      .get<{
        country_code: string;
      }>('https://api.ip.pe.kr/json/')
      .then(({ data }) => {
        if (data.country_code === 'KR') {
          this.phoneNumber = '01035449400';
        }
      });
  }

  public click(): void {
    this.deactivate();
    setTimeout(() => {
      this.activate();
    }, 10);
    window.open('tel:' + this.phoneNumber);
  }
}
