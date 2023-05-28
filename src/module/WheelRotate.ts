import GlobalScene from '$/global/scene/Scene';
import { Vector3 } from '@babylonjs/core';

export default class WheelRotate {
  private wheelControl: number = 0;
  constructor(
    private target: { rotation: Vector3 },
    public sensitive: number = 0.0001
  ) {
    window.addEventListener('wheel', (event) => {
      //@ts-expect-error
      this.wheelControl += event.wheelDeltaY;
      if (this.wheelControl > 1000) {
        this.wheelControl = 1000;
      } else if (this.wheelControl < -1000) {
        this.wheelControl = -1000;
      }
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
