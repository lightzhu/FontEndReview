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
