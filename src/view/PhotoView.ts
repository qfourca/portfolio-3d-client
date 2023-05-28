import {
  Mesh,
  Texture,
  TransformNode,
  Vector2,
  Vector3,
} from '@babylonjs/core';
import ObserverView from './ObserverView';
import { CustomMaterial } from '@babylonjs/materials';
import GlobalScene from '$/global/scene/Scene';

export default class PhotoView extends ObserverView {
  private static photoFrames: Array<PhotoView> = new Array();
  private static rootPosition: Vector3 = new Vector3(0.7, 0.6, -1);
  private static photoSize: Vector2 = new Vector2(-0.3, -0.5);

  constructor(
    public thumbnail: string,
    original: TransformNode,
    parent: TransformNode
  ) {
    const photo = original.clone(
      PhotoView.photoFrames.length + 'Photo',
      parent
    )!;
    photo.position = PhotoView.getNextposition();

    const picture = photo.getChildMeshes()[0];

    const iconMaterial = new CustomMaterial(
      PhotoView.photoFrames.length + 'icon',
      GlobalScene._
    );

    iconMaterial.diffuseTexture = new Texture(thumbnail);
    iconMaterial.diffuseTexture.hasAlpha = false;
    iconMaterial.Fragment_Custom_Diffuse(`
      baseColor.rgb = mix(vec3(1.), baseColor.rgb, baseColor.a);
    `);

    //@ts-expect-error
    iconMaterial.diffuseTexture.uScale = -1;
    picture.material = iconMaterial;

    picture.rotation = new Vector3(-Math.PI / 2, 0, 0);

    super(photo.getChildMeshes());
    PhotoView.photoFrames.push(this);
  }

  click() {}

  private static getNextposition(): Vector3 {
    const currentCount = this.photoFrames.length;
    return new Vector3(
      this.rootPosition.x + (currentCount % 5) * this.photoSize.x,
      this.rootPosition.y + Math.floor(currentCount / 5) * this.photoSize.y,
      this.rootPosition.z
    );
  }
}
