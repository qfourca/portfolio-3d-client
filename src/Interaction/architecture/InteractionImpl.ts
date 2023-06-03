import {
  ActionManager,
  Color3,
  ExecuteCodeAction,
  HighlightLayer,
  Mesh,
  Scene,
} from '@babylonjs/core';
import Interactable, { InteractableTarget } from './Interactable';
import GlobalScene from '$/global/scene/Scene';

export default abstract class InteractionImpl implements Interactable {
  public isHover: boolean = false;
  public isActivate: boolean = false;
  public highlightColor: Color3 = Color3.Green();
  protected targets: Array<Mesh> = new Array();
  private highlightLayer: HighlightLayer;
  protected actionManager: ActionManager = new ActionManager();

  constructor(target: InteractableTarget) {
    this.highlightLayer = GlobalScene._.highlightLayer;
    this.addTarget(target);
  }

  addTarget(target: InteractableTarget): void {
    this.__execute__(target, this._addTarget.bind(this));
  }
  private _addTarget(target: Mesh) {
    this.targets.push(target);
    this.setEvent(target);
  }
  private __execute__(
    target: InteractableTarget,
    callback: (mesh: Mesh) => void
  ) {
    if (target) {
      if (target instanceof Array) {
        target.forEach((target) => {
          callback(target);
        });
      } else {
        callback(target);
      }
    } else {
      this.targets.forEach((mesh) => callback(mesh));
    }
  }
  private setEvent(mesh: Mesh) {
    if (mesh.actionManager === null) {
      mesh.actionManager = this.actionManager;
    }
    mesh.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPointerOverTrigger,
        this._hover.bind(this)
      )
    );
    mesh.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPointerOutTrigger,
        this._out.bind(this)
      )
    );
    mesh.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnLeftPickTrigger,
        this._click.bind(this)
      )
    );
  }

  protected _click() {
    if (this.isActivate) {
      this._out();
      this.click();
    }
  }

  protected _hover() {
    if (this.isActivate) {
      this.__execute__(this.targets, (mesh: Mesh) => {
        this.highlightLayer.addMesh(mesh, this.highlightColor);
      });
      this.actionManager.hoverCursor = 'pointer';
      this.hover();
    } else {
      this.actionManager.hoverCursor = 'default';
    }
  }

  protected _out() {
    if (this.isActivate) {
      this.__execute__(this.targets, (mesh: Mesh) => {
        this.highlightLayer.removeMesh(mesh);
      });
      this.actionManager.hoverCursor = 'default';
      this.out();
    }
  }
  abstract click(): void;
  abstract hover(): void;
  abstract out(): void;

  activate(): void {
    this.isActivate = true;
  }
  deactivate(): void {
    this.isActivate = false;
  }
}
