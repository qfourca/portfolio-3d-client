import GlobalScene from '$/global/scene/Scene';
import { Color3, Mesh, TransformNode, Vector2, Vector3 } from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import AbstactChildParent from '../architecture/AbstractChildParent';
import Parentable from '../architecture/Parentable';
import api from '$/api/api';
import PhotoView from './PhotoView';

export default class GalleryView extends AbstactChildParent<PhotoView> {
  private static rootPosition: Vector3 = new Vector3(0, 0, 0);
  private static photoSize: Vector2 = new Vector2(-0.7, -0.8);

  public originalPhoto: TransformNode;
  constructor(public wall: Mesh, parent: Parentable<AbstarctChild>) {
    super(wall, parent);
    this.originalPhoto = wall.getChildTransformNodes()[0];
    GalleryView.rootPosition = this.originalPhoto.position;
    api
      .get<
        Array<{
          uuid: string;
          title: string;
          tag: projectTag;
          startAt: string;
          endAt: string;
          thumbnail: string;
        }>
      >('/project/list')
      .then(({ data }) => {
        data.forEach((photoInfo) => {
          if (photoInfo.tag != 'LEGACY') {
            this.children.push(
              new PhotoView(
                photoInfo.thumbnail,
                photoInfo.uuid,
                this.nextPhotoPosition(photoInfo.tag),
                this.frameColor.get(photoInfo.tag)!,
                photoInfo.tag,
                this
              )
            );
          }
        });
        this.originalPhoto.dispose();
        this.children.forEach((child) => {
          if (!this.isActivate) child.activate();
          this.addTarget(child.meshs);
        });
      });
  }
  private frameColor = new Map<projectTag, Color3>([
    ['대표 프로젝트', Color3.FromHexString('#eb7b4b')],
    ['프로젝트', Color3.FromHexString('#a1f7a7')],
    ['MDA 인턴 프로젝트', Color3.FromHexString('#8e93f5')],
    ['LEGACY', Color3.FromHexString('#ababab')],
  ]);

  public click(): void {
    const camera = GlobalScene._.camera;
    const goalPosition = new Vector3(0.7, 1.8, -0.2);
    const time = Vector3.Distance(camera.position, goalPosition) * 300;
    camera.smoothMove(goalPosition, time);
    camera.smoothRotation(new Vector3(0.1, Math.PI * 1.5, 0), time);
    this.children.forEach((child) => {
      child.activate();
    });
  }

  public clickChild(child: AbstarctChild): void {
    this.children.forEach((child) => child.activate());
    child.deactivate();
    setTimeout(() => {
      this.activate();
    }, 300);
  }

  public nextPhotoPosition(projTag: projectTag) {
    const currentCount = this.children.filter(
      ({ tag }) => tag === projTag
    ).length;
    const tagRank = () => {
      switch (projTag) {
        case '대표 프로젝트':
          return 0;
        case '프로젝트':
          return 1;
        case 'MDA 인턴 프로젝트':
          return 2;
        default:
          return 3;
      }
    };

    return new Vector3(
      GalleryView.rootPosition.x,
      GalleryView.rootPosition.y + tagRank() * GalleryView.photoSize.y,
      GalleryView.rootPosition.z + currentCount * GalleryView.photoSize.x
    );
  }
}

export type projectTag =
  | '프로젝트'
  | 'MDA 인턴 프로젝트'
  | '대표 프로젝트'
  | 'LEGACY';
