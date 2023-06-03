import { Vector3 } from '@babylonjs/core';

export default class WheelRotate {
  private wheelControl: number = 0;

  private isHover: boolean = true;
  constructor(
    private target: { rotation: Vector3 },
    public sensitive: number = 0.0001,
    private isMobile: boolean,
    private element?: HTMLElement
  ) {
    console.log(isMobile);
    if (isMobile) {
      let startTouch: number = 0;
      const targetElement = element ?? window;
      targetElement.addEventListener('touchstart', (e) => {
        //@ts-expect-error
        const touch = e.changedTouches[0];
        if (element) {
          if (element === touch.target) {
            startTouch = touch.pageX + touch.pageY;
          }
        } else {
          startTouch = touch.pageX + touch.pageY;
        }
      });
      targetElement.addEventListener('touchmove', (e) => {
        //@ts-expect-error
        const touch = e.changedTouches[0];
        if (element) {
          if (element === touch.target) {
            this.wheelControl += (touch.pageX + touch.pageY - startTouch) * 10;
            startTouch = touch.pageX + touch.pageY;
          }
        } else {
          this.wheelControl += (touch.pageX + touch.pageY - startTouch) * 10;
          startTouch = touch.pageX + touch.pageY;
        }
      });
    } else {
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
    }

    element?.addEventListener('mouseenter', () => {
      this.isHover = true;
    });
    element?.addEventListener('mouseleave', () => {
      this.isHover = false;
    });

    requestAnimationFrame(this.update.bind(this));
  }

  protected update() {
    requestAnimationFrame(this.update.bind(this));
    this.target.rotation.y += this.wheelControl * this.sensitive;
    this.wheelControl = 0;
  }
}
