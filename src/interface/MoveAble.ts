import GlobalScene from '$/global/scene/Scene';
import {
  ActionManager,
  Color3,
  ExecuteCodeAction,
  HighlightLayer,
  Mesh,
} from '@babylonjs/core';

export default abstract class MoveAble {
  public isActivate: boolean = true;
  protected actionManager: ActionManager;
  constructor(
    protected mesh: Mesh | Array<Mesh>,
    protected hightlight: HighlightLayer
  ) {
    this.actionManager = new ActionManager();
    if (mesh instanceof Array) {
      mesh.forEach((m) => this.setEvent(m));
    } else {
      this.setEvent(mesh);
    }
  }

  private setEvent(mesh: Mesh) {
    mesh.actionManager = this.actionManager;
    mesh.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPointerOverTrigger,
        this.onHover.bind(this)
      )
    );
    mesh.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPointerOutTrigger,
        this.onLeave.bind(this)
      )
    );
    mesh.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnLeftPickTrigger,
        this.onClick.bind(this)
      )
    );
  }

  protected onHover() {
    if (this.isActivate) {
      if (this.mesh instanceof Array) {
        this.mesh.forEach((m) => this.hightlight.addMesh(m, Color3.Green()));
      } else {
        this.hightlight.addMesh(this.mesh, Color3.Green());
      }
    } else {
    }
  }

  protected onLeave() {
    if (this.mesh instanceof Array) {
      this.mesh.forEach((m) => this.hightlight.removeMesh(m));
    } else {
      this.hightlight.removeMesh(this.mesh);
    }
  }

  protected abstract onClick(): void;
}
