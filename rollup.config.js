const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

module.exports = {
  input: 'lib/limbda.js',
  output: {
    format: 'umd',
    name: 'limbda',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['@babel/env', { modules: false }]],
    }),
  ],
};
