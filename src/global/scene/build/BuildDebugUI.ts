import { Scene } from '@babylonjs/core';
import Config from '$/global/config/Config';

export default class BuildDebugUI {
  public static async build(scene: Scene) {
    await import('@babylonjs/inspector');
    if (Config._.debugUI) {
      scene.debugLayer.show({
        overlay: false,
      });
    } else {
      scene.debugLayer.hide();
    }
  }
}
