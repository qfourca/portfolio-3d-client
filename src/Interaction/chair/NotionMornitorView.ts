import { PBRMaterial, Texture, TransformNode } from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import ChairView from './ChairView';
import NotionImage from '$static/notion.png';

export default class NotionMornitorView extends AbstarctChild {
  constructor(mornitor: TransformNode, parent: ChairView) {
    super(mornitor, parent);
    mornitor.getChildMeshes().forEach((screen) => {
      if (screen.name.includes('MonitorScreen')) {
        const material = screen.material as PBRMaterial;
        const imageTexture = new Texture(NotionImage, null, false, false);
        material.albedoTexture = imageTexture;
      }
    });
  }

  public click(): void {
    this.deactivate();
    setTimeout(() => {
      this.activate();
    }, 10);
    window.open('https://qfourca.notion.site/8a2586569f15472a99d4ddf652a4f38b');
  }
}
