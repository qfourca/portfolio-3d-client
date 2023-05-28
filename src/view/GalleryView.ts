import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';

import Observer from './Observer';
import ObserverViewWithChildren from './ObserverViewWithChildren';
import api from '$/api/api';
import PhotoView from './PhotoView';

export default class GalleryView extends ObserverViewWithChildren<any> {
  public click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, new Vector3(0, 0.3, 0)) * 2000;

    camera.smoothMove(new Vector3(0, 0.3, 0), time);
    camera.smoothRotation(new Vector3(0.3, 0, 0), time);
  }
  private photoOrigin: TransformNode;
  constructor(private root: TransformNode, observer: Observer) {
    super(root as Mesh, observer);
    this.photoOrigin = root.getChildTransformNodes()[0];
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
          new PhotoView(photoInfo.thumbnail, this.photoOrigin, this.root);
        });
        this.photoOrigin.dispose();
      });
  }
}
