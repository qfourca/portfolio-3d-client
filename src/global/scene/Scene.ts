import { Scene as BABY_Scene, Engine, TransformNode } from '@babylonjs/core';
import BuildCanvas from './build/BuildCanvas';
import BuildEngine from './build/BuildEngine';
import BuildDebugUI from './build/BuildDebugUI';
import DeltaClock from '$/util/DeltaClock';

export default class GlobalScene extends BABY_Scene {
  private static instance: GlobalScene;

  public static async set(parent: HTMLElement) {
    const canvas = BuildCanvas.build(parent);
    const engine = await BuildEngine.build(canvas);
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    this.instance = new GlobalScene(engine);
    await BuildDebugUI.build(this.instance);
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
  public static get _() {
    return this.instance;
  }
}
