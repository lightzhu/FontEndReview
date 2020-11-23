const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    index: './src/index.js',
  },
  // stats: { children: false, entrypoints: false },
  // 常用占位符 name hash id chunkhash
  output: {
    path: path.resolve('dist'),
    filename: '[name].bundle.js'
  },
  mode: 'production', // 打包模式 none production development
  devtool: "inline-source-map",
  resolve: {
    extensions: ['.js', '.vue', 'jsx', '.json'],// 引入模块时不带扩展
    alias: {// 设置别名
      '@': path.resolve(__dirname, "src")
    },
    modules: [path.resolve(__dirname, "src"), "node_modules"] //设置包查找路径
  },
  // 开发服务
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: "5000", //监听端口
    inline: true, //设置为true，当源文件改变的时候会自动刷新
    hot: true,
    // hotOnly: true,
    before(app) {
      // 客用于本地mock
      app.get('/api/getInfo', function (req, res) {
        res.json({ data: 'response-getInfo' });
      });
      app.get('/api/list', function (req, res) {
        res.json({ data: [1, 2, 3, 4] });
      });
    }
  },
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
        // axios: {
        //   chunks: "initial",
        //   test: /axios/,
        //   name: "axios"
        // }
      }
    },
  },
  module: {
    rules: [
      // 定义解析css 样式的loader
      {
        test: /\.css$/,
        // css-loader把css文件里的样式载入到js文件里面，style-loader将样式提取出来并添加到body的style标签里面
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: "css-loader",
            options: {
              // modules: true // 类似 在js中 element.setAttribute('class', less.pink)
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                path: './postcss.config.js'
              }
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        // include: path.resolve('router'),
        use: {
          loader: 'babel-loader',
          options: {
            // presets: [
            //   "es2015", "react", "stage-0"
            // ]
            presets: [
              [
                "babel-preset-env", // 处理浏览器兼容语法
                {
                  "useBuiltIns": true,//按需加载polyfill内容
                }
              ],
              "babel-preset-react", // 处理react语法
            ],
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
      // {
      //   test: /\.(eot|svg|jpg|png|woff|woff2|ttf)$/,
      //   use: 'url-loader'
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),// 自动清理打包文件夹插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      inject: true,
      chunks: ['index']
    }),

    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, './src/myreact/index.html'),
    //   filename: 'myreact-index.html',
    //   inject: true,
    //   chunks: ['demo1']
    // }),
    new MiniCssExtractPlugin({
      // 提取css插件
      filename: "./style/[name].css",
      chunkFilename: "./style/[name].css"
    }),
  ]
}