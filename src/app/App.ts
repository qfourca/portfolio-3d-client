import Config, { RawConfig } from '$/global/config/Config';
import Scene from '$/global/scene/Scene';
import RoomObserver from '$/view/RoomObserver';
import LoadScene from './LoadScene';

export default class App {
  public static async init(config: RawConfig, root: HTMLElement) {
    await Config.set(config);
    await Scene.set(root);

    await LoadScene();

    new RoomObserver();
  }

  public static run() {
    Scene._.engine.runRenderLoop(() => {
      const canvas = Scene._.canvas;
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
