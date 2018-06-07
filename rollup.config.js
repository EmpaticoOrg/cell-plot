import nodeResolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

const external = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];

const plugins = [
  nodeResolve({
    jsnext: true
  }),
  commonjs(),
  filesize()
]

export default [
  {
    input: "./lib/index.js",
    output: {
      file: "./dist/index.main.js",
      format: "cjs"
    },
    external: ['react'],
    external,
    plugins
  },
  {
    input: "./lib/index.js",
    output: {
      file: "./dist/index.module.js",
      format: "es"
    },
    external,
    plugins
  }
]
