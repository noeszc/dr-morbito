import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';


export default [
  {
    input: 'src/app.js',
    output: {
      file: 'public/bundle.js',
      format: 'iife',
      sourcemaps: true
    },
    plugins: [resolve(), commonjs()],
  },
];
