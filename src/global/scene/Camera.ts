import { TargetCamera, Vector3 } from '@babylonjs/core';
import GlobalScene from './Scene';

export default class CustomCamera extends TargetCamera {
  constructor() {
    super('camera', new Vector3(0, 25, 0), GlobalScene._);
    this.fov = 1.3;
    this.rotation.x += 0.2;
  }
}
