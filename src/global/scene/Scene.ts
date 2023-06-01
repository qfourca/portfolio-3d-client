import {
  Scene as BABY_Scene,
  Engine,
  HighlightLayer,
  Mesh,
} from '@babylonjs/core';
import BuildEngine from './build/BuildEngine';
import BuildDebugUI from './build/BuildDebugUI';
import CustomCamera from './Camera';
import Init from './build/Init';
import UI from '../ui/UI';

export default class GlobalScene extends BABY_Scene {
  private static instance: GlobalScene;

  private _ui: UI;

  public static async set(parent: HTMLElement) {
    const ui = new UI(parent);
    const engine = await BuildEngine.build(ui.canvas);
    this.instance = new GlobalScene(engine, ui);
    Init(this._);
    await BuildDebugUI.build(this._);
  }

  public get engine(): Engine {
    return this.getEngine();
  }
  public get ui(): UI {
    return this._ui;
  }
  public get root(): Mesh {
    //@ts-expect-error
    return this.rootNodes.find(({ _isMesh }) => _isMesh);
  }

  constructor(engine: Engine, ui: UI) {
    super(engine);
    this.useRightHandedSystem = true;
    this.highlightLayer = new HighlightLayer('highlight_layer', this, {
      mainTextureRatio: 1,
      isStroke: true,
    });
    this.camera = new CustomCamera(this);
    this._ui = ui;
  }
  public highlightLayer: HighlightLayer;
  public camera: CustomCamera;
  public static get _() {
    return this.instance;
  }
}
