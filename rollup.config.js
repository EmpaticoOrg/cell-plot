import nodeResolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import commonjs from 'rollup-plugin-commonjs'

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
    plugins
  },
  {
    input: "./lib/index.js",
    output: {
      file: "./dist/index.module.js",
      format: "es"
    },
    plugins
  }
]
