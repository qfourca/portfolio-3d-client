import Config, { RawConfig } from '$/global/config/Config';
import Scene from '$/global/scene/Scene';

export default class App {
  public static async init(config: RawConfig, root: HTMLElement) {
    await Config.set(config);
    await Scene.set(root);
  }
}
