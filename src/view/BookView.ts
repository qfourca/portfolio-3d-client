import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import {
  Color3,
  StandardMaterial,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import BookTagModule from '../module/BookTagModule';
import ObserverView from './ObserverView';

export default class BookView extends ObserverView {
  public click(): void {
    throw new Error('Method not implemented.');
  }
  public static bookNode: TransformNode;
  public static bookShelf: TransformNode;
  private static books: Array<BookView> = new Array();
  constructor(
    public type: bookType,
    public icon: string,
    public title: string
  ) {
    const book = BookView.bookNode.clone(title + 'Book', BookView.bookShelf)!;
    const floor = BookView.typeToFloor(type);
    book.position.set(
      3,
      17 - floor * 31.5,
      110 - BookView.getCountBooks(floor) * 20
    );

    const bookCover = book
      .getChildMeshes()
      .find(({ name }) => name === book.name + '.BookCover');

    let material = BookView.bookCoverMaterial.get(type);
    if (!material) {
      material = new StandardMaterial(type + 'bookCoverMaterial');
      material.diffuseColor = Color3.FromHexString(BookView.typeToColor(type));
      BookView.bookCoverMaterial.set(type, material);
    }
    bookCover!.material = material;

    const bookTag = new BookTagModule(
      title,
      icon,
      book!,
      BookView.typeToColor(type),
      new Vector3(0, 0, 145)
    );

    super(book.getChildMeshes());

    BookView.books.push(this);
    this.isActivate = false;
  }
  protected onClick(): void {
    if (this.isActivate) {
    }
  }
  public static getCountBooks = (num: number) => {
    let res = 0;
    this.books.forEach(({ type }) => {
      const floor = this.typeToFloor(type);
      if (floor === num) res++;
    });
    return res;
  };
  private static bookCoverMaterial: Map<bookType, StandardMaterial> = new Map();
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
  private static typeToColor = (type: bookType) => {
    switch (type) {
      case 'language':
        return '#E76161';
      case 'library':
        return '#FFD95A';
      case 'framework':
        return '#19A7CE';
      case 'tool':
        return '#27E1C1';
      case 'etc':
        return '#7149C6';
    }
  };
}

declare type bookType = 'tool' | 'language' | 'etc' | 'framework' | 'library';
