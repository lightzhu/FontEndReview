'use strict'
const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.config')
const { merge } = require('webpack-merge')
module.exports = merge(baseConfig, {
  mode: 'development', // 打包模式 none production development
  devtool: "inline-source-map",
  // 开发服务
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: "5000", //监听端口
    inline: true, //设置为true，当源文件改变的时候会自动刷新
    hot: true,
    open: true,
    // hotOnly: true,
    before(app) {
      // 可用于本地mock
      app.get('/api/getInfo', function (req, res) {
        res.json({ data: 'response-getInfo' });
      });
      app.get('/api/list', function (req, res) {
        res.json({ data: [1, 2, 3, 4] });
      });
    }
  },
  optimization: {
    usedExports: true,
    splitChunks: {},
  },
  module: {
    rules: []
  },
  plugins: []
})