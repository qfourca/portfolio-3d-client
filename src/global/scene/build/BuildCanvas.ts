export default class BuildCanvas {
  public static build(parent?: HTMLElement) {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.outline = 'none';
    parent?.appendChild(canvas);
    return canvas;
  }
}
