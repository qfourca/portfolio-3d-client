import { PBRMaterial, Texture, TransformNode, Vector4 } from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import ChairView from './ChairView';
import EmailImage from '$static/email.png';

export default class EmailMornitorView extends AbstarctChild {
  public email: string = 'qfourca3305@gmail.com';
  public subject: string = '';
  public body: string = '';
  public bcc: string = 'qfourca@dgsw.hs.kr';

  constructor(mornitor: TransformNode, parent: ChairView) {
    super(mornitor, parent);
    mornitor.getChildMeshes().forEach((screen) => {
      if (screen.name.includes('MonitorScreen')) {
        const material = screen.material as PBRMaterial;
        const imageTexture = new Texture(EmailImage, null, false, false);
        material.albedoTexture = imageTexture;
      }
    });
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
