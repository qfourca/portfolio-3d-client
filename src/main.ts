import App from './app/App';

App.init(
  {
    debugUI: false,
    production: __ISPRODUCTION__,
    engine: undefined,
  },
  document.getElementById('app')!
);

declare global {
  const __ISPRODUCTION__: boolean;
}
