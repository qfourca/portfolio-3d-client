import WheelRotate from '$/module/WheelRotate';
import { Scene, UniversalCamera, Vector3 } from '@babylonjs/core';
import GlobalScene from './Scene';
import Config from '../config/Config';

export default class CustomCamera extends UniversalCamera {
  constructor(scene: Scene, wheelElement?: HTMLElement) {
    super('camera', new Vector3(0, 2, 0), scene);
    this.fov = 1;
    this.rotation.x += 0.3;
    this.minZ = 0.01;
    this.maxZ = 100;
    scene.registerBeforeRender(() => {
      this._update(scene.deltaTime);
    });
    new WheelRotate(this, 0.001, Config._.mobileDevice, wheelElement);
  }

  private _update(time: number) {
    this.rotation.y = this.rotation.y % (Math.PI * 2);
    this._smoothMove(time);
    this._smoothRotation(time);
  }
  private _smoothMove_: { goal: Vector3; duration: number; current: number } = {
    goal: new Vector3(),
    duration: 1,
    current: 0,
  };
  private _smoothMove(tick: number) {
    const { goal, duration, current } = this._smoothMove_;
    const delta =
      (duration - current < tick ? duration - current : tick) / duration;
    if (delta > 0) {
      const newGoal = goal.clone();
      this.position = this.position.add(
        newGoal.multiply(new Vector3(delta, delta, delta))
      );
      this._smoothMove_.current = current + tick;
    }
  }
  public smoothMove(pos: Vector3, duration: number) {
    this._smoothMove_.goal = pos.subtract(this.position);
    this._smoothMove_.duration = duration;
    this._smoothMove_.current = 0;
  }
  private _smoothRotation_: {
    goal: Vector3;
    duration: number;
    current: number;
  } = { goal: new Vector3(), duration: 1, current: 0 };
  private _smoothRotation(tick: number) {
    const { goal, duration, current } = this._smoothRotation_;
    const delta =
      (duration - current < tick ? duration - current : tick) / duration;
    if (delta > 0) {
      const newGoal = goal.clone();
      this.rotation = this.rotation.add(
        newGoal.multiply(new Vector3(delta, delta, delta))
      );
      this._smoothRotation_.current = current + tick;
    }
  }
  public smoothRotation(pos: Vector3, duration: number, reverse?: boolean) {
    const { x, y, z } = pos
      .subtract(this.rotation)
      .add(new Vector3().setAll(Math.PI));
    const cir = Math.PI * 2;
    const goal = new Vector3(x % cir, y % cir, z % cir).subtract(
      new Vector3().setAll(Math.PI)
    );
    this._smoothRotation_.goal = goal;
    this._smoothRotation_.duration = duration;
    this._smoothRotation_.current = 0;
  }
}
