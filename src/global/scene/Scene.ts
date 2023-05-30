import {
  Scene as BABY_Scene,
  Engine,
  HighlightLayer,
  Mesh,
} from '@babylonjs/core';
import BuildCanvas from './build/BuildCanvas';
import BuildEngine from './build/BuildEngine';
import BuildDebugUI from './build/BuildDebugUI';
import CustomCamera from './Camera';
import Init from './build/Init';
import { doc } from 'prettier';

export default class GlobalScene extends BABY_Scene {
  private static instance: GlobalScene;

  public elements: {
    root: HTMLElement;
    app: HTMLElement;
    notion: HTMLElement;
  };

  public static async set(parent: HTMLElement) {
    const canvas = BuildCanvas.build(parent);
    const engine = await BuildEngine.build(canvas);
    this.instance = new GlobalScene(engine);
    Init(this._);
    await BuildDebugUI.build(this._);
  }

  public get engine(): Engine {
    return this.getEngine();
  }
  public get canvas(): HTMLCanvasElement {
    return this.engine.getRenderingCanvas()!;
  }
  public get htmlroot(): HTMLElement {
    return this.canvas.parentElement!;
  }
  public get root(): Mesh {
    //@ts-expect-error
    return this.rootNodes.find(({ _isMesh }) => _isMesh);
  }

  constructor(engine: Engine) {
    super(engine);
    this.useRightHandedSystem = true;
    this.highlightLayer = new HighlightLayer('highlight_layer', this, {
      mainTextureRatio: 1,
      isStroke: true,
    });
    this.camera = new CustomCamera(this);
    this.elements = {
      root: this.htmlroot,
      app: document.getElementById('app')!,
      notion: document.getElementById('notion')!,
    };
  }
  public highlightLayer: HighlightLayer;
  public camera: CustomCamera;
  public static get _() {
    return this.instance;
  }
}
