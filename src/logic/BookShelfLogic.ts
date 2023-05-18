import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import BookMoule from '$/module/BookModule';
import { Mesh, PointLight, TransformNode, Vector3 } from '@babylonjs/core';
import axios from 'axios';

export default class BookShelfLogic extends MoveAble {
  private original: TransformNode;
  constructor(private root: TransformNode) {
    super(root.getChildMeshes(), GlobalScene._.highlightLayer);
    this.original = root
      .getChildTransformNodes()
      .find((m) => m.name === 'Book')!;
    BookMoule.bookShelf = root;
    BookMoule.bookNode = this.original;
    // const pointLight = new PointLight(
    //   'Point',
    //   new Vector3(0.2, -0.05, 0.2),
    //   GlobalScene._
    // );
    // pointLight.parent = this.root;
    // pointLight.intensity = 0.2;
    axios
      .get<{
        data: Array<{
          icon: string;
          title: string;
          type: bookType;
          uuid: string;
        }>;
      }>('http://localhost:8000/notion/techstack')
      .then((res) => {
        res.data.data.forEach((element) => {
          new BookMoule(element.type, element.icon, element.title);
        });
        this.mesh = root.getChildMeshes();
      });
  }
  protected onClick(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.root.getAbsolutePosition()) * 2000;

    const { x, y, z } = this.root.getAbsolutePosition();
    camera.smoothMove(new Vector3(x - 0.2, y - 0.05, z), time);
    camera.smoothRotation(new Vector3(0, Math.PI / 2, 0), time);
  }
}
declare type bookType = 'tool' | 'language' | 'etc' | 'framework' | 'library';
