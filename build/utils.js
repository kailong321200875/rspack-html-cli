const rspack = require("@rspack/core");
const path = require("path");

module.exports = {
  // 工具函数：生成通用的 `use` 配置
  createStyleLoaders: function ({
    isModule = false,
    preProcessor = "",
    additionalData = false,
  } = {}) {
    const loaders = [
      rspack.CssExtractRspackPlugin.loader,
      {
        loader: "css-loader",
        options: isModule
          ? {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            }
          : {},
      },
      "postcss-loader", // 添加 postcss-loader
    ];

    if (preProcessor) {
      const preProcessorLoader = {
        loader: `${preProcessor}-loader`,
        options: {
          javascriptEnabled: true, // 适用于 less 的配置
          lessOptions: {
            globalVars: {
              "font-24": "24px", // 定义 Less 全局变量
            },
          },
          additionalData: additionalData
            ? (content) => {
                const importPath = path.resolve(
                  __dirname,
                  "../src/styles/common.less"
                );
                return `@import "${importPath}";\n${content}`;
              }
            : undefined,
        },
      };
      loaders.push(preProcessorLoader);
    }

    return loaders;
  },
};
