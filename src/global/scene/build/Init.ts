import {
  BlurPostProcess,
  ColorCorrectionPostProcess,
  TonemapPostProcess,
  TonemappingOperator,
  Vector2,
} from '@babylonjs/core';
import GlobalScene from '../Scene';

export default (scene: GlobalScene) => {
  const camera = scene.camera;

  var postProcess = new TonemapPostProcess(
    'tonemap',
    TonemappingOperator.Reinhard,
    1.8,
    scene.camera
  );
  // const kernel = 8;
  // var postProcess0 = new BlurPostProcess(
  //   'Horizontal blur',
  //   new Vector2(1.0, 0),
  //   kernel,
  //   1.0,
  //   camera
  // );
  // var postProcess1 = new BlurPostProcess(
  //   'Vertical blur',
  //   new Vector2(0, 1.0),
  //   kernel,
  //   1.0,
  //   camera
  // );
};
