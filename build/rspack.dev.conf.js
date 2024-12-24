const { merge } = require("webpack-merge");
const baseConfig = require("./rspack.base.conf.js");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    hot: true,
    open: false,
  },
});
