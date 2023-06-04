import {
  Color3,
  StandardMaterial,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import BookshelfView from './BookshelfView';
import BookTagModule from '$/module/BookTagModule';

export default class BookView extends AbstarctChild {
  private book: TransformNode;
  constructor(
    public type: bookType,
    public icon: string,
    public title: string,
    parent: BookshelfView
  ) {
    const book = parent.originalBook.clone(title, parent.bookshelf)!;
    const floor = BookView.typeToFloor(type);
    book.position.set(
      3,
      17 - floor * 31.5,
      110 - parent.getCountBooks(floor) * 20
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
    super(book.getChildMeshes(), parent);
    this.book = book;
  }
  private static bookCoverMaterial: Map<bookType, StandardMaterial> = new Map();
  public get meshs() {
    return this.targets;
  }
  public static typeToFloor = (type: bookType) => {
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
  public static typeToColor = (type: bookType) => {
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

export declare type bookType =
  | 'tool'
  | 'language'
  | 'etc'
  | 'framework'
  | 'library';
