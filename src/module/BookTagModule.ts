import GlobalScene from '$/global/scene/Scene';
import {
  Color3,
  Color4,
  DynamicTexture,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Texture,
  TransformNode,
  Vector2,
  Vector3,
} from '@babylonjs/core';
import { CustomMaterial } from '@babylonjs/materials';

export default class BookTagModule {
  private static nameTagSize = new Vector2(90, 180);
  private static iconSize = new Vector2(90, 90);

  constructor(
    private name: string,
    private icon: string,
    private parent: TransformNode,
    private color: string,
    position: Vector3
  ) {
    const nameTag = this.buildNameTag();
    nameTag.rotation.set(Math.PI / 2, 0, 0);
    nameTag.position = position.add(new Vector3(0, -50, -63));
    const iconMesh = this.buildBookIcon();
    iconMesh.rotation.set(-Math.PI / 2, Math.PI / 2, Math.PI / 2);
    iconMesh.position = position.add(new Vector3(0, 100, -63));
  }

  private buildNameTag(): Mesh {
    const nameMesh = MeshBuilder.CreateGround(this.name + 'nameTag', {
      width: BookTagModule.nameTagSize.x,
      height: BookTagModule.nameTagSize.y,
    });

    nameMesh.parent = this.parent;

    const texture = new DynamicTexture(
      this.name + 'nameTexture',
      {
        width: BookTagModule.nameTagSize.x,
        height: BookTagModule.nameTagSize.y,
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
    canvasMaterial.specularPower = 120;
    canvasMaterial.diffuseTexture = texture;

    nameMesh.material = canvasMaterial;

    const textureContext = texture.getContext();

    textureContext.fillStyle = this.color;
    textureContext.fillRect(
      0,
      0,
      BookTagModule.nameTagSize.x,
      BookTagModule.nameTagSize.y
    );
    textureContext.fillStyle = '#000000';
    textureContext.font = '48px san serif';
    for (let i = 0; i < this.name.length; i++) {
      textureContext.fillText(this.name[i], 30, 40 + i * 40);
    }
    texture.update(false);

    return nameMesh;
  }

  private buildBookIcon(): Mesh {
    const iconMesh = MeshBuilder.CreateGround(this.name + 'Icon', {
      width: BookTagModule.iconSize.x,
      height: BookTagModule.iconSize.y,
    });
    iconMesh.parent = this.parent;
    const iconMaterial = new CustomMaterial(this.name + 'icon', GlobalScene._);
    iconMaterial.specularPower = 120;
    iconMaterial.diffuseTexture = new Texture(this.icon);
    iconMaterial.diffuseTexture.hasAlpha = false;
    iconMaterial.Fragment_Custom_Diffuse(`
      baseColor.rgb = mix(vec3(1.), baseColor.rgb, baseColor.a);
    `);

    //@ts-expect-error
    iconMaterial.diffuseTexture.uScale = -1;
    iconMesh.material = iconMaterial;
    return iconMesh;
  }
}
