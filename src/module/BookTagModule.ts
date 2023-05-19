import GlobalScene from '$/global/scene/Scene';
import {
  DynamicTexture,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  TransformNode,
  Vector2,
  Vector3,
} from '@babylonjs/core';

export default class BookTagModule {
  private nameTagSize = new Vector2(98, 200);

  constructor(
    private name: string,
    private icon: string,
    private parent: TransformNode,
    private color: string,
    position: Vector3
  ) {
    const nameTag = this.buildNameTag();
    nameTag.rotation.set(Math.PI / 2, 0, 0);
    nameTag.position = position.add(new Vector3(0, -40, 0));
  }

  private buildNameTag(): Mesh {
    const nameMesh = MeshBuilder.CreateGround(this.name + 'nameTag', {
      width: this.nameTagSize.x,
      height: this.nameTagSize.y,
    });

    nameMesh.parent = this.parent;

    const texture = new DynamicTexture(
      this.name + 'nameTexture',
      {
        width: this.nameTagSize.x,
        height: this.nameTagSize.y,
      },
      GlobalScene._,
      undefined,
      undefined,
      undefined,
      false
    );
    const canvasMaterial = new StandardMaterial(
      this.name + 'nameMaterial',
      GlobalScene._
    );
    canvasMaterial.diffuseTexture = texture;

    nameMesh.material = canvasMaterial;

    const textureContext = texture.getContext();

    textureContext.fillStyle = this.color;
    textureContext.fillRect(0, 0, this.nameTagSize.x, this.nameTagSize.y);
    textureContext.fillStyle = '#000000';
    textureContext.font = '48px san serif';
    for (let i = 0; i < this.name.length; i++) {
      textureContext.fillText(this.name[i], 30, 40 + i * 40);
    }
    texture.update(false);

    return nameMesh;
  }
}
