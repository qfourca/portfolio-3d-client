export default class UI {
  public root: HTMLElement;
  public app: HTMLDivElement;
  public canvas: HTMLCanvasElement;
  //   public notion: HTMLElement;
  constructor(root: HTMLElement) {
    this.root = root;
    this.app = this.makeApp();
    this.canvas = this.makeCanvas();
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
}
