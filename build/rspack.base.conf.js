const path = require('node:path')
const rspack = require('@rspack/core')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const loadEnv = require('./env')
const utils = require('./utils')

// 获取当前环境
const mode = process.env.CLI_NODE_ENV || 'development'

// 加载环境变量
const env = loadEnv(mode)

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/pages/index/index.ts'),
    about: path.resolve(__dirname, '../src/pages/about/index.js'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.ts', '.js', '.less'],
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'image/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'font/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[hash][ext]',
        },
      },
      // Less Modules 配置
      {
        test: /\.module\.less$/,
        use: utils.createStyleLoaders({
          isModule: true,
          preProcessor: 'less',
          additionalData: true,
        }),
      },
      // 普通 Less 配置
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: utils.createStyleLoaders({
          preProcessor: 'less',
          additionalData: true,
        }),
      },
      // CSS Modules 配置
      {
        test: /\.module\.css$/,
        use: utils.createStyleLoaders({
          isModule: true,
        }),
      },
      // 普通 CSS 配置
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: utils.createStyleLoaders(),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/pages/index/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      favicon: path.resolve(__dirname, '../public/index.ico'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/pages/about/about.html'),
      filename: 'about.html',
      chunks: ['about'],
      favicon: path.resolve(__dirname, '../public/about.ico'),
    }),
    new rspack.CssExtractRspackPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
      async: true,
    }),
    new rspack.DefinePlugin({
      'process.env': JSON.stringify(env),
    }),
  ],
}
