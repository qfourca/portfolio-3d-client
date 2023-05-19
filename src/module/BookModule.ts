import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import {
  Color3,
  StandardMaterial,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import BookTagModule from './BookTagModule';

export default class BookMoule extends MoveAble {
  public static bookNode: TransformNode;
  public static bookShelf: TransformNode;
  private static books: Array<BookMoule> = new Array();
  constructor(
    public type: bookType,
    public icon: string,
    public title: string
  ) {
    const book = BookMoule.bookNode.clone(title + 'Book', BookMoule.bookShelf)!;
    const floor = BookMoule.typeToFloor(type);
    book.position.set(
      3,
      17 - floor * 31.5,
      110 - BookMoule.getCountBooks(floor) * 20
    );

    const bookCover = book
      .getChildMeshes()
      .find(({ name }) => name === book.name + '.BookCover');

    let material = BookMoule.bookCoverMaterial.get(type);
    if (!material) {
      material = new StandardMaterial(type + 'bookCoverMaterial');
      material.diffuseColor = Color3.FromHexString(BookMoule.typeToColor(type));
      BookMoule.bookCoverMaterial.set(type, material);
    }
    bookCover!.material = material;

    const bookTag = new BookTagModule(
      title,
      icon,
      book!,
      BookMoule.typeToColor(type),
      new Vector3(0, 0, 145)
    );

    super(book.getChildMeshes(), GlobalScene._.highlightLayer);
    BookMoule.books.push(this);
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
        return '#FEA1A1';
      case 'library':
        return '#FEFF86';
      case 'framework':
        return '#B0DAFF';
      case 'tool':
        return '#E5F9DB';
      case 'etc':
        return '#D4ADFC';
    }
  };
}

declare type bookType = 'tool' | 'language' | 'etc' | 'framework' | 'library';
