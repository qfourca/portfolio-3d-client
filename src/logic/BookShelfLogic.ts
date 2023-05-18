import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import BookMoule from '$/module/BookModule';
import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';
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
      Vector3.Distance(camera.position, this.root.getAbsolutePosition()) * 20;

    const { x, y, z } = this.root.getAbsolutePosition();
    camera.smoothMove(new Vector3(x - 20, y - 5, z), time);
    camera.smoothRotation(new Vector3(0, Math.PI / 2, 0), time);
  }
  // public addBook: (floor: number, icon: string, name: string) => void = (
  //   floor: number,
  //   icon: string,
  //   name: string
  // ) => {
  //   const newPic = this.original.clone();
  //   newPic.position.set(
  //     3,
  //     17 - floor * 31,
  //     110 - this.getCountBooks(floor) * 15
  //   );
  //   newPic.visible = true;
  //   this.target.add(newPic);
  //   const controller = new BookController(
  //     this.core,
  //     this.scene,
  //     this.eventController,
  //     newPic
  //   );
  //   this.books.push(controller);
  //   controller.__init__();
  //   controller.set(floor, icon, name);
  //   return controller;
  // };

  // private getCountBooks = (num: number) => {
  //   let res = 0;
  //   this.books.forEach(({ floor }) => {
  //     if (floor === num) res++;
  //   });
  //   return res;
  // };

  private static typeToFloor = (type: bookType) => {
    switch (type) {
      case 'language':
        return 0;
      case 'library':
        return 1;
      case 'framework':
        return 2;
      case 'tool':
        return 3;
      case 'etc':
        return 4;
    }
  };
}
declare type bookType = 'tool' | 'language' | 'etc' | 'framework' | 'library';
