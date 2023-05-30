import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import gltf from 'vite-plugin-gltf';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ command, mode }) => {
  // console.log(process.versions);
  return {
    assetsInclude: ['**/*.babylon'],
    plugins: [
      gltf(),
      visualizer({
        filename: './dist/report.html',
        open: false,
        brotliSize: true,
      }),
      tsconfigPaths(),
    ],
    define: {
      '__ISPRODUCTION__': mode !== 'development',
      'process.env': process.env,
      'process.versions': process.versions,
    },
    server: {
      /*here*/
      hmr: { overlay: false },
    },
  };
});
