import NotionComponent from './Notion';

export default class UI {
  public root: HTMLElement;
  public app: HTMLDivElement;
  public canvas: HTMLCanvasElement;
  public notion: NotionComponent;
  constructor(root: HTMLElement) {
    this.root = root;
    this.app = this.makeApp();
    this.canvas = this.makeCanvas();
    this.notion = new NotionComponent(this.makeNotionRoot());
  }

  private makeApp() {
    const element = document.createElement('div');
    this.root.appendChild(element);
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.position = 'absolute';
    element.style.zIndex = '9';
    return element;
  }

  private makeCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.outline = 'none';
    this.app.appendChild(canvas);
    return canvas;
  }

  private makeNotionRoot() {
    const element = document.createElement('div');
    this.root.appendChild(element);
    element.style.width = '0%';
    element.style.maxHeight = '100%';
    element.style.height = '100%';
    element.style.overflowY = 'scroll';
    // element.style.overflowX = "";
    element.style.padding = '20px';
    element.style.position = 'absolute';
    element.style.boxSizing = 'border-box';
    element.style.right = '0';
    element.style.bottom = '0';
    element.style.zIndex = '-1';
    return element;
  }
}
