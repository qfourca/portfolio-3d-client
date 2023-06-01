export default interface Activatable {
  activate(): void;
  deactivate(): void;
  isActivate: boolean;
}
