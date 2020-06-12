import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

const plugins = [
  typescript({ noEmitOnError: false })
]

export default {
  plugins,
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.iife.js',
      format: 'iife',
      name: 'EventHandler',
      sourcemap: true
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'EventHandler',
      sourcemap: true
    },
    {
      file: 'dist/index.min.js',
      format: 'es',
      sourcemap: true,
      plugins: [terser()]
    },
    {
      file: 'dist/index.cjs.min.js',
      format: 'cjs',
      sourcemap: true,
      plugins: [terser()]
    },
    {
      file: 'dist/index.iife.min.js',
      format: 'iife',
      name: 'EventHandler',
      sourcemap: true,
      plugins: [terser()]
    },
    {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'EventHandler',
      sourcemap: true,
      plugins: [terser()]
    }
  ]
}
