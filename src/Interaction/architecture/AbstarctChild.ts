import AbstractView from './AbstractView';
import { InteractableTarget } from './Interactable';
import Parentable from './Parentable';

export default abstract class AbstarctChild extends AbstractView {
  constructor(
    target: InteractableTarget,
    protected parent: Parentable<AbstarctChild>
  ) {
    super(target);
  }

  protected _click(): void {
    super._click();
    if (this.isActivate) this.parent.clickChild(this);
  }
}
