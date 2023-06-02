import GlobalScene from '$/global/scene/Scene';

export default class CloseNotionPage {
  constructor() {}
  close(time: number) {
    GlobalScene._.ui.app.style.transition = time + 'ms';
    GlobalScene._.ui.app.style.width = '100%';
    GlobalScene._.ui.notion.close(time);
  }
}
