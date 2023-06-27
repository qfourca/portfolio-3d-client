import {
  Mesh,
  PBRMaterial,
  Texture,
  TransformNode,
  Vector3,
  VideoTexture,
} from '@babylonjs/core';
import AbstarctChild from './architecture/AbstarctChild';
import GlobalScene from '$/global/scene/Scene';
import Parentable from './architecture/Parentable';

import TestVideo from '$static/video.mp4';

export default class SofaView extends AbstarctChild {
  private tvMaterial: PBRMaterial;

  constructor(private sofa: TransformNode, parent: Parentable<AbstarctChild>) {
    super(sofa, parent);
    this.tvMaterial = sofa
      .getChildren()
      .find(({ name }) => name === 'tv')
      ?.getChildMeshes()
      .find(({ name }) => name === 'TV_disp')?.material as PBRMaterial;

    this.tvMaterial.albedoTexture = new VideoTexture(
      'video',
      TestVideo,
      GlobalScene._
    );
    const video = (this.tvMaterial.albedoTexture as VideoTexture).video;
    video.muted = true;
    video.autoplay = false;
  }
  click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.sofa.getAbsolutePosition()) * 300;

    const { x, y, z } = this.sofa.getAbsolutePosition();
    camera.smoothMove(new Vector3(x, y + 1.2, z), time);
    camera.smoothRotation(new Vector3(0, Math.PI / 2, 0), time);

    setTimeout(() => {
      (this.tvMaterial.albedoTexture as VideoTexture).video.play();
    }, time);

    super.click();
  }
}
