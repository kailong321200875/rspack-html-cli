const { merge } = require('webpack-merge')
const baseConfig = require('./rspack.base.conf.js')

/** @type {import('@rspack/cli').Configuration} */
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    open: false,
  },
})
