const { merge } = require("webpack-merge");
const baseConfig = require("./rspack.base.js");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /^\//, to: "/home.html" }],
    },
    hot: true,
    open: true,
  },
});
