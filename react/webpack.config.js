const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    // index: './src/index.js',
    demo1: './src/myreact/index.js'
  },
  stats: { children: false, entrypoints: false },
  output: {
    path: path.resolve('dist'),
    filename: '[name].bundle.js'
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: "5000", //监听端口
    inline: true, //设置为true，当源文件改变的时候会自动刷新
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        // include: path.resolve('router'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "es2015", "react", "stage-0"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          }, {
            loader: "less-loader", // compiles Less to CSS
            options: {
              sourceMap: true
            }
          }]
      },
      {
        test: /\.(eot|svg|jpg|png|woff|woff2|ttf)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './src/index.html'),
    //   filename: 'index.html'
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/myreact/index.html'),
      filename: 'myreact-index.html'
    }),
    new MiniCssExtractPlugin({
      // 提取css插件
      filename: "./style/[name].less",
      chunkFilename: "./style/[name].css"
    }),
  ]
}