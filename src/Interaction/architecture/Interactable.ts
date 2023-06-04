import Activatable from '$/interface/Activatable';
import Clickable from '$/interface/Clickable';
import Hoverable from '$/interface/Hoverable';
import { Color3, Mesh, TransformNode } from '@babylonjs/core';

export default interface Interactable
  extends Activatable,
    Clickable,
    Hoverable {
  highlightColor: Color3;
  addTarget(target: InteractableTarget): void;
}

export type InteractableTarget = Mesh | Array<Mesh> | TransformNode;
