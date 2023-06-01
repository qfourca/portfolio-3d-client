import AbstarctChild from './AbstarctChild';
import AbstractView from './AbstractView';
import Childable from './Childable';
import Parentable from './Parentable';

export default abstract class AbstractParentChild<T extends AbstarctChild>
  extends AbstractView
  implements Childable, Parentable<T>
{
  clickchild(child: T): void {
    this.activate();
  }
}
