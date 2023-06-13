import {
  BlurPostProcess,
  TonemapPostProcess,
  TonemappingOperator,
  Vector2,
} from '@babylonjs/core';
import GlobalScene from '../Scene';

export default (scene: GlobalScene) => {
  var postProcess = new TonemapPostProcess(
    'tonemap',
    TonemappingOperator.Reinhard,
    1.8,
    scene.camera
  );
  var postProcess0 = new BlurPostProcess(
    'Horizontal blur',
    new Vector2(0.15, 0.15),
    16,
    1.0,
    scene.camera
  );
};
