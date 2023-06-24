import App from './app/App';
App.init(
  {
    debugUI: true,
    production: __ISPRODUCTION__,
    engine: 'webgl',
    AWS: true,
  },
  document.getElementById('root')!
)
  .then(() => {
    App.run();
  })
  .catch((error) => {
    console.error(error);
  });

declare global {
  const __ISPRODUCTION__: boolean;
}
