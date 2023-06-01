export default interface Hoverable {
  hover(): void;
  out(): void;
  isHover: boolean;
}
