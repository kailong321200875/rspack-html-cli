const path = require("path");
const rspack = require("@rspack/core");

module.exports = {
  experiments: {
    css: true,
  },
  entry: {
    home: path.resolve(__dirname, "../src/pages/home/index.js"),
    about: path.resolve(__dirname, "../src/pages/about/index.js"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@styles": path.resolve(__dirname, "../src/styles"),
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@public": path.resolve(__dirname, "../public"),
    },
    extensions: [".js", ".less"],
  },
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "less-loader",
            options: {
              // ...
              javascriptEnabled: true,
            },
          },
        ],
        // 如果你需要将 '*.module.less' 视为 CSS Modules 那么将 'type' 设置为 'css/auto' 否则设置为 'css'
        type: "css/auto",
      },
      {
        test: /\.css$/i,
        use: [rspack.CssExtractRspackPlugin.loader, "css-loader"],
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist/public"),
          noErrorOnMissing: true,
        },
      ],
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, "../src/pages/home/home.html"),
      filename: "home.html",
      chunks: ["home"],
      favicon: path.resolve(__dirname, "../public/home.ico"),
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, "../src/pages/about/about.html"),
      filename: "about.html",
      chunks: ["about"],
      favicon: path.resolve(__dirname, "../public/about.ico"),
    }),
    new rspack.CssExtractRspackPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].[contenthash].css",
    }),
  ],
};
