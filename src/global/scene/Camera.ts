import { Scene, TargetCamera, Vector3 } from '@babylonjs/core';

export default class CustomCamera extends TargetCamera {
  constructor(scene: Scene) {
    super('camera', new Vector3(0, 25, 0), scene);
    this.fov = 1.3;
    this.rotation.x += 0.2;
    scene.registerBeforeRender(() => {
      this._update(scene.deltaTime);
    });
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
    this._smoothRotation_.goal = pos.subtract(this.rotation);
    this._smoothRotation_.duration = duration;
    this._smoothRotation_.current = 0;
  }
}
