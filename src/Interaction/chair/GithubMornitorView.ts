import { PBRMaterial, Texture, TransformNode } from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import ChairView from './ChairView';
import GithubImage from '$static/github.png';

export default class GithubMornitorView extends AbstarctChild {
  constructor(mornitor: TransformNode, parent: ChairView) {
    super(mornitor, parent);
    mornitor.getChildMeshes().forEach((screen) => {
      if (screen.name.includes('MonitorScreen')) {
        const material = screen.material as PBRMaterial;
        const imageTexture = new Texture(GithubImage, null, false, false);
        material.albedoTexture = imageTexture;
      }
    });
  }

  public click(): void {
    this.deactivate();
    setTimeout(() => {
      this.activate();
    }, 10);
    window.open('https://github.com/qfourca');
  }
}
