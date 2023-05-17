import { HighlightLayer, Scene } from '@babylonjs/core';

export default (scene: Scene) => {
  new HighlightLayer('highlight_layer', scene, {
    mainTextureRatio: 1,
    isStroke: true,
  });
};
