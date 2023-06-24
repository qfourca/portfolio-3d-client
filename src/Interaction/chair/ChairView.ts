import { Mesh, TransformNode, Vector3 } from '@babylonjs/core';
import AbstarctChild from '../architecture/AbstarctChild';
import GlobalScene from '$/global/scene/Scene';
import Parentable from '../architecture/Parentable';
import AbstactChildParent from '../architecture/AbstractChildParent';
import EmailMornitorView from './EmailMornitorView';
import NotionMornitorView from './NotionMornitorView';
import GithubMornitorView from './GithubMornitorView';
import CellphoneView from './CellphoneView';

export default class ChairView extends AbstactChildParent<AbstarctChild> {
  constructor(private chair: TransformNode, parent: Parentable<AbstarctChild>) {
    super(new Array(), parent);

    //@ts-expect-error
    chair.getChildren().forEach((child: Mesh) => {
      if (child._isMesh) {
        this.addTarget(child);
      } else if (child.name == 'NotionMornitor') {
        this.appendChild(new NotionMornitorView(child, this));
      } else if (child.name == 'EmailMornitor') {
        this.appendChild(new EmailMornitorView(child, this));
      } else if (child.name == 'GithubMornitor') {
        this.appendChild(new GithubMornitorView(child, this));
      } else if (child.name === 'PhoneStand') {
        this.appendChild(new CellphoneView(child, this));
      }
    });
  }
  click(): void {
    const camera = GlobalScene._.camera;
    const time =
      Vector3.Distance(camera.position, this.chair.getAbsolutePosition()) * 300;

    const { x, y, z } = this.chair.getAbsolutePosition();
    camera.smoothMove(new Vector3(x, y + 1.5, z + 0.4), time);
    camera.smoothRotation(new Vector3(0.3, Math.PI, 0), time);
  }
  activate(): void {
    super.activate();
    this.children.forEach((child) => child.deactivate());
  }
  deactivate(): void {
    super.deactivate();
    this.children.forEach((child) => child.activate());
  }
  clickChild(child: AbstarctChild): void {
    // throw new Error('Method not implemented.');
  }
}
