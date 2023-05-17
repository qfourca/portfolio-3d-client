import {
  ActionManager,
  Color3,
  ExecuteCodeAction,
  HighlightLayer,
  Mesh,
} from '@babylonjs/core';

export default abstract class MoveAble {
  constructor(protected mesh: Mesh, protected hightlight: HighlightLayer) {
    mesh.actionManager = new ActionManager();
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
    this.hightlight.addMesh(this.mesh, Color3.Green());
  }

  protected onLeave() {
    this.hightlight.removeMesh(this.mesh);
  }

  protected abstract onClick(): void;
}
