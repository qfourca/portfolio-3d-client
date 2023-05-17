import Scene from '$/global/scene/Scene';
import WheelRotate from '$/module/WheelRotate';
import { TargetCamera } from '@babylonjs/core';

export default class CameraLogic {
  private camera: TargetCamera;
  constructor() {
    this.camera = Scene._.activeCamera as TargetCamera;
    this.camera.fov = 1.2;
    new WheelRotate(this.camera);
  }
}
