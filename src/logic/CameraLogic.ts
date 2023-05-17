import CustomCamera from '$/global/scene/Camera';
import Scene from '$/global/scene/Scene';
import WheelRotate from '$/module/WheelRotate';

export default class CameraLogic {
  private camera: CustomCamera;
  constructor() {
    this.camera = Scene._.camera;
    new WheelRotate(this.camera);
  }
}
