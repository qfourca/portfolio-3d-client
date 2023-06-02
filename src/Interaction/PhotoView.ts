import { Texture, TransformNode, Vector3 } from '@babylonjs/core';
import AbstarctChild from './architecture/AbstarctChild';
import GalleryView from './GalleryView';
import GlobalScene from '$/global/scene/Scene';
import { CustomMaterial } from '@babylonjs/materials';
import OpenNotionPage from '$/logic/OpenNotionPage';

export default class PhotoView extends AbstarctChild {
  private photo: TransformNode;
  constructor(
    private thumbnail: string,
    private uuid: string,
    position: Vector3,
    private gallery: GalleryView
  ) {
    const photo = gallery.originalPhoto.clone(uuid, gallery.wall)!;
    photo.position = position.clone();

    const picture = photo.getChildMeshes()[0];

    const iconMaterial = new CustomMaterial(uuid + 'icon', GlobalScene._);

    iconMaterial.diffuseTexture = new Texture(thumbnail);
    iconMaterial.diffuseTexture.hasAlpha = false;
    iconMaterial.Fragment_Custom_Diffuse(`
      baseColor.rgb = mix(vec3(1.), baseColor.rgb, baseColor.a);
    `);
    //@ts-expect-error
    iconMaterial.diffuseTexture.uScale = -1;
    picture.material = iconMaterial;
    picture.rotation = new Vector3(-Math.PI / 2, 0, 0);

    super(photo.getChildMeshes(), gallery);
    this.photo = photo;
  }

  public click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.photo.getAbsolutePosition()) *
      2000;

    const { x, y, z } = this.photo.getAbsolutePosition();
    camera.smoothMove(new Vector3(x, y, z - 0.09), time);
    camera.smoothRotation(new Vector3(0, 0, 0), time);

    new OpenNotionPage().open(time, this.uuid);
  }
}
