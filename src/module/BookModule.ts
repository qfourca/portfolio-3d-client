import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import {
  Color3,
  PBRBaseMaterial,
  PBRBaseSimpleMaterial,
  PBRSpecularGlossinessMaterial,
  StandardMaterial,
  TransformNode,
} from '@babylonjs/core';
import {
  NormalMaterial,
  PBRCustomMaterial,
  SimpleMaterial,
} from '@babylonjs/materials';

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
    super(book.getChildMeshes(), GlobalScene._.highlightLayer);
    const floor = BookMoule.typeToFloor(type);
    book.position.set(
      3,
      17 - floor * 32,
      110 - BookMoule.getCountBooks(floor) * 21
    );
    BookMoule.books.push(this);
    const bookCover = book
      .getChildMeshes()
      .find(({ name }) => name === book.name + '.BookCover');

    let material = BookMoule.bookCoverMaterial.get(type);
    if (!material) {
      material = new StandardMaterial(type + 'bookCoverMaterial');
      // material.specularPower = Infinity;
      material.diffuseColor = BookMoule.typeToColor(type);
      BookMoule.bookCoverMaterial.set(type, material);
    }
    bookCover!.material = material;
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
        return new Color3(0.7, 0, 0.2);
      case 'library':
        return new Color3(0.1, 0.8, 0.8);
      case 'framework':
        return new Color3(0, 0.8, 0);
      case 'tool':
        return new Color3(0.8, 0.1, 0.8);
      case 'etc':
        return new Color3(0.1, 0.1, 0.1);
    }
  };
}

declare type bookType = 'tool' | 'language' | 'etc' | 'framework' | 'library';
