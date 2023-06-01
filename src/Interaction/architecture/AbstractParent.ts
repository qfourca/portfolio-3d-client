import AbstractChild from './AbstarctChild';
import AbstractView from './AbstractView';
import Parentable from './Parentable';

export default abstract class AbstractParent<T extends AbstractChild>
  extends AbstractView
  implements Parentable<T>
{
  appendChild(child: T): void {
    throw new Error('Method not implemented.');
  }
  clickChild(child: T): void {
    this.activate();
  }
}
