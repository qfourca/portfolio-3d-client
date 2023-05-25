import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import BookMoule from '$/module/BookModule';
import { TransformNode, Vector3 } from '@babylonjs/core';
import axios from 'axios';

export default class BookShelfLogic extends MoveAble {
  private bookModules: Array<BookMoule> = new Array();
  constructor(private root: TransformNode) {
    super(root.getChildMeshes(), GlobalScene._.highlightLayer);
    BookMoule.bookShelf = root;
    BookMoule.bookNode = root
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
          this.bookModules.push(
            new BookMoule(element.type, element.icon, element.title)
          );
        });
        this.mesh = root.getChildMeshes();
        BookMoule.bookNode.dispose();
      });
  }
  protected onClick(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.root.getAbsolutePosition()) * 2000;

    const { x, y, z } = this.root.getAbsolutePosition();
    camera.smoothMove(new Vector3(x + 0.2, y, z), time);
    camera.smoothRotation(new Vector3(0.2, -Math.PI / 2, 0), time);
    this.activate();
  }

  public activate() {
    this.bookModules.forEach((mod) => {
      mod.isActivate = true;
    });
    this.isActivate = false;
  }

  public deactivate() {
    this.bookModules.forEach((mod) => {
      mod.isActivate = false;
    });
    this.isActivate = true;
  }
}
declare type bookType = 'tool' | 'language' | 'etc' | 'framework' | 'library';
