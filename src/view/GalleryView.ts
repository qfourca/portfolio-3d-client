import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh, Scene, TransformNode, Vector3 } from '@babylonjs/core';

import Observer from './Observer';
import ObserverViewWithChildren, {
  ObserverObserverViewWithChildren,
} from './ObserverViewWithChildren';
import api from '$/api/api';
import PhotoView from './PhotoView';
import NotionComponent from '$/util/Notion';

export default class GalleryView extends ObserverObserverViewWithChildren<PhotoView> {
  private notionComponent: NotionComponent;

  public click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, new Vector3(0, 0.3, 0)) * 2000;

    camera.smoothMove(new Vector3(0, 0.3, 0), time);
    camera.smoothRotation(new Vector3(0.3, 0, 0), time);
  }
  public clickChild(child: PhotoView): void {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] != child) {
        this.children[i].activate();
      }
    }
    GlobalScene._.canvas.style.width = '100%';
    GlobalScene._.canvas.style.height = '100%';
    this.notionComponent.url = child.uuid;
    child.deactivate();
  }
  public activate(): void {
    super.activate();
    GlobalScene._.canvas.style.width = '100%';
    GlobalScene._.canvas.style.height = '100%';
  }
  private photoOrigin: TransformNode;
  constructor(private root: TransformNode, observer: Observer<GalleryView>) {
    super(root as Mesh, observer);
    this.photoOrigin = root.getChildTransformNodes()[0];
    this.notionComponent = new NotionComponent(
      document.getElementById('notion')!
    );
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
              this.photoOrigin,
              this.root,
              this
            )
          );
        });
        this.photoOrigin.dispose();
      });
  }
}
