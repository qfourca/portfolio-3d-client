import Config from '$/global/config/Config';
import GlobalScene from '$/global/scene/Scene';

export default class OpenNotionPage {
  constructor() {}

  open(time: number, uuid: string) {
    const notion = GlobalScene._.ui.notion;
    notion.url = uuid;
    notion.open(time);

    GlobalScene._.ui.app.style[Config._.wideDevice ? 'width' : 'height'] =
      '50%';
    GlobalScene._.ui.app.style.transition = time + 'ms';
  }
}
