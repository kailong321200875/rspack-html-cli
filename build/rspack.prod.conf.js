const { merge } = require('webpack-merge')
const baseConfig = require('./rspack.base.conf.js')

/** @type {import('@rspack/cli').Configuration} */
module.exports = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            env: {
              targets: ['> 0.25%'],
            },
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 300 * 1024, // 降低单个资源大小限制
    maxEntrypointSize: 500 * 1024, // 降低入口文件大小限制
    assetFilter(assetFilename) {
      // 只对 js 和 css 文件进行大小检查
      return /\.(?:js|css)$/.test(assetFilename)
    },
  },
})
