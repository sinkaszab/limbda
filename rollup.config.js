const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

module.exports = {
  input: 'lib/limbda.js',
  output: {
    format: 'umd',
    name: 'limbda',
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
  ],
};
