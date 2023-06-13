import RoomView from '$/Interaction/RoomView';
import Config, { RawConfig } from '$/global/config/Config';
import Scene from '$/global/scene/Scene';
import LoadScene from './LoadScene';

export default class App {
  public static async init(config: RawConfig, root: HTMLElement) {
    await Config.set(config);
    await Scene.set(root);

    await LoadScene();

    // new RoomView();
  }

  public static run() {
    Scene._.engine.runRenderLoop(() => {
      const canvas = Scene._.ui.canvas;
      if (
        canvas.width !== canvas.clientWidth ||
        canvas.height !== canvas.clientHeight
      ) {
        Scene._.engine.resize();
      }
      Scene._.render();
    });
  }

  public static pause() {
    Scene._.engine.stopRenderLoop();
  }
}
