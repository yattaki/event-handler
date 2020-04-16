import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

const plugins = [
  typescript({ noEmitOnError: false }),
  process.env.BUILD !== 'development' ? terser() : undefined
]

export default {
  plugins,
  input: 'src/event-handler.ts',
  output: [
    {
      file: 'public/event-handler.js',
      format: 'cjs'
    },
    {
      file: 'public/event-handler.esm.js',
      format: 'esm'
    }
  ]
}
