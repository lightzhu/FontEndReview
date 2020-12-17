'use strict'
const path = require('path')
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.config')
const { merge } = require('webpack-merge')
module.exports = merge(baseConfig, {
  entry: {
    // index: './src/index.js',
  },
  output: {},
  mode: 'production', // 打包模式 none production development
  devtool: "none",
  externals: {
    // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖,
    // 项目开发过程中正常引用安装，项目打包时会自动处理
    lodash: {
      commonjs: "lodash",
      amd: "lodash",
      root: "_" // 指向全局变量
    },
    axios: 'axios'
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为⼀个单独的⽂件
      cacheGroups: {
        react: {
          chunks: "initial", // 必须三选⼀： "initial" | "all" | "async"(默认就是async)
          test: /react|react-dom/, // 正则规则验证，如果符合就提取 chunk,
          name: "react"
        },
        axios: {
          chunks: "initial",
          test: /axios/,
          name: "axios"
        }
      }
    },
  },
  module: {
    rules: []
  },
  plugins: []
})
