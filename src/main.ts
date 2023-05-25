import App from './app/App';
App.init(
  {
    debugUI: true,
    production: __ISPRODUCTION__,
    engine: 'webgl',
  },
  document.getElementById('app')!
)
  .then(() => {
    App.run();
  })
  .catch((error) => {
    console.log(error);
  });

declare global {
  const __ISPRODUCTION__: boolean;
}
