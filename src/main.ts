import App from './app/App';

App.init(
  {
    debugUI: true,
    production: __ISPRODUCTION__,
    engine: undefined,
  },
  document.getElementById('app')!
).then(() => {
  App.run();
});

declare global {
  const __ISPRODUCTION__: boolean;
}
