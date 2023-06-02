import GlobalScene from '$/global/scene/Scene';
import { Mesh, TransformNode, Vector2, Vector3 } from '@babylonjs/core';
import AbstarctChild from './architecture/AbstarctChild';
import AbstactChildParent from './architecture/AbstractChildParent';
import Parentable from './architecture/Parentable';
import api from '$/api/api';
import PhotoView from './PhotoView';

export default class GalleryView extends AbstactChildParent<AbstarctChild> {
  private static rootPosition: Vector3 = new Vector3(0.7, 0.6, -1);
  private static photoSize: Vector2 = new Vector2(-0.3, -0.5);

  public originalPhoto: TransformNode;
  constructor(public wall: Mesh, parent: Parentable<AbstarctChild>) {
    super(wall, parent);
    this.originalPhoto = wall.getChildTransformNodes()[0];

    api
      .get<
        Array<{
          uuid: string;
          title: string;
          startAt: string;
          endAt: string;
          thumbnail: string;
        }>
      >('/project/list')
      .then(({ data }) => {
        data.forEach((photoInfo) => {
          this.children.push(
            new PhotoView(
              photoInfo.thumbnail,
              photoInfo.uuid,
              this.nextPhotoPosition(),
              this
            )
          );
        });
        this.originalPhoto.dispose();
        this.children.forEach((child) => child.activate());
      });
  }
  public click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, new Vector3(0, 0.3, 0)) * 2000;
    camera.smoothMove(new Vector3(0, 0.3, 0), time);
    camera.smoothRotation(new Vector3(0.3, 0, 0), time);
    this.children.forEach((child) => {
      child.activate();
    });
  }

  public clickChild(child: AbstarctChild): void {
    this.children.forEach((child) => child.activate());
    child.deactivate();
    this.activate();
  }

  public nextPhotoPosition() {
    const currentCount = this.children.length;
    return new Vector3(
      GalleryView.rootPosition.x + (currentCount % 5) * GalleryView.photoSize.x,
      GalleryView.rootPosition.y +
        Math.floor(currentCount / 5) * GalleryView.photoSize.y,
      GalleryView.rootPosition.z
    );
  }
}
