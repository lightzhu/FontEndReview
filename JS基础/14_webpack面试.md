## webpack 核心概念

- 入口 entry
  `entry: './path/to/my/entry/index.js'`
- 输出(Output)
  `output: { path: path.resolve(__dirname, 'dist'), filename: 'my-first-webpack.bundle.js' }`
- 加载器(Loader)
  `module: { rules: [ { test: /\.txt$/, use: 'raw-loader' } ] }`
- 插件(Plugins)
  `plugins: [ new HtmlWebpackPlugin({template: './src/index.html'}) ]`

## webpack 热更新原理

hot-module-replacement-plugin 包给 webpack-dev-server 提供了热更新的能力，它们两者是结合使用的，单独写两个包也是出于功能的解耦来考虑的。

- webpack-dev-server(WDS)的功能提供 bundle server 的能力，就是生成的 bundle.js 文件可以通过 localhost://xxx 的方式去访问，另外 WDS 也提供 livereload(浏览器的自动刷新)
- hot-module-replacement-plugin 的作用是提供 HMR 的 runtime，并且将 runtime 注入到 bundle.js 代码里面去。
- 一旦磁盘里面的文件修改，那么 HMR server 会将有修改的 js module 信息发送给 HMR runtime，然后 HMR runtime 去局部更新页面的代码

## 加快打包速度

- 确保下 webpack，npm, node 及主要库版本要新
- loader 范围缩小到 src 项目文件
- 关闭或者修改 eslint 代码校验
- happypack 多进程进行
- 动态链接库（DllPlugin）
- 使用 webpack-bundle-analyzer 对项目进行模块分析生成 report
- 使用 cache-loader 启用持久化缓存

## loader 和 plugin 的区别

- loader，它是一个转换器，将 A 文件进行编译成 B 文件，比如：将 A.less 转换为 A.css，单纯的文件转换过程。
- plugin 是一个扩展器，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务

## babel 怎么把字符串解析成 AST

- 解析：Babylon 是一个解析器，它可以将 javascript 字符串，转化为更加友好的表现形式，称之为抽象语法树；
  - 词法分析阶段：字符串形式的代码转换为令牌（tokens）流,令牌类似于 AST 中的节点；
  - 语法分析阶段：把一个令牌流转化为 AST 的形式，同时这个阶段会把令牌中的信息转化为 AST 的表述结构
- 转换：Babel 接收解析得到的 AST 并通过 babel-traverse 对其进行深度优先遍历，在此过程中对节点进行添加、更新及移除操作
- 生成：将经过转换的 AST 通过 babel-generator 再转换为 js 代码，过程及时深度遍历整个 AST,然后构建转换后的代码字符串

## webpack 基本原理

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数
- 开始编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
- 确定入口：根据配置中的 entry 找出所有的入口文件。
- 编译模块：从入口文件出发,调用@babel/parser 对模块进行翻译成 AST,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
- 完成模块编译：使用 babel/core 和 @babel/preset-env （transformFromAst）翻译完所有模块后,将 AST 转换为浏览器可执行的代码，
- 输出资源：根据入口和模块之间的依赖关系,创建自运行函数，处理 require,module,exports 包装转换后的代码，组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表。
- 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。

## webpack 的构建流程

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
- 确定入口：根据配置中的 entry 找出所有的入口文件；
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

### webapck

#### 1.1 什么是 Webpack

webpack 是一个**打包模块化**JavaScript 的工具，它将一切文件都视为模块，通过 loader 编译转换文件，通过 plugin 注入钩子，最后将输出的资源模块组合成文件。\n\n 它主要的配置信息有 **entry、output、modules、plugins**。\n\n

#### 1.2 构建流程\n\n**基础概念**

1. `Compiler`：Webpack 的运行入口，实例化时定义 webpack 构建主要流程，同时创建构建时使用的核心对象 compilation
2. `Compilation`：由 Compiler 实例化，存储构建过程中流程使用到的数据，用于控制这些数据的变化，每一次构建创建一个 Compilation 实例
3. `Chunk`：一般一个入口对应一个 Chunk
4. `Module`：用于表示代码模块的类型，有很多子类用于处理不同情况的模块，模块相关信息都可以从 Module 实例中获取，例如 dependiencies 记录模块的依赖信息
5. `Parser`：基于 acorn 来分析 AST 语法树，解析出代码模块的依赖
6. `Dependency`：解析时用于保存代码模块对应的依赖使用的对象
7. `Template`：生成最终代码要使用到的代码模块
   **基本流程**
8. 创建`Compiler`实例，用于控制构建流程，`compiler`实例包含 webpack 基本环境信息
9. 根据配置项转换成对应内部插件，并初始化 options 配置项
10. 执行`compiler.run`
11. 创建`Compiltation`实例，每次构建都会新创建一个`Compliation`实例，包含了这次构建的基本信息
12. 从`entry`开始递归分析依赖，对每个依赖模块进行`buildModule`，通过`Loader`将不同类型的模块转换成 Webpack 模块
13. 调用`Parser.parse`将上面的结果转换成 AST 树
14. 遍历 AST 树，收集依赖`Dependency`，并保存在`Compliation`实例的`ependiencies`属性中
15. 生成`Chunks`，不同`entry`生成不同`chunk`，动态导入也会生成自己的`chunk`，生成`chunk`后还会进行优化
16. 使用`Template`基于`Compilation`的数据生成结果代码
    **编译过程**
    **第一步**先初始化参数，通过`yargs`将`webpack.config.js`和`shell`脚本的配置信息合并，进行参数的初始化；
    **第二步**利用初始化的参数创建`complier`对象，`complier`可以视为一个 webpack 的实例，存在于 webpack 从启动到结束的整个过程，它包含了 webpack 的`module`、`plugin`等参数信息，然后调用`complier.run`方法开始编译。
    **第三步**根据`entry`配置信息找到入口文件，创建`compilation`对象，可以理解为 webpack 一次编译的过程，包含了当前编译环境的所有资源，包括编译后的文件。
    **第四步**通过配置信息，调用`loader`进行模块翻译，使用`acorn`将模块转换为`AST`，当遇到`require`依赖时，创建依赖并加入依赖数组，再找出依赖的依赖，递归异步的处理所有的依赖。
    **第五步**完成第四步后将得到所有模块的依赖关系和模块翻译后的文件，然后调用`compilation.seal`方法，对这些模块和根据模块依赖关系创建的`chunk`进行整理，将所有资源进行合并拆分等操作。这是最后一次能修改输出内容的地方。
    **第六步**根据配置信息中的 output 配置，进行最后模块的文件输出，指定输出文件名和文件路径。
    1.3 原理
    webpack**打包输出**后的文件其实就是一个闭包，传入的参数是一个对象，键值为所有输出文件的路径，内容为 eval 包裹的文件内容；闭包内重写了模块的加载方式，自己定义了`__webpack_require__`方法，来实现模拟的 commonjs 规范模块加载机制。Webpack 实际上是基于事件流的，通过一系列的插件来运行。Webpack 利用`tapable`库提供各种钩子来实现对于整个构建流程各个步骤的控制
