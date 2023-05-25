import Config from '$/global/config/Config';
import { WebGPUEngine } from '@babylonjs/core/Engines/webgpuEngine';
import { Engine } from '@babylonjs/core/Engines/engine';

export default class BuildEngine {
  public static async build(canvas: HTMLCanvasElement) {
    let engine: Engine;
    if (Config._.engine == 'webgpu') {
      engine = new WebGPUEngine(canvas);
      await (engine as WebGPUEngine).initAsync();
    } else {
      engine = new Engine(canvas);
    }
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    return engine;
  }
}
