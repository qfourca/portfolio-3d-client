import GlobalScene from '$/global/scene/Scene';
import { TransformNode, Vector3 } from '@babylonjs/core';
import axios from 'axios';
import Observer from './Observer';
import ObserverViewWithChildren from './ObserverViewWithChildren';
import BookView from './BookView';

export default class BookShelfView extends ObserverViewWithChildren<BookView> {
  constructor(private root: TransformNode, observer: Observer) {
    super(root.getChildMeshes(), observer, new Array());
    BookView.bookShelf = root;
    BookView.bookNode = root
      .getChildTransformNodes()
      .find((m) => m.name === 'Book')!;
    axios
      .get<
        Array<{
          icon: string;
          title: string;
          type: bookType;
          uuid: string;
        }>
      >('http://localhost:8000/techstack/list')
      .then((res) => {
        res.data.forEach((element) => {
          this.children.push(
            new BookView(element.type, element.icon, element.title)
          );
        });
        this.mesh = root.getChildMeshes();
        this.activate();
        BookView.bookNode.dispose();
      });
  }

  public click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.root.getAbsolutePosition()) * 2000;

    const { x, y, z } = this.root.getAbsolutePosition();
    camera.smoothMove(new Vector3(x + 0.2, y, z), time);
    camera.smoothRotation(new Vector3(0.2, -Math.PI / 2, 0), time);
    this.deactivate();
  }
}
declare type bookType = 'tool' | 'language' | 'etc' | 'framework' | 'library';
