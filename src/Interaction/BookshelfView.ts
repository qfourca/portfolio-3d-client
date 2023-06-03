import GlobalScene from '$/global/scene/Scene';
import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';
import AbstarctChild from './architecture/AbstarctChild';
import AbstactChildParent from './architecture/AbstractChildParent';
import Parentable from './architecture/Parentable';
import api from '$/api/api';
import PhotoView from './PhotoView';
import BookView, { bookType } from './BookView';

export default class BookshelfView extends AbstactChildParent<BookView> {
  public originalBook: TransformNode;

  constructor(
    public bookshelf: TransformNode,
    parent: Parentable<AbstarctChild>
  ) {
    super(bookshelf.getChildren()[1] as Mesh, parent);
    this.originalBook = bookshelf.getChildren()[0] as TransformNode;

    // api
    //   .get<
    //     Array<{
    //       icon: string;
    //       title: string;
    //       type: bookType;
    //       uuid: string;
    //     }>
    //   >('/techstack/list')
    //   .then((res) => {
    //     res.data.forEach((element) => {
    //       const bookView = new BookView(
    //         element.type,
    //         element.icon,
    //         element.title,
    //         this
    //       );
    //       this.children.push(bookView);
    //       this.addTarget(bookView.meshs);
    //     });
    //     this.activate();
    //     this.originalBook.dispose();
    //   });
  }
  public click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.bookshelf.getAbsolutePosition()) *
      2000;

    const { x, y, z } = this.bookshelf.getAbsolutePosition();
    camera.smoothMove(new Vector3(x + 0.2, y, z), time);
    camera.smoothRotation(new Vector3(0.2, -Math.PI / 2, 0), time);

    this.children.forEach((child) => child.activate());
  }
  public getCountBooks(num: number) {
    let res = 0;
    this.children.forEach(({ type }) => {
      const floor = BookView.typeToFloor(type);
      if (floor === num) res++;
    });
    return res;
  }
  clickChild(child: AbstarctChild): void {
    throw new Error('Method not implemented.');
  }
}
