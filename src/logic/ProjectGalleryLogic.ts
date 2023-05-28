import GlobalScene from '$/global/scene/Scene';
import MoveAble from '$/interface/MoveAble';
import { Mesh, TransformNode } from '@babylonjs/core';
import RoomLogic from './RoomLogic';

export default class ProjectGalleryLogic extends MoveAble {
  protected onClick(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private root: TransformNode, private room: RoomLogic) {
    super(root as Mesh, GlobalScene._.highlightLayer);
  }
}
