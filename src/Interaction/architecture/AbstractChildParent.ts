import AbstarctChild from './AbstarctChild';
import Childable from './Childable';
import Parentable from './Parentable';

export default abstract class AbstactChildParent<T extends AbstarctChild>
  extends AbstarctChild
  implements Childable, Parentable<T>
{
  protected children: Array<T> = new Array();
  appendChild(child: T): void {
    this.children.push(child);
  }
  clickChild(child: T): void {
    this.activate();
  }
}
