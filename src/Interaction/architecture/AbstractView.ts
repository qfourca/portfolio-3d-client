import InteractionImpl from './InteractionImpl';

export default class AbstractView extends InteractionImpl {
  click(): void {}
  out(): void {}
  hover(): void {}
}
