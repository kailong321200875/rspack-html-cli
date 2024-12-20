const { merge } = require("webpack-merge");
const baseConfig = require("./rspack.base.js");

module.exports = merge(baseConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        common: {
          name: "common",
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
