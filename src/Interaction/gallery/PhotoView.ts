import {
  Color3,
  Mesh,
  PBRMaterial,
  Texture,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import GalleryView, { projectTag } from './GalleryView';
import GlobalScene from '$/global/scene/Scene';
import { CustomMaterial } from '@babylonjs/materials';
import OpenNotionPage from '$/logic/OpenNotionPage';

export default class PhotoView extends AbstarctChild {
  private photo: TransformNode;
  public meshs: Array<Mesh>;
  constructor(
    thumbnail: string,
    private uuid: string,
    position: Vector3,
    color: Color3,
    public tag: projectTag,
    private gallery: GalleryView
  ) {
    const photo = gallery.originalPhoto.clone(uuid, gallery.wall)!;

    photo.position = position.clone();
    photo.rotation = new Vector3(0, Math.PI / 2, Math.PI);

    const meshs = photo.getChildMeshes() as Array<Mesh>;
    const picture = meshs[0];

    const frame = meshs[1];
    const frameMaterial = (frame.material as PBRMaterial).clone(
      tag + 'material'
    );
    frameMaterial.albedoColor = color;
    frame.material = frameMaterial;

    const iconMaterial = new CustomMaterial(uuid + 'icon', GlobalScene._);
    const texture = new Texture(
      thumbnail,
      null,
      undefined,
      undefined,
      undefined,
      () => {
        const { width, height } = texture.getSize();
        const ratio = width / height;

        photo.scaling = photo.scaling.multiply(
          ratio > 1 ? new Vector3(1, 1 / ratio, 1) : new Vector3(ratio, 1, 1)
        );
        if (Math.abs(width - height) < 10)
          photo.scaling = photo.scaling.multiply(new Vector3().setAll(0.85));
      }
    );

    iconMaterial.diffuseTexture = texture;
    iconMaterial.diffuseTexture.hasAlpha = false;
    iconMaterial.Fragment_Custom_Diffuse(`
      baseColor.rgb = mix(vec3(1.), baseColor.rgb, baseColor.a);
    `);
    //@ts-expect-error
    iconMaterial.diffuseTexture.uScale = -1;
    iconMaterial.specularColor = new Color3(0, 0, 0);
    picture.material = iconMaterial;
    picture.rotation = new Vector3(Math.PI / 2, 0, 0);

    super(meshs, gallery);
    this.photo = photo;
    this.meshs = meshs;
  }

  public click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.photo.getAbsolutePosition()) * 200;

    const { x, y, z } = this.photo.getAbsolutePosition();
    camera.smoothMove(new Vector3(x + 0.8, y, z), time);
    camera.smoothRotation(new Vector3(0, -Math.PI / 2, 0), time);

    new OpenNotionPage().open(time, this.uuid);

    this.gallery.deactivate();
  }
}
