import Config from '$/global/config/Config';
import { WebGPUEngine, Engine } from '@babylonjs/core';
export default class BuildEngine {
  private static dynamicWebGPULoader = [];
  public static async build(canvas: HTMLCanvasElement) {
    let engine: Engine;
    if (Config._.engine == 'webgpu') {
      const wgpuEngine = new WebGPUEngine(canvas);
      await wgpuEngine.initAsync();
      engine = wgpuEngine;
    } else {
      engine = new Engine(canvas);
    }
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    return engine;
  }
}
