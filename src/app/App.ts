import Config, { RawConfig } from '$/global/config/Config';
import Scene from '$/global/scene/Scene';
import RoomLogic from '$/logic/RoomLogic';
import Observer from '$/logic/view/Observer';
import LoadScene from './LoadScene';

export default class App {
  public static async init(config: RawConfig, root: HTMLElement) {
    await Config.set(config);
    await Scene.set(root);

    await LoadScene();

    new Observer();
  }

  public static run() {
    Scene._.engine.runRenderLoop(() => {
      Scene._.render();
    });
  }

  public static pause() {
    Scene._.engine.stopRenderLoop();
  }
}
