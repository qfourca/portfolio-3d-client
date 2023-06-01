import App from './app/App';
App.init(
  {
    debugUI: false,
    production: __ISPRODUCTION__,
    engine: 'webgl',
  },
  document.getElementById('root')!
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
