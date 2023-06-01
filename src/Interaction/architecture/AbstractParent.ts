import AbstractChild from './AbstarctChild';
import AbstractView from './AbstractView';
import Parentable from './Parentable';

export default abstract class AbstractParent<T extends AbstractChild>
  extends AbstractView
  implements Parentable<T>
{
  clickchild(child: T): void {
    this.activate();
  }
}
