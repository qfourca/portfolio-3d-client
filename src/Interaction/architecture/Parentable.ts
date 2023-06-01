export default interface Parentable<T> {
  clickChild(child: T): void;
  appendChild(child: T): void;
}
