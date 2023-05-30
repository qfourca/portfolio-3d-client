import { Vector3 } from '@babylonjs/core';

export default class WheelRotate {
  private wheelControl: number = 0;

  private isHover: boolean = true;
  constructor(
    private target: { rotation: Vector3 },
    public sensitive: number = 0.0001,
    private element?: HTMLElement
  ) {
    window.addEventListener('wheel', (event) => {
      if (this.isHover) {
        //@ts-expect-error
        this.wheelControl += event.wheelDeltaY;
        if (this.wheelControl > 1000) {
          this.wheelControl = 1000;
        } else if (this.wheelControl < -1000) {
          this.wheelControl = -1000;
        }
      }
    });

    element?.addEventListener('mouseenter', () => {
      this.isHover = true;
    });
    element?.addEventListener('mouseleave', () => {
      this.isHover = false;
    });

    // GlobalScene._.registerBeforeRender(this.update.bind(this));
    requestAnimationFrame(this.update.bind(this));
  }

  protected update() {
    requestAnimationFrame(this.update.bind(this));
    this.target.rotation.y += this.wheelControl * this.sensitive;
    this.wheelControl = 0;
  }
}
