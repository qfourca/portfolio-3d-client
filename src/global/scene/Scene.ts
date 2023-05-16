import { Scene as BABY_Scene, Engine, TransformNode } from '@babylonjs/core';
import BuildCanvas from './build/BuildCanvas';
import BuildEngine from './build/BuildEngine';
import BuildDebugUI from './build/BuildDebugUI';

export default class Scene extends BABY_Scene {
  private static instance: Scene;
  public static rootName: string = '@root';

  public static async set(parent: HTMLElement) {
    const canvas = BuildCanvas.build(parent);
    const engine = await BuildEngine.build(canvas);
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    this.instance = new Scene(engine);
    this.instance.addTransformNode(new TransformNode(Scene.rootName));
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
  public get root(): TransformNode {
    return this.getTransformNodeByName(Scene.rootName)!;
  }
  public static get _() {
    return this.instance;
  }
}
