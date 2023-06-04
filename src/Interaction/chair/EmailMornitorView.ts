import { TransformNode } from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import ChairView from './ChairView';

export default class EmailMornitorView extends AbstarctChild {
  public email: string = 'qfourca3305@gmail.com';
  public subject: string = '';
  public body: string = '';
  public bcc: string = 'qfourca@dgsw.hs.kr';

  constructor(mornitor: TransformNode, parent: ChairView) {
    super(mornitor, parent);
  }

  public click(): void {
    this.deactivate();
    setTimeout(() => {
      this.activate();
    }, 10);
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${this.email}&bcc=${this.bcc}`
    );
  }
}
