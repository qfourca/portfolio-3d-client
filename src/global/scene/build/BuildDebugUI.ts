import { Scene } from '@babylonjs/core';
import Config from '$/global/config/Config';

export default class BuildDebugUI {
  public static async build(scene: Scene) {
    if (Config._.debugUI) {
      await import('@babylonjs/inspector');
      scene.debugLayer.show({
        overlay: false,
      });
    } else {
      scene.debugLayer.hide();
    }
  }
}
