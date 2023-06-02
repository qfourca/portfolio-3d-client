// import GlobalScene from '$/global/scene/Scene';
// import { Mesh, Vector3 } from '@babylonjs/core';
// import AbstarctChild from './architecture/AbstarctChild';
// import AbstactChildParent from './architecture/AbstractChildParent';
// import Parentable from './architecture/Parentable';
// import api from '$/api/api';
// import PhotoView from './PhotoView';

// export default class BookshelfView extends AbstactChildParent<AbstarctChild> {
//   constructor(public wall: Mesh, parent: Parentable<AbstarctChild>) {
//     super(wall, parent);
//   }
//   public click(): void {
//     const camera = GlobalScene._.camera;
//     const time =
//       Vector3.Distance(camera.position, new Vector3(0, 0.3, 0)) * 2000;
//     camera.smoothMove(new Vector3(0, 0.3, 0), time);
//     camera.smoothRotation(new Vector3(0.3, 0, 0), time);
//     this.children.forEach((child) => {
//       child.activate();
//     });
//   }
//   clickChild(child: AbstarctChild): void {
//     throw new Error('Method not implemented.');
//   }
// }
